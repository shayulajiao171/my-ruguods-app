/**
 * 模态框沉浸式体验修复
 * 解决以下问题：
 * 1. 模态框显示时主界面仍然可见
 * 2. 模态框滚动到底部后继续滑动会切换到主界面滚动
 * 3. 模态框没有完全覆盖屏幕
 */

(function() {
    'use strict';
    
    console.log('🎯 模态框沉浸式体验修复加载中...');
    
    // 保存原始函数
    let originalShowMainModal = null;
    let mainViewport = null;
    let mainModalOriginalParent = null;
    let isMainModalImmersiveActive = false;
    
    /**
     * 锁定页面滚动
     */
    function lockPageScroll() {
        const body = document.body;
        const html = document.documentElement;
        
        // 保存当前滚动位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        body.dataset.scrollTop = scrollTop;
        
        // 锁定滚动
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollTop}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        
        html.style.overflow = 'hidden';
        
        console.log('🔒 锁定页面滚动，保存位置:', scrollTop);
    }
    
    /**
     * 解锁页面滚动
     */
    function unlockPageScroll() {
        const body = document.body;
        const html = document.documentElement;
        
        // 恢复滚动
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        
        html.style.overflow = '';
        
        // 恢复滚动位置
        const scrollTop = parseInt(body.dataset.scrollTop || '0');
        if (scrollTop) {
            window.scrollTo(0, scrollTop);
        }
        
        console.log('🔓 解锁页面滚动，恢复位置:', scrollTop);
    }
    
    /**
     * 完全隐藏主界面
     */
    function hideMainInterface() {
        mainViewport = document.getElementById('viewport-wrapper');
        if (!mainViewport) {
            return;
        }

        mainViewport.style.cssText = `
            display: block !important;
            visibility: hidden !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            width: 100% !important;
            height: auto !important;
            overflow: hidden !important;
            pointer-events: none !important;
            opacity: 0 !important;
            z-index: -1 !important;
        `;

        console.log('👁️ 隔离主界面 viewport-wrapper');
    }
    
    /**
     * 显示主界面
     */
    function showMainInterface() {
        if (mainViewport) {
            mainViewport.style.cssText = '';
            console.log('👁️ 恢复主界面 viewport-wrapper');
        }
    }

    function moveMainModalToBody(mainModal) {
        if (!mainModal) {
            return;
        }

        if (!mainModalOriginalParent) {
            mainModalOriginalParent = mainModal.parentElement;
        }

        if (mainModal.parentElement !== document.body) {
            document.body.appendChild(mainModal);
            console.log('✅ 将主生成模态框移到 body');
        }
    }

    function restoreMainModalParent(mainModal) {
        if (mainModal && mainModalOriginalParent && mainModal.parentElement !== mainModalOriginalParent) {
            mainModalOriginalParent.appendChild(mainModal);
            console.log('✅ 将主生成模态框移回原始位置');
        }
    }
    
    /**
     * 确保模态框完全覆盖屏幕
     */
    function ensureModalFullCoverage() {
        const mainModal = document.getElementById('mainModal');
        if (!mainModal) return;

        moveMainModalToBody(mainModal);
        
        // 确保模态框覆盖整个屏幕
        mainModal.style.position = 'fixed';
        mainModal.style.top = '0';
        mainModal.style.left = '0';
        mainModal.style.right = '0';
        mainModal.style.bottom = '0';
        mainModal.style.width = '100%';
        mainModal.style.height = '100%';
        mainModal.style.zIndex = '999999';
        mainModal.style.margin = '0';
        mainModal.style.padding = '0';
        
        // 确保背景层覆盖整个屏幕
        const backdrop = mainModal.querySelector('.reverse-modal-backdrop');
        if (backdrop) {
            backdrop.style.position = 'absolute';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.right = '0';
            backdrop.style.bottom = '0';
            backdrop.style.width = '100%';
            backdrop.style.height = '100%';
        }
        
        // 确保内容区域在屏幕中央且有最大高度
        const content = mainModal.querySelector('.reverse-modal-content');
        if (content) {
            content.style.maxHeight = 'calc(100dvh - 32px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))';
            content.style.overflowY = 'auto';
            content.style.margin = 'max(12px, env(safe-area-inset-top, 12px)) auto auto';
        }
        
        console.log('🛡️ 确保模态框完全覆盖屏幕');
    }

    function activateMainModalImmersion() {
        const mainModal = document.getElementById('mainModal');
        if (!mainModal) {
            return false;
        }

        if (!isMainModalImmersiveActive) {
            lockPageScroll();
            hideMainInterface();
            ensureModalFullCoverage();
            isMainModalImmersiveActive = true;
            console.log('🎬 主生成模态框已进入沉浸式模式');
        } else {
            ensureModalFullCoverage();
        }

        mainModal.classList.add('show');
        mainModal.style.display = 'flex';
        mainModal.style.opacity = '1';
        return true;
    }

    function deactivateMainModalImmersion(hideModal = false) {
        const mainModal = document.getElementById('mainModal');

        if (hideModal && mainModal) {
            mainModal.classList.remove('show');
            mainModal.style.display = 'none';
            mainModal.style.opacity = '0';
            mainModal.style.zIndex = '';
        }

        if (!isMainModalImmersiveActive && !hideModal) {
            return;
        }

        unlockPageScroll();
        showMainInterface();

        if (mainModal) {
            restoreMainModalParent(mainModal);
            if (!hideModal) {
                mainModal.style.display = '';
                mainModal.style.opacity = '';
                mainModal.style.zIndex = '';
            }
        }

        isMainModalImmersiveActive = false;
        console.log('🎬 主生成模态框已退出沉浸式模式');
    }
    
    /**
     * 修复版showMainModal
     */
    function patchShowMainModal() {
        originalShowMainModal = window.showMainModal;

        if (typeof originalShowMainModal !== 'function') {
            console.warn('⚠️ showMainModal 尚未挂到 window，稍后重试沉浸式接管');
            setTimeout(patchShowMainModal, 80);
            return;
        }

        window.showMainModal = function(storyHTML, easterEgg) {
            console.log('🔧 沉浸式修复版 showMainModal 被调用');
            
            // 1. 进入沉浸式等待/结果承载状态
            activateMainModalImmersion();
            
            // 2. 调用原始函数
            try {
                const result = originalShowMainModal.call(this, storyHTML, easterEgg);
                
                // 3. 确保模态框完全覆盖
                setTimeout(() => {
                    activateMainModalImmersion();
                }, 100);
                
                return result;
            } catch (error) {
                console.error('❌ showMainModal 执行错误:', error);
                // 出错时也尝试显示模态框
                setTimeout(() => {
                    activateMainModalImmersion();
                }, 100);
                throw error;
            }
        };
        
        console.log('✅ 已替换 showMainModal 函数为沉浸式版本');
    }
    
    /**
     * 修复模态框关闭逻辑
     */
    function fixModalCloseLogic() {
        const mainModal = document.getElementById('mainModal');
        const mainModalClose = document.getElementById('mainModalClose');
        
        if (mainModal && mainModalClose) {
            // 保存原始点击事件处理函数
            const originalClickHandler = mainModalClose.onclick;
            
            // 替换关闭按钮事件
            mainModalClose.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🚪 关闭模态框（沉浸式修复版）');
                
                // 1. 移除show类
                mainModal.classList.remove('show');
                
                // 2. 退出沉浸式模式
                deactivateMainModalImmersion(false);
                if (typeof window.settleMobileViewportAfterModalClose === 'function') {
                    window.settleMobileViewportAfterModalClose();
                }
                
                // 4. 重置模态框样式
                setTimeout(() => {
                    mainModal.style.display = '';
                }, 300); // 等待CSS过渡完成
                
                // 调用原始处理函数（如果有）
                if (typeof originalClickHandler === 'function') {
                    originalClickHandler.call(this, e);
                }
            };
            
            // 修复背景点击关闭
            const originalModalClickHandler = mainModal.onclick;
            mainModal.onclick = function(e) {
                if (e.target === mainModal) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🚪 点击背景关闭模态框（沉浸式修复版）');
                    
                    // 1. 移除show类
                    mainModal.classList.remove('show');
                    
                    // 2. 退出沉浸式模式
                    deactivateMainModalImmersion(false);
                    if (typeof window.settleMobileViewportAfterModalClose === 'function') {
                        window.settleMobileViewportAfterModalClose();
                    }
                    
                    // 4. 重置模态框样式
                    setTimeout(() => {
                        mainModal.style.display = '';
                    }, 300);
                }
                
                // 调用原始处理函数（如果有）
                if (typeof originalModalClickHandler === 'function') {
                    originalModalClickHandler.call(this, e);
                }
            };
            
            console.log('✅ 修复模态框关闭逻辑');
        }
    }
    
    /**
     * 添加测试函数
     */
    function addTestFunctions() {
        window.testModalImmersion = function() {
            console.log('🧪 测试模态框沉浸式体验');
            
            // 模拟显示模态框
            activateMainModalImmersion();
            
            const mainModal = document.getElementById('mainModal');
            if (mainModal) {
                // 添加测试内容
                const content = mainModal.querySelector('.reverse-modal-content');
                if (content) {
                    content.innerHTML = '<div style="padding: 40px; text-align: center;"><h3>🧪 沉浸式测试</h3><p>这是一个测试模态框，应该完全覆盖屏幕，主界面不可见。</p><p>尝试滚动到底部，应该不会切换到主界面滚动。</p><p>'.repeat(20) + '</p><button onclick="testCloseModal()">关闭测试</button></div>';
                }
                
                console.log('✅ 测试模态框已显示');
            }
        };
        
        window.testCloseModal = function() {
            console.log('🧪 关闭测试模态框');
            
            const mainModal = document.getElementById('mainModal');
            if (mainModal) {
                mainModal.classList.remove('show');
                deactivateMainModalImmersion(false);
                
                setTimeout(() => {
                    mainModal.style.display = '';
                    mainModal.style.opacity = '';
                }, 300);
            }
        };
        
        window.debugModalImmersion = function() {
            console.log('🔍 调试模态框沉浸式状态');
            
            const mainModal = document.getElementById('mainModal');
            const viewportWrapper = document.getElementById('viewport-wrapper');
            const body = document.body;
            
            console.log('=== 当前状态 ===');
            console.log('1. 主模态框:');
            if (mainModal) {
                console.log('  存在: ✅');
                console.log('  show类:', mainModal.classList.contains('show'));
                const style = window.getComputedStyle(mainModal);
                console.log('  display:', style.display);
                console.log('  position:', style.position);
                console.log('  z-index:', style.zIndex);
            } else {
                console.log('  存在: ❌');
            }
            
            console.log('\n2. 主界面容器:');
            if (viewportWrapper) {
                const style = window.getComputedStyle(viewportWrapper);
                console.log('  display:', style.display);
                console.log('  visibility:', style.visibility);
                console.log('  opacity:', style.opacity);
            }
            
            console.log('\n3. 页面滚动:');
            console.log('  body overflow:', body.style.overflow);
            console.log('  body position:', body.style.position);
            console.log('  滚动位置:', window.scrollY);
        };
        
        console.log('✅ 添加测试函数: testModalImmersion(), testCloseModal(), debugModalImmersion()');
    }
    
    /**
     * 初始化
     */
    function init() {
        console.log('🚀 模态框沉浸式体验修复初始化');

        window._mainModalImmersion = {
            activate: activateMainModalImmersion,
            deactivate: deactivateMainModalImmersion,
            isActive: () => isMainModalImmersiveActive
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                patchShowMainModal();
                fixModalCloseLogic();
                addTestFunctions();
            });
        } else {
            patchShowMainModal();
            fixModalCloseLogic();
            addTestFunctions();
        }
        
        console.log('✅ 模态框沉浸式体验修复就绪');
        console.log('📝 解决的问题:');
        console.log('  1. 模态框显示时主界面仍然可见');
        console.log('  2. 模态框滚动到底部后继续滑动会切换到主界面滚动');
        console.log('  3. 模态框没有完全覆盖屏幕');
        console.log('🎯 目标: 真正的沉浸式模态框体验');
    }
    
    // 启动
    init();
    
})();
