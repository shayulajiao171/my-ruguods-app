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

const requestCounts = new Map();

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
    res.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: '服务器内部错误', message: error.message });
  }
});

app.use(express.static(__dirname, {
  extensions: ['html'],
  maxAge: '5m'
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`如果当时 public server running on port ${PORT}`);
});
