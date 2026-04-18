/**
 * DeepSeek API 代理服务器
 * 用于安全地转发前端请求，避免API Key暴露在前端
 * 
 * 启动命令：node proxy.js
 * 访问地址：http://localhost:3000/api/deepseek
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// 从环境变量获取API Key。公网部署时不要把密钥写进代码。
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

if (!DEEPSEEK_API_KEY) {
  console.error('缺少 DEEPSEEK_API_KEY 环境变量，代理服务器无法启动。');
  process.exit(1);
}

// 中间件配置 - 简化的CORS配置，允许所有来源（开发环境）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许任何来源，生产环境建议改为具体域名
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 仍然保留cors包用于其他功能
app.use(cors());
app.use(express.json());

// 请求频率限制（简单实现）
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1分钟
const RATE_LIMIT_MAX = 30; // 每分钟最多30次请求

// 清理过期计数
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(ip);
    }
  }
}, 60000);

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// DeepSeek API代理端点
app.post('/api/deepseek', async (req, res) => {
  try {
    // 简单的请求验证
    const clientIp = req.ip || req.connection.remoteAddress;
    
    // 频率限制检查
    const now = Date.now();
    const clientData = requestCounts.get(clientIp) || { count: 0, timestamp: now };
    
    if (now - clientData.timestamp > RATE_LIMIT_WINDOW) {
      // 重置计数
      clientData.count = 1;
      clientData.timestamp = now;
    } else {
      clientData.count++;
    }
    
    requestCounts.set(clientIp, clientData);
    
    if (clientData.count > RATE_LIMIT_MAX) {
      return res.status(429).json({
        error: '请求过于频繁，请稍后再试'
      });
    }
    
    // 验证请求体
    const { model, messages, temperature, max_tokens } = req.body;
    
    if (!model || !messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: '无效的请求参数'
      });
    }
    
    console.log(`[${new Date().toISOString()}] 代理请求来自: ${clientIp}, 模型: ${model}, 消息数: ${messages.length}`);
    
    // 转发请求到DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: temperature || 0.8,
        max_tokens: max_tokens || 600
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`DeepSeek API错误: ${response.status} - ${errorText}`);
      
      return res.status(response.status).json({
        error: `API请求失败: ${response.status}`,
        details: errorText
      });
    }
    
    const data = await response.json();
    
    // 返回给前端
    res.json(data);
    
  } catch (error) {
    console.error('代理服务器错误:', error);
    
    res.status(500).json({
      error: '服务器内部错误',
      message: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DeepSeek API代理服务器运行在 http://localhost:${PORT}`);
  console.log(`代理端点: POST http://localhost:${PORT}/api/deepseek`);
  console.log(`健康检查: GET http://localhost:${PORT}/health`);
  console.log('按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭代理服务器...');
  process.exit(0);
});
