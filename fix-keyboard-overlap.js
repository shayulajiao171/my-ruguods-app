/**
 * 修复键盘遮挡输入框问题
 * 解决移动端键盘弹出时输入框被遮挡的问题
 */
(function() {
    'use strict';
    
    console.log('⌨️ 键盘遮挡修复加载中...');
    
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKeyboardFix);
    } else {
        initKeyboardFix();
    }
    
    function initKeyboardFix() {
        console.log('🔧 初始化键盘遮挡修复');
        
        // 1. 修复展开区域输入框的键盘遮挡问题
        fixExpandInputKeyboard();
        
        // 2. 修复模态框内输入框的键盘遮挡问题
        fixModalInputKeyboard();
        
        // 3. 监听窗口大小变化（键盘弹出/收起时）
        window.addEventListener('resize', handleWindowResize);
        
        console.log('✅ 键盘遮挡修复初始化完成');
    }
    
    /**
     * 修复展开区域输入框的键盘遮挡问题
     */
    function fixExpandInputKeyboard() {
        console.log('🔧 修复展开区域输入框键盘遮挡');
        
        // 监听所有展开按钮的点击
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            // 检查是否是纸短情长按钮
            if (target && (target.classList.contains('card-expand-btn') || 
                          target.classList.contains('expand-link') ||
                          (target.tagName === 'BUTTON' && target.textContent.includes('纸短情长')))) {
                
                console.log('📖 纸短情长按钮被点击，准备修复输入框键盘遮挡');
                
                // 延迟执行，等待展开区域创建完成
                setTimeout(() => {
                    const expandArea = document.querySelector('.expand-area.show');
                    if (expandArea) {
                        const input = expandArea.querySelector('.expand-input');
                        if (input) {
                            setupInputKeyboardFix(input, expandArea);
                        }
                    }
                }, 350); // 等待展开区域动画完成
            }
        });
        
        // 监听输入框聚焦事件
        document.addEventListener('focusin', function(e) {
            const target = e.target;
            if (target && target.classList.contains('expand-input')) {
                console.log('🎯 展开区域输入框获得焦点');
                setupInputKeyboardFix(target, target.closest('.expand-area'));
            }
        });
    }
    
    /**
     * 修复模态框内输入框的键盘遮挡问题
     */
    function fixModalInputKeyboard() {
        console.log('🔧 修复模态框内输入框键盘遮挡');
        
        // 监听模态框显示事件
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const modal = mutation.target;
                    if (modal.classList.contains('show') && 
                        (modal.id === 'mainModal' || modal.id === 'reverseModal' || modal.id === 'privateModal')) {
                        
                        console.log('🎯 模态框显示，检查输入框');
                        
                        // 查找模态框内的输入框
                        const inputs = modal.querySelectorAll('input[type="text"], textarea, .expand-input');
                        inputs.forEach(input => {
                            setupInputKeyboardFix(input, modal);
                        });
                    }
                }
            });
        });
        
        // 观察所有模态框
        const modals = ['mainModal', 'reverseModal', 'privateModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                observer.observe(modal, { attributes: true });
            }
        });
    }
    
    /**
     * 为输入框设置键盘遮挡修复
     * @param {HTMLElement} input - 输入框元素
     * @param {HTMLElement} container - 容器元素
     */
    function setupInputKeyboardFix(input, container) {
        if (!input || !container) return;
        
        console.log('🔧 设置输入框键盘遮挡修复:', input.className);
        
        // 保存原始样式
        const originalContainerStyle = container.style.cssText;
        
        // 添加键盘弹出时的处理
        input.addEventListener('focus', function() {
            console.log('🎯 输入框获得焦点，防止键盘遮挡');
            
            // 如果是移动设备
            if (isMobileDevice()) {
                // 1. 标记键盘状态，让CSS先进入稳定布局，避免先顶到按钮再复位。
                const modal = container.closest('.modal, .reverse-modal');
                if (modal) {
                    modal.classList.add('keyboard-open');
                }
                
                // 2. 滚动输入框到可视区域
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest',
                        inline: 'nearest'
                    });
                    
                    // 3. 如果输入框在模态框内，确保模态框在键盘上方
                    if (modal) {
                        modal.style.position = 'fixed';
                        modal.style.top = '0';
                        modal.style.left = '0';
                        modal.style.width = '100%';
                        modal.style.height = '100%';
                        modal.style.overflow = 'auto';
                        modal.style.zIndex = '2147483647';
                    }
                }, 100);
            }
        });
        
        // 添加键盘收起时的处理
        input.addEventListener('blur', function() {
            console.log('🎯 输入框失去焦点，恢复样式');
            
            // 恢复容器样式
            if (originalContainerStyle) {
                container.style.cssText = originalContainerStyle;
            } else {
                container.style.cssText = '';
            }
            
            // 如果输入框在模态框内，恢复模态框样式
            const modal = container.closest('.modal, .reverse-modal');
            if (modal) {
                modal.classList.remove('keyboard-open');
                modal.style.position = '';
                modal.style.top = '';
                modal.style.left = '';
                modal.style.width = '';
                modal.style.height = '';
                modal.style.overflow = '';
                modal.style.zIndex = '';
                setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                }, 120);
            }
        });
        
        // 添加触摸事件处理（移动端）
        input.addEventListener('touchstart', function() {
            console.log('👆 触摸输入框，准备处理键盘');
            
            // 如果是移动设备，提前处理
            if (isMobileDevice()) {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    }
    
    /**
     * 处理窗口大小变化（键盘弹出/收起时）
     */
    function handleWindowResize() {
        console.log('🔄 窗口大小变化，检查键盘状态');
        
        // 检查是否有输入框处于焦点状态
        const activeInput = document.activeElement;
        if (activeInput && (activeInput.tagName === 'INPUT' || 
                           activeInput.tagName === 'TEXTAREA' ||
                           activeInput.classList.contains('expand-input'))) {
            
            console.log('🎯 有输入框处于焦点状态，确保可见');
            
            // 如果是移动设备
            if (isMobileDevice()) {
                // 延迟执行，等待键盘动画完成
                setTimeout(() => {
                    activeInput.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center'
                    });
                }, 200);
            }
        }
    }
    
    /**
     * 检查是否是移动设备
     * @returns {boolean} 是否是移动设备
     */
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }
    
    /**
     * 添加CSS样式，防止键盘遮挡
     */
    function addKeyboardFixStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 移动端键盘遮挡修复 */
            @media (max-width: 768px) {
                /* 确保输入框在键盘上方 */
                .expand-area.show {
                    position: relative;
                    z-index: 1000;
                }
                
                /* 输入框获得焦点时，确保在可视区域 */
                .expand-input:focus {
                    position: relative;
                    z-index: 1001;
                }
                
                /* 模态框内的输入框 */
                .modal.show .expand-input:focus,
                .reverse-modal.show .expand-input:focus {
                    transform: none !important;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                
                /* 键盘弹出时，调整模态框位置 */
                .modal.show.keyboard-open,
                .reverse-modal.show.keyboard-open {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    overflow-y: auto !important;
                }
                
                /* 输入框容器 */
                .expand-content {
                    position: relative;
                }
            }
            
            /* 防止iOS Safari缩放 */
            @supports (-webkit-touch-callout: none) {
                .expand-input {
                    font-size: 16px; /* 防止iOS缩放 */
                }
            }
        `;
        document.head.appendChild(style);
        console.log('🎨 添加键盘遮挡修复CSS样式');
    }
    
    // 添加CSS样式
    addKeyboardFixStyles();
    
    console.log('✅ 键盘遮挡修复加载完成');
})();
