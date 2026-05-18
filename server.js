/**
 * Public deployment server for "如果当时".
 * Serves the static frontend and proxies DeepSeek API requests from one origin.
 */

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW || 60000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 30);

if (!DEEPSEEK_API_KEY) {
  console.error('Missing DEEPSEEK_API_KEY. Set it in your hosting provider environment variables.');
  process.exit(1);
}

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  // 作品集投递前频繁更新前端文件，禁用缓存能避免线上仍加载旧 app.js。
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const requestCounts = new Map();

function sanitizeGeneratedStory(rawStory) {
  let story = String(rawStory || '').trim();
  if (!story) return '';

  story = story
    .replace(/\r\n?/g, '\n')
    .replace(/\\n|\/n/g, '\n')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/```(?:text|markdown|md)?\s*([\s\S]*?)```/gi, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\s*(-{3,}|—{2,})\s*/g, '\n')
    .replace(/\s*(#{1,6}\s*)?(【?(?:用户画像与选择推演|用户画像|选择后果推演|故事后果推演|后果推演|内部完成|内部分析|推理过程|思考过程|故事正文|正文|最终正文|最终输出|正式输出)】?\s*[:：]?)/gi, '\n$1$2')
    .trim();

  const outputMarkers = [
    /(?:^|\n)\s*(?:#{1,6}\s*)?【?(?:故事正文|正文|输出正文|最终正文|最终输出|正式输出|正文如下|最终故事)】?\s*[:：]?\s*/gi,
    /(?:^|\n)\s*(?:#{1,6}\s*)?(?:下面是|以下是)?(?:故事正文|正文|输出正文|最终正文|最终输出|正式输出|正文如下|最终故事)\s*[:：]\s*/gi
  ];

  outputMarkers.forEach((marker) => {
    let match;
    let lastMatch = null;
    marker.lastIndex = 0;
    while ((match = marker.exec(story)) !== null) {
      lastMatch = match;
    }
    if (lastMatch) {
      const candidate = story.slice(lastMatch.index + lastMatch[0].length).trim();
      if (candidate.length >= 20) {
        story = candidate;
      }
    }
  });

  const internalTerms = [
    '心里完成',
    '不输出',
    '用户画像与选择推演',
    '用户画像',
    '选择后果',
    '后果推演',
    '推理过程',
    '思考过程',
    '内部分析',
    '关键选择会改变',
    '写作优先级'
  ];
  const lastInternalIndex = internalTerms.reduce((latest, term) => {
    const index = story.lastIndexOf(term);
    return index > latest ? index : latest;
  }, -1);
  if (lastInternalIndex >= 0) {
    const afterInternal = story.slice(lastInternalIndex);
    const narrativeMatch = afterInternal.match(/(?:^|[。！？\n：:])\s*((?:你|他|她)(?:在|把|正|刚|又|已经|坐|站|走|回|推开|关掉|打开|拿起|盯着|看见|听见|穿过|拎着|收到|醒来|下意识|终于)[\s\S]*)/);
    if (narrativeMatch && narrativeMatch[1] && narrativeMatch[1].trim().length >= 20) {
      story = narrativeMatch[1].trim();
    }
  }

  const blockedLinePatterns = [
    /先在心里完成/i,
    /不要输出/i,
    /内部完成/i,
    /用户画像与选择推演/i,
    /用户画像/i,
    /选择后果/i,
    /后果推演/i,
    /故事后果/i,
    /推演/i,
    /思考过程/i,
    /推理过程/i,
    /内部分析/i,
    /关键选择会改变/i,
    /写作优先级/i,
    /可读性要求/i,
    /创作要求/i,
    /隐藏要求/i,
    /风格禁忌/i,
    /输出格式/i,
    /系统提示/i,
    /提示词/i,
    /作为.*模型/i,
    /^#{1,6}\s*(分析|思考|推理|内部|计划|步骤|结论|用户画像|后果推演|故事正文)/i,
    /^[\-*]\s*(先把|再判断|如果用户输入|前三句|每段都|少写|不要连续|只输出)/i
  ];

  return story
    .split(/\n+/)
    .map(line => line.trim())
    .filter(line => line && !blockedLinePatterns.some(pattern => pattern.test(line)))
    .join('\n')
    .replace(/^(?:好的|当然|明白|以下是|下面是)[，,。\s]*/i, '')
    .replace(/^(?:#{1,6}\s*)?(?:故事正文|正文|最终输出|最终正文|正式输出|正文如下)\s*[:：]\s*/i, '')
    .replace(/^["“”'‘’\s]+|["“”'‘’\s]+$/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/deepseek', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const clientData = requestCounts.get(clientIp) || { count: 0, timestamp: now };

    if (now - clientData.timestamp > RATE_LIMIT_WINDOW) {
      clientData.count = 1;
      clientData.timestamp = now;
    } else {
      clientData.count += 1;
    }

    requestCounts.set(clientIp, clientData);

    if (clientData.count > RATE_LIMIT_MAX) {
      return res.status(429).json({ error: '请求过于频繁，请稍后再试' });
    }

    const { model, messages, temperature, max_tokens } = req.body;

    if (!model || !Array.isArray(messages)) {
      return res.status(400).json({ error: '无效的请求参数' });
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: temperature || 0.8,
        max_tokens: max_tokens || 600
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(response.status).json({
        error: `API请求失败: ${response.status}`,
        details
      });
    }

    const data = await response.json();
    if (data?.choices?.[0]?.message?.content) {
      data.choices[0].message.content = sanitizeGeneratedStory(data.choices[0].message.content);
    }
    res.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: '服务器内部错误', message: error.message });
  }
});

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: 0,
  etag: false
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`如果当时 public server running on port ${PORT}`);
});
