# 如果当时 - 公网部署包

这个目录是可以上传到公网服务器的独立副本，不包含历史备份目录。

## 推荐部署方式

使用支持 Node.js 的平台，例如 Render、Railway、Fly.io、VPS、宝塔 Node 项目等。

启动命令：

```bash
npm install
npm start
```

必须配置环境变量：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API Key
```

可选环境变量：

```bash
PORT=3000
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=30
```

## 入口文件

- `server.js`：公网推荐入口。它同时负责静态页面和 `/api/deepseek` 代理。
- `index.html`：前端页面。
- `app.js`、`style.css`、`fix-*.js`：前端运行所需资源。

## 重要安全说明

不要把 API Key 写进前端文件，也不要把 API Key 提交到公开仓库。

本部署包里的 `app.js` 已改为请求同域接口：

```text
/api/deepseek
```

`server.js` 会在服务器端读取 `DEEPSEEK_API_KEY` 并转发请求。

## 本地验证公网包

```bash
cd public-deploy-20260418-184305
npm install
DEEPSEEK_API_KEY=你的key npm start
```

然后访问：

```text
http://localhost:3000
```
