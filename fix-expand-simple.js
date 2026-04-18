/**
 * 纸短情长优化（极简安全版）
 * 只修复展开功能，不修改其他任何内容
 */

(function() {
    'use strict';
    
    console.log('📄 纸短情长优化加载（极简安全版）');
    
    // 等待页面加载
    window.addEventListener('load', function() {
        console.log('✅ 页面加载完成，启动纸短情长优化');
        setupExpandOptimization();
    });
    
    function setupExpandOptimization() {
        console.log('🔧 设置纸短情长优化');
        
        // 监听所有展开按钮点击
        document.addEventListener('click', function(e) {
            // 检查是否是展开按钮
            if (e.target.classList.contains('card-expand-btn') || 
                e.target.closest('.card-expand-btn')) {
                
                console.log('📖 纸短情长按钮被点击');
                
                // 找到对应的故事卡片
                const card = e.target.closest('.story-card, .reverse-story-card, .parallel-card');
                if (!card) return;

                // 模态框里的“纸短情长”由 app.js 负责展示输入区。
                // 这里不再额外展开正文或滚动，避免移动端出现模态框外内容露出。
                if (card.closest('.reverse-modal')) {
                    return;
                }
                
                // 找到故事正文
                const storyBody = card.querySelector('.story-body');
                if (!storyBody) return;
                
                // 切换展开状态
                toggleExpandStory(storyBody, card);
            }
        });
    }
    
    function toggleExpandStory(storyBody, card) {
        const isExpanded = storyBody.classList.contains('expanded');
        
        if (isExpanded) {
            // 收起
            storyBody.classList.remove('expanded');
            storyBody.style.maxHeight = '';
            storyBody.style.overflow = '';
            console.log('📕 故事已收起');
        } else {
            // 展开
            storyBody.classList.add('expanded');
            storyBody.style.maxHeight = 'none';
            storyBody.style.overflow = 'visible';
            console.log('📗 故事已展开');
            
            // 滚动到故事位置
            setTimeout(function() {
                storyBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        
        // 更新按钮文本
        const expandBtn = card.querySelector('.card-expand-btn');
        if (expandBtn) {
            expandBtn.textContent = isExpanded ? '纸短情长' : '收起故事';
        }
    }
    
    // 立即开始设置
    setTimeout(setupExpandOptimization, 100);
    
})();
