/**
 * 反向生成模态框沉浸式修复
 * 让反向生成与主生成/私人生成共享相同的视觉与操作逻辑
 */

(function() {
    'use strict';

    console.log('🎯 反向生成模态框沉浸式修复加载中...');

    let reverseViewport = null;
    let reverseModalOriginalParent = null;
    let isReverseModalImmersiveActive = false;

    function lockPageScroll() {
        const body = document.body;
        const html = document.documentElement;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        body.dataset.reverseModalScrollTop = scrollTop;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollTop}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';

        html.style.overflow = 'hidden';
    }

    function unlockPageScroll() {
        const body = document.body;
        const html = document.documentElement;

        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';

        html.style.overflow = '';

        const scrollTop = parseInt(body.dataset.reverseModalScrollTop || '0', 10);
        delete body.dataset.reverseModalScrollTop;
        if (scrollTop) {
            window.scrollTo(0, scrollTop);
        }
    }

    function hideMainInterface() {
        reverseViewport = document.getElementById('viewport-wrapper');
        if (!reverseViewport) {
            return;
        }

        reverseViewport.style.cssText = `
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
    }

    function showMainInterface() {
        if (reverseViewport) {
            reverseViewport.style.cssText = '';
        }
    }

    function moveReverseModalToBody(reverseModal) {
        if (!reverseModal) {
            return;
        }

        if (!reverseModalOriginalParent) {
            reverseModalOriginalParent = reverseModal.parentElement;
        }

        if (reverseModal.parentElement !== document.body) {
            document.body.appendChild(reverseModal);
        }
    }

    function restoreReverseModalParent(reverseModal) {
        if (reverseModal && reverseModalOriginalParent && reverseModal.parentElement !== reverseModalOriginalParent) {
            reverseModalOriginalParent.appendChild(reverseModal);
        }
    }

    function ensureReverseModalFullCoverage() {
        const reverseModal = document.getElementById('reverseModal');
        if (!reverseModal) {
            return;
        }

        moveReverseModalToBody(reverseModal);

        reverseModal.style.position = 'fixed';
        reverseModal.style.top = '0';
        reverseModal.style.left = '0';
        reverseModal.style.right = '0';
        reverseModal.style.bottom = '0';
        reverseModal.style.width = '100%';
        reverseModal.style.height = '100%';
        reverseModal.style.zIndex = '999999';
        reverseModal.style.margin = '0';
        reverseModal.style.padding = '0';

        const backdrop = reverseModal.querySelector('.reverse-modal-backdrop');
        if (backdrop) {
            backdrop.style.position = 'absolute';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.right = '0';
            backdrop.style.bottom = '0';
            backdrop.style.width = '100%';
            backdrop.style.height = '100%';
        }

        const content = reverseModal.querySelector('.reverse-modal-content');
        if (content) {
            content.style.maxHeight = 'calc(100dvh - 32px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))';
            content.style.overflowY = 'auto';
            content.style.margin = 'max(12px, env(safe-area-inset-top, 12px)) auto auto';
        }
    }

    function activateReverseModalImmersion() {
        const reverseModal = document.getElementById('reverseModal');
        if (!reverseModal) {
            return false;
        }

        if (!isReverseModalImmersiveActive) {
            lockPageScroll();
            hideMainInterface();
            ensureReverseModalFullCoverage();
            isReverseModalImmersiveActive = true;
            console.log('🎬 反向生成模态框已进入沉浸式模式');
        } else {
            ensureReverseModalFullCoverage();
        }

        reverseModal.classList.add('show');
        reverseModal.style.display = 'flex';
        reverseModal.style.opacity = '1';
        return true;
    }

    function deactivateReverseModalImmersion(hideModal = false) {
        const reverseModal = document.getElementById('reverseModal');

        if (hideModal && reverseModal) {
            reverseModal.classList.remove('show');
            reverseModal.style.display = 'none';
            reverseModal.style.opacity = '0';
            reverseModal.style.zIndex = '';
        }

        if (!isReverseModalImmersiveActive && !hideModal) {
            return;
        }

        unlockPageScroll();
        showMainInterface();

        if (reverseModal) {
            restoreReverseModalParent(reverseModal);
            if (!hideModal) {
                reverseModal.style.display = '';
                reverseModal.style.opacity = '';
                reverseModal.style.zIndex = '';
            }
        }

        isReverseModalImmersiveActive = false;
        console.log('🎬 反向生成模态框已退出沉浸式模式');
    }

    function fixReverseModalCloseLogic() {
        const reverseModal = document.getElementById('reverseModal');
        const reverseCloseBtn = document.getElementById('reverseModalClose');

        if (reverseCloseBtn && reverseModal) {
            const originalClickHandler = reverseCloseBtn.onclick;
            reverseCloseBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                reverseModal.classList.remove('show');
                deactivateReverseModalImmersion(false);
                if (typeof window.settleMobileViewportAfterModalClose === 'function') {
                    window.settleMobileViewportAfterModalClose();
                }

                setTimeout(() => {
                    reverseModal.style.display = '';
                }, 300);

                if (typeof originalClickHandler === 'function') {
                    originalClickHandler.call(this, e);
                }
            };

            const originalModalClickHandler = reverseModal.onclick;
            reverseModal.onclick = function(e) {
                if (e.target === reverseModal) {
                    e.preventDefault();
                    e.stopPropagation();

                    reverseModal.classList.remove('show');
                    deactivateReverseModalImmersion(false);
                    if (typeof window.settleMobileViewportAfterModalClose === 'function') {
                        window.settleMobileViewportAfterModalClose();
                    }

                    setTimeout(() => {
                        reverseModal.style.display = '';
                    }, 300);
                }

                if (typeof originalModalClickHandler === 'function') {
                    originalModalClickHandler.call(this, e);
                }
            };
        }
    }

    function init() {
        window._reverseModalImmersion = {
            activate: activateReverseModalImmersion,
            deactivate: deactivateReverseModalImmersion,
            isActive: () => isReverseModalImmersiveActive
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fixReverseModalCloseLogic);
        } else {
            fixReverseModalCloseLogic();
        }

        console.log('✅ 反向生成模态框沉浸式修复就绪');
    }

    init();
})();
