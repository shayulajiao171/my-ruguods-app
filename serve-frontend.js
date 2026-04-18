/**
 * 简单的前端HTTP服务器
 * 用于在开发时通过HTTP协议提供前端文件
 * 解决file://协议的CORS限制
 * 
 * 启动命令：node serve-frontend.js
 * 访问地址：http://localhost:8000
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const PROXY_SERVER_URL = 'http://localhost:3000';

// MIME类型映射
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// 代理请求到后端服务器
function proxyToBackend(req, res) {
  console.log(`[代理] ${req.method} ${req.url} -> ${PROXY_SERVER_URL}${req.url}`);
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: 'localhost:3000'
    }
  };
  
  const proxyReq = http.request(options, (proxyRes) => {
    // 复制响应头
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // 管道传输响应数据
    proxyRes.pipe(res);
  });
  
  proxyReq.on('error', (err) => {
    console.error('代理请求错误:', err);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: '代理服务器连接失败',
      message: err.message
    }));
  });
  
  // 管道传输请求体
  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // 处理API请求 - 代理到后端服务器
  if (req.url.startsWith('/api/')) {
    proxyToBackend(req, res);
    return;
  }
  
  // 处理静态文件请求
  // 解析URL
  const parsedUrl = url.parse(req.url);
  let filePath = parsedUrl.pathname;
  
  // 默认首页
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // 构建完整文件路径
  const fullPath = path.join(__dirname, filePath);
  
  // 检查文件是否存在
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 文件不存在，返回404或重定向到首页
      if (filePath !== '/index.html') {
        // 尝试返回index.html（用于前端路由）
        const indexPath = path.join(__dirname, 'index.html');
        fs.readFile(indexPath, (err, content) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      return;
    }
    
    // 读取文件
    fs.readFile(fullPath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      
      // 设置Content-Type
      const ext = path.extname(fullPath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// 处理OPTIONS请求（预检请求）
server.on('request', (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400' // 24小时
    });
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`前端HTTP服务器运行在 http://localhost:${PORT}`);
  console.log(`代理服务器运行在 http://localhost:3000`);
  console.log('');
  console.log('📱 测试地址：');
  console.log(`   前端页面: http://localhost:${PORT}`);
  console.log(`   代理API: http://localhost:3000/api/deepseek`);
  console.log(`   健康检查: http://localhost:3000/health`);
  console.log('');
  console.log('🚀 现在可以在浏览器中访问：http://localhost:8000');
  console.log('按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭前端HTTP服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});