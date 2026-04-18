/**
 * 年份选择器修复
 * 确保年份元素被正确生成
 */

(function() {
    'use strict';
    
    console.log('🔧 年份选择器修复加载');
    
    // 等待页面加载
    window.addEventListener('load', function() {
        console.log('✅ 页面加载完成，启动年份选择器修复');
        fixYearSelector();
    });
    
    function fixYearSelector() {
        console.log('🔄 修复年份选择器');
        
        // 找到年份选择器容器
        const yearSelector = document.getElementById('yearSelector');
        if (!yearSelector) {
            console.error('❌ 未找到年份选择器容器');
            return;
        }
        
        // 检查是否已有年份元素
        const existingYearItems = yearSelector.querySelectorAll('.year-item');
        if (existingYearItems.length > 0) {
            console.log(`✅ 已有 ${existingYearItems.length} 个年份元素，无需修复`);
            return;
        }
        
        console.log('⚠️ 年份元素不存在，开始生成...');
        
        // 年份范围
        const startYear = 1950;
        const endYear = 2020;
        
        // 清空年份选择器
        yearSelector.innerHTML = '';
        
        // 添加年份选项
        for (let year = startYear; year <= endYear; year++) {
            const yearItem = document.createElement('div');
            yearItem.className = 'year-item';
            yearItem.dataset.year = year;
            yearItem.textContent = year + '年';
            
            // 默认选中2000年
            if (year === 2000) {
                yearItem.classList.add('selected');
            }
            
            // 点击选择年份
            yearItem.addEventListener('click', function() {
                // 移除所有年份的选中状态
                document.querySelectorAll('.year-item').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // 添加当前年份的选中状态
                this.classList.add('selected');
                
                console.log(`✅ 选中年份: ${year}年`);
            });
            
            yearSelector.appendChild(yearItem);
        }
        
        console.log(`✅ 已生成 ${endYear - startYear + 1} 个年份元素`);
        
        // 调用原有的初始化函数
        if (typeof initYearSelector === 'function') {
            console.log('🔄 调用原有的initYearSelector函数');
            setTimeout(initYearSelector, 100);
        }
        
        // 调用滑动优化
        if (typeof optimizeYearScroll === 'function') {
            console.log('🔄 调用滑动优化函数');
            setTimeout(optimizeYearScroll, 200);
        }
    }
    
    // 立即开始修复
    setTimeout(fixYearSelector, 100);
    
})();