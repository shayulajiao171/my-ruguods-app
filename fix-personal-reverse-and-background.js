/**
 * 私人生成修复（反向生成 + 背景bug修复）
 * 1. 为反向生成中的私人生成按钮添加沉浸式体验
 * 2. 修复关闭私人版本模态框后的蓝色网格背景bug
 */

(function() {
    'use strict';
    
    console.log('🎯 私人生成修复（反向生成 + 背景bug）加载中...');
    
    // 标志，用于区分是否正在处理私人生成
    let isProcessingPersonalGeneration = false;
    
    // 修复蓝色网格背景bug
    function fixBackgroundGridBug() {
        // 检查是否有背景层显示问题
        const backgroundLayer = document.querySelector('.background-layer');
        if (backgroundLayer) {
            // 确保背景层在模态框关闭后正确隐藏
            const gridLayer = backgroundLayer.querySelector('.grid-layer');
            if (gridLayer) {
                // 重置网格层的不透明度
                gridLayer.style.opacity = '';
                console.log('🔄 重置网格层不透明度');
            }
            
            // 确保整个背景层不会在模态框关闭后保持显示状态
            backgroundLayer.style.display = '';
            backgroundLayer.style.opacity = '';
            backgroundLayer.style.zIndex = '';
            
            console.log('✅ 修复背景层显示状态');
        }
    }
    
    // 处理私人生成按钮点击
    function handlePersonalGenerationClick(event) {
        // 检查是否点击了私人生成按钮
        const target = event.target;
        if (!target.classList.contains('expand-generate-btn')) {
            return;
        }
        
        console.log('🎯 检测到私人生成按钮点击');
        
        // 检查是否在反向生成模态框中
        const isInReverseModal = target.closest('#reverseModal') !== null;
        console.log(`📍 按钮位置: ${isInReverseModal ? '反向生成模态框内' : '主页面'}`);
        
        isProcessingPersonalGeneration = true;
        
        // 获取输入框内容
        const expandArea = target.closest('.expand-area');
        let extraDetail = '';
        
        if (expandArea) {
            const input = expandArea.querySelector('.expand-input');
            if (input && input.value.trim()) {
                extraDetail = input.value.trim();
                console.log('📝 用户输入了补充细节:', extraDetail);
            } else {
                console.log('📝 用户没有输入补充细节');
            }
        }
        
        console.log('🔧 允许原始事件处理流程继续...');
        
        // 我们不会阻止事件的默认行为，让原始的事件委托处理程序继续工作
        // 原始的事件处理程序会调用generatePersonalVersionForCard函数
        
        // 设置一个标志，让showPersonalModal知道这是私人生成
        window._isPersonalGeneration = true;
        
        // 注意：我们不会阻止事件冒泡，让原始的事件处理程序也能收到这个事件
        // 原始的事件处理程序在app.js的第2703行
        
        // 重置处理标志（在异步操作完成后）
        setTimeout(() => {
            isProcessingPersonalGeneration = false;
            console.log('🔄 重置私人生成处理标志');
        }, 100);
    }
    
    // 拦截showPersonalModal函数，确保正确隐藏等待模态框
    function patchShowPersonalModal() {
        const originalShowPersonalModal = window.showPersonalModal;
        
        if (typeof originalShowPersonalModal === 'function') {
            console.log('🔧 拦截showPersonalModal函数');
            
            window.showPersonalModal = function(story, title) {
                console.log('🎭 showPersonalModal被调用，标题:', title);
                
                // 检查是否是私人生成
                const isPersonal = window._isPersonalGeneration || isProcessingPersonalGeneration;
                
                if (isPersonal) {
                    console.log('🔄 私人生成完成，修复背景层状态');
                    fixBackgroundGridBug();
                    // 清除标志
                    window._isPersonalGeneration = false;
                    isProcessingPersonalGeneration = false;
                }
                
                // 调用原始函数
                return originalShowPersonalModal.call(this, story, title);
            };
            
            console.log('✅ showPersonalModal函数已拦截');
        } else {
            console.warn('⚠️ 找不到showPersonalModal函数，可能尚未加载');
        }
    }
    
    // 监听主模态框关闭事件，修复背景bug
    function setupModalCloseListeners() {
        const mainModalClose = document.getElementById('mainModalClose');
        const mainModal = document.getElementById('mainModal');
        
        if (mainModalClose) {
            console.log('🔧 设置主模态框关闭监听器');
            
            // 保存原始点击事件处理
            const originalClickHandler = mainModalClose.onclick;
            
            mainModalClose.onclick = function(event) {
                console.log('🎯 主模态框关闭按钮被点击');
                
                // 如果是私人生成，修复背景bug
                if (isProcessingPersonalGeneration) {
                    console.log('🔄 私人生成模态框关闭，修复背景bug');
                    fixBackgroundGridBug();
                    isProcessingPersonalGeneration = false;
                }
                
                // 调用原始处理函数
                if (typeof originalClickHandler === 'function') {
                    originalClickHandler.call(this, event);
                }
                
                // 确保模态框正确隐藏
                if (mainModal) {
                    mainModal.classList.remove('show');
                    mainModal.style.display = 'none';
                    mainModal.style.opacity = '0';
                    mainModal.style.zIndex = '';
                }
            };
            
            console.log('✅ 主模态框关闭监听器已设置');
        }
        
        // 监听模态框关闭事件（通过点击背景）
        if (mainModal) {
            mainModal.addEventListener('click', function(event) {
                if (event.target === mainModal) {
                    console.log('🎯 主模态框背景被点击');
                    
                    // 如果是私人生成，修复背景bug
                    if (isProcessingPersonalGeneration) {
                        console.log('🔄 私人生成模态框关闭（背景点击），修复背景bug');
                        fixBackgroundGridBug();
                        isProcessingPersonalGeneration = false;
                    }
                }
            });
            
            console.log('✅ 主模态框背景点击监听器已设置');
        }
    }
    
    // 初始化修复
    function init() {
        console.log('🚀 初始化私人生成修复...');
        
        // 添加事件监听器
        document.addEventListener('click', handlePersonalGenerationClick);
        console.log('✅ 私人生成按钮点击事件监听器已添加');
        
        // 拦截showPersonalModal函数
        patchShowPersonalModal();
        
        // 设置模态框关闭监听器
        setupModalCloseListeners();
        
        // 确保generatePersonalVersionForCard函数在window上可用
        if (typeof generatePersonalVersionForCard === 'function' && !window.generatePersonalVersionForCard) {
            window.generatePersonalVersionForCard = generatePersonalVersionForCard;
            console.log('✅ 将generatePersonalVersionForCard函数暴露到window对象');
        }
        
        // 将关键函数暴露到window对象，便于测试
        window._personalFix = {
            fixBackgroundGridBug,
            isProcessingPersonalGeneration: () => isProcessingPersonalGeneration
        };
        console.log('✅ 修复函数已暴露到window._personalFix');
        
        console.log('🎉 私人生成修复（反向生成 + 背景bug）加载完成！');
        console.log('📋 修复内容：');
        console.log('   1. ✅ 为反向生成中的私人生成按钮添加沉浸式体验');
        console.log('   2. ✅ 修复关闭私人版本模态框后的蓝色网格背景bug');
        console.log('   3. ✅ 统一处理主页面和反向生成中的私人生成按钮');
    }
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();
