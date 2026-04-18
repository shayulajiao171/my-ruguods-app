#!/bin/bash

# 如果当时 - 版本7.0 启动脚本
# 私人生成修复版

echo "========================================"
echo "  如果当时 - 版本7.0 (私人生成修复版)"
echo "========================================"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js未安装"
    echo "请先安装Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"

# 检查端口占用
check_port() {
    if lsof -i :$1 > /dev/null 2>&1; then
        echo "⚠️  端口 $1 已被占用"
        return 1
    fi
    return 0
}

# 检查必要文件
if [ ! -f "proxy.js" ]; then
    echo "❌ 错误: proxy.js文件不存在"
    exit 1
fi

if [ ! -f "serve-frontend.js" ]; then
    echo "❌ 错误: serve-frontend.js文件不存在"
    exit 1
fi

echo ""
echo "1. 启动API代理服务器 (端口3000)..."
if check_port 3000; then
    node proxy.js &
    PROXY_PID=$!
    echo "   ✅ 代理服务器已启动 (PID: $PROXY_PID)"
    echo "   📝 日志输出到: proxy.log"
else
    echo "   ⚠️  代理服务器端口被占用，尝试使用现有服务"
fi

echo ""
echo "2. 启动前端服务器 (端口8000)..."
if check_port 8000; then
    node serve-frontend.js &
    FRONTEND_PID=$!
    echo "   ✅ 前端服务器已启动 (PID: $FRONTEND_PID)"
else
    echo "   ❌ 前端服务器端口被占用，无法启动"
    if [ -n "$PROXY_PID" ]; then
        kill $PROXY_PID 2>/dev/null
    fi
    exit 1
fi

echo ""
echo "========================================"
echo "✅ 服务器启动完成！"
echo ""
echo "访问地址: http://localhost:8000"
echo ""
echo "修复内容:"
echo "  • 反向生成中的私人生成按钮沉浸式体验 ✅"
echo "  • 修复关闭私人版本模态框的蓝色网格背景bug ✅"
echo "  • 统一处理主页面和反向生成中的私人生成按钮 ✅"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "========================================"

# 等待用户中断
wait
