
        // 检查html2canvas是否加载
        console.log('页面加载，检查html2canvas...');
        if (typeof html2canvas === 'undefined') {
            console.error('❌ html2canvas未加载，分享功能将不可用');
            // 可以在这里显示一个提示
        } else {
            console.log('✅ html2canvas已加载，版本:', html2canvas.version || '未知');
        }
        
        // 等待动画随机文案库
        const loadingTexts = {
            // 第一阶段（翻阅档案）
            stage1: [
                '正在尘埃里找你的名字。',
                '翻开那一年，某页折了角。',
                '听见你出生那年的蝉鸣了吗。',
                '档案室很暗，但你的那格有光。'
            ],
            // 第二阶段（分岔路口）
            stage2: [
                '路在这里分岔，你站在那年。',
                '有一扇门，轻轻合上了。',
                '另一个你，从这里转弯。',
                '雾散开了一点。'
            ],
            // 第三阶段（那边的你）
            stage3: [
                '那边的你，正端起一杯凉掉的茶。',
                '他手指停在键盘上，想了想。',
                '她刚关掉灯，窗外有鸟经过。',
                '晨光正爬上那边的窗台。'
            ]
        };
        
        // 随机选择文案函数
        function getRandomLoadingText(stage) {
            const texts = loadingTexts[stage];
            if (!texts || texts.length === 0) return '';
            const randomIndex = Math.floor(Math.random() * texts.length);
            return texts[randomIndex];
        }
        
        // DeepSeek API配置
        // 注意：API Key现在通过后端代理服务器保护，不暴露在前端
        // 重要：必须通过HTTP服务器访问（如http://localhost:8000）
        // file://协议由于浏览器安全限制无法访问API
        
        // 检查当前访问协议

/* ======================================== */
/* API配置和工具函数 */
/* ======================================== */
/* API配置、协议检查和工具函数 */


/**
 * checkAccessProtocol
 *
 * @returns {Promise|void}
 */
        function checkAccessProtocol() {
          if (window.location.protocol === 'file:') {
            // 显示错误提示，引导用户使用HTTP服务器
            showProtocolError();
            return false;
          }
          return true;
        }
        
        // 显示协议错误提示

/* ======================================== */
/* 彩蛋和特殊功能 */
/* ======================================== */
/* 彩蛋处理、错误提示和特殊功能 */


/**
 * showProtocolError
 *
 * @returns {Promise|void}
 */
        function showProtocolError() {
          // 创建错误模态框
          const errorHtml = `
            <div class="modal-overlay" style="
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0,0,0,0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            ">
              <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              ">
                <h2 style="color: #e74c3c; margin-bottom: 20px;">⚠️ 访问方式错误</h2>
                <p style="margin-bottom: 15px; line-height: 1.6;">
                  检测到您正在通过<strong>文件协议(file://)</strong>访问本页面。
                </p>
                <p style="margin-bottom: 25px; line-height: 1.6; color: #666;">
                  由于浏览器安全限制，文件协议无法访问API服务。<br>
                  请使用HTTP服务器访问本应用。
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: left;">
                  <h4 style="margin-top: 0; color: #2c3e50;">🚀 正确的访问方式：</h4>
                  <ol style="margin: 10px 0; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                      <strong>使用启动脚本</strong><br>
                      <code style="background: #eee; padding: 2px 6px; border-radius: 4px;">./start-dev.sh</code>
                      然后选择选项4
                    </li>
                    <li style="margin-bottom: 10px;">
                      <strong>手动启动</strong><br>
                      在终端中运行：
                      <div style="background: #2c3e50; color: white; padding: 10px; border-radius: 6px; margin-top: 5px; font-family: monospace; font-size: 14px;">
                        cd "/Users/shayulajiao/Desktop/工作区/当前项目/如果当时"<br>
                        npm start &<br>
                        node serve-frontend.js
                      </div>
                    </li>
                    <li>
                      <strong>访问地址</strong><br>
                      然后在浏览器中访问：<br>
                      <a href="http://localhost:8000" style="color: #3498db; text-decoration: none;">
                        http://localhost:8000
                      </a>
                    </li>
                  </ol>
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                  <button onclick="window.location.href='http://localhost:8000'" style="
                    padding: 12px 24px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                  ">
                    前往 http://localhost:8000
                  </button>
                  <button onclick="document.querySelector('.modal-overlay').remove()" style="
                    padding: 12px 24px;
                    background: #95a5a6;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                  ">
                    暂时忽略
                  </button>
                </div>
              </div>
            </div>
          `;
          
          // 添加到页面
          document.body.insertAdjacentHTML('beforeend', errorHtml);
          
          // 阻止所有交互
          document.body.style.overflow = 'hidden';
        }
        
        // 获取API URL（仅限HTTP/HTTPS协议）

/**
 * getProxyApiUrl
 *
 * @returns {Promise|void}
 */
        function getProxyApiUrl() {
          // 只允许HTTP/HTTPS协议
          if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            const currentHost = window.location.hostname;
            
            // 本地前端预览仍然走独立代理，方便手机连电脑调试。
            if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
              return 'http://localhost:3000/api/deepseek';
            }
            
            // 公网部署由 server.js 同源代理，不能再请求 http://域名:3000，
            // 否则 HTTPS 页面会被混合内容/CORS/端口限制拦截。
            if (window.location.protocol === 'https:') {
              return '/api/deepseek';
            }

            // 局域网手机预览通常访问电脑 IP:8000，代理仍在电脑 3000 端口。
            return 'http://' + currentHost + ':3000/api/deepseek';
          }
          
          // 如果是file://协议，应该已经被checkAccessProtocol()阻止
          console.error('不允许的访问协议:', window.location.protocol);
          throw new Error('请通过HTTP服务器访问本应用（如 http://localhost:8000）');
        }
        
        const MODEL_NAME = 'deepseek-chat';
        const APP_BUILD_VERSION = '20260518-strong-sanitize-2';
        console.log('如果当时 build:', APP_BUILD_VERSION);
        
        // 收藏管理功能
        const COLLECTION_KEY = 'parallel_universe_collections';

        function sanitizeGeneratedStory(rawStory) {
            let story = String(rawStory || '').trim();
            if (!story) return '';

            // 部分模型会把内部分析、Markdown 标题或换行符字面量带出来，先做统一兜底清洗。
            story = story
                .replace(/\r\n?/g, '\n')
                .replace(/\\n|\/n/g, '\n')
                .replace(/<think>[\s\S]*?<\/think>/gi, '')
                .replace(/```(?:text|markdown|md)?\s*([\s\S]*?)```/gi, '$1')
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/^\s*>\s?/gm, '')
                .trim();

            // 如果模型把多个小标题挤在同一段里，先强制切成行，方便后续截断。
            story = story
                .replace(/\s*(-{3,}|—{2,})\s*/g, '\n')
                .replace(/\s*(#{1,6}\s*)?(【?(?:用户画像与选择推演|用户画像|选择后果推演|故事后果推演|后果推演|内部完成|内部分析|推理过程|思考过程|故事正文|正文|最终正文|最终输出|正式输出)】?\s*[:：]?)/gi, '\n$1$2')
                .trim();

            const outputMarkers = [
                /(?:^|\n)\s*(?:#{1,6}\s*)?【?(?:故事正文|正文|输出正文|最终正文|最终输出|正式输出|正文如下|最终故事)】?\s*[:：]?\s*/gi,
                /(?:^|\n)\s*(?:#{1,6}\s*)?(?:下面是|以下是)?(?:故事正文|正文|输出正文|最终正文|最终输出|正式输出|正文如下|最终故事)\s*[:：]\s*/gi
            ];

            outputMarkers.forEach((marker) => {
                let match;
                let lastMatch = null;
                marker.lastIndex = 0;
                while ((match = marker.exec(story)) !== null) {
                    lastMatch = match;
                }
                if (lastMatch) {
                    const candidate = story.slice(lastMatch.index + lastMatch[0].length).trim();
                    if (candidate.length >= 20) {
                        story = candidate;
                    }
                }
            });

            // 没有明确“正文”标题时，从最后一个内部分析痕迹后，寻找第一个像故事开头的句子。
            const internalTerms = [
                '心里完成',
                '不输出',
                '用户画像与选择推演',
                '用户画像',
                '选择后果',
                '后果推演',
                '推理过程',
                '思考过程',
                '内部分析',
                '关键选择会改变',
                '写作优先级'
            ];
            const lastInternalIndex = internalTerms.reduce((latest, term) => {
                const index = story.lastIndexOf(term);
                return index > latest ? index : latest;
            }, -1);
            if (lastInternalIndex >= 0) {
                const afterInternal = story.slice(lastInternalIndex);
                const narrativeMatch = afterInternal.match(/(?:^|[。！？\n：:])\s*((?:你|他|她)(?:在|把|正|刚|又|已经|坐|站|走|回|推开|关掉|打开|拿起|盯着|看见|听见|穿过|拎着|收到|醒来|下意识|终于)[\s\S]*)/);
                if (narrativeMatch && narrativeMatch[1] && narrativeMatch[1].trim().length >= 20) {
                    story = narrativeMatch[1].trim();
                }
            }

            const blockedLinePatterns = [
                /先在心里完成/i,
                /不要输出/i,
                /内部完成/i,
                /用户画像与选择推演/i,
                /用户画像/i,
                /选择后果/i,
                /后果推演/i,
                /故事后果/i,
                /推演/i,
                /思考过程/i,
                /推理过程/i,
                /内部分析/i,
                /关键选择会改变/i,
                /写作优先级/i,
                /可读性要求/i,
                /创作要求/i,
                /隐藏要求/i,
                /风格禁忌/i,
                /输出格式/i,
                /系统提示/i,
                /提示词/i,
                /作为.*模型/i,
                /^#{1,6}\s*(分析|思考|推理|内部|计划|步骤|结论|用户画像|后果推演|故事正文)/i,
                /^[\-*]\s*(先把|再判断|如果用户输入|前三句|每段都|少写|不要连续|只输出)/i
            ];

            story = story
                .split(/\n+/)
                .map(line => line.trim())
                .filter(line => line && !blockedLinePatterns.some(pattern => pattern.test(line)))
                .join('\n')
                .replace(/^(?:好的|当然|明白|以下是|下面是)[，,。\s]*/i, '')
                .replace(/^(?:#{1,6}\s*)?(?:故事正文|正文|最终输出|最终正文|正式输出|正文如下)\s*[:：]\s*/i, '')
                .replace(/^["“”'‘’\s]+|["“”'‘’\s]+$/g, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            return story;
        }

        function escapeStoryHTML(text) {
            return String(text || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function sanitizeCollectionStory(story) {
            return String(story || '')
                .replace(/<div class="card-personal-entry[\s\S]*?<\/div>/gi, '')
                .replace(/<div class="card-actions[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '</div></div>')
                .replace(/<div class="card-actions[\s\S]*?<\/div>/gi, '')
                .replace(/<button[^>]*card-action-btn[\s\S]*?<\/button>/gi, '')
                .replace(/<span[^>]*action-separator[\s\S]*?<\/span>/gi, '')
                .replace(/感觉不像你？多告诉我一些细节吧[。.]?/g, '')
                .replace(/感觉不像你？/g, '')
                .replace(/多告诉我一些细节吧[。.]?/g, '')
                .replace(/保存图片/g, '')
                .replace(/下载卡片/g, '')
                .replace(/收藏这个平行宇宙/g, '')
                .replace(/已放入抽屉/g, '')
                .replace(/纸短情长/g, '')
                .replace(/分享/g, '')
                .replace(/^[\s·•｜|、，。]+|[\s·•｜|、，。]+$/gm, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
        }

        function getStoryPartsFromActionButton(button) {
            const cardRoot = button.closest('.card-content') ||
                button.closest('.reverse-story-card') ||
                button.closest('.parallel-card') ||
                button.closest('.story-card');

            const storyElement = cardRoot ? cardRoot.querySelector('.story-body') : null;
            const endingNoteElement = cardRoot ? cardRoot.querySelector('.story-ending, .ending-note') : null;

            return {
                cardRoot,
                storyText: sanitizeCollectionStory(storyElement ? (storyElement.textContent || storyElement.innerText || '') : ''),
                endingNote: endingNoteElement ? (endingNoteElement.textContent || '') : ''
            };
        }
        
        // 获取所有收藏

        // 规范化收藏数据（确保timestamp是数字）

/**
 * normalizeCollections
 *
 * @param {any} collections
 * @returns {Promise|void}
 */
        function normalizeCollections(collections) {
            return collections.map(item => {
                // 创建一个新对象，确保所有必需字段都存在
                const normalized = {
                    story: sanitizeCollectionStory(item.story || ''),
                    endingNote: item.endingNote || '',
                    year: item.year || '2000',
                    traits: item.traits || '',
                    choice: item.choice || '',
                    timestamp: item.timestamp || Date.now(),
                    type: item.type || 'normal'
                };
                
                // 确保timestamp是数字
                if (typeof normalized.timestamp !== 'number') {
                    normalized.timestamp = Number(normalized.timestamp);
                }
                
                return normalized;
            });
        }
        
        // 保存收藏（自动规范化）

/**
 * saveCollections
 *
 * @param {any} collections
 * @returns {Promise|void}
 */
        function saveCollections(collections) {
            const normalized = normalizeCollections(collections);
            localStorage.setItem(COLLECTION_KEY, JSON.stringify(normalized));
        }
        
        // 获取收藏（自动规范化）

/**
 * getCollections
 *
 * @returns {Promise|void}
 */
        function getCollections() {
            const collectionsJson = localStorage.getItem(COLLECTION_KEY);
            if (!collectionsJson) return [];
            
            const collections = JSON.parse(collectionsJson);
            return normalizeCollections(collections);
        }

        
        // 添加收藏

/**
 * addCollection
 *
 * @param {any} storyData
 * @returns {Promise|void}
 */
        function addCollection(storyData) {
            const collections = getCollections();
            
            // 检查是否已存在相同的故事（基于时间戳和故事内容）
            const exists = collections.some(item => 
                item.story === storyData.story && 
                item.timestamp === storyData.timestamp
            );
            
            if (exists) {
                return { success: false, message: '它已经在你的抽屉里了' };
            }
            
            // 添加到收藏列表（时间倒序）
            collections.unshift(storyData);
            saveCollections(collections);
            
            return { success: true, message: '已放入抽屉' };
        }
        
        // 收藏故事（支持反向故事）

/**
 * collectStory
 *
 * @param {any} story
 * @param {any} endingNote
 * @param {any} type
 * @returns {Promise|void}
 */
        function collectStory(story, endingNote, type) {
            // 获取用户输入信息
            const selectedYearItem = document.querySelector('.year-item.selected');
            const birthYear = selectedYearItem ? selectedYearItem.dataset.year : '2000';
            const traits = document.getElementById('traits').value.trim();
            const choicePart1 = document.getElementById('choicePart1').value.trim();
            const choicePart2 = document.getElementById('choicePart2').value.trim();
            
            // 组合关键选择
            let choice = '';
            if (choicePart1 && choicePart2) {
                choice = `如果当时，我没有${choicePart1}，而是${choicePart2}`;
            } else if (choicePart1) {
                choice = `如果当时，我没有${choicePart1}`;
            } else if (choicePart2) {
                choice = `如果当时，我选择了${choicePart2}`;
            }
            
            // 准备收藏数据
            const collectionData = {
                story: sanitizeCollectionStory(story),
                endingNote: endingNote,
                year: birthYear,
                traits: traits,
                choice: choice,
                timestamp: Date.now(),
                type: type || 'normal' // 添加类型字段：normal, reverse, personal
            };
            
            // 添加到收藏
            const result = addCollection(collectionData);
            
            if (result.success) {
                return { success: true, message: '已放入抽屉' };
            } else {
                return { success: false, message: result.message };
            }
        }
        
        // 通过故事内容查找收藏项
        function findCollectionByStory(storyText) {
            const collections = getCollections();
            const cleanedStoryText = sanitizeCollectionStory(storyText);
            // 查找故事内容匹配的收藏项
            return collections.find(item => sanitizeCollectionStory(item.story) === cleanedStoryText);
        }

        // 删除收藏

/**
 * deleteCollection
 *
 * @param {any} timestamp
 * @returns {Promise|void}
 */
        function deleteCollection(timestamp) {
            console.log('=== deleteCollection优化版 ===');
            console.log('要删除的timestamp:', timestamp, '类型:', typeof timestamp);
            
            // 确保timestamp是数字（getCollections已经确保timestamp是数字）
            const timestampNum = typeof timestamp === 'number' ? timestamp : Number(timestamp);
            const collections = getCollections();
            console.log('删除前数量:', collections.length);
            
            // 直接过滤（item.timestamp已经是数字，无需再次转换）
            const filtered = collections.filter(item => item.timestamp !== timestampNum);
            console.log('删除后数量:', filtered.length);
            
            saveCollections(filtered);
            
            // 立即验证
            const afterDelete = getCollections();
            console.log('验证删除后数量:', afterDelete.length);
            
            if (collections.length === afterDelete.length) {
                console.log('⚠️ 警告：删除可能未生效');
            }
            
            return filtered;
        }
        
        // 渲染收藏列表

/* ======================================== */
/* 收藏馆管理系统 */
/* ======================================== */
/* 故事收藏、列表渲染和本地存储管理 */


/**
 * renderCollectionList
 *
 * @returns {Promise|void}
 */
        function renderCollectionList() {
            const collectionContent = document.getElementById('collectionContent');
            const collections = getCollections();
            
            if (collections.length === 0) {
                collectionContent.innerHTML = `
                    <div class="empty-collection">
                        <p>抽屉里空空如也</p>
                        <p class="empty-hint">生成并收藏你的第一个平行宇宙吧</p>
                    </div>
                `;
                return;
            }
            
            function extractPlainStoryText(rawStory) {
                const source = typeof rawStory === 'string' ? rawStory : '';
                const withoutTags = source
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<\/p>/gi, '\n')
                    .replace(/<[^>]+>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                return withoutTags;
            }

            const itemsHtml = collections.map(item => {
                // 安全检查：确保item和必需字段存在
                if (!item) {
                    console.warn('发现无效的收藏项，跳过:', item);
                    return '';
                }
                
                // 生成预览文本（前100字），带安全检查
                const storyText = extractPlainStoryText(item.story);
                const preview = storyText.length > 92 ?
                    `${storyText.substring(0, 92)}...` :
                    storyText;
                
                // 格式化时间，带安全检查
                const timestamp = item.timestamp || Date.now();
                const date = new Date(timestamp);
                const timeStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                
                // 生成副信息，带安全检查
                const year = item.year || '2000';
                const traits = item.traits || '';
                const choice = item.choice || '';
                const subInfo = `${year}年 · ${traits} · ${choice}`;
                
                return `
                    <div class="collection-item" data-timestamp="${timestamp}">
                        <button type="button" class="collection-item-open" data-timestamp="${timestamp}" aria-label="打开收藏详情" onclick="return window.openCollectionDetailFromItem && window.openCollectionDetailFromItem('${timestamp}', event)">
                            <span class="collection-item-preview">${preview || '这段平行宇宙暂时没有预览文字'}</span>
                            <span class="collection-item-meta">
                                <span class="collection-item-time">${timeStr}</span>
                            </span>
                            <span class="collection-item-subinfo">${subInfo}</span>
                        </button>
                        <button class="collection-item-delete" data-timestamp="${timestamp}" aria-label="删除收藏">×</button>
                    </div>
                `;
            }).join('');
            
            collectionContent.innerHTML = itemsHtml;
            

            let collectionTouchStartY = 0;
            let collectionTouchMoved = false;

            function closestCollectionMatch(target, selector) {
                const element = target && target.nodeType === 1 ? target : target && target.parentElement;
                return element && typeof element.closest === 'function' ? element.closest(selector) : null;
            }

            function openCollectionItemFromEvent(event) {
                const opener = closestCollectionMatch(event.target, '.collection-item-open, .collection-item');
                const item = opener ? opener.closest('.collection-item') : null;
                const deleteButton = closestCollectionMatch(event.target, '.collection-item-delete');
                if (!item || deleteButton || collectionTouchMoved) {
                    return false;
                }

                event.preventDefault();
                event.stopPropagation();
                if (typeof event.stopImmediatePropagation === 'function') {
                    event.stopImmediatePropagation();
                }

                const timestamp = item.getAttribute('data-timestamp');
                const now = Date.now();
                if (!timestamp) {
                    return true;
                }

                if (
                    collectionContent.dataset.lastOpenedTimestamp === timestamp &&
                    now - Number(collectionContent.dataset.lastOpenedAt || 0) < 400
                ) {
                    return true;
                }

                collectionContent.dataset.lastOpenedTimestamp = timestamp;
                collectionContent.dataset.lastOpenedAt = String(now);
                expandCollectionItem(timestamp);
                return true;
            }

            collectionContent.onclick = async function(event) {
                const deleteButton = closestCollectionMatch(event.target, '.collection-item-delete');
                if (deleteButton) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (typeof event.stopImmediatePropagation === 'function') {
                        event.stopImmediatePropagation();
                    }

                    const timestamp = deleteButton.getAttribute('data-timestamp');
                    if (timestamp) {
                        const confirmed = await showDeleteConfirm(timestamp);
                        if (confirmed) {
                            deleteCollection(timestamp);
                            renderCollectionList();
                        }
                    }
                    return;
                }

                openCollectionItemFromEvent(event);
            };

            collectionContent.ontouchstart = function(event) {
                const touch = event.touches && event.touches[0];
                collectionTouchStartY = touch ? touch.clientY : 0;
                collectionTouchMoved = false;
            };

            collectionContent.ontouchmove = function(event) {
                const touch = event.touches && event.touches[0];
                if (touch && Math.abs(touch.clientY - collectionTouchStartY) > 8) {
                    collectionTouchMoved = true;
                }
            };

            collectionContent.ontouchend = function() {
                window.setTimeout(() => {
                    collectionTouchMoved = false;
                }, 80);
            };
        }

        function formatCollectionStory(story) {
            const cleanedSource = sanitizeCollectionStory(story);

            if (cleanedSource.includes('<') && cleanedSource.includes('>')) {
                return cleanedSource;
            }

            const paragraphs = cleanedSource
                .split(/\n+|(?<=[。！？!?])\s+/)
                .map(text => text.trim())
                .filter(Boolean);

            if (paragraphs.length === 0) {
                return '<p>这条收藏暂时没有故事内容。</p>';
            }

            return paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
        }

        function showCollectionError(message) {
            if (typeof showSimpleToast === 'function') {
                showSimpleToast(message);
                return;
            }

            console.warn(message);
            alert(message);
        }
        
        // 展开收藏卡片（简化修复版）
        // 打开收藏详情模态框

/**
 * expandCollectionItem
 *
 * @param {any} timestamp
 * @returns {Promise|void}
 */
        function expandCollectionItem(timestamp) {
            console.log('=== 打开收藏详情模态框 ===');
            console.log('timestamp:', timestamp, '类型:', typeof timestamp);
            
            const timestampNum = typeof timestamp === 'number' ? timestamp : Number(timestamp);
            const collections = getCollections();
            const item = collections.find(item => Number(item.timestamp) === timestampNum || String(item.timestamp) === String(timestamp));
            
            if (!item) {
                console.log('未找到收藏项');
                showCollectionError('没有找到这条收藏，请刷新页面后再试。');
                return;
            }
            
            console.log('找到收藏项，准备显示模态框');
            
            try {
                const storyHtml = formatCollectionStory(item.story || '这条收藏暂时没有故事内容。');
                const contentHtml = `
                    <div class="collection-detail-story">
                        ${storyHtml}
                    </div>
                    <div class="collection-detail-ending">
                        ${item.endingNote || ''}
                    </div>
                    <div class="collection-detail-meta">
                        <div class="collection-detail-meta-item"><strong>出生年份：</strong>${item.year || '2000'}年</div>
                        <div class="collection-detail-meta-item"><strong>核心特质：</strong>${item.traits || '未记录'}</div>
                        <div class="collection-detail-meta-item"><strong>关键选择：</strong>${item.choice || '未记录'}</div>
                        <div class="collection-detail-meta-item"><strong>收藏时间：</strong>${new Date(item.timestamp || Date.now()).toLocaleString('zh-CN')}</div>
                    </div>
                `;

                const contentElement = document.getElementById('collectionDetailContent');
                const deleteBtn = document.getElementById('collectionDetailDelete');
                const overlay = document.getElementById('collectionDetailOverlay');
                const modal = document.getElementById('collectionDetailModal');

                if (!contentElement || !deleteBtn || !overlay || !modal) {
                    throw new Error('收藏详情弹窗节点缺失');
                }

                contentElement.innerHTML = contentHtml;
                deleteBtn.setAttribute('data-timestamp', String(item.timestamp || timestamp));

                if (modal.parentElement !== document.body) {
                    document.body.appendChild(overlay);
                    document.body.appendChild(modal);
                }

                overlay.classList.add('show');
                modal.classList.add('show');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';

                console.log('收藏详情模态框已显示');
            } catch (error) {
                console.error('打开收藏详情失败:', error);
                showCollectionError('收藏详情打开失败，请刷新页面后再试。');
            }
        }

        window.openCollectionDetailFromItem = function(timestamp, event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
                if (typeof event.stopImmediatePropagation === 'function') {
                    event.stopImmediatePropagation();
                }
            }

            expandCollectionItem(timestamp);
            return false;
        };
        
        // 关闭收藏详情模态框

/**
 * closeCollectionDetail
 *
 * @returns {Promise|void}
 */
        function closeCollectionDetail() {
            console.log('关闭收藏详情模态框');
            
            const overlay = document.getElementById('collectionDetailOverlay');
            const modal = document.getElementById('collectionDetailModal');
            
            overlay.classList.remove('show');
            modal.classList.remove('show');
            
            // 恢复页面滚动
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        
        // 从模态框删除收藏

/**
 * deleteFromDetailModal
 *
 * @returns {Promise|void}
 */
        async function deleteFromDetailModal() {
            const deleteBtn = document.getElementById('collectionDetailDelete');
            const timestamp = deleteBtn.getAttribute('data-timestamp');
            
            if (!timestamp) {
                console.log('未找到要删除的timestamp');
                return;
            }
            
            const confirmed = await showDeleteConfirm(timestamp);
            if (confirmed) {
                deleteCollection(timestamp);
                closeCollectionDetail();
                renderCollectionList();
                // 删除确认模态框已显示确认信息，不再显示额外提示
            }
        }
        
        // 打开收藏馆面板

/**
 * openCollectionPanel
 *
 * @returns {Promise|void}
 */
        function openCollectionPanel() {
            const overlay = document.getElementById('collectionOverlay');
            const panel = document.getElementById('collectionPanel');
            
            renderCollectionList();
            
            overlay.classList.add('show');
            panel.classList.add('show');
            
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        }
        
        // 关闭收藏馆面板

/**
 * closeCollectionPanel
 *
 * @returns {Promise|void}
 */
        function closeCollectionPanel() {
            const overlay = document.getElementById('collectionOverlay');
            const panel = document.getElementById('collectionPanel');
            
            overlay.classList.remove('show');
            panel.classList.remove('show');
            
            // 恢复页面滚动
            document.body.style.overflow = '';
        }
        

        
        // 根据年份获取对应的年代主题配置

/* ======================================== */
/* 年份选择器系统 */
/* ======================================== */
/* 年份选择、注脚显示和年代主题切换 */


/**
 * getEraTheme
 *
 * @param {any} year
 * @returns {Promise|void}
 */
        function getEraTheme(year) {
            const themes = {
                // 1950s-1959s：暖棕黄底 + 粗颗粒噪点 + 暗角 + 衬线字体 + 暗红点缀
                '1950s': {
                    bgColor: 'linear-gradient(180deg, #f4ebdb 0%, #e6d3bb 52%, #d6b99a 100%)',
                    textColor: '#5f4636',
                    accentColor: '#9d5c49',
                    fontFamily: "'STKaiti', 'KaiTi', '楷体', 'SimKai', '华文楷体', serif",
                    textShadow: '0 0 0.4px rgba(78,58,41,0.12)',
                    backdropFilter: 'none',
                    noiseOpacity: 0.22,
                    gridOpacity: 0,
                    vignetteOpacity: 0.18,
                    halftoneOpacity: 0,
                    radialOpacity: 0.08,
                    pixelOpacity: 0,
                    glassOpacity: 0,
                    // 卡片变量
                    cardBg: 'rgba(252, 247, 238, 0.18)',
                    cardBorder: 'rgba(255, 245, 232, 0.26)',
                    cardContentBg: 'rgba(255, 249, 241, 0.16)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.24)'
                },
                // 1960s-1969s：暖米色 + 半调波点纹理 + 衬线字体 + 橄榄绿点缀
                '1960s': {
                    bgColor: 'linear-gradient(180deg, #f8f1e2 0%, #e8dcc4 48%, #d4cfbf 100%)',
                    textColor: '#4f4a40',
                    accentColor: '#7c8761',
                    fontFamily: "'STKaiti', 'KaiTi', '楷体', 'SimKai', '华文楷体', serif",
                    textShadow: '0 0 0.2px rgba(61,57,51,0.08)',
                    backdropFilter: 'none',
                    noiseOpacity: 0.08,
                    gridOpacity: 0,
                    vignetteOpacity: 0.08,
                    halftoneOpacity: 0.08,
                    radialOpacity: 0.06,
                    pixelOpacity: 0,
                    glassOpacity: 0,
                    cardBg: 'rgba(251, 247, 240, 0.16)',
                    cardBorder: 'rgba(255, 251, 244, 0.24)',
                    cardContentBg: 'rgba(255, 252, 247, 0.14)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.2)'
                },
                // 1970s-1979s：橙褐底 + 放射状渐变 + 衬线字体 + 芥末黄点缀
                '1970s': {
                    bgColor: 'linear-gradient(180deg, #dbc2a0 0%, #b78f68 48%, #7f6a57 100%)',
                    textColor: '#f8f0e5',
                    accentColor: '#d1a35d',
                    fontFamily: "'STKaiti', 'KaiTi', '楷体', 'SimKai', '华文楷体', serif",
                    textShadow: '0 1px 2px rgba(51,32,18,0.16)',
                    backdropFilter: 'none',
                    noiseOpacity: 0.14,
                    gridOpacity: 0,
                    vignetteOpacity: 0.16,
                    halftoneOpacity: 0,
                    radialOpacity: 0.18,
                    pixelOpacity: 0,
                    glassOpacity: 0,
                    cardBg: 'rgba(255, 247, 235, 0.14)',
                    cardBorder: 'rgba(255, 242, 224, 0.22)',
                    cardContentBg: 'rgba(255, 248, 238, 0.12)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.18)'
                },
                // 1980s-1989s：洋红/青双色渐变 + 网格扫描线 + 打字机风格字体 + 亮蓝/粉点缀
                '1980s': {
                    bgColor: 'linear-gradient(180deg, #e6edf3 0%, #d8e2ea 48%, #c3d0d9 100%)',
                    textColor: '#30424d',
                    accentColor: '#90a7b7',
                    fontFamily: "'Courier New', Courier, monospace",
                    textShadow: '0 1px 0 rgba(255,255,255,0.18)',
                    backdropFilter: 'none',
                    noiseOpacity: 0.03,
                    gridOpacity: 0.06,
                    vignetteOpacity: 0.04,
                    halftoneOpacity: 0,
                    radialOpacity: 0.04,
                    pixelOpacity: 0,
                    glassOpacity: 0,
                    cardBg: 'rgba(248, 251, 255, 0.15)',
                    cardBorder: 'rgba(241, 247, 252, 0.24)',
                    cardContentBg: 'rgba(252, 254, 255, 0.14)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.2)'
                },
                // 1990s-1999s：暖黄底 + 中颗粒噪点（银盐感） + 宋体/仿宋（边缘微微模糊） + 湖蓝点缀
                '1990s': {
                    bgColor: 'linear-gradient(180deg, #f7ead8 0%, #ead7c2 46%, #d8c8bf 100%)',
                    textColor: '#342f2c',
                    accentColor: '#6f93b3',
                    fontFamily: "'SimSun', '宋体', 'STSong', '华文宋体', serif",
                    textShadow: '0 0 0.3px rgba(0,0,0,0.08)',
                    backdropFilter: 'none',
                    noiseOpacity: 0.16,
                    gridOpacity: 0,
                    vignetteOpacity: 0.08,
                    halftoneOpacity: 0,
                    radialOpacity: 0.06,
                    pixelOpacity: 0,
                    glassOpacity: 0,
                    // 卡片变量
                    cardBg: 'rgba(255, 249, 242, 0.16)',
                    cardBorder: 'rgba(255, 244, 232, 0.24)',
                    cardContentBg: 'rgba(255, 252, 247, 0.15)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.22)'
                },
                // 2000s-2009s：高饱和青或银灰底 + 像素网格 + 宋体清晰 + 银灰/橙点缀
                '2000s': {
                    bgColor: 'linear-gradient(180deg, #f2d2c3 0%, #d9e9dc 48%, #a9d1cf 100%)',
                    textColor: '#314b4e',
                    accentColor: '#cf6f6f',
                    fontFamily: "'SimSun', '宋体', 'STSong', '华文宋体', serif",
                    textShadow: 'none',
                    backdropFilter: 'none',
                    noiseOpacity: 0.03,
                    gridOpacity: 0,
                    vignetteOpacity: 0.04,
                    halftoneOpacity: 0,
                    radialOpacity: 0.05,
                    pixelOpacity: 0.06,
                    glassOpacity: 0,
                    cardBg: 'rgba(255, 252, 245, 0.3)',
                    cardBorder: 'rgba(255, 255, 255, 0.42)',
                    cardContentBg: 'rgba(255, 255, 250, 0.24)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.36)'
                },
                // 2010s-2020s：冷白底 + 毛玻璃效果 + 纤细无衬线字体 + 薄荷绿/浅灰点缀
                '2010s': {
                    bgColor: 'linear-gradient(180deg, #f2f4f7 0%, #e7ecef 52%, #dde3e8 100%)',
                    textColor: '#313845',
                    accentColor: '#9da8b6',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
                    textShadow: 'none',
                    backdropFilter: 'blur(10px)',
                    noiseOpacity: 0.02,
                    gridOpacity: 0,
                    vignetteOpacity: 0.03,
                    halftoneOpacity: 0,
                    radialOpacity: 0.04,
                    pixelOpacity: 0,
                    glassOpacity: 0.24,
                    // 卡片变量
                    cardBg: 'rgba(255, 255, 255, 0.14)',
                    cardBorder: 'rgba(255, 255, 255, 0.24)',
                    cardContentBg: 'rgba(255, 255, 255, 0.12)',
                    cardContentBorder: 'rgba(255, 255, 255, 0.2)'
                }
            };
            
            // 根据年份确定年代
            if (year >= 1950 && year <= 1959) return themes['1950s'];
            if (year >= 1960 && year <= 1969) return themes['1960s'];
            if (year >= 1970 && year <= 1979) return themes['1970s'];
            if (year >= 1980 && year <= 1989) return themes['1980s'];
            if (year >= 1990 && year <= 1999) return themes['1990s'];
            if (year >= 2000 && year <= 2009) return themes['2000s'];
            if (year >= 2010 && year <= 2020) return themes['2010s'];
            
            // 默认返回2000年代
            return themes['2000s'];
        }
        
        // 更新背景层样式 - 使用CSS变量

/**
 * updateBackgroundLayer
 *
 * @param {any} year
 * @returns {Promise|void}
 */
        function updateBackgroundLayer(year) {
            const theme = getEraTheme(year);
            const root = document.documentElement;
            
            // 直接更新CSS变量，通过CSS过渡实现平滑切换
            // 移除卡片透明度变化逻辑，避免闪烁
            
            // 更新CSS变量
            root.style.setProperty('--era-bg-color', theme.bgColor);
            root.style.setProperty('--era-text-color', theme.textColor);
            root.style.setProperty('--era-accent-color', theme.accentColor);
            root.style.setProperty('--era-font-family', theme.fontFamily);
            root.style.setProperty('--era-text-shadow', theme.textShadow);
            root.style.setProperty('--era-backdrop-filter', theme.backdropFilter);
            root.style.setProperty('--era-noise-opacity', theme.noiseOpacity);
            root.style.setProperty('--era-grid-opacity', theme.gridOpacity);
            root.style.setProperty('--era-vignette-opacity', theme.vignetteOpacity);
            root.style.setProperty('--era-halftone-opacity', theme.halftoneOpacity);
            root.style.setProperty('--era-radial-opacity', theme.radialOpacity);
            root.style.setProperty('--era-pixel-opacity', theme.pixelOpacity);
            root.style.setProperty('--era-glass-opacity', theme.glassOpacity);
            
            // 更新卡片CSS变量
            root.style.setProperty('--era-card-bg', theme.cardBg || '#fffef9');
            root.style.setProperty('--era-card-border', theme.cardBorder || 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--era-card-content-bg', theme.cardContentBg || 'rgba(255, 248, 235, 0.85)');
            root.style.setProperty('--era-card-content-border', theme.cardContentBorder || 'rgba(255, 255, 255, 0.6)');
        }
        
        // 页面加载完成后初始化
        
        // 简单提示函数（确保全局可用）

/**
 * showSimpleToast
 *
 * @param {any} message
 * @returns {Promise|void}
 */
        function showSimpleToast(message) {
            try {
                // 尝试使用现有的showToast
                if (typeof showToast === 'function') {
                    showToast(message);
                } else {
                    // 备用：使用alert
                    alert(message);
                }
            } catch (error) {
                // 最后备用：console.log
                console.log('提示:', message);
                alert(message);
            }
        }
        
        // 删除确认模态框函数
        let pendingDeleteTimestamp = null;
        
        /**
         * showDeleteConfirm
         *
         * @param {any} timestamp
         * @returns {Promise|void}
         */
        function showDeleteConfirm(timestamp) {
            pendingDeleteTimestamp = timestamp;
            
            const modal = document.getElementById('deleteConfirmModal');
            if (!modal) {
                console.error('删除确认模态框未找到');
                return false;
            }
            
            // 优化：在显示删除确认前，先关闭可能已打开的收藏详情模态框
            closeCollectionDetail();
            
            // 显示模态框
            modal.classList.add('show');
            
            // 返回Promise以便链式调用
            return new Promise((resolve) => {
                const handleConfirm = (confirmed) => {
                    // 清理事件监听器
                    document.getElementById('deleteConfirmOk').removeEventListener('click', okHandler);
                    document.getElementById('deleteConfirmCancel').removeEventListener('click', cancelHandler);
                    document.getElementById('deleteConfirmBackdrop').removeEventListener('click', cancelHandler);
                    
                    // 隐藏模态框
                    modal.classList.remove('show');
                    pendingDeleteTimestamp = null;
                    
                    resolve(confirmed);
                };
                
                const okHandler = () => handleConfirm(true);
                const cancelHandler = () => handleConfirm(false);
                
                // 绑定事件监听器
                document.getElementById('deleteConfirmOk').addEventListener('click', okHandler);
                document.getElementById('deleteConfirmCancel').addEventListener('click', cancelHandler);
                document.getElementById('deleteConfirmBackdrop').addEventListener('click', cancelHandler);
            });
        }
        
        // 模态框提示函数

/**
 * showModalMessage
 *
 * @param {any} message
 * @returns {Promise|void}
 */
        function showModalMessage(message) {
            try {
                // 检查是否已有模态框
                let modal = document.getElementById('simpleModal');
                
                if (!modal) {
                    // 创建模态框
                    modal = document.createElement('div');
                    modal.id = 'simpleModal';
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    
                    const modalContent = document.createElement('div');
                    modalContent.style.cssText = `
                        background-color: white;
                        padding: 24px;
                        border-radius: 12px;
                        max-width: 300px;
                        width: 80%;
                        text-align: center;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                        transform: translateY(-20px);
                        transition: transform 0.3s ease;
                    `;
                    
                    const messageEl = document.createElement('div');
                    messageEl.style.cssText = `
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 20px;
                        line-height: 1.5;
                    `;
                    
                    const closeBtn = document.createElement('button');
                    closeBtn.textContent = '知道了';
                    closeBtn.style.cssText = `
                        background-color: #0066cc;
                        color: white;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 6px;
                        font-size: 14px;
                        cursor: pointer;
                        transition: background-color 0.2s ease;
                    `;
                    
                    closeBtn.addEventListener('mouseenter', () => {
                        closeBtn.style.backgroundColor = '#0052a3';
                    });
                    
                    closeBtn.addEventListener('mouseleave', () => {
                        closeBtn.style.backgroundColor = '#0066cc';
                    });
                    
                    closeBtn.addEventListener('click', () => {
                        modal.classList.remove('show');
                        setTimeout(() => {
                            if (modal.parentNode) {
                                modal.parentNode.removeChild(modal);
                            }
                        }, 300);
                    });
                    
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.classList.remove('show');
                            setTimeout(() => {
                                if (modal.parentNode) {
                                    modal.parentNode.removeChild(modal);
                                }
                            }, 300);
                        }
                    });
                }
                
                // 更新消息
                const messageEl = modal.querySelector('div');
                if (messageEl) {
                    messageEl.textContent = message;
                }
                
                // 显示模态框
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                
                // 3秒后自动关闭
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            if (modal.parentNode) {
                                modal.parentNode.removeChild(modal);
                            }
                        }, 300);
                    }
                }, 3000);
                
            } catch (error) {
                console.log('模态框错误:', error);
                // 备用：使用alert
                alert(message);
            }
        }

        function showHeaderNoteModal() {
            const noteHtml = `
                <div style="text-align:left;font-size:15px;line-height:1.9;color:#4d4037;">
                    <p>这个作品最初只是一个念头：如果当时选了另一条路，我会在哪里，遇见谁，过着怎样的日子？</p>
                    <p>我没有答案，于是把它放在了这里。</p>
                    <p>它不会告诉你对错，也不会替你惋惜。它只是轻轻展开一页纸，让你看看那边的你——也许在北方城市的黄昏里等车，也许在南方的阳台上浇花，也许做着你想做却不敢做的事。</p>
                    <p>看完就回来吧。</p>
                    <p>那边的故事再好，也是因为你在此岸，才被照亮。</p>
                    <p style="margin-bottom:0;">最后，谢谢你来过。</p>
                </div>
            `;

            let modal = document.getElementById('headerNoteModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'headerNoteModal';
                modal.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.48);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    z-index: 10001;
                `;

                const panel = document.createElement('div');
                panel.style.cssText = `
                    width: min(92vw, 560px);
                    max-height: min(86dvh, 760px);
                    overflow-y: auto;
                    background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,246,239,0.98));
                    border-radius: 18px;
                    box-shadow: 0 24px 72px rgba(0,0,0,0.24);
                    padding: 22px 20px 18px;
                `;

                panel.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                        <div style="font-family:STKaiti,KaiTi,serif;font-size:22px;letter-spacing:3px;color:#5e4b3d;">作者寄语</div>
                        <button type="button" id="headerNoteClose" style="border:none;background:none;font-size:24px;color:#8b8178;width:32px;height:32px;cursor:pointer;">×</button>
                    </div>
                    <div id="headerNoteBody"></div>
                `;

                modal.appendChild(panel);
                document.body.appendChild(modal);

                modal.addEventListener('click', (event) => {
                    if (event.target === modal || event.target.id === 'headerNoteClose') {
                        modal.remove();
                    }
                });
            }

            const body = modal.querySelector('#headerNoteBody');
            if (body) {
                body.innerHTML = noteHtml;
            }

            document.body.appendChild(modal);
        }
        
        // 更新年份注脚（带缓出效果）

/**
 * updateYearFootnote
 *
 * @param {any} year
 * @returns {Promise|void}
 */
        function updateYearFootnote(year) {
            const footnote = document.getElementById('yearFootnote');
            if (!footnote) return;
            
            // 直接更新内容，支持实时显示
            // 使用更新后的年份注脚数据（与主对象保持一致）
            const yearFootnotes = {
                    1950: "那一年，布票换回第一匹棉布，母亲在灯下缝了很久。",
                    1951: "那一年，乡下的供销社门口，第一次排起了长队。",
                    1952: "那一年，黑板上的粉笔字写下了'好好学习'，一写就是几十年。",
                    1953: "那一年，第一部国产电影上映，幕布在晚风里鼓得像帆。",
                    1954: "那一年，第一列火车开进了西南的山坳，汽笛声惊飞了满山的麻雀。",
                    1955: "那一年，粮票刚印好，人们小心地把它夹进户口本里。",
                    1956: "那一年，广播里第一次传出'新闻联播'的前奏，家家户户拧大了音量。",
                    1957: "那一年，百货商店里的搪瓷盆印着牡丹花，新婚的人总要买一对，用了三十年也没舍得扔。",
                    1958: "那一年，钢水的温度把冬天的雪都烤化了，工人们脱下棉袄，脸上映着永不熄灭的红光。",
                    1959: "那一年，国庆十周年的烟花特别稠，父亲说他在人海里踮起脚，也没看清。",
                    1960: "那一年，榆树皮被剥得精光，孩子们不知道什么叫'吃饱'。",
                    1961: "那一年，糖和饼干是药，只有生病才能吃到。",
                    1962: "那一年，乡下的井水突然变甜了，人们说苦日子快到头了。",
                    1963: "那一年，雷锋的名字第一次出现在报纸上，老师让大家写在田字格里。",
                    1964: "那一年，第一颗原子弹爆炸的号外贴在胡同口，所有人都仰着头看。",
                    1965: "那一年，上山下乡的火车从月台缓缓开出，站台上有人哭，有人没敢回头。",
                    1966: "那一年，胡同里的蝉鸣突然安静了，很多人家关上了门。",
                    1967: "那一年，蝉在梧桐树上叫了一整个夏天，没人去打扰它们。",
                    1968: "那一年，知识青年们把课本塞进木箱，箱底压着一封没寄出的信。",
                    1969: "那一年，中苏边境的雪特别大，北方的村庄里多了很多地窖。",
                    1970: "那一年，第一颗人造卫星划过夜空，全村人仰着脖子找那颗会走的星星。",
                    1971: "那一年，乒乓外交的消息从收音机里传来，父亲说'美国人的球拍好像不太一样'。",
                    1972: "那一年，尼克松访华的纪录片在露天放映，有人第一次看见西装和领带。",
                    1973: "那一年，知青们在田埂上数着回家的日子，数了一年又一年。",
                    1974: "那一年，小人书摊前坐满了孩子，一本两分钱，能看到太阳落山。",
                    1975: "那一年，第一台黑白电视机出现在公社大院，晚上去晚了只能听声。",
                    1976: "那一年，很多人哭着送走了三个人，也送走了一个时代。",
                    1977: "那一年，恢复高考的消息传遍城乡，无数人翻出了压箱底的课本。",
                    1978: "那一年，国门推开了一条缝，风从外面吹进来，有人觉得冷，有人觉得醒了。",
                    1979: "那一年，邓丽君的歌声从短波收音机里偷渡过来，年轻人学会了'甜蜜蜜'。",
                    1980: "那一年，深圳被画了一个圈，很多年轻人开始收拾行囊。",
                    1981: "那一年，《读者文摘》创刊，许多人第一次在杂志里看到'爱情'两个字。",
                    1982: "那一年，第一代身份证的照片上，人人都把头发梳得一丝不苟。",
                    1983: "那一年，第一届春晚开播，李谷一唱了九首歌，电视机前嗑了一地瓜子壳。",
                    1984: "那一年，中国女排拿下三连冠，家属院里的黑白电视被拍得直闪雪花。",
                    1985: "那一年，长城上的外国游客比中国人还多，他们举着相机，我们举着'hello'。",
                    1986: "那一年，《西游记》开播了，很多孩子的暑假从此有了唐僧和孙悟空。",
                    1987: "那一年，北京第一次有了肯德基，门口排的队比买火车票还长。",
                    1988: "那一年，海南建省的消息让无数人卖了房子买船票，去当'闯海人'。",
                    1989: "那一年，崔健在首体吼出'一无所有'，台下有人把衣服脱了，有人把眼泪忍住了。",
                    1990: "那一年，罗大佑写了《恋曲1990》，第一次听懂了告别。",
                    1991: "那一年，第一代红罐凉茶诞生，人们还不知道它会和'怕上火'绑在一起。",
                    1992: "那一年，春天的故事从南海边开始讲，很多人辞职下了海。",
                    1993: "那一年，第一封电子邮件从北京发往德国，内容是'越过长城，走向世界'。",
                    1994: "那一年，盗版VCD里的《泰坦尼克号》模糊得看不清脸，可'你跳我就跳'还是让人红了眼。",
                    1995: "那一年，互联网的线刚牵进普通人家，拨号声像一只老猫在叫。",
                    1996: "那一年，第一家超市开业，人们推着购物车，不知道该先拿什么。",
                    1997: "那一年，香港回归的直播让无数人守着电视，米字旗落下时，窗外有人放了烟花。",
                    1998: "那一年，洪水漫过长江大堤，迷彩服在堤坝上垒起一堵墙。",
                    1999: "那一年，世纪末的烟火特别亮，相信新千年一切都会变好。",
                    2000: "那一年，跨过千禧年的夜晚，和身边的人说了'明天见'。",
                    2001: "那一年，申奥成功那夜，长安街上的车喇叭响了一整晚。",
                    2002: "那一年，第一列磁悬浮在上海跑起来，像贴地飞行。",
                    2003: "那一年，非典过去了，很多人重新学会了拥抱。",
                    2004: "那一年，淘宝刚上线，第一个买家拍下了一件二手衣服，收货时笑了很久。",
                    2005: "那一年，超级女声的决赛夜，人们用短信投出了自己的一票。",
                    2006: "那一年，世界杯的夜里，烧烤摊的电视前围满了人，啤酒瓶碰在一起的声音持续到天亮。",
                    2007: "那一年，第一代iPhone发布，还不知道手机会变成身体的一部分。",
                    2008: "那一年，很多人因为汶川哭过，也因为奥运笑过。",
                    2009: "那一年，开心农场的菜被偷得只剩一地坑，半夜定闹钟的人比上班还准时。",
                    2010: "那一年，街头巷尾突然多了许多举着手机拍照的人，镜头里装满了还没被滤镜修饰过的真实。",
                    2011: "那一年，微信诞生了，人们还不知道这个绿色图标会占据后来的每一天。",
                    2012: "那一年，许多人嘴上说着世界末日，心里却偷偷许了愿。",
                    2013: "那一年，雾霾第一次成为关键词，出门前先看的是空气质量指数。",
                    2014: "那一年，朋友圈里突然多了很多微商，曾经的同学开始卖面膜，不好意思屏蔽，也不好意思买。",
                    2015: "那一年，全面二孩政策放开，很多家庭的饭桌上多了一双筷子。",
                    2016: "那一年，共享单车的颜色比彩虹还多，后来它们堆成了山。",
                    2017: "那一年，抖音出现了，人们开始用15秒记住一首歌、一个人、一种生活。",
                    2018: "那一年，IG夺冠，朋友圈里突然多了很多'十年老粉'。",
                    2019: "那一年，很多人还在计划着明年的旅行，不知道世界即将按下暂停键。",
                    2020: "那一年，口罩遮住了一些人的脸，却让一些人的眼睛更亮了。",
                    2021: "那一年，很多人习惯了扫码、测温、保持一米距离。",
                    2022: "那一年，很多人在方舱里看完了整个春天。",
                    2023: "那一年，很多人摘下口罩，发现有些笑容需要重新学习。",
                    2024: "那一年，AI学会了写诗，很多人开始担心自己会不会被替代。",
                    2025: "那一年，很多人开始认真思考：什么才是无法被算法计算的生活。",
                    2026: "那一年，你坐在这里，想象着平行宇宙里的另一个自己。"
                };
                
                const footnoteText = yearFootnotes[year] || `这是${year}年。那时的选择，塑造了今天的你。`;
                footnote.textContent = footnoteText;
                
                // 直接显示，支持实时更新
                footnote.classList.add('show');
        }
        
        // 初始化年份选择器，确保2000年居中

/**
 * initYearSelector
 *
 * @returns {Promise|void}
 */
        function initYearSelector() {
            const yearSelector = document.querySelector('.year-selector');
            if (!yearSelector) return;
            
            // 找到2000年的元素
            const year2000 = document.querySelector('.year-item[data-year="2000"]');
            if (!year2000) return;
            
            // 等待DOM完全渲染和布局计算完成
            setTimeout(() => {
                const containerWidth = yearSelector.offsetWidth;
                const itemWidth = year2000.offsetWidth;
                const itemLeft = year2000.offsetLeft;
                const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
                
                // 滚动到2000年居中
                yearSelector.scrollLeft = scrollLeft;
                
                // 选中2000年（如果还没有选中）
                if (!year2000.classList.contains('selected')) {
                    year2000.classList.add('selected');
                }
                
                // 更新注脚
                updateYearFootnote(2000);
                
                console.log('年份选择器初始化完成：2000年已居中');
                console.log('容器宽度:', containerWidth);
                console.log('项目宽度:', itemWidth);
                console.log('项目左侧位置:', itemLeft);
                console.log('滚动位置:', scrollLeft);
                console.log('实际滚动位置:', yearSelector.scrollLeft);
                
            }, 300); // 增加延迟时间，确保DOM完全渲染
        }
        
        // 直接输入年份功能

/**
 * initDirectInput
 *
 * @returns {Promise|void}
 */
        function initDirectInput() {
            const directInputText = document.querySelector('.direct-input-text');
            const keyboardOverlay = document.getElementById('numberKeyboardOverlay');
            const keyboardModal = document.getElementById('numberKeyboardModal');
            const keyboardClose = document.getElementById('keyboardClose');
            const keyboardKeys = document.querySelectorAll('.keyboard-key[data-key]');
            const backspaceBtn = document.getElementById('keyboardBackspace');
            const confirmBtn = document.getElementById('keyboardConfirm');
            const yearDisplay = document.getElementById('yearInputDisplay');
            const inputHint = document.getElementById('inputHint');
            
            let currentInput = '';
            
            // 打开键盘
            function openYearKeyboard() {
                keyboardOverlay.classList.add('show');
                keyboardModal.classList.add('show');
                currentInput = '';
                yearDisplay.value = '';
                updateConfirmButton();
                updateHint();
            }

            directInputText.addEventListener('click', openYearKeyboard);

            directInputText.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openYearKeyboard();
                }
            });
            
            // 关闭键盘

/**
 * closeKeyboard
 *
 * @returns {Promise|void}
 */
            function closeKeyboard() {
                keyboardOverlay.classList.remove('show');
                keyboardModal.classList.remove('show');
            }
            
            keyboardClose.addEventListener('click', closeKeyboard);
            keyboardOverlay.addEventListener('click', closeKeyboard);
            
            // 数字键点击
            keyboardKeys.forEach(key => {
                key.addEventListener('click', function() {
                    if (currentInput.length < 4) {
                        currentInput += this.dataset.key;
                        yearDisplay.value = currentInput;
                        updateConfirmButton();
                        updateHint();
                        
                        // 输入4位后自动确认
                        if (currentInput.length === 4) {
                            setTimeout(() => {
                                confirmInput();
                            }, 300);
                        }
                    }
                });
            });
            
            // 退格键
            backspaceBtn.addEventListener('click', function() {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    yearDisplay.value = currentInput;
                    updateConfirmButton();
                    updateHint();
                }
            });
            
            // 确认按钮
            confirmBtn.addEventListener('click', confirmInput);
            
            // 更新确认按钮状态

/**
 * updateConfirmButton
 *
 * @returns {Promise|void}
 */
            function updateConfirmButton() {
                const isValid = currentInput.length === 4 && 
                               parseInt(currentInput) >= 1950 && 
                               parseInt(currentInput) <= 2026;
                confirmBtn.disabled = !isValid;
            }
            
            // 更新提示

/**
 * updateHint
 *
 * @returns {Promise|void}
 */
            function updateHint() {
                if (currentInput.length === 0) {
                    inputHint.textContent = '1950-2020';
                    inputHint.style.color = '#A8A39E';
                } else if (currentInput.length < 4) {
                    inputHint.textContent = `还需输入${4 - currentInput.length}位`;
                    inputHint.style.color = '#A8A39E';
                } else {
                    const year = parseInt(currentInput);
                    if (year < 1950 || year > 2020) {
                        inputHint.textContent = '请输入1950-2020之间的年份';
                        inputHint.style.color = '#C17B7B';
                    } else {
                        inputHint.textContent = getEraName(year);
                        inputHint.style.color = '#8A857F';
                    }
                }
            }
            
            // 确认输入

/**
 * confirmInput
 *
 * @returns {Promise|void}
 */
            function confirmInput() {
                const year = parseInt(currentInput);
                if (year >= 1950 && year <= 2020) {
                    closeKeyboard();
                    
                    // 滚动到对应年份
                    scrollToYear(year);
                    
                    // 延迟后触发背景显影
                    setTimeout(() => {
                        updateBackgroundLayer(year);
                    }, 800);
                }
            }
            
            // 滚动到对应年份

/**
 * scrollToYear
 *
 * @param {any} year
 * @returns {Promise|void}
 */
            function scrollToYear(year) {
                const yearSelector = document.querySelector('.year-selector');
                const yearItem = document.querySelector(`.year-item[data-year="${year}"]`);
                
                if (yearItem && yearSelector) {
                    // 移除其他选中状态
                    document.querySelectorAll('.year-item.selected').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // 选中目标年份
                    yearItem.classList.add('selected');
                    
                    // 滚动到中间位置
                    const containerWidth = yearSelector.offsetWidth;
                    const itemWidth = yearItem.offsetWidth;
                    const itemLeft = yearItem.offsetLeft;
                    const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
                    
                    yearSelector.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                    
                    // 更新年份注脚
                    updateYearFootnote(year);
                }
            }
            
            // 获取年代名称

/**
 * getEraName
 *
 * @param {any} year
 * @returns {Promise|void}
 */
            function getEraName(year) {
                if (year >= 1950 && year <= 1989) return '怀旧年代';
                if (year >= 1990 && year <= 1999) return '九十年代';
                if (year >= 2000 && year <= 2009) return '千禧年代';
                if (year >= 2010 && year <= 2019) return '一零年代';
                if (year >= 2020) return '二零年代';
                return '';
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            // 检查访问协议
            checkAccessProtocol();
            
            // 确保页面加载时置顶显示
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // 确保container滚动到顶部
            const container = document.querySelector('.container');
            if (container) {
                container.scrollTop = 0;
            }

            // 初始化直接输入年份功能
            initDirectInput();

            // 性别选择器功能 - 新布局
            const genderSymbols = document.querySelectorAll('.gender-symbol');
            let selectedGender = null;
        
        // 初始化性别选择器
        genderSymbols.forEach(symbol => {
            symbol.addEventListener('click', function() {
                const gender = this.dataset.gender;
                
                if (this.classList.contains('selected')) {
                    // 取消选中
                    this.classList.remove('selected');
                    selectedGender = null;
                    console.log('性别选择已取消');
                } else {
                    // 取消其他符号的选中状态
                    genderSymbols.forEach(s => s.classList.remove('selected'));
                    
                    // 选中当前符号
                    this.classList.add('selected');
                    selectedGender = gender;
                    console.log('选中性别:', gender === 'male' ? '男性' : '女性');
                }
                
                // 更新全局变量
                window.currentGender = selectedGender;
            });
            
            // 添加鼠标悬停效果
            symbol.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.color = '#C17B7B';
                }
            });
            
            symbol.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.color = '';
                }
            });
        });        // 添加键盘支持
        document.addEventListener('keydown', function(e) {
            if (e.key === 'm' || e.key === 'M') {
                // 按M键选择男性
                const maleSymbol = document.querySelector('.male-symbol');
                if (maleSymbol) {
                    maleSymbol.click();
                }
            } else if (e.key === 'f' || e.key === 'F') {
                // 按F键选择女性
                const femaleSymbol = document.querySelector('.female-symbol');
                if (femaleSymbol) {
                    femaleSymbol.click();
                }
            } else if (e.key === 'Escape') {
                // 按ESC键取消选择
                genderSymbols.forEach(symbol => {
                    if (symbol.classList.contains('selected')) {
                        symbol.click();
                    }
                });
            }
        });        // 获取当前选中的性别
        window.getSelectedGender = function() {
            return selectedGender;
        };
        
        // 获取性别文本描述
        window.getGenderDescription = function() {
            if (!selectedGender) return '未选性别';
            return selectedGender === 'male' ? '男性' : '女性';
        };
        
        console.log('性别选择器已初始化');
        
            const yearSelector = document.getElementById('yearSelector');
            const yearFootnote = document.getElementById('yearFootnote');
            const startYear = 1950;
            const endYear = 2020;
            let yearScrollTimeout = null;
            let isAutoCenteringYear = false;
            let isYearPointerDown = false;
            let yearSettleTimeout = null;
            let lastPreviewYear = null;
            let lastBackgroundYear = null;
            let pendingBackgroundYear = null;
            let backgroundFrame = null;
            let backgroundSettleTimeout = null;

            function getClosestYearToCenter() {
                const yearItems = document.querySelectorAll('.year-item');
                const selectorRect = yearSelector.getBoundingClientRect();
                const selectorCenter = selectorRect.left + selectorRect.width / 2;

                let closestYear = 2000;
                let minDistance = Infinity;

                yearItems.forEach(item => {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2;
                    const distance = Math.abs(itemCenter - selectorCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestYear = parseInt(item.dataset.year, 10);
                    }
                });

                return closestYear;
            }

            function applySelectedYear(year) {
                document.querySelectorAll('.year-item.selected').forEach(item => {
                    item.classList.remove('selected');
                });

                const targetItem = document.querySelector(`.year-item[data-year="${year}"]`);
                if (targetItem) {
                    targetItem.classList.add('selected');
                }
            }

            function centerYearItem(year, behavior = 'smooth') {
                const yearItem = document.querySelector(`.year-item[data-year="${year}"]`);
                if (!yearItem || !yearSelector) {
                    return;
                }

                const selectorRect = yearSelector.getBoundingClientRect();
                const scrollLeft = yearItem.offsetLeft - (selectorRect.width / 2) + (yearItem.offsetWidth / 2);

                isAutoCenteringYear = true;
                yearSelector.scrollTo({
                    left: scrollLeft,
                    behavior
                });

                window.clearTimeout(yearScrollTimeout);
                yearScrollTimeout = window.setTimeout(() => {
                    isAutoCenteringYear = false;
                }, behavior === 'smooth' ? 260 : 80);
            }

            function scheduleBackgroundLayer(year, force = false) {
                pendingBackgroundYear = year;

                if (backgroundFrame !== null) {
                    return;
                }

                backgroundFrame = window.requestAnimationFrame(() => {
                    backgroundFrame = null;
                    if (force || pendingBackgroundYear !== lastBackgroundYear) {
                        updateBackgroundLayer(pendingBackgroundYear);
                        lastBackgroundYear = pendingBackgroundYear;
                    }
                });
            }

            function previewYearSelection(year, forceBackground = false) {
                if (year !== lastPreviewYear) {
                    applySelectedYear(year);
                    lastPreviewYear = year;
                }

                if (forceBackground) {
                    updateYearFootnote(year);
                    scheduleBackgroundLayer(year, forceBackground);
                }
            }

            function settleYearSelection() {
                window.clearTimeout(yearSettleTimeout);
                yearSettleTimeout = window.setTimeout(() => {
                    if (isAutoCenteringYear || isYearPointerDown) {
                        return;
                    }

                    const settledYear = getClosestYearToCenter();
                    previewYearSelection(settledYear, true);
                    centerYearItem(settledYear, 'auto');
                }, 140);
            }
            
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
                    // 显示默认年份的注脚（使用缓出效果）
                    updateYearFootnote(year);
                }
                
                // 点击选择年份
                yearItem.addEventListener('click', function() {
                    const selectedYear = parseInt(this.dataset.year);
                    previewYearSelection(selectedYear, true);
                    centerYearItem(selectedYear, 'smooth');
                });
                
                yearSelector.appendChild(yearItem);
            }
            
            // 页面加载后自动滚动到2000年位置（只在年份选择器内部滚动）
            setTimeout(() => {
                const selectedYearItem = document.querySelector('.year-item.selected');
                const yearSelector = document.getElementById('yearSelector');
                if (selectedYearItem && yearSelector) {
                    centerYearItem(parseInt(selectedYearItem.dataset.year, 10), 'auto');
                }
            }, 100);
            
            // 初始化背景层（默认2000年）
            previewYearSelection(2000, true);
            
            // 确保2000年居中显示
            initYearSelector();
            
            // 监听年份选择器的滚动事件，实现滑动时背景渐变和实时注脚更新
            yearSelector.addEventListener('touchstart', function() {
                isYearPointerDown = true;
                window.clearTimeout(yearSettleTimeout);
                window.clearTimeout(backgroundSettleTimeout);
            }, { passive: true });

            yearSelector.addEventListener('touchend', function() {
                isYearPointerDown = false;
                settleYearSelection();
                window.clearTimeout(backgroundSettleTimeout);
                backgroundSettleTimeout = window.setTimeout(() => {
                    const settledYear = getClosestYearToCenter();
                    previewYearSelection(settledYear, true);
                }, 160);
            }, { passive: true });

            yearSelector.addEventListener('mousedown', function() {
                isYearPointerDown = true;
                window.clearTimeout(yearSettleTimeout);
                window.clearTimeout(backgroundSettleTimeout);
            });

            window.addEventListener('mouseup', function() {
                if (!isYearPointerDown) {
                    return;
                }

                isYearPointerDown = false;
                settleYearSelection();
                window.clearTimeout(backgroundSettleTimeout);
                backgroundSettleTimeout = window.setTimeout(() => {
                    const settledYear = getClosestYearToCenter();
                    previewYearSelection(settledYear, true);
                }, 160);
            });

            yearSelector.addEventListener('scroll', function() {
                const closestYear = getClosestYearToCenter();
                previewYearSelection(closestYear, false);

                window.clearTimeout(backgroundSettleTimeout);
                backgroundSettleTimeout = window.setTimeout(() => {
                    if (isYearPointerDown) {
                        return;
                    }
                    const settledYear = getClosestYearToCenter();
                    previewYearSelection(settledYear, true);
                }, 220);

                window.clearTimeout(yearScrollTimeout);
                yearScrollTimeout = window.setTimeout(() => {
                    if (isAutoCenteringYear || isYearPointerDown) {
                        return;
                    }
                    settleYearSelection();
                }, 120);
            });

            yearSelector.addEventListener('wheel', function(event) {
                if (window.innerWidth < 769) {
                    return;
                }

                const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
                if (!delta) {
                    return;
                }

                event.preventDefault();
                yearSelector.scrollLeft += delta;
            }, { passive: false });
            
            // 获取DOM元素
            const generateBtn = document.getElementById('generateBtn');
            const loadingElement = document.getElementById('loading');
            
            // 反向生成模态框关闭事件
            const reverseModalClose = document.getElementById('reverseModalClose');
            const reverseModal = document.getElementById('reverseModal');
            
            if (reverseModalClose && reverseModal) {
                reverseModalClose.addEventListener('click', function() {
                    reverseModal.classList.remove('show');
                    deactivateReverseModalImmersion(false);
                    settleMobileViewportAfterModalClose();
                });
                
                // 点击模态框背景关闭
                reverseModal.addEventListener('click', function(e) {
                    if (e.target === reverseModal) {
                        reverseModal.classList.remove('show');
                        deactivateReverseModalImmersion(false);
                        settleMobileViewportAfterModalClose();
                        // 重置内联样式
                        reverseModal.style.display = '';
                        reverseModal.style.opacity = '';
                        reverseModal.style.zIndex = '';
                    }
                });
            }
            
            // 主生成模态框关闭事件
            const mainModalClose = document.getElementById('mainModalClose');
            const mainModal = document.getElementById('mainModal');
            
            if (mainModalClose && mainModal) {
                mainModalClose.addEventListener('click', function() {
                    mainModal.classList.remove('show');
                    deactivateMainModalImmersion(false);
                    settleMobileViewportAfterModalClose();
                });
                
                // 点击模态框背景关闭
                mainModal.addEventListener('click', function(e) {
                    if (e.target === mainModal) {
                        mainModal.classList.remove('show');
                        deactivateMainModalImmersion(false);
                        settleMobileViewportAfterModalClose();
                        // 重置内联样式
                        mainModal.style.display = '';
                        mainModal.style.opacity = '';
                        mainModal.style.zIndex = '';
                    }
                });
            }
            const waitingTextElement = document.getElementById('waitingText');
            const resultContainer = document.getElementById('resultContainer');
            const resultContent = document.getElementById('resultContent');
            const errorContainer = document.getElementById('errorContainer');

            function requireGenderSelection() {
                const selectedGenderSymbol = document.querySelector('.gender-symbol.selected');
                if (selectedGenderSymbol) {
                    return selectedGenderSymbol.dataset.gender;
                }

                const genderContainer = document.querySelector('.gender-symbols-container');
                const yearContainer = genderContainer ? genderContainer.closest('.year-selector-container') : null;
                const targetElement = yearContainer || genderContainer;

                if (targetElement && targetElement.scrollIntoView) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                if (genderContainer) {
                    genderContainer.classList.remove('gender-require-attention');
                    // Restart the attention animation if the user taps repeatedly.
                    void genderContainer.offsetWidth;
                    genderContainer.classList.add('gender-require-attention');
                    window.setTimeout(() => {
                        genderContainer.classList.remove('gender-require-attention');
                    }, 1700);
                }

                showError('请选择性别，这样故事会更贴近你', targetElement);
                return null;
            }

            function validateSupplementPrerequisites() {
                const selectedYearItem = document.querySelector('.year-item.selected');
                const yearContainer = document.querySelector('.year-selector-container');
                const traitsInput = document.getElementById('traits');
                const choiceInput = document.getElementById('choicePart1');
                const choiceSection = document.querySelector('.choice-section-group');
                const selectedChoiceTag = document.querySelector('.choice-prompt-tag.selected');
                const traits = traitsInput ? traitsInput.value.trim() : '';
                const choicePart1 = choiceInput ? choiceInput.value.trim() : '';
                const choicePart2Input = document.getElementById('choicePart2');
                const choicePart2 = choicePart2Input ? choicePart2Input.value.trim() : '';

                if (!selectedYearItem) {
                    showError('请先选择出生年份', yearContainer);
                    return false;
                }

                const gender = requireGenderSelection();
                if (!gender) {
                    return false;
                }

                if (!traits) {
                    if (traitsInput) {
                        traitsInput.focus();
                    }
                    showError('请先填写或选择你的性格', traitsInput);
                    return false;
                }

                if (!choicePart1 && !choicePart2) {
                    if (choiceInput) {
                        choiceInput.focus();
                    }
                    showError('请先填写你的“如果当时”', choiceInput);
                    return false;
                }

                if (!selectedChoiceTag) {
                    showError('请先选一个场景推荐，再补充更多细节', choiceSection);
                    return false;
                }

                return true;
            }
            
            // 生成按钮点击事件
            generateBtn.addEventListener('click', async function() {
                // 获取用户输入
                const selectedYearItem = document.querySelector('.year-item.selected');
                const birthYear = selectedYearItem ? selectedYearItem.dataset.year : '2000';
                const traits = document.getElementById('traits').value;
                const choicePart1 = document.getElementById('choicePart1').value;
                const choicePart2 = document.getElementById('choicePart2').value;
                
                // 获取性别选择
                const gender = requireGenderSelection();
                if (!gender) {
                    return;
                }
                
                // 获取场景选择
                const scenario = getSelectedChoiceScenario();
                
                // 增强表单验证与清理
                // 1. 对所有输入进行trim清理
                const cleanedTraits = traits.trim();
                const cleanedChoicePart1 = choicePart1.trim();
                const cleanedChoicePart2 = choicePart2.trim();
                
                // 2. 检查清理后是否为空
                if (!cleanedTraits) {
                    const traitsInput = document.getElementById('traits');
                    if (traitsInput) traitsInput.focus();
                    showError('请描述一下你的性格特质，哪怕只是一个词', traitsInput);
                    return;
                }
                
                if (!cleanedChoicePart1 && !cleanedChoicePart2) {
                    const choiceInput = document.getElementById('choicePart1');
                    if (choiceInput) choiceInput.focus();
                    showError('请填写你的"如果当时"，哪怕只是一个念头', choiceInput);
                    return;
                }
                
                // 3. 性格特质长度限制（最多30个中文字符）
                if (cleanedTraits.length > 30) {
                    const traitsInput = document.getElementById('traits');
                    if (traitsInput) traitsInput.focus();
                    showError('性格特质描述过长，请精简到30个字符以内', traitsInput);
                    return;
                }
                
                // 4. XSS过滤（简单转义<和>）
                const sanitizeInput = (text) => {
                    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                };
                
                // 使用清理后的值
                const finalTraits = sanitizeInput(cleanedTraits);
                const finalChoicePart1 = sanitizeInput(cleanedChoicePart1);
                const finalChoicePart2 = sanitizeInput(cleanedChoicePart2);
                
                // 组合关键选择（使用清理后的值）
                let finalChoice = '';
                if (finalChoicePart1 && finalChoicePart2) {
                    finalChoice = `如果当时，我没有${finalChoicePart1}，而是${finalChoicePart2}`;
                } else if (finalChoicePart1) {
                    finalChoice = `如果当时，我没有${finalChoicePart1}`;
                } else if (finalChoicePart2) {
                    finalChoice = `如果当时，我选择了${finalChoicePart2}`;
                }
                
                const mainExtraDetail = sanitizeInput(getMainPageExtraDetail());
                
                // 开始生成流程（使用清理后的值）
                startGeneration(birthYear, finalTraits, finalChoice, gender, scenario, mainExtraDetail);
            });
            
            // 反向生成链接点击事件
            const reverseGenerateLink = document.getElementById('reverseGenerateLink');
            
            reverseGenerateLink.addEventListener('click', async function() {
                // 防止重复点击
                if (this.classList.contains('disabled')) {
                    return;
                }
                
                // 禁用按钮
                this.classList.add('disabled');
                this.style.pointerEvents = 'none';
                this.style.opacity = '0.5';
                
                // 获取用户输入（与主生成相同）
                const selectedYearItem = document.querySelector('.year-item.selected');
                const birthYear = selectedYearItem ? selectedYearItem.dataset.year : '2000';
                const traits = document.getElementById('traits').value.trim();
                const choicePart1 = document.getElementById('choicePart1').value.trim();
                const choicePart2 = document.getElementById('choicePart2').value.trim();
                
                // 获取性别选择
                const gender = requireGenderSelection();
                if (!gender) {
                    this.classList.remove('disabled');
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                    return;
                }
                
                // 获取场景选择
                const scenario = getSelectedChoiceScenario();
                
                // 组合关键选择
                let choice = '';
                if (choicePart1 && choicePart2) {
                    choice = `如果当时，我没有${choicePart1}，而是${choicePart2}`;
                } else if (choicePart1) {
                    choice = `如果当时，我没有${choicePart1}`;
                } else if (choicePart2) {
                    choice = `如果当时，我选择了${choicePart2}`;
                }
                
                // 简单验证
                if (!traits) {
                    const traitsInput = document.getElementById('traits');
                    if (traitsInput) traitsInput.focus();
                    showError('请描述一下你的性格特质，哪怕只是一个词', traitsInput);
                    // 重新启用按钮
                    this.classList.remove('disabled');
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                    return;
                }
                
                if (!choicePart1 && !choicePart2) {
                    const choiceInput = document.getElementById('choicePart1');
                    if (choiceInput) choiceInput.focus();
                    showError('请填写你的"如果当时"，哪怕只是一个念头', choiceInput);
                    // 重新启用按钮
                    this.classList.remove('disabled');
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                    return;
                }
                
                const mainExtraDetail = getMainPageExtraDetail().replace(/</g, '&lt;').replace(/>/g, '&gt;');
                
                try {
                    // 开始反向生成流程
                    await startReverseGeneration(birthYear, traits, choice, gender, scenario, mainExtraDetail);
                } catch (error) {
                    // 发生错误时重新启用按钮
                    this.classList.remove('disabled');
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                }
            });
            

            
            // 开始生成函数

/**
 * startGeneration
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @returns {Promise|void}
 */
            async function startGeneration(year, traits, choice, gender = null, scenario = null, mainExtraDetail = '') {
                try {
                    // 1. 立即开始API调用，同时显示模态框等待内容
                    generateBtn.disabled = true;
                    generateBtn.classList.add('submitting');
                    
                    // 禁用反向生成链接
                    const reverseGenerateLink = document.getElementById('reverseGenerateLink');
                    if (reverseGenerateLink) {
                        reverseGenerateLink.classList.add('disabled');
                        reverseGenerateLink.style.pointerEvents = 'none';
                        reverseGenerateLink.style.opacity = '0.5';
                    }
                    
                    // 隐藏之前的错误和结果
                    errorContainer.style.display = 'none';
                    resultContainer.classList.remove('show');
                    waitingTextElement.style.display = 'none';

                    setModalTitle('mainModal', '那边的你');
                    showModalWaitingContent('mainModal', 'mainWaitingContent', 'mainResultContent');
                    startTextRotation('main', document.getElementById('mainWaitingText'), document.getElementById('mainProgressBar'));
                    
                    // 2. 立即开始构建系统Prompt和API调用（不等待动画）
                    const systemPrompt = buildSystemPrompt(year, traits, choice, gender, scenario, mainExtraDetail);
                    
                    // 3. 并行执行：同时进行API调用和动画
                    const apiCallPromise = callDeepSeekAPI(systemPrompt, 'main');
                    const animationPromise = runConcurrentAnimation(year);
                    
                    // 等待两者都完成
                    const [story] = await Promise.all([apiCallPromise, animationPromise]);

                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');

                    // 4. 显示结果
                    showResult(story);
                    
                } catch (error) {
                    // 5. 处理错误
                    stopTextRotation();
                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                    deactivateMainModalImmersion(true);
                    handleGenerationError(error);
                }
            }
            
            // 反向生成函数

/**
 * startReverseGeneration
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @returns {Promise|void}
 */
            async function startReverseGeneration(year, traits, choice, gender = null, scenario = null, mainExtraDetail = '') {
                try {
                    // 1. 立即开始API调用，同时显示模态框等待内容
                    generateBtn.disabled = true;
                    
                    // 隐藏之前的错误和结果
                    errorContainer.style.display = 'none';
                    resultContainer.classList.remove('show');
                    waitingTextElement.style.display = 'none';

                    setModalTitle('reverseModal', '另一种可能');
                    showModalWaitingContent('reverseModal', 'reverseWaitingContent', 'reverseResultContent');
                    startTextRotation('reverse', document.getElementById('reverseWaitingText'), document.getElementById('reverseProgressBar'));
                    
                    // 2. 立即开始构建系统Prompt和API调用（不等待动画）
                    const systemPrompt = buildReverseSystemPrompt(year, traits, choice, gender, scenario, mainExtraDetail);
                    
                    // 3. 并行执行：同时进行API调用和动画
                    const apiCallPromise = callDeepSeekAPI(systemPrompt, 'reverse');
                    const animationPromise = runConcurrentAnimation(year);
                    
                    // 等待两者都完成
                    const [story] = await Promise.all([apiCallPromise, animationPromise]);

                    hideModalWaitingContent('reverseWaitingContent', 'reverseResultContent');

                    // 4. 显示反向生成结果
                    showReverseResult(story);
                    
                } catch (error) {
                    // 5. 处理错误
                    stopTextRotation();
                    hideModalWaitingContent('reverseWaitingContent', 'reverseResultContent');
                    deactivateReverseModalImmersion(true);
                    handleGenerationError(error);
                }
            }

            let waitingRotationTimer = null;
            let waitingProgressTimer = null;

            function setModalTitle(modalId, title) {
                const modal = document.getElementById(modalId);
                const titleElement = modal ? modal.querySelector('.reverse-result-title') : null;
                if (titleElement) {
                    titleElement.textContent = title;
                }
            }

            function activateMainModalImmersion() {
                if (window._mainModalImmersion && typeof window._mainModalImmersion.activate === 'function') {
                    window._mainModalImmersion.activate();
                }
            }

            function deactivateMainModalImmersion(hideModal = false) {
                if (window._mainModalImmersion && typeof window._mainModalImmersion.deactivate === 'function') {
                    window._mainModalImmersion.deactivate(hideModal);
                }
            }

            function activateReverseModalImmersion() {
                if (window._reverseModalImmersion && typeof window._reverseModalImmersion.activate === 'function') {
                    window._reverseModalImmersion.activate();
                }
            }

            function deactivateReverseModalImmersion(hideModal = false) {
                if (window._reverseModalImmersion && typeof window._reverseModalImmersion.deactivate === 'function') {
                    window._reverseModalImmersion.deactivate(hideModal);
                }
            }

            function settleMobileViewportAfterModalClose() {
                const activeElement = document.activeElement;
                if (activeElement && typeof activeElement.blur === 'function') {
                    activeElement.blur();
                }

                document.body.classList.remove('keyboard-visible');
                const settle = () => {
                    const container = document.querySelector('.container');
                    if (container) {
                        container.scrollTop = 0;
                    }
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                };

                settle();
                window.setTimeout(settle, 140);
                window.setTimeout(settle, 420);
                window.setTimeout(settle, 760);
            }

            window.settleMobileViewportAfterModalClose = settleMobileViewportAfterModalClose;

            function hideReverseModalCompletely() {
                const reverseModal = document.getElementById('reverseModal');
                if (!reverseModal) {
                    return;
                }

                reverseModal.classList.remove('show', 'is-waiting');
                reverseModal.style.display = 'none';
                reverseModal.style.opacity = '0';
                reverseModal.style.zIndex = '';
                deactivateReverseModalImmersion(true);
            }

            function showModalWaitingContent(modalId, waitingContentId, resultContentId) {
                const modal = document.getElementById(modalId);
                const waitingContent = document.getElementById(waitingContentId);
                const resultContent = document.getElementById(resultContentId);

                if (!modal || !waitingContent || !resultContent) {
                    return;
                }

                if (modalId === 'mainModal') {
                    activateMainModalImmersion();
                } else if (modalId === 'reverseModal') {
                    activateReverseModalImmersion();
                }

                resultContent.style.display = 'none';
                waitingContent.style.display = 'flex';
                modal.classList.add('show');
                modal.classList.add('is-waiting');
            }

            function hideModalWaitingContent(waitingContentId, resultContentId) {
                const waitingContent = document.getElementById(waitingContentId);
                const resultContent = document.getElementById(resultContentId);
                const modal = waitingContent ? waitingContent.closest('.reverse-modal') : null;

                stopTextRotation();

                if (waitingContent) {
                    waitingContent.style.display = 'none';
                }

                if (resultContent) {
                    resultContent.style.display = '';
                }

                if (modal) {
                    modal.classList.remove('is-waiting');
                }
            }

            function startTextRotation(mode, textElement, progressBarElement) {
                stopTextRotation();

                if (!textElement || !progressBarElement) {
                    return;
                }

                const sequences = {
                    main: [
                        '正在翻阅你那一年的档案……',
                        '路在这里分岔，你站在那年。',
                        '那边的你，此刻正慢慢靠近。',
                        '尘封的那页纸，刚刚被风翻开。',
                        '一些没走成的路，正在重新发亮。',
                        '你错过的那个傍晚，正被重新写起。',
                        '另一页人生，正在桌面上缓缓摊开。',
                        '那些没说出口的决定，正重新排成一列。',
                        '时间在这一页纸上，慢慢退回你身边。'
                    ],
                    reverse: [
                        '正在翻阅那条更灰一点的岔路……',
                        '有一扇门，轻轻合上了。',
                        '那个差点搞砸一切的你，正在出现。',
                        '那年没接住的东西，正在掉回掌心。',
                        '更沉一点的命运，已经拐进眼前。',
                        '你曾躲开的那场雨，正在重新落下。',
                        '另一种结局，正从光线更暗的地方浮出来。',
                        '那句没来得及说出口的话，正在晚一点抵达。',
                        '更旧一点的伤口，正被轻轻翻到。'
                    ],
                    personal: [
                        '正在翻阅只属于你的那页补注……',
                        '那些你后来才说出口的细节，正在落位。',
                        '另一个更像你的瞬间，正慢慢显影。',
                        '你藏着没说的那句话，正被轻轻写进结尾。',
                        '那些只属于你的微小习惯，正在一一对焦。',
                        '你留在抽屉里的细节，正在替故事发声。',
                        '那些无人知晓的小动作，正在变成这一页的纹理。',
                        '你曾轻轻带过的部分，正慢慢有了重量。',
                        '更贴近你的那层生活，正在缓缓浮出水面。'
                    ]
                };

                const texts = sequences[mode] || sequences.main;
                const shuffledTexts = [...texts].sort(() => Math.random() - 0.5);
                let index = 0;
                textElement.textContent = shuffledTexts[index];

                waitingRotationTimer = window.setInterval(() => {
                    index = (index + 1) % shuffledTexts.length;
                    textElement.style.opacity = '0';

                    window.setTimeout(() => {
                        textElement.textContent = shuffledTexts[index];
                        textElement.style.opacity = '1';
                    }, 180);
                }, 2600);

                const durationMs = 10000;
                const startAt = Date.now();
                progressBarElement.style.width = '0%';

                waitingProgressTimer = window.setInterval(() => {
                    const elapsed = Date.now() - startAt;
                    const progress = Math.min((elapsed / durationMs) * 100, 96);
                    progressBarElement.style.width = `${progress}%`;
                }, 120);
            }

            function stopTextRotation() {
                if (waitingRotationTimer) {
                    window.clearInterval(waitingRotationTimer);
                    waitingRotationTimer = null;
                }

                if (waitingProgressTimer) {
                    window.clearInterval(waitingProgressTimer);
                    waitingProgressTimer = null;
                }

                const progressBars = document.querySelectorAll('#mainProgressBar, #reverseProgressBar');
                progressBars.forEach((bar) => {
                    bar.style.width = '100%';
                    window.setTimeout(() => {
                        bar.style.width = '0%';
                    }, 120);
                });
            }
            
            // 等待动画函数

/**
 * runWaitingAnimation
 *
 * @param {any} year
 * @returns {Promise|void}
 */
            async function runWaitingAnimation(year) {
                // 禁用按钮
                generateBtn.disabled = true;
                
                // 隐藏之前的错误和结果
                errorContainer.style.display = 'none';
                resultContainer.classList.remove('show');
                
                // 显示等待文案区域
                waitingTextElement.style.display = 'block';
                
                // 第一阶段：翻阅档案
                const stage1Text = getRandomLoadingText('stage1');
                generateBtn.textContent = stage1Text;
                waitingTextElement.innerHTML = stage1Text;
                waitingTextElement.style.opacity = '1';
                await delay(1000);
                
                // 第二阶段：分岔路口
                const stage2Text = getRandomLoadingText('stage2');
                generateBtn.textContent = stage2Text;
                waitingTextElement.innerHTML = stage2Text;
                await delay(1000);
                
                // 第三阶段：那边的你
                const stage3Text = getRandomLoadingText('stage3');
                generateBtn.textContent = stage3Text;
                waitingTextElement.innerHTML = stage3Text;
                await delay(1000);
                
                // 淡出等待文案
                waitingTextElement.style.transition = 'opacity 0.5s ease';
                waitingTextElement.style.opacity = '0';
                await delay(500);
                
                // 隐藏等待文案
                waitingTextElement.style.display = 'none';
                waitingTextElement.style.opacity = '1'; // 重置透明度
                waitingTextElement.style.transition = ''; // 重置过渡
                
                // 更新按钮状态
                generateBtn.textContent = '故事正在落笔……';
                
                // 显示加载动画
                loadingElement.classList.add('show');
            }
            
            // 并发动画函数（与API调用同时运行）
            
/**
 * runConcurrentAnimation
 *
 * @param {any} year
 * @returns {Promise|void}
 */
            async function runConcurrentAnimation(year) {
                try {
                    await delay(10000);
                    return true;
                } catch (error) {
                    console.error('动画执行错误:', error);
                    return true; // 即使动画出错，也不影响API调用
                }
            }
            
            // 辅助函数：延时

/**
 * delay
 *
 * @param {any} ms
 * @returns {Promise|void}
 */
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            

            
            // 构建系统Prompt
            // 构建系统Prompt（主生成）

/* ======================================== */
/* 故事生成流程 */
/* ======================================== */
/* 平行宇宙故事生成、API调用和提示词构建 */

            function describeChoiceDirection(choice) {
                const text = String(choice || '').trim();
                const match = text.match(/如果当时[，,]?\s*我没有(.+?)[，,]\s*而是(.+)$/);
                if (!match) {
                    return `选择解释：请严格围绕用户填写的关键选择展开，不要反写、不要把被否定的选项当成主线。`;
                }

                const abandonedPath = match[1].trim();
                const chosenPath = match[2].trim();

                return `选择解释：
- 用户表达的是一个改写后的平行选择：现实/旧路径是“${abandonedPath}”，平行宇宙真正发生的是“${chosenPath}”。
- 故事主线必须建立在“${chosenPath}已经发生”这个事实之上；“${abandonedPath}”只能作为被放弃的岔路、回忆或对照，绝不能成为主角正在经历的结果。
- 如果“${chosenPath}”是一个具体行为（例如去考试、去见某个人、说出口、离开某地），正文必须自然体现这个行为之后带来的生活场景或后果。`;
            }

            function getSelectedChoiceScenario() {
                const selectedChoiceTag = document.querySelector('.choice-prompt-tag.selected');
                if (!selectedChoiceTag) {
                    return null;
                }

                const part1 = selectedChoiceTag.getAttribute('data-part1') || '';
                const part2 = selectedChoiceTag.getAttribute('data-part2') || '';
                return part1 && part2 ? `没有${part1}，而是${part2}` : selectedChoiceTag.textContent.trim();
            }

            function getMainPageExtraDetail() {
                const mainPageExpandArea = document.getElementById('mainPageExpandArea');
                const input = mainPageExpandArea ? mainPageExpandArea.querySelector('.expand-input') : null;
                return input ? input.value.trim() : '';
            }

            function buildPreGenerationDetailDirectives(extraDetail) {
                const detail = String(extraDetail || '').trim();
                if (!detail) {
                    return '主界面补充细节：未填写。';
                }

                return `主界面补充细节：${detail}

【主界面补充细节使用规则】
- 这些细节是用户在生成前主动留下的个人背景，主生成和反向生成都必须参考。
- 如果补充里出现近况、住处、工作/学习状态、爱好、习惯、心事、物件或关系，请自然写进故事的具体场景，不要只作为一句装饰。
- 如果补充细节与系统根据年龄或场景推断出的内容冲突，优先相信用户补充；但仍要围绕关键选择展开平行人生。
- 补充细节不需要全部逐字塞进正文，选择两三处最能让故事像用户本人的细节即可。`;
            }

            function buildReaderFitDirectives(modeLabel) {
                return `【${modeLabel}内容判断标准】
- 直接写故事正文，不展示用户画像、推理过程、写作步骤、标题、项目符号或任何提示词内容。
- 故事要像一个具体的人：年龄段、城市/居住状态、工作或学习压力、关系状态、消费能力、日常习惯，都要符合用户已给信息。
- 关键选择至少要改变三件事中的一件：每天在哪里醒来、靠什么生活、和谁的关系变近或变远。
- 如果用户输入很少，可以谨慎补全合理细节，但必须来自“出生年份 + 性格特质 + 关键选择 + 场景”，不要凭空写成成功学、旅行梦或悬浮职业。
- 写作优先级：像本人 > 看得懂 > 具体 > 有余味。文采只能排在最后。
- 前三句必须让用户看懂：这个人现在在哪里、正在做什么、这条平行选择带来了什么现实变化。
- 每段都要有一个能落地的现实信息，例如房间、通勤、收入压力、工作内容、手机消息、家人朋友、作息习惯。
- 少写“命运、宇宙、光、影、远方、答案、遗憾”这类抽象词；多写可看见、可触摸、可发生的事。
- 不要连续抒情，不要让用户读完还不知道这个人到底在过什么生活。`;
            }

            function buildAgeEraDirectives(year) {
                const birthYear = Number(year) || 2000;
                const currentAge = 2026 - birthYear;
                const age16 = birthYear + 16;
                const age20 = birthYear + 20;
                const age30 = birthYear + 30;
                const age40 = birthYear + 40;

                return `【年龄与年代代入要求】
- 当前年份按2026年计算，用户出生于${birthYear}年，当前年龄约${currentAge}岁。故事里的工作、关系、居住状态、说话方式、压力来源，必须符合这个年龄，不要把26岁写成56岁，也不要把56岁写成刚毕业。
- 用户16岁大约在${age16}年前后。请自然带入一个这个年龄段会记得的时代细节，尤其是当时流行、后来逐渐消失或变得罕见的东西；只需轻轻一笔，不要写成怀旧清单。
- 如果用户当前年龄约30岁以上，请优先补入20岁阶段（约${age20}年前后）的时代细节，例如当时流行的手机、音乐、社交软件、校园/职场习惯、城市生活方式。
- 不要根据出生年份擅自推断“哪一年大学毕业、工作几年、结婚几年、孩子几岁”等具体人生节点，除非用户明确提供。可以写“20岁前后”“大学或刚进社会那几年”“那几年身边人陆续开始工作”这类模糊但真实的表达。
- 如果需要提到${age20}年前后，只能作为时代背景或年龄段氛围，不要写成“${age20}年大学毕业/入职/结婚”等确定事实。
- 如果用户当前年龄约40岁以上，可以再自然带入30岁阶段（约${age30}年前后）的社会和生活细节，例如房价、单位/行业变化、育儿/婚恋/职业转折、支付方式或交通变化。
- 如果用户当前年龄约50岁以上，可以轻轻带到40岁阶段（约${age40}年前后）的生活变化，例如家庭责任、身体感受、职业位置、旧物被替换、新技术进入生活。
- 如果用户出生在2015年以后，当前年龄还小，不要硬写成年人的职业和婚恋。可以更戏剧、更想象一点，但仍要符合孩子/青少年的现实：学校、家人、兴趣、手机和平板、同学关系、被大人安排的选择、未来想象。
- 正文至少要出现一个符合用户年龄的时代锚点，但最多两三个，不要密集堆砌。
- 年代细节必须服务于“这个人真的活在这个年纪”，不要为了炫知识硬塞。`;
            }

            function buildPersonalDetailDirectives(extraDetail) {
                return `【补充细节最高优先级】
- 用户在“补充细节”里写下的内容，必须被当作当前事实，而不是灵感素材。不得改写、跳过或反向解释。
- 如果补充细节里出现明确状态、身份、关系、地点、阶段、时间、年龄、正在做的事、还没有完成的事，正文必须沿用这个状态，不能写成相反结果。
- 如果补充细节里出现明确年龄，例如“30岁”“快40了”，该年龄优先于出生年份推算；出生年份只用于补充年代记忆，不得覆盖用户亲自写下的年龄。
- 如果补充细节里出现长期经历或反复发生的事，正文必须体现它带来的现实影响：作息、钱、关系、自我评价、身体疲惫或生活节奏。
- 如果补充细节与“关键选择”或之前生成的故事发生冲突，私人版本必须以补充细节为准。关键选择只能作为背景中的旧假设、曾经想象过的另一条路，不能覆盖用户刚刚补充的真实状态。
- 如果补充细节否定了某个结果，例如“其实还没工作”“还在读书”“没有结婚”“已经离开那里”“不是这个行业”，正文必须写否定后的状态，不得继续沿用被否定的结果。
- 私人版本至少要有两处明显来自补充细节的内容：一处是客观事实/状态，一处是由它带来的生活细节或情绪后果。
- 处理方法：先抽取补充细节里的“事实词”和“限制词”，例如年龄、身份、地点、关系、进行中/未完成/反复多年/刚刚发生等；再围绕这些事实写当前生活，不能跳到事实已经结束后的阶段。`;
            }

            function buildPersonalContextPriorityDirectives(personalDetail, mainExtraDetail) {
                const mainDetail = String(mainExtraDetail || '').trim();
                if (!mainDetail) {
                    return `【信息优先级】
- 私人版本输入框里的补充细节拥有最高优先级，其次是主界面的出生年份、性格、关键选择和场景。`;
                }

                return `【信息优先级】
- 私人版本输入框里的补充细节拥有最高优先级。
- 主界面“让故事多了解我一点”里写下的内容是第二优先级，必须兼顾，尤其是近况、习惯、物件、工作/学习状态、城市和心事。
- 基础信息（出生年份、性格、关键选择、场景）是第三优先级，用来维持故事方向和年龄年代感。
- 如果私人版本输入与主界面补充或基础信息冲突，以私人版本输入为准；如果不冲突，请把主界面补充自然保留下来，让这一版既更像本人，也不丢掉前面铺好的主线。`;
            }


/**
 * buildSystemPrompt
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @param {any} gender
 * @returns {Promise|void}
 */
            function buildSystemPrompt(year, traits, choice, gender = null, scenario = null, mainExtraDetail = '') {
                return `你是一位非常擅长写“像真实人生一样”的平行人生切片作者。你的第一目标不是文采，而是让用户读完觉得：“这真的像我可能会过上的另一种生活。”

现在，请为一个用户生成一个"平行宇宙人生切片"。

【用户信息】
出生年份：${year}
核心特质：${traits}
关键选择：${choice}
${describeChoiceDirection(choice)}
${gender ? `性别：${gender === 'male' ? '男性' : '女性'}` : '性别：未选择'}
${scenario ? `场景：${scenario}` : '场景：未选择'}
${buildPreGenerationDetailDirectives(mainExtraDetail)}

${buildReaderFitDirectives('主版本')}

${buildAgeEraDirectives(year)}

【创作要求】
- 不要在故事正文开头写"2026年"或任何年份数字。时间背景已经通过卡片标签展示，正文直接从场景描写开始。例如第一句直接写"你关掉台灯，窗外的城市安静下来。"而不是"2026年，你关掉台灯……"
- 根据出生年份，准确锚定时代背景。故事发生的年龄、压力、关系和生活状态必须符合用户当前年龄。
【性别细节要求】
根据用户选择的性别（若已选），在细节描写上可以轻微倾向该性别常见的中性细节（如男性可选：袖口纽扣、下巴线条；女性可选：耳边碎发、指节弧度）。若未选性别，保持完全中性。无论何种情况，不使用"高跟鞋""领带"等强烈性别标签物品。
时间锚点要求：故事发生的时间应为当前年份（2026年）前后，主角年龄 = 2026 - 出生年份。场景需体现"此时此刻"的平行生活。
- 根据关键选择，设定一个与用户现实选择不同的职业或生活状态。
- 关键选择中“而是”后面的内容是本故事的既定事实，必须优先写它造成的后续生活，不要把“没有”后面的内容写成故事主线。
- 核心特质必须贯穿始终，让用户读完后觉得"这确实是我可能会成为的样子"。
- 生成一个360-480字左右的人生切片。不是完整传记，而是一个很具体、很真实、普通人能读进去的当下片段。
- 必须包含：一个具体的空间、一个具体的生活动作、一个能看出状态的小细节、一个能看出关系或处境的瞬间。
- 优先写“日常现实感”，例如工作、居住、通勤、感情、家庭、朋友、金钱压力、生活习惯，而不是优先写漂亮句子。
- 语言自然克制，像朋友认真描述“另一个你现在过得怎么样”，不要像散文，不要堆砌比喻。句子尽量短一点，段落之间要有清楚的生活推进。
- 用第二人称"你"写作。结尾可以轻轻停住，但不要为了文艺而故意悬空。

【隐藏要求】
在场景描写中，刻意保留一个用户输入时没明说、但由其特质必然推导出的"微小习惯"或"内心矛盾"。
例如：用户输入"内向、爱钻研、害怕冲突" → 场景中不经意带一句：
"他下意识把手机调成静音，这个习惯从大学用到现在，仿佛铃声一响就意味着有什么需要他立刻回应的事。"

【风格禁忌】
- 不要说教，不要总结人生道理。
- 不要写成“你成为了更好的自己”“你终于明白”这类鸡汤句。
- 不要过分戏剧化，避免车祸、死亡、暴富等极端情节。要像真实生活的切片。
- 不要评价用户的选择好坏，不做价值判断。
- 避免使用"幸福""成功""失败"等抽象评判词，用具体的动作和细节代替。
- 不要为了“好看”而写得过分朦胧、过分抒情、过分像文学杂志短篇。

【输出格式】
只输出故事正文，不包含任何前缀说明或后缀总结。`;
            }
            
            // 构建反向生成系统Prompt

/**
 * buildReverseSystemPrompt
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @param {any} gender
 * @returns {Promise|void}
 */
            function buildReverseSystemPrompt(year, traits, choice, gender = null, scenario = null, mainExtraDetail = '') {
                return `你是一位非常擅长写“真实但不夸张”的平行人生切片作者。你的任务不是制造狗血，而是写出一种“这条路也可能真的会这样”的人生代价。

现在，请为一个用户生成一个"平行宇宙人生切片"。

【用户信息】
出生年份：${year}
核心特质：${traits}
关键选择：${choice}
${describeChoiceDirection(choice)}
${gender ? `性别：${gender === 'male' ? '男性' : '女性'}` : '性别：未选择'}
${scenario ? `场景：${scenario}` : '场景：未选择'}
${buildPreGenerationDetailDirectives(mainExtraDetail)}

${buildReaderFitDirectives('反向版本')}

${buildAgeEraDirectives(year)}

【创作要求】
- 不要在故事正文开头写"2026年"或任何年份数字。时间背景已经通过卡片标签展示，正文直接从场景描写开始。例如第一句直接写"你关掉台灯，窗外的城市安静下来。"而不是"2026年，你关掉台灯……"
- 根据出生年份，准确锚定时代背景。故事发生的年龄、压力、关系和生活状态必须符合用户当前年龄。
【性别细节要求】
根据用户选择的性别（若已选），在细节描写上可以轻微倾向该性别常见的中性细节（如男性可选：袖口纽扣、下巴线条；女性可选：耳边碎发、指节弧度）。若未选性别，保持完全中性。无论何种情况，不使用"高跟鞋""领带"等强烈性别标签物品。
时间锚点要求：故事发生的时间应为当前年份（2026年）前后，主角年龄 = 2026 - 出生年份。场景需体现"此时此刻"的平行生活。
- 根据关键选择，设定一个与用户现实选择不同的职业或生活状态。
- 即使这是“搞砸了”的版本，也必须从“而是”后面的选择已经发生开始写；困顿、狼狈或失意应来自这条已选择道路之后的现实代价，而不是退回去写“没有”后面的旧路径。
- 核心特质必须贯穿始终，让用户读完后觉得"这确实是我可能会成为的样子"。
- 生成一个360-480字左右的人生切片。不是完整传记，而是一个非常具体、非常现实、能让用户看懂处境的片段。
- 必须包含：一个具体的空间、一个具体的动作、一个能看出处境的小细节、一个让人意识到“这条路确实更难”的生活瞬间。
- 请描绘一个因为某个选择或性格特质而走向更拧巴、更辛苦、更失衡的平行版本，但这种下坠必须是现实里的、日常的，例如关系变淡、工作不顺、长期疲惫、经济吃紧、自我怀疑，而不是极端灾难。要写出“为什么会变难”，不能只写情绪。
- ${gender ? `用第三人称"${gender === 'male' ? '他' : '她'}"写作。` : '用第二人称"你"写作。'}结尾不要总结，不要硬拔高。

【年代细节要求】
根据用户出生年份，推算其10-20岁期间所处的年代（即用户记忆最深刻的青春年代）。在场景描写中，可以自然地融入一个属于那个时代的、但如今已逐渐消失或变得罕见的细节。这个细节要具体、可感知，像一把打开记忆的钥匙。

推算逻辑与范例：
- 若出生于1970-1979年：青春在1980-1990年代。细节如：录像厅手写的今日放映小黑板、窗式空调的滴水声、搪瓷盆底的红双喜图案、翻盖寻呼机别在腰间的重量。
- 若出生于1990-1999年：青春在2000-2010年代。细节如：翻盖手机合上时的清脆啪嗒声、MP3里只存了30首歌的128MB内存、大头贴机器帘子后的闪光灯、Windows XP开机音乐的四个音符。

请根据上述推算，为当前用户选取一个最贴切的、正在消逝的时代细节，并自然地编织进故事场景中。这个细节不需要刻意强调，只需轻轻一笔带过，像不经意间翻到的一页旧日历。

【隐藏要求】
在场景描写中，刻意保留一个用户输入时没明说、但由其特质必然推导出的"微小习惯"或"内心矛盾"。
例如：用户输入"内向、爱钻研、害怕冲突" → 场景中不经意带一句：
"他下意识把手机调成静音，这个习惯从大学用到现在，仿佛铃声一响就意味着有什么需要他立刻回应的事。"

【风格禁忌】
- 不要说教，不要总结人生道理。
- 不要写成“黑暗版人生”或“惨文”，也不要为了反向而故意惩罚用户。
- 不要过分戏剧化，避免车祸、死亡、暴富等极端情节。要像真实生活的切片。
- 不要评价用户的选择好坏，不做价值判断。
- 避免使用"幸福""成功""失败"等抽象评判词，用具体的动作和细节代替。
- 不要写成“惨文”或故作高级的忧郁散文。

【输出格式】
只输出故事正文，不包含任何前缀说明或后缀总结。`;
            }
            // 调用DeepSeek API
            // 调用DeepSeek API（支持不同类型）

/**
 * callDeepSeekAPI
 *
 * @param {any} systemPrompt
 * @param {any} type
 * @returns {Promise|void}
 */
            async function callDeepSeekAPI(systemPrompt, type = 'main') {
                // 检查访问协议
                if (!checkAccessProtocol()) {
                    throw new Error('请通过HTTP服务器访问本应用（如 http://localhost:8000）');
                }
                
                // 温度配置
                const temperatureConfig = {
                    'main': 0.6,       // 主生成：先稳住“像本人”和可读性
                    'reverse': 0.54,   // 反向生成：更克制，避免惩罚式狗血
                    'personal': 0.68   // 私人版本：更服从用户补充事实，减少擅自改写
                };
                
                // 用户消息配置
                const userMessageConfig = {
                    'main': '请直接输出故事正文。不要输出分析过程、用户画像、推理步骤、标题或提示词内容。优先保证看得懂、具体、像这个人；不要写成散文。',
                    'reverse': '请直接输出故事正文。不要输出分析过程、用户画像、推理步骤、标题或提示词内容。写现实代价，不要狗血、不要惩罚用户、不要过度文艺。',
                    'personal': '请直接输出故事正文。不要输出分析过程、用户画像、推理步骤、标题或提示词内容。补充细节必须改变场景、动作和处境，让人明显觉得更像本人。'
                };
                
                // max_tokens配置（根据版本调整）
                const maxTokensConfig = {
                    'main': 900,      // 主生成：允许更多现实信息，但仍控制字数
                    'reverse': 900,   // 反向生成：给代价逻辑更多空间
                    'personal': 1100  // 私人版本：允许完整融入用户补充
                };
                
                // 获取配置
                const temperature = temperatureConfig[type] || 0.8;
                const userMessage = userMessageConfig[type] || '请生成这个平行宇宙人生切片。';
                const maxTokens = maxTokensConfig[type] || 600;
                
                const requestBody = {
                    model: MODEL_NAME,
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    temperature: temperature,
                    max_tokens: maxTokens
                };
                
                try {
                    const apiUrl = getProxyApiUrl();
                    console.log('调用API URL:', apiUrl);
                    
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // Authorization头由后端代理服务器添加
                        },
                        body: JSON.stringify(requestBody)
                    });
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`API请求失败: ${response.status} - ${errorText}`);
                    }
                    
                    const data = await response.json();
                    
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        const cleanedStory = sanitizeGeneratedStory(data.choices[0].message.content);
                        if (!cleanedStory) {
                            throw new Error('AI服务返回内容为空，请稍后重试');
                        }
                        return cleanedStory;
                    } else {
                        throw new Error('API返回格式异常');
                    }
                    
                } catch (error) {
                    console.error('API调用错误:', error);
                    throw error;
                }
            }

            function getCardActionsMarkup(scope = '') {
                const suffix = scope ? ` id="${scope}` : '';
                const collectId = scope ? `${suffix}CollectBtn"` : '';
                const expandId = scope ? `${suffix}ExpandBtn"` : '';
                const downloadId = scope ? `${suffix}DownloadBtn"` : '';
                const shareId = scope ? `${suffix}CopyShareBtn"` : '';

                return `
                            <div class="card-personal-entry">
                                <button class="card-action-btn card-expand-btn"${expandId}>感觉不像你？多告诉我一些细节吧</button>
                            </div>
                            <div class="card-actions">
                                <button class="card-action-btn card-download-btn"${downloadId}>保存图片</button>
                                <button class="card-action-btn card-collect-btn"${collectId}>收藏这个平行宇宙</button>
                                <button class="card-action-btn card-share-btn"${shareId}>分享</button>
                            </div>`;
            }
            
            // 显示结果

/**
 * showResult
 *
 * @param {any} story
 * @returns {Promise|void}
 */
            function showResult(story) {
                // 恢复UI状态
                resetUI();
                
                // 处理彩蛋逻辑
                const easterEgg = processEasterEgg(story, '');
                
                // 设置故事内容（使用和反向生成相同的HTML结构）
                const storyHTML = `
                    <div class="reverse-story-card">
                        <div class="card-content">
                            
                            <!-- 故事正文 -->
                            <div class="story-body">
                                ${formatStory(easterEgg.story)}
                            </div>
                            
                            <!-- 分割线 -->
                            
                            
                            <!-- 结尾小字 -->
                            <div class="story-ending">
                                ${easterEgg.endingNote}
                            </div>
                            
                            <!-- 卡片底部操作 -->
                            ${getCardActionsMarkup()}
                        </div>
                    </div>
                `;
                
                // 显示主生成模态框
                showMainModal(storyHTML, easterEgg);
            }
            
            // 显示主生成模态框

/* ======================================== */
/* 结果展示和动画 */
/* ======================================== */
/* 模态框显示、打字机效果和等待动画 */


/**
 * showMainModal
 *
 * @param {any} storyHTML
 * @param {any} easterEgg
 * @returns {Promise|void}
 */
            function showMainModal(storyHTML, easterEgg) {
                // 关闭所有其他模态框
                const mainModal = document.getElementById('mainModal');
                const reverseModal = document.getElementById('reverseModal');
                if (reverseModal) reverseModal.classList.remove('show');
                
                const mainResultContent = document.getElementById('mainResultContent');
                
                if (!mainModal || !mainResultContent) {
                    console.error('模态框元素不存在！');
                    return;
                }
                
                // 设置主模态框标题为"那边的你"
                const titleElement = mainModal.querySelector('.reverse-result-title');
                if (titleElement) {
                    titleElement.textContent = '那边的你';
                }
                
                // 设置模态框内容
                mainResultContent.innerHTML = storyHTML;
                
                // 添加show class（用于CSS过渡）
                mainModal.classList.add('show');
            }

            window.showMainModal = showMainModal;
            
            // 显示反向生成结果

/* ======================================== */
/* 反向生成功能 */
/* ======================================== */
/* 反向故事生成、结果展示 */


/**
 * showReverseResult
 *
 * @param {any} story
 * @returns {Promise|void}
 */
            function showReverseResult(story) {
                // 恢复UI状态
                resetUI();
                
                // 处理彩蛋逻辑（使用反向生成的结尾）
                const easterEgg = processEasterEgg(story, 'reverse');
                
                // 设置反向故事内容
                const reverseResultContent = document.getElementById('reverseResultContent');
                if (!reverseResultContent) {
                    console.error('reverseResultContent元素不存在！');
                    return;
                }
                
                reverseResultContent.innerHTML = `
                    <div class="reverse-story-card">
                        <div class="card-content">
                            
                            <!-- 故事正文 -->
                            <div class="story-body">
                                ${formatStory(easterEgg.story)}
                            </div>
                            
                            <!-- 分割线 -->
                            
                            
                            <!-- 结尾小字 -->
                            <div class="story-ending">
                                ${easterEgg.endingNote}
                            </div>
                            
                            <!-- 卡片底部操作 -->
                            ${getCardActionsMarkup('reverse')}
                        </div>
                    </div>
                `;
                
                // 显示模态框
                const reverseModal = document.getElementById('reverseModal');
                const mainModal = document.getElementById('mainModal');
                
                // 关闭所有其他模态框
                if (mainModal) mainModal.classList.remove('show');
                
                // 添加show class（用于CSS过渡）
                reverseModal.classList.add('show');
                
                // 初始化反向模态框按钮状态（使用事件委托，不需要独立监听器）
                setTimeout(() => {
                    const reverseCollectBtn = document.getElementById('reverseCollectBtn');
                    if (reverseCollectBtn) {
                        // 检查这个故事是否已经被收藏
                        const existingCollection = findCollectionByStory(easterEgg.story);
                        if (existingCollection) {
                            reverseCollectBtn.classList.add('collected');
                            reverseCollectBtn.textContent = '已放入平行宇宙';
                        }
                    }
                }, 100);
            }
            
            // 卡片落地动画

/**
 * runCardLandingAnimation
 *
 * @param {any} hapticDuration
 * @returns {Promise|void}
 */
            function runCardLandingAnimation(hapticDuration = 10) {
                // 第一阶段：飘落动画（0.6秒）
                resultContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                resultContainer.style.opacity = '1';
                resultContainer.style.transform = 'translateY(0)';
                
                // 滚动到结果区域
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // 等待飘落动画完成
                setTimeout(() => {
                    // 第二阶段：轻微弹动效果
                    resultContainer.style.transition = 'transform 0.15s ease-out';
                    resultContainer.style.transform = 'translateY(-3px)';
                    
                    // 触发轻微振动（如果设备支持），使用传入的时长
                    if (navigator.vibrate) {
                        navigator.vibrate(hapticDuration);
                    }
                    
                    // 弹回原位
                    setTimeout(() => {
                        resultContainer.style.transform = 'translateY(0)';
                        
                        // 动画完成后添加show类（用于CSS动画）
                        setTimeout(() => {
                            resultContainer.classList.add('show');
                            resultContainer.style.transition = ''; // 重置过渡
                        }, 150);
                    }, 150);
                }, 600);
            }
            
            // 格式化故事文本

/**
 * formatStory
 *
 * @param {any} story
 * @returns {Promise|void}
 */
            function formatStory(story) {
                // 确保故事有适当的段落格式
                let formatted = sanitizeGeneratedStory(story);
                
                // 如果故事中没有HTML标签，添加段落标签
                if (!formatted.includes('<') && !formatted.includes('>')) {
                    const paragraphs = formatted
                        .split(/\n+/)
                        .map(paragraph => paragraph.trim())
                        .filter(Boolean);

                    if (paragraphs.length > 1) {
                        formatted = paragraphs
                            .map(paragraph => `<p>${escapeStoryHTML(paragraph)}</p>`)
                            .join('');
                    } else {
                        // 按句子分段，同时保留原本的句末标点，避免全部被强行改成句号。
                        const sentences = formatted.match(/[^。！？!?]+[。！？!?]?/g) || [formatted];
                        formatted = sentences.map(sentence => {
                            const trimmed = sentence.trim();
                            if (trimmed.length > 0) {
                                return `<p>${escapeStoryHTML(trimmed)}</p>`;
                            }
                            return '';
                        }).join('');
                    }
                }
                
                return formatted;
            }
            
            // 处理彩蛋逻辑

/**
 * processEasterEgg
 *
 * @param {any} story
 * @param {any} extraDetail
 * @returns {Promise|void}
 */
            function processEasterEgg(story, extraDetail) {
                const cleanedStory = sanitizeGeneratedStory(story);
                // 生成随机数决定是否触发彩蛋
                const random = Math.random() * 100; // 0-100之间的随机数
                
                // 彩蛋一：一句话平行宇宙（1%概率）
                if (random < 1) {
                    return {
                        type: 'one-line',
                        story: cleanedStory,
                        endingNote: '有些平行宇宙，只需要一句话，就能让你惦记很久。',
                        cardClass: 'one-line-universe'
                    };
                }
                
                // 彩蛋二：狭路相逢（0.5%概率）
                if (random < 1.5) {
                    return {
                        type: 'narrow-encounter',
                        story: cleanedStory,
                        endingNote: '刚才那一秒，你们擦肩而过。',
                        cardClass: 'narrow-encounter',
                        hapticDuration: 15 // 延长触感反馈
                    };
                }
                
                // 无彩蛋
                let endingNote;
                
                if (extraDetail === 'reverse') {
                    // 反向生成的结尾
                    endingNote = '还好，这只是亿万种可能里的一种。你躲过了这一个。';
                } else if (extraDetail) {
                    // 私人版本的结尾
                    endingNote = '这个故事，是用你藏在抽屉里的那些细节写成的。它只属于你。';
                } else {
                    // 普通生成的结尾
                    endingNote = '这只是你亿万种人生可能中的一种。现在的你，也是某个平行宇宙里被羡慕的对象。';
                }
                
                return {
                    type: 'normal',
                    story: cleanedStory,
                    endingNote: endingNote,
                    cardClass: '',
                    hapticDuration: 10
                };
            }
            
            // 处理生成错误

/**
 * handleGenerationError
 *
 * @param {any} error
 * @returns {Promise|void}
 */
            function handleGenerationError(error) {
                // 恢复UI状态
                resetUI();
                
                // 显示详细的错误信息
                let errorMessage = '生成故事时出现错误，请稍后重试。';
                
                if (error.message.includes('API请求失败')) {
                    errorMessage = '无法连接到AI服务，请检查网络连接。';
                } else if (error.message.includes('API返回格式异常')) {
                    errorMessage = 'AI服务返回了异常数据，请稍后重试。';
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = '网络连接失败，请检查网络设置。';
                } else if (error.message.includes('NetworkError')) {
                    errorMessage = '网络错误，请检查网络连接。';
                } else if (error.message.includes('TypeError')) {
                    errorMessage = '请求配置错误，请刷新页面重试。';
                }
                
                // 显示错误
                showError(errorMessage);
                
                // 如果是开发环境，可以显示更详细的错误
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('开发环境，显示详细错误...');
                    setTimeout(() => {
                        alert(`开发调试信息:\n\n错误: ${error.message}\n\n建议:\n1. 检查API Key是否正确\n2. 检查网络连接\n3. 查看浏览器控制台获取更多信息`);
                    }, 100);
                }
            }
            
            // 恢复UI状态

/**
 * resetUI
 *
 * @returns {Promise|void}
 */
            function resetUI() {
                stopTextRotation();

                // 恢复主生成按钮状态
                const generateBtn = document.getElementById('generateBtn');
                generateBtn.disabled = false;
                generateBtn.classList.remove('submitting');
                generateBtn.textContent = '生成我的平行宇宙';
                
                // 恢复私人版本按钮状态
                const personalBtns = document.querySelectorAll('.expand-generate-btn');
                personalBtns.forEach(btn => {
                    btn.disabled = false;
                    btn.textContent = '专属于你的详章';
                });
                
                // 恢复反向生成链接状态
                const reverseGenerateLink = document.getElementById('reverseGenerateLink');
                if (reverseGenerateLink) {
                    reverseGenerateLink.classList.remove('disabled');
                    reverseGenerateLink.style.pointerEvents = '';
                    reverseGenerateLink.style.opacity = '';
                }
                
                // 隐藏加载状态和等待文案
                const loadingElement = document.getElementById('loading');
                const waitingTextElement = document.getElementById('waitingText');
                loadingElement.classList.remove('show');
                waitingTextElement.style.display = 'none';

                hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                hideModalWaitingContent('reverseWaitingContent', 'reverseResultContent');
                
                // 重置卡片样式（在错误发生时）
                const resultContainer = document.getElementById('resultContainer');
                if (resultContainer) {
                    resultContainer.style.opacity = '';
                    resultContainer.style.transform = '';
                    resultContainer.style.transition = '';
                }
            }
            
            // 显示错误信息

/**
 * showError
 *
 * @param {any} message
 * @returns {Promise|void}
 */
            function showError(message, targetElement = null) {
                if (!showError._originalParent) {
                    showError._originalParent = errorContainer.parentElement;
                }

                const fieldGroup = targetElement && targetElement.closest
                    ? targetElement.closest('.form-group, .year-selector-container, .input-section-group')
                    : null;

                if (fieldGroup) {
                    fieldGroup.appendChild(errorContainer);
                    errorContainer.classList.add('field-toast');
                } else if (showError._originalParent && errorContainer.parentElement !== showError._originalParent) {
                    showError._originalParent.appendChild(errorContainer);
                    errorContainer.classList.remove('field-toast');
                }

                errorContainer.textContent = message;
                errorContainer.style.display = 'block';
                errorContainer.classList.add('show', 'toast-show');

                window.clearTimeout(showError._hideTimer);
                showError._hideTimer = window.setTimeout(() => {
                    errorContainer.classList.remove('show', 'toast-show', 'field-toast');
                    errorContainer.style.display = 'none';
                    errorContainer.style.left = '';
                    errorContainer.style.top = '';
                    errorContainer.style.transform = '';
                    if (showError._originalParent && errorContainer.parentElement !== showError._originalParent) {
                        showError._originalParent.appendChild(errorContainer);
                    }
                }, 2000);
            }
            
            // 表单输入框回车键支持
            document.getElementById('traits').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const choicePart1Input = document.getElementById('choicePart1');
                    if (choicePart1Input) {
                        choicePart1Input.focus();
                    } else {
                        document.getElementById('generateBtn').click();
                    }
                }
            });
            
            // 为choicePart1添加Enter键支持
            const choicePart1Input = document.getElementById('choicePart1');
            if (choicePart1Input) {
                choicePart1Input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        document.getElementById('generateBtn').click();
                    }
                });
            }
            
            // 为choicePart2添加Enter键支持
            const choicePart2Input = document.getElementById('choicePart2');
            if (choicePart2Input) {
                choicePart2Input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        document.getElementById('generateBtn').click();
                    }
                });
            }
            
            // 页面加载后自动聚焦到第一个输入框
            document.getElementById('traits').focus();
            
            // 收藏按钮点击事件
            document.addEventListener('click', function(e) {
                // 新卡片收藏按钮点击事件
                if (e.target && e.target.classList.contains('card-collect-btn')) {
                    e.preventDefault();
                    handleCollectClick(e.target);
                }
                
                // 新卡片纸短情长按钮点击事件
                if (e.target && e.target.classList.contains('card-expand-btn')) {
                    e.preventDefault();
                    // 展开或收起补充输入区域
                    const card = e.target.closest('.story-card');
                    if (!card) return;
                    
                    const expandArea = card.querySelector('.expand-area');
                    if (!expandArea) {
                        // 如果还没有展开区域，创建一个
                        createExpandArea(card, e.target);
                    } else {
                        // 切换显示/隐藏
                        const isShowing = expandArea.classList.contains('show');
                        if (isShowing) {
                            expandArea.classList.remove('show');
                            expandArea.hidden = true;
                            e.target.textContent = '感觉不像你？多告诉我一些细节吧';
                        } else {
                            expandArea.hidden = false;
                            expandArea.classList.add('show');
                            e.target.textContent = '收起';
                            
                            // 自动聚焦到输入框
                            const input = expandArea.querySelector('.expand-input');
                            if (input) {
                                setTimeout(() => {
                                    input.focus();
                                }, 300);
                            }
                        }
                    }
                }
                
                // 旧版收藏按钮点击事件（兼容性）
                if (e.target && e.target.classList.contains('collect-btn')) {
                    e.preventDefault();
                    handleCollectClick(e.target);
                }
                
                // 旧版纸短情长链接点击事件（兼容性）
                if (e.target && e.target.classList.contains('expand-link')) {
                    e.preventDefault();
                    handleExpandClick(e.target);
                }
                
                // 生成更私人版本按钮点击事件
                if (e.target && e.target.classList.contains('expand-generate-btn')) {
                    e.preventDefault();
                    e.stopPropagation(); // 阻止事件冒泡
                    console.log('expand-generate-btn 被点击，阻止冒泡');
                    
                    // 使用setTimeout打破可能的同步调用链
                    setTimeout(() => {
                        // 检查按钮是否在卡片内
                        const card = e.target.closest('.story-card, .reverse-story-card');
                        if (card) {
                            // 卡片上的纸短情长按钮
                            const expandArea = card.querySelector('.expand-area');
                            if (expandArea) {
                                console.log('调用 generatePersonalVersionForCard');
                                generatePersonalVersionForCard(card, expandArea);
                            } else {
                                console.error('找不到 expand-area');
                            }
                        } else {
                            // 主生成区域的纸短情长按钮
                            console.log('调用 generatePersonalVersion');
                            generatePersonalVersion();
                        }
                    }, 0);
                }

                if (e.target && e.target.id === 'mainPagePersonalToggleBtn') {
                    e.preventDefault();
                    const expandArea = document.getElementById('mainPageExpandArea');
                    if (!expandArea) {
                        return;
                    }

                    const isShowing = expandArea.classList.contains('show');
                    if (isShowing) {
                        expandArea.classList.remove('show');
                        expandArea.hidden = true;
                        e.target.textContent = '让故事多了解我一点';
                    } else {
                        expandArea.hidden = false;
                        expandArea.classList.add('show');
                        e.target.textContent = '收起补充';

                        const input = expandArea.querySelector('.expand-input');
                        if (input) {
                            setTimeout(() => {
                                input.focus();
                            }, 220);
                        }
                    }
                }
                
                // 我的抽屉链接点击事件
                const collectionLink = e.target.closest('.collection-link');
                if (collectionLink) {
                    e.preventDefault();
                    openCollectionPanel();
                }

                if (e.target && e.target.id === 'headerNoteBtn') {
                    e.preventDefault();
                    showHeaderNoteModal();
                }
                
                // 收藏馆关闭按钮点击事件
                if (e.target && e.target.id === 'collectionClose') {
                    e.preventDefault();
                    closeCollectionPanel();
                }
                
                // 收藏馆遮罩点击事件
                if (e.target && e.target.id === 'collectionOverlay') {
                    closeCollectionPanel();
                }
                // 收藏详情模态框关闭按钮点击事件
                if (e.target && e.target.id === 'collectionDetailClose') {
                    closeCollectionDetail();
                }
                
                // 收藏详情模态框遮罩点击事件
                if (e.target && e.target.id === 'collectionDetailOverlay') {
                    closeCollectionDetail();
                }
                
                // 收藏详情模态框删除按钮点击事件
                if (e.target && e.target.id === 'collectionDetailDelete') {
                    deleteFromDetailModal();
                }
                
            });
            
            // 处理收藏按钮点击

/**
 * handleCollectClick
 *
 * @param {any} button
 * @returns {Promise|void}
 */
            function handleCollectClick(button) {
                // 如果已经收藏，则取消收藏
                if (button.classList.contains('collected')) {
                    const { storyText } = getStoryPartsFromActionButton(button);
                    
                    // 通过故事内容查找收藏项
                    const collection = findCollectionByStory(storyText);
                    if (collection) {
                        // 真正删除收藏
                        deleteCollection(collection.timestamp);
                    }
                    
                    // 更新按钮状态
                    button.classList.remove('collected');
                    button.textContent = '收藏这个平行宇宙';
                    showToast('已从抽屉取出');
                } else {
                    const { cardRoot, storyText, endingNote } = getStoryPartsFromActionButton(button);
                    
                    // 获取用户输入信息
                    const selectedYearItem = document.querySelector('.year-item.selected');
                    const birthYear = selectedYearItem ? selectedYearItem.dataset.year : '2000';
                    const traits = document.getElementById('traits').value.trim();
                    const choicePart1 = document.getElementById('choicePart1').value.trim();
                    const choicePart2 = document.getElementById('choicePart2').value.trim();
                    
                    // 组合关键选择
                    let choice = '';
                    if (choicePart1 && choicePart2) {
                        choice = `如果当时，我没有${choicePart1}，而是${choicePart2}`;
                    } else if (choicePart1) {
                        choice = `如果当时，我没有${choicePart1}`;
                    } else if (choicePart2) {
                        choice = `如果当时，我选择了${choicePart2}`;
                    }
                    
                    // 准备收藏数据
                    const collectionData = {
                        story: storyText,
                        endingNote: endingNote,
                        year: birthYear,
                        traits: traits,
                        choice: choice,
                        timestamp: Date.now()
                    };
                    
                    // 添加到收藏
                    const result = addCollection(collectionData);
                    
                    if (result.success) {
                        // 更新按钮状态
                        button.classList.add('collected');
                        button.textContent = '已放入抽屉';
                        
                        // 卡片缩小动画（支持新旧卡片结构）
                        if (cardRoot) {
                            cardRoot.style.transition = 'transform 0.2s ease';
                            cardRoot.style.transform = 'scale(0.98)';
                            
                            setTimeout(() => {
                                cardRoot.style.transform = 'scale(1)';
                            }, 200);
                        }
                        
                        // 显示提示
                        showToast(result.message);
                    } else {
                        // 已存在，只显示提示
                        showToast(result.message);
                        
                        // 短暂显示已收藏状态
                        button.classList.add('collected');
                        button.textContent = '已放入抽屉';
                        setTimeout(() => {
                            button.classList.remove('collected');
                            button.textContent = '收藏这个平行宇宙';
                        }, 1500);
                    }
                }
            }
            
            // 处理纸短情长点击

/**
 * handleExpandClick
 *
 * @param {any} link
 * @returns {Promise|void}
 */
            function handleExpandClick(link) {
                const expandArea = link.closest('.story-card').querySelector('.expand-area');
                if (expandArea) {
                    const isShowing = expandArea.classList.contains('show');
                    
                    if (isShowing) {
                        expandArea.classList.remove('show');
                        link.textContent = '感觉不像你？多告诉我一些细节吧。';
                    } else {
                        expandArea.classList.add('show');
                        link.textContent = '收起';
                        
                        // 自动聚焦到输入框
                        const input = expandArea.querySelector('.expand-input');
                        if (input) {
                            setTimeout(() => {
                                input.focus();
                            }, 300);
                        }
                        
                        // 显示轻柔提示
                        const hint = expandArea.querySelector('.gentle-hint');
                        if (hint) {
                            setTimeout(() => {
                                hint.classList.add('show');
                            }, 500);
                        }
                    }
                }
            }
            // 创建展开区域

/**
 * createExpandArea
 *
 * @param {any} card
 * @param {any} expandBtn
 * @returns {Promise|void}
 */
            function createExpandArea(card, expandBtn) {
                console.log('创建展开区域，卡片:', card);
                
                // 检查是否已经存在展开区域
                const existingExpandArea = card.querySelector('.expand-area');
                if (existingExpandArea) {
                    console.log('展开区域已存在，切换显示状态');
                    const isShowing = existingExpandArea.classList.contains('show');
                    if (isShowing) {
                        existingExpandArea.classList.remove('show');
                        existingExpandArea.hidden = true;
                        expandBtn.textContent = '感觉不像你？多告诉我一些细节吧';
                    } else {
                        existingExpandArea.hidden = false;
                        existingExpandArea.classList.add('show');
                        expandBtn.textContent = '收起';
                    }
                    return;
                }
                
                // 创建展开区域
                const expandArea = document.createElement('div');
                expandArea.className = 'expand-area';
                expandArea.innerHTML = `
                    <div class="expand-content">
                        <textarea class="expand-input" placeholder="如果你愿意，可以再告诉我一些你的近况、住处、工作、爱好或心事。反正什么都好。"></textarea>
                        <div class="expand-hint">可以不回答，但回答了故事会更像你。</div>
                        <div class="expand-actions">
                            <button class="expand-generate-btn">专属于你的详章</button>
                        </div>
                    </div>
                `;
                
                // 插入到卡片内容内部，避免移动端模态框滚动时只露出一半。
                const cardContent = card.querySelector('.card-content');
                if (cardContent) {
                    const actions = cardContent.querySelector('.card-actions');
                    if (actions) {
                        cardContent.insertBefore(expandArea, actions);
                    } else {
                        cardContent.appendChild(expandArea);
                    }
                } else {
                    card.appendChild(expandArea);
                }
                
                // 按钮已经通过全局事件监听器处理，无需单独添加事件监听器
                
                // 显示展开区域
                expandArea.hidden = false;
                expandArea.classList.add('show');
                expandBtn.textContent = '收起';
                
                // 自动聚焦到输入框
                const input = expandArea.querySelector('.expand-input');
                if (input) {
                    setTimeout(() => {
                        input.focus();
                    }, 300);
                }
            }
            
            // 为特定卡片生成更私人的版本

/**
 * generatePersonalVersionForCard
 *
 * @param {any} card
 * @param {any} expandArea
 * @returns {Promise|void}
 */
            // 防止递归的执行标志
            let isGeneratingCardPersonalVersion = false;
            
            async function generatePersonalVersionForCard(card, expandArea) {
                console.log('🔍 generatePersonalVersionForCard 被调用');
                console.trace('完整的调用堆栈');
                
                // 如果已经在执行，直接返回
                if (isGeneratingCardPersonalVersion) {
                    console.error('⚠️ 函数已经在执行中，阻止递归调用');
                    // 抛出一个错误来查看堆栈
                    throw new Error('递归调用被阻止 - 查看堆栈跟踪');
                }
                
                // 设置执行标志
                isGeneratingCardPersonalVersion = true;
                
                try {
                    console.log('开始生成卡片私人版本，检查卡片数据...');
                    
                    // 尝试从卡片中获取原始数据
                    const yearElement = card.querySelector('.card-year');
                    let birthYear = yearElement ? yearElement.textContent.replace('年', '') : '';
                    
                    const traitsElement = card.querySelector('.card-traits');
                    let traits = traitsElement ? traitsElement.textContent.replace('核心特质：', '').trim() : '';
                    
                    const choiceElement = card.querySelector('.card-choice');
                    let choice = choiceElement ? choiceElement.textContent.trim() : '';
                    
                    // 如果卡片中没有数据，尝试从当前表单中获取
                    if (!birthYear || !traits || !choice) {
                        console.log('卡片中缺少数据，尝试从表单获取...');
                        
                        // 从当前表单获取年份
                        const selectedYearItem = document.querySelector('.year-item.selected');
                        if (selectedYearItem && selectedYearItem.dataset.year) {
                            birthYear = selectedYearItem.dataset.year;
                        }
                        
                        // 从当前表单获取特质
                        const traitsInput = document.getElementById('traits');
                        if (traitsInput && traitsInput.value) {
                            traits = traitsInput.value.trim();
                        }
                        
                        // 从当前表单获取选择
                        const choicePart1 = document.getElementById('choicePart1');
                        const choicePart2 = document.getElementById('choicePart2');
                        if (choicePart1 && choicePart1.value && choicePart2 && choicePart2.value) {
                            choice = `如果当时，我没有${choicePart1.value.trim()}，而是${choicePart2.value.trim()}`;
                        } else if (choicePart1 && choicePart1.value) {
                            choice = `如果当时，我没有${choicePart1.value.trim()}`;
                        } else if (choicePart2 && choicePart2.value) {
                            choice = `如果当时，我选择了${choicePart2.value.trim()}`;
                        }
                    }
                    
                    // 如果仍然没有数据，使用默认值
                    if (!birthYear) birthYear = '2000';
                    if (!traits) traits = '未指定';
                    if (!choice) choice = '未指定';
                    
                    // 获取性别信息（与主生成保持一致）
                    let gender = null;
                    const selectedGenderSymbol = document.querySelector('.gender-symbol.selected');
                    gender = selectedGenderSymbol ? selectedGenderSymbol.dataset.gender : null;
                    
                    // 获取场景信息
                    const scenario = getSelectedChoiceScenario();
                    
                    console.log('最终使用的数据:', { birthYear, traits, choice, gender, scenario });
                    
                    // 获取补充细节
                    const input = expandArea.querySelector('.expand-input');
                    const extraDetail = input ? input.value.trim() : '';
                    const normalizedExtraDetail = extraDetail || '用户没有额外补充细节，请根据已有信息把故事写得更贴近日常、更私人。';
                    
                    // 禁用按钮
                    const generateBtn = expandArea.querySelector('.expand-generate-btn');
                    const originalText = generateBtn.textContent;
                    generateBtn.textContent = '生成中...';
                    generateBtn.disabled = true;

                    const isFromReverseModal = card.closest('#reverseModal') !== null;
                    if (isFromReverseModal) {
                        hideReverseModalCompletely();
                    }

                    setModalTitle('mainModal', '独属于你的底片');
                    showModalWaitingContent('mainModal', 'mainWaitingContent', 'mainResultContent');
                    startTextRotation('personal', document.getElementById('mainWaitingText'), document.getElementById('mainProgressBar'));
                    
                    // 构建系统Prompt（包含补充细节、性别和场景）
                    const mainExtraDetail = getMainPageExtraDetail();
                    const systemPrompt = buildPersonalSystemPrompt(birthYear, traits, choice, normalizedExtraDetail, gender, scenario, mainExtraDetail);
                    
                    // 调用真实 API，并保持至少 10 秒沉浸式等待
                    const apiCallPromise = callDeepSeekAPI(systemPrompt, 'personal');
                    const animationPromise = runConcurrentAnimation(birthYear);
                    const [story] = await Promise.all([apiCallPromise, animationPromise]);

                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                    
                    // 收起展开区域
                    expandArea.classList.remove('show');
                    const expandBtn = card.querySelector('.card-expand-btn');
                    if (expandBtn) {
                        expandBtn.textContent = '感觉不像你？多告诉我一些细节吧';
                    }
                    
                    // 恢复按钮
                    generateBtn.textContent = originalText;
                    generateBtn.disabled = false;
                    
                    console.log('更私人的版本已生成');
                    
                    // 在模态框中展示私人版本
                    showPersonalModal(story, extraDetail);
                    
                } catch (error) {
                    console.error('生成私人版本失败:', error);
                    
                    // 提供更具体的错误信息
                    let errorMessage = '生成失败，请重试';
                    if (error.message && error.message.includes('API请求失败')) {
                        errorMessage = 'API请求失败，请检查网络连接';
                    } else if (error.message && error.message.includes('timeout')) {
                        errorMessage = '生成超时，请稍后重试';
                    } else if (error.message && error.message.includes('请通过HTTP服务器访问')) {
                        errorMessage = '请通过 http://localhost:8000 访问应用';
                    }
                    
                    console.error('详细错误:', error.message);
                    alert(errorMessage);
                    
                    // 恢复按钮
                    const generateBtn = expandArea.querySelector('.expand-generate-btn');
                    if (generateBtn) {
                        generateBtn.textContent = '专属于你的详章';
                        generateBtn.disabled = false;
                    }

                    stopTextRotation();
                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                    deactivateMainModalImmersion(true);
                }
                
                // 重置执行标志
                isGeneratingCardPersonalVersion = false;
            }
            
            // 更新卡片内容为私人版本

/**
 * updateCardWithPersonalStory
 *
 * @param {any} card
 * @param {any} story
 * @param {any} extraDetail
 * @returns {Promise|void}
 */
            function updateCardWithPersonalStory(card, story, extraDetail) {
                // 更新故事内容
                const storyElement = card.querySelector('.card-story');
                if (storyElement) {
                    storyElement.innerHTML = formatStory(story);
                    
                    // 添加首字下沉效果
                    const firstParagraph = storyElement.querySelector('p');
                    if (firstParagraph && firstParagraph.textContent.trim().length > 0) {
                        firstParagraph.classList.add('first-paragraph');
                    }
                }
                
                // 更新结尾小字
                const footnote = card.querySelector('.card-footnote');
                if (footnote) {
                    footnote.textContent = '这个故事，是用你藏在抽屉里的那些细节写成的。它只属于你。';
                }
                
                // 标记为私人版本
                card.dataset.personalVersion = 'true';
                card.dataset.extraDetail = extraDetail;
            }
            
            // 构建私人版本系统Prompt

/**
 * buildPersonalSystemPrompt
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @param {any} extraDetail
 * @param {any} gender
 * @returns {Promise|void}
 */
            function buildPersonalSystemPrompt(year, traits, choice, extraDetail, gender = null, scenario = null, mainExtraDetail = '') {
                return `你是一位擅长把“用户给出的零碎细节”真正写进故事里的作者。你的目标是让用户明显感觉到：这一版比刚才更像我本人。

现在，请为一个用户生成一个"平行宇宙人生切片"。

【用户信息】
出生年份：${year}
核心特质：${traits}
关键选择：${choice}
${describeChoiceDirection(choice)}
主界面补充：${mainExtraDetail || '未填写'}
私人版本补充：${extraDetail}
${gender ? `性别：${gender === 'male' ? '男性' : '女性'}` : '性别：未选择'}
${scenario ? `场景：${scenario}` : '场景：未选择'}

${buildReaderFitDirectives('私人版本')}

${buildAgeEraDirectives(year)}

${buildPersonalContextPriorityDirectives(extraDetail, mainExtraDetail)}

${buildPersonalDetailDirectives(extraDetail)}

【创作要求】
- 不要在故事正文开头写"2026年"或任何年份数字。时间背景已经通过卡片标签展示，正文直接从场景描写开始。例如第一句直接写"你关掉台灯，窗外的城市安静下来。"而不是"2026年，你关掉台灯……"
- 根据出生年份，准确锚定时代背景。故事发生的年龄、压力、关系和生活状态必须符合用户当前年龄。
【性别细节要求】
根据用户选择的性别（若已选），在细节描写上可以轻微倾向该性别常见的中性细节（如男性可选：袖口纽扣、下巴线条；女性可选：耳边碎发、指节弧度）。若未选性别，保持完全中性。无论何种情况，不使用"高跟鞋""领带"等强烈性别标签物品。
时间锚点要求：故事发生的时间应为当前年份（2026年）前后，主角年龄 = 2026 - 出生年份。场景需体现"此时此刻"的平行生活。
- 根据关键选择，设定一个与用户现实选择不同的职业或生活状态。
- 私人版本里，补充细节是新的最高事实。若补充细节与“而是”后面的选择冲突，以补充细节为准；“而是”后面的选择只能作为曾经生成过的设定、旧前提或对照，不得强行决定主角现在的状态。
- 核心特质必须贯穿始终，让用户读完后觉得"这确实是我可能会成为的样子"。
- 生成一个520-700字左右的人生切片。不是完整传记，而是一个更完整、更贴近这个人的现实片段，但不要为了变长而重复抒情。
- 必须让补充细节真正起作用，而不是只被轻轻提一句。它应该至少影响两处内容：场景里的具体物件/动作，以及主角当下的关系、压力或生活状态。补充细节与模型推断冲突时，一律以补充细节为准。
- 优先写“这个人具体是怎么生活的”：住在哪、做什么、和谁来往、在为什么事发愁、平时有什么习惯、什么东西会戳到他/她。
- 可以比主版本更细腻一点，但依然要自然，不要堆砌漂亮句子。私人版的“更像本人”来自细节命中，不来自更文艺。
- 用第二人称"你"写作。结尾可以留下余味，但不要为了文学感而故意写得虚。
- 请将用户提供的补充细节（如一件物品、一个习惯、一个场景、一段关系、一种长期心事）自然地编织进故事中，让读者能明显看出“这版为什么更像本人”。

【隐藏要求】
在场景描写中，刻意保留一个用户输入时没明说、但由其特质必然推导出的"微小习惯"或"内心矛盾"。
例如：用户输入"内向、爱钻研、害怕冲突" → 场景中不经意带一句：
"他下意识把手机调成静音，这个习惯从大学用到现在，仿佛铃声一响就意味着有什么需要他立刻回应的事。"

【风格禁忌】
- 不要说教，不要总结人生道理。
- 不要把补充细节当作金句素材，不要围绕它空泛抒情。
- 不要过分戏剧化，避免车祸、死亡、暴富等极端情节。要像真实生活的切片。
- 不要评价用户的选择好坏，不做价值判断。
- 避免使用"幸福""成功""失败"等抽象评判词，用具体的动作和细节代替。
- 不要写成过度文艺的独白，不要只顾氛围忽略“像本人”。

【输出格式】
只输出故事正文，不包含任何前缀说明或后缀总结。`;
            }
            
            // 生成更私人的版本

/**
 * generatePersonalVersion
 *
 * @returns {Promise|void}
 */
            async function generatePersonalVersion() {
                try {
                    if (!validateSupplementPrerequisites()) {
                        return;
                    }

                    // 获取用户输入
                    const selectedYearItem = document.querySelector('.year-item.selected');
                    const birthYear = selectedYearItem ? selectedYearItem.dataset.year : '2000';
                    const traits = document.getElementById('traits').value.trim();
                    const choicePart1 = document.getElementById('choicePart1').value.trim();
                    const choicePart2 = document.getElementById('choicePart2').value.trim();
                    
                    // 获取性别选择
                    const selectedGenderSymbol = document.querySelector('.gender-symbol.selected');
                    const gender = selectedGenderSymbol ? selectedGenderSymbol.dataset.gender : null;
                    
                    // 获取场景选择
                    const scenario = getSelectedChoiceScenario();
                    
                    // 组合关键选择
                    let choice = '';
                    if (choicePart1 && choicePart2) {
                        choice = `如果当时，我没有${choicePart1}，而是${choicePart2}`;
                    } else if (choicePart1) {
                        choice = `如果当时，我没有${choicePart1}`;
                    } else if (choicePart2) {
                        choice = `如果当时，我选择了${choicePart2}`;
                    }
                    
                    // 获取补充细节
                    const expandArea = document.querySelector('.main-page-expand-area.show') || document.querySelector('.expand-area.show');
                    let extraDetail = '';
                    if (expandArea) {
                        const input = expandArea.querySelector('.expand-input');
                        extraDetail = input ? input.value.trim() : '';
                    }
                    
                    // 禁用按钮
                    const generateBtn = document.getElementById('generateBtn');
                    const personalBtn = expandArea ? expandArea.querySelector('.expand-generate-btn') : null;
                    generateBtn.disabled = true;
                    if (personalBtn) personalBtn.disabled = true;
                    
                    // 收起展开区域
                    const mainPageToggleBtn = document.getElementById('mainPagePersonalToggleBtn');
                    const expandLink = document.querySelector('.expand-link');
                    if (expandArea) {
                        expandArea.classList.remove('show');
                        expandArea.hidden = true;
                        if (expandArea.classList.contains('main-page-expand-area')) {
                            if (mainPageToggleBtn) {
                                mainPageToggleBtn.textContent = '让故事多了解我一点';
                            }
                        } else if (expandLink) {
                            expandLink.textContent = '感觉不像你？多告诉我一些细节吧。';
                        }
                    }
                    
                    setModalTitle('mainModal', '独属于你的底片');
                    showModalWaitingContent('mainModal', 'mainWaitingContent', 'mainResultContent');
                    startTextRotation('personal', document.getElementById('mainWaitingText'), document.getElementById('mainProgressBar'));
                    
                    // 构建系统Prompt（包含补充细节）
                    const mainExtraDetail = getMainPageExtraDetail();
                    const systemPrompt = buildPersonalSystemPrompt(birthYear, traits, choice, extraDetail, gender, scenario, mainExtraDetail);
                    
                    // 调用DeepSeek API
                    const apiCallPromise = callDeepSeekAPI(systemPrompt, 'personal');
                    const animationPromise = runConcurrentAnimation(birthYear);
                    const [story] = await Promise.all([apiCallPromise, animationPromise]);

                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                    
                    // 主界面补充入口也统一走模态框展示链路，避免结果显示和关闭状态不一致。
                    showPersonalModal(story, extraDetail);
                    
                } catch (error) {
                    // 处理错误
                    stopTextRotation();
                    hideModalWaitingContent('mainWaitingContent', 'mainResultContent');
                    deactivateMainModalImmersion(true);
                    handleGenerationError(error);
                    
                    // 恢复按钮状态
                    const generateBtn = document.getElementById('generateBtn');
                    const activeExpandArea = document.querySelector('.main-page-expand-area') || document.querySelector('.expand-area.show');
                    const personalBtn = activeExpandArea ? activeExpandArea.querySelector('.expand-generate-btn') : null;
                    generateBtn.disabled = false;
                    if (personalBtn) personalBtn.disabled = false;
                }
            }
            
            // 构建私人版本的系统Prompt

/**
 * buildPersonalSystemPrompt
 *
 * @param {any} year
 * @param {any} traits
 * @param {any} choice
 * @param {any} extraDetail
 * @returns {Promise|void}
 */

            
            // 显示私人版本模态框

/**
 * showPersonalModal
 *
 * @param {any} story
 * @param {any} extraDetail
 * @returns {Promise|void}
 */
            function showPersonalModal(story, extraDetail) {
                // 关闭所有其他模态框
                const mainModal = document.getElementById('mainModal');
                if (mainModal) mainModal.classList.remove('show');
                hideReverseModalCompletely();
                
                // 恢复UI状态
                resetUI();
                
                // 处理彩蛋逻辑
                const easterEgg = processEasterEgg(story, extraDetail);
                
                // 使用主模态框展示私人版本
                const modal = document.getElementById('mainModal');
                const resultContent = document.getElementById('mainResultContent');
                
                if (!modal || !resultContent) {
                    console.error('模态框元素不存在！');
                    return;
                }
                
                // 设置私人版本模态框标题为"独属于你的底片"
                const titleElement = modal.querySelector('.reverse-result-title');
                if (titleElement) {
                    titleElement.textContent = '独属于你的底片';
                }
                
                // 设置模态框内容（和主生成/反向生成相同的结构）
                resultContent.innerHTML = `
                    <div class="reverse-story-card">
                        <div class="card-content">
                            
                            <!-- 故事正文 -->
                            <div class="story-body">
                                ${formatStory(easterEgg.story)}
                            </div>
                            
                            <!-- 分割线 -->
                            
                            
                            <!-- 结尾小字 -->
                            <div class="story-ending">
                                ${easterEgg.endingNote}
                            </div>
                            
                            <!-- 卡片底部操作 -->
                            ${getCardActionsMarkup()}
                        </div>
                    </div>
                `;
                
                // 添加show class（用于CSS过渡）
                modal.classList.add('show');
                
                // 初始化收藏按钮状态
                setTimeout(() => {
                    const collectBtn = resultContent.querySelector('.card-collect-btn');
                    if (collectBtn) {
                        const existingCollection = findCollectionByStory(easterEgg.story);
                        if (existingCollection) {
                            collectBtn.classList.add('collected');
                            collectBtn.textContent = '已放入平行宇宙';
                        }
                    }
                }, 100);
            }

            // 暴露给补丁脚本，避免跨文件修复因作用域问题失效
            window.showPersonalModal = showPersonalModal;
            window.generatePersonalVersionForCard = generatePersonalVersionForCard;

            // 显示私人版本的结果（保留用于兼容性）

/* ======================================== */
/* 私人版本功能 */
/* ======================================== */
/* 私人故事生成、细节扩展 */


/**
 * showPersonalResult
 *
 * @param {any} story
 * @param {any} extraDetail
 * @returns {Promise|void}
 */
            function showPersonalResult(story, extraDetail) {
                // 恢复UI状态
                resetUI();
                
                // 处理彩蛋逻辑
                const easterEgg = processEasterEgg(story, extraDetail);
                
                const resultContent = document.getElementById('resultContent');
                const resultContainer = document.getElementById('resultContainer');
                
                resultContent.innerHTML = `
                    <div class="parallel-card">
                        <div class="card-content">
                            
                            <!-- 故事正文 -->
                            <div class="story-body">
                                ${formatStory(easterEgg.story)}
                            </div>
                            
                            <!-- 分割线 -->
                            
                            
                            <!-- 结尾小字 -->
                            <div class="story-ending">
                                ${easterEgg.endingNote}
                            </div>
                            
                            <!-- 卡片底部操作 -->
                            ${getCardActionsMarkup()}
                        </div>
                    </div>
                `;
                
                // 显示卡片容器
                resultContainer.style.display = 'block';
                
                // 触发淡入和上浮动画
                setTimeout(() => {
                    resultContainer.classList.add('show');
                }, 10);
                
                // 滚动到结果区域
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // 生成专属金句（临时实现，后续需要API支持）
            /**
             * generateEndingQuote
             *
             * @param {any} storyText
             * @returns {Promise|void}
             */
            function generateEndingQuote(storyText) {
                // 临时实现：从故事中提取关键词生成金句
                // 后续需要修改API，让AI返回专属金句
                
                const quotes = [
                    "他关掉灯，听见了十年前那场雨。",
                    "窗外的梧桐叶，落了一地无人问津的黄昏。",
                    "她终于明白，有些路只能一个人走。",
                    "时间停在那一刻，像一张发黄的老照片。",
                    "如果当时，也许会有不同的结局。",
                    "平行宇宙里，每一个选择都开出了花。",
                    "岁月静好，只是当时已惘然。",
                    "那个夏天，永远停在了记忆里。",
                    "人生如戏，只是没有彩排的机会。",
                    "时光荏苒，唯有回忆永恒。"
                ];
                
                // 根据故事文本选择最合适的金句
                const storyLower = storyText.toLowerCase();
                
                if (storyLower.includes('雨') || storyLower.includes('下雨')) {
                    return quotes[0];
                } else if (storyLower.includes('黄昏') || storyLower.includes('夕阳')) {
                    return quotes[1];
                } else if (storyLower.includes('路') || storyLower.includes('选择')) {
                    return quotes[2];
                } else if (storyLower.includes('照片') || storyLower.includes('记忆')) {
                    return quotes[3];
                } else if (storyLower.includes('如果') || storyLower.includes('当时')) {
                    return quotes[4];
                } else if (storyLower.includes('宇宙') || storyLower.includes('平行')) {
                    return quotes[5];
                } else if (storyLower.includes('岁月') || storyLower.includes('时间')) {
                    return quotes[6];
                } else if (storyLower.includes('夏天') || storyLower.includes('季节')) {
                    return quotes[7];
                } else if (storyLower.includes('人生') || storyLower.includes('戏')) {
                    return quotes[8];
                }
                
                // 默认返回第一个
                return quotes[0];
            }
            
            // 显示提示消息

/**
 * showToast
 *
 * @param {any} message
 * @returns {Promise|void}
 */
            function showToast(message) {
                // 移除已有的提示
                const existingToast = document.querySelector('.collect-toast');
                if (existingToast) {
                    existingToast.remove();
                }
                
                // 创建新的提示
                const toast = document.createElement('div');
                toast.className = 'collect-toast';
                toast.textContent = message;
                document.body.appendChild(toast);
                toast.style.zIndex = '2147483647';
                
                // 显示提示
                setTimeout(() => {
                    toast.classList.add('show');
                }, 10);
                
                // 2秒后隐藏并移除
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.remove();
                        }
                    }, 300);
                }, 2000);
            }
            
            // 显示收藏成功提示

/**
 * showCollectionSuccess
 *
 * @returns {Promise|void}
 */
            function showCollectionSuccess() {
                showToast('已放入抽屉');
            }
            
            // 分享功能 - 简化版本

/* ======================================== */
/* 分享功能模块 */
/* ======================================== */
/* 故事卡片截图、图片分享和社交分享 */


/**
 * shareStoryCard
 *
 * @param {any} cardElement
 * @returns {Promise|void}
 */
            function shareStoryCard(cardElement) {
                console.log('=== 分享功能开始 ===');
                const shareLandingUrl = 'https://my-ruguods-app-1.onrender.com';
                const shareQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(shareLandingUrl)}`;
                
                // 检查html2canvas
                if (typeof html2canvas === 'undefined') {
                    console.error('html2canvas未加载');
                    showToast('请刷新页面重试');
                    return;
                }
                
                // 获取分享按钮
                const shareBtn = cardElement.querySelector('.card-download-btn');
                if (!shareBtn) {
                    console.error('未找到保存图片按钮');
                    return;
                }
                
                // 保存原始文本并更新状态
                const originalText = shareBtn.textContent;
                shareBtn.textContent = '生成中...';
                shareBtn.disabled = true;
                
                // 提取故事内容
                const storyBody = cardElement.querySelector('.story-body');
                const storyEnding = cardElement.querySelector('.story-ending');
                
                if (!storyBody) {
                    console.error('未找到故事内容');
                    shareBtn.textContent = originalText;
                    shareBtn.disabled = false;
                    showToast('无法生成分享图');
                    return;
                }
                
                // 获取故事文本
                const storyText = storyBody.innerHTML;
                const endingText = storyEnding ? storyEnding.textContent : '';
                
                // 生成专属金句（这里先使用固定金句，后续需要修改API返回）
                const endingQuote = generateEndingQuote(storyText);
                
                // 创建专门的分享卡片容器
                const shareContainer = document.createElement('div');
                shareContainer.className = 'share-card-container';
                
                // 构建分享卡片HTML
                shareContainer.innerHTML = `
                    <div class="share-card-content">
                        <!-- 故事正文 -->
                        <div class="share-story-body">
                            ${storyText}
                        </div>
                        
                        <!-- 专属金句 -->
                        <div class="share-ending-quote">
                            ${endingQuote}
                        </div>
                        
                        <!-- 底部信息 -->
                        <div class="share-footer">
                            <div class="share-signature">
                                —— 来自「如果当时」· 平行宇宙生成器
                            </div>
                            <div class="share-qrcode">
                                <img
                                    class="share-qrcode-image"
                                    src="${shareQrImageUrl}"
                                    alt="如果当时分享二维码"
                                    crossorigin="anonymous"
                                    referrerpolicy="no-referrer"
                                />
                            </div>
                            <div class="share-url">
                                ${shareLandingUrl}
                            </div>
                        </div>
                    </div>
                `;
                
                // 添加到页面（隐藏位置）
                shareContainer.style.position = 'fixed';
                shareContainer.style.top = '-10000px';
                shareContainer.style.left = '-10000px';
                document.body.appendChild(shareContainer);
                
                // 使用html2canvas生成图片 - 优化参数
                const html2canvasOptions = {
                    // 固定3:4比例
                    width: 1080,
                    height: 1440,
                    scale: 2, // 高质量
                    useCORS: true,
                    backgroundColor: '#FCF9F2',
                    logging: false,
                    allowTaint: true,
                    onclone: function(clonedDoc) {
                        // 确保分享卡片样式正确应用
                        const clonedCard = clonedDoc.querySelector('.share-card-container');
                        if (clonedCard) {
                            // 确保首字下沉效果
                            const firstParagraph = clonedCard.querySelector('.share-story-body > p:first-of-type');
                            if (firstParagraph) {
                                const text = firstParagraph.textContent;
                                if (text && text.length > 0) {
                                    const firstChar = text.charAt(0);
                                    const restText = text.slice(1);
                                    
                                    // 清空段落内容
                                    firstParagraph.innerHTML = '';
                                    
                                    // 创建首字下沉元素
                                    const dropCap = document.createElement('span');
                                    dropCap.style.cssText = `
                                        font-size: 5em;
                                        font-weight: 450;
                                        color: #A17F6A;
                                        float: left;
                                        margin-right: 20px;
                                        line-height: 0.75;
                                        font-family: 'Noto Serif SC', 'Georgia', serif;
                                        margin-top: 12px;
                                        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
                                        padding-right: 8px;
                                        border-right: 3px solid rgba(161, 127, 106, 0.3);
                                    `;
                                    dropCap.textContent = firstChar;
                                    
                                    // 创建剩余文本元素
                                    const restSpan = document.createElement('span');
                                    restSpan.textContent = restText;
                                    
                                    // 添加到段落
                                    firstParagraph.appendChild(dropCap);
                                    firstParagraph.appendChild(restSpan);
                                }
                            }
                        }
                    }
                };
                
                console.log('html2canvas配置:', html2canvasOptions);

                let hasRenderedShareCanvas = false;
                const renderShareCanvas = () => {
                    if (hasRenderedShareCanvas) {
                        return;
                    }
                    hasRenderedShareCanvas = true;

                    html2canvas(shareContainer, html2canvasOptions).then(canvas => {
                    console.log('分享卡片图片生成成功，尺寸:', canvas.width, 'x', canvas.height);
                    
                    // 清理分享容器
                    shareContainer.remove();
                    
                    // 转换为图片URL
                    const imageUrl = canvas.toDataURL('image/png');
                    
                    // 尝试触发下载
                    try {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = imageUrl;
                        downloadLink.download = '我的平行宇宙.png';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        
                        showToast('图片已保存到本地');
                    } catch (error) {
                        console.log('下载失败，显示图片预览:', error);
                        
                        // 如果不支持下载，显示图片预览
                        const previewContainer = document.createElement('div');
                        previewContainer.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.8);
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            z-index: 99999;
                        `;
                        
                        const previewImg = document.createElement('img');
                        previewImg.src = imageUrl;
                        previewImg.style.cssText = `
                            max-width: 80%;
                            max-height: 70%;
                            border: 2px solid white;
                            box-shadow: 0 0 20px rgba(0,0,0,0.5);
                        `;
                        previewImg.alt = '分享图预览';
                        
                        const previewText = document.createElement('div');
                        previewText.style.cssText = `
                            color: white;
                            margin-top: 20px;
                            font-size: 16px;
                            text-align: center;
                            padding: 0 20px;
                        `;
                        previewText.textContent = '长按图片保存到相册';
                        
                        previewContainer.appendChild(previewImg);
                        previewContainer.appendChild(previewText);
                        
                        // 点击关闭
                        previewContainer.addEventListener('click', function() {
                            previewContainer.remove();
                        });
                        
                        document.body.appendChild(previewContainer);
                    }
                    
                    // 更新按钮状态为已生成
                    shareBtn.textContent = '已保存';
                    window.setTimeout(() => {
                        shareBtn.textContent = originalText;
                        shareBtn.disabled = false;
                        shareBtn.classList.remove('disabled');
                    }, 1400);
                    
                    }).catch(error => {
                    console.error('生成失败:', error);
                    
                    // 清理分享容器
                    if (shareContainer.parentNode) {
                        shareContainer.remove();
                    }
                    
                    // 恢复按钮（失败时恢复为可点击状态）
                    shareBtn.textContent = originalText;
                    shareBtn.disabled = false;
                    shareBtn.classList.remove('disabled');
                    
                    // 显示更友好的错误提示
                    let errorMessage = '生成失败，请重试';
                    
                    if (error.message && error.message.includes('memory')) {
                        errorMessage = '图片太大，请尝试在电脑上分享';
                    } else if (error.message && error.message.includes('timeout')) {
                        errorMessage = '生成超时，请稍后重试';
                    } else if (error.message && error.message.includes('canvas')) {
                        errorMessage = '浏览器不支持此功能，请尝试其他浏览器';
                    }
                    
                    showToast(errorMessage);
                    console.error('分享功能详细错误:', error);
                    });
                };

                const qrImage = shareContainer.querySelector('.share-qrcode-image');
                if (qrImage && !qrImage.complete) {
                    qrImage.addEventListener('load', renderShareCanvas, { once: true });
                    qrImage.addEventListener('error', renderShareCanvas, { once: true });
                    setTimeout(renderShareCanvas, 1500);
                } else {
                    renderShareCanvas();
                }
            }
            
            // 创建图片预览浮层 - 简化版本

/**
 * createImagePreview
 *
 * @param {any} imageUrl
 * @returns {Promise|void}
 */
            function createImagePreview(imageUrl) {
                console.log('创建图片预览');
                
                // 创建简单的图片显示
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 80%;
                    max-height: 80%;
                    border: 2px solid white;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                    z-index: 99999;
                `;
                img.alt = '分享图预览';
                
                // 点击图片关闭
                img.addEventListener('click', function() {
                    img.remove();
                });
                
                document.body.appendChild(img);
                console.log('图片预览已显示');
            }

            async function copyShareText() {
                const shareLandingUrl = 'https://my-ruguods-app-1.onrender.com';
                const shareText = `我刚在「如果当时」里，遇见了平行宇宙的自己。\n你也来看看，那边的你正在做什么吧！\n\n👉${shareLandingUrl}`;

                function openManualShareSheet() {
                    const existingSheet = document.querySelector('.manual-share-sheet');
                    if (existingSheet) {
                        existingSheet.remove();
                    }

                    const sheet = document.createElement('div');
                    sheet.className = 'manual-share-sheet';
                    sheet.innerHTML = `
                        <div class="manual-share-backdrop"></div>
                        <div class="manual-share-panel" role="dialog" aria-modal="true" aria-label="复制分享文案">
                            <button type="button" class="manual-share-close" aria-label="关闭">×</button>
                            <div class="manual-share-title">复制这段分享文案</div>
                            <div class="manual-share-subtitle">你的浏览器没有允许自动复制，长按或全选下面文字即可。</div>
                            <textarea class="manual-share-text" readonly>${shareText}</textarea>
                        </div>
                    `;

                    document.body.appendChild(sheet);
                    window.setTimeout(() => sheet.classList.add('show'), 10);

                    const textarea = sheet.querySelector('.manual-share-text');
                    const closeSheet = () => {
                        sheet.classList.remove('show');
                        window.setTimeout(() => sheet.remove(), 220);
                    };

                    sheet.querySelector('.manual-share-close').addEventListener('click', closeSheet);
                    sheet.querySelector('.manual-share-backdrop').addEventListener('click', closeSheet);

                    window.setTimeout(() => {
                        if (textarea) {
                            textarea.focus();
                            textarea.select();
                        }
                    }, 120);
                }

                try {
                    let copied = false;

                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(shareText);
                        copied = true;
                    } else {
                        const textarea = document.createElement('textarea');
                        textarea.value = shareText;
                        textarea.setAttribute('readonly', '');
                        textarea.style.position = 'fixed';
                        textarea.style.top = '0';
                        textarea.style.left = '0';
                        textarea.style.opacity = '0';
                        textarea.style.pointerEvents = 'none';
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();
                        textarea.setSelectionRange(0, textarea.value.length);
                        copied = document.execCommand('copy');
                        textarea.remove();
                    }

                    if (copied) {
                        showToast('分享文案和链接已复制');
                    } else {
                        openManualShareSheet();
                    }
                } catch (error) {
                    console.error('复制分享文案失败:', error);
                    openManualShareSheet();
                }
            }
            
            // 添加分享按钮事件监听器 - 使用事件委托确保捕获动态生成的按钮
            console.log('初始化分享按钮事件监听器');
            
            // 直接为文档添加点击事件监听器
            document.addEventListener('click', function(e) {
                // 检查是否点击了保存图片按钮
                const downloadBtn = e.target.closest('.card-download-btn');
                if (downloadBtn) {
                    console.log('保存图片按钮被点击:', downloadBtn);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 找到最近的卡片元素
                    const cardElement = downloadBtn.closest('.parallel-card') || downloadBtn.closest('.story-card');
                    if (cardElement) {
                        console.log('找到卡片元素，调用保存图片功能');
                        shareStoryCard(cardElement);
                    } else {
                        console.warn('未找到卡片元素');
                    }
                    return;
                }

                // 检查是否点击了分享按钮
                const shareBtn = e.target.closest('.card-share-btn');
                if (shareBtn) {
                    console.log('分享按钮被点击:', shareBtn);
                    e.preventDefault();
                    e.stopPropagation();

                    copyShareText();
                }
            });
        });
        /* ==================== 逐字显示函数 ==================== */

/**
 * typeTextWithEffects
 *
 * @param {any} element
 * @param {any} text
 * @param {any} speed
 * @param {any} onComplete
 * @returns {Promise|void}
 */
        function typeTextWithEffects(element, text, speed = 60, onComplete = null) {
            element.innerHTML = '';
            
            let index = 0;
            let currentParagraph = null;
            let isInTag = false;
            let tagContent = '';
            

/**
 * typeNext
 *
 * @returns {Promise|void}
 */
            function typeNext() {
                if (index >= text.length) {
                    if (onComplete && typeof onComplete === 'function') {
                        onComplete();
                    }
                    return;
                }
                
                const char = text.charAt(index);
                
                // 处理HTML标签
                if (char === '<') {
                    isInTag = true;
                    tagContent = char;
                    index++;
                    return typeNext();
                }
                
                if (isInTag) {
                    tagContent += char;
                    
                    if (char === '>') {
                        isInTag = false;
                        
                        if (tagContent === '<p>') {
                            currentParagraph = document.createElement('p');
                            element.appendChild(currentParagraph);
                        }
                        else if (tagContent === '</p>') {
                            setTimeout(typeNext, 300);
                            index++;
                            return;
                        }
                        
                        index++;
                        setTimeout(typeNext, speed);
                        return;
                    }
                    
                    index++;
                    return typeNext();
                }
                
                // 显示字符
                if (currentParagraph) {
                    currentParagraph.textContent += char;
                }
                
                index++;
                
                // 随机速度，更自然
                const randomSpeed = speed + Math.random() * 20 - 10;
                setTimeout(typeNext, randomSpeed);
            }
            
            // 开始打字
            typeNext();
        }
        
        /* 格式化故事文本 */

/**
 * prepareStoryForTyping
 *
 * @param {any} story
 * @returns {Promise|void}
 */
        function prepareStoryForTyping(story) {
            let formatted = story;
            
            if (!formatted.includes('<') && !formatted.includes('>')) {
                const sentences = formatted.split(/[。！？]/).filter(s => s.trim().length > 0);
                formatted = sentences.map(sentence => {
                    const trimmed = sentence.trim();
                    if (trimmed.length > 0) {
                        return '<p>' + trimmed + '。</p>';
                    }
                    return '';
                }).join('');
            }
            
            return formatted;
        }
        
        // 智能提示词系统功能

/* ======================================== */
/* 智能提示词系统 */
/* ======================================== */
/* 性格特质选择、场景推荐和智能提示 */


/**
 * initSmartPromptSystem
 *
 * @returns {Promise|void}
 */
        function initSmartPromptSystem() {
            console.log('初始化智能提示词系统...');
            
            // 已选中的性格特质
            let selectedTraits = [];
            const maxTraits = 3;

            function splitTraitTokens(value) {
                return value
                    .split(/[、,，/|；;\n]+/)
                    .map(item => item.trim())
                    .filter(Boolean);
            }

            function syncTraitsInputFromSelection() {
                const traitsInput = document.getElementById('traits');
                if (!traitsInput) {
                    return;
                }

                const manualTokens = splitTraitTokens(traitsInput.value);
                const mergedTokens = [...manualTokens];

                selectedTraits.forEach((trait) => {
                    if (!mergedTokens.includes(trait)) {
                        mergedTokens.push(trait);
                    }
                });

                const newValue = mergedTokens.join('、');

                if (newValue) {
                    traitsInput.setAttribute('data-has-value', 'true');
                    traitsInput.classList.add('has-value');
                } else {
                    traitsInput.removeAttribute('data-has-value');
                    traitsInput.classList.remove('has-value');
                }

                traitsInput.value = newValue;
                traitsInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            function removeTraitFromInput(traitToRemove) {
                const traitsInput = document.getElementById('traits');
                if (!traitsInput) {
                    return;
                }

                const remainingTokens = splitTraitTokens(traitsInput.value)
                    .filter(item => item !== traitToRemove);

                const newValue = remainingTokens.join('、');
                traitsInput.value = newValue;

                if (newValue) {
                    traitsInput.setAttribute('data-has-value', 'true');
                    traitsInput.classList.add('has-value');
                } else {
                    traitsInput.removeAttribute('data-has-value');
                    traitsInput.classList.remove('has-value');
                }

                traitsInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            // 性格特质提示词点击事件 - 使用选择场景的点击逻辑
            const traitTags = document.querySelectorAll('.prompt-tag');
            traitTags.forEach(tag => {
                tag.addEventListener('click', function(e) {
                    // 手机优化：阻止点击时聚焦输入框
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 主动让输入框失去焦点，防止键盘弹出
                    const traitsInputElement = document.getElementById('traits');
                    if (traitsInputElement && document.activeElement === traitsInputElement) {
                        traitsInputElement.blur();
                    }
                    
                    // 简化：移除防循环标志，允许单向同步
                    // 点击标签 -> 更新输入框，但不限制输入框反向同步（已移除）
                    
                    const value = this.getAttribute('data-value');
                    
                    // 检查是否已选中
                    const isSelected = this.classList.contains('selected');
                    
                    if (isSelected) {
                        // 取消选中
                        this.classList.remove('selected');
                        selectedTraits = selectedTraits.filter(trait => trait !== value);
                        removeTraitFromInput(value);
                    } else {
                        // 检查是否已达到最大选择数量
                        if (selectedTraits.length >= maxTraits) {
                            // 使用模态框提示，而不是toast
                            showModalMessage(`最多只能选择${maxTraits}个性格特质`);
                            isUpdatingFromTagClick = false;
                            return;
                        }
                        
                        // 选中
                        this.classList.add('selected');
                        selectedTraits.push(value);
                        syncTraitsInputFromSelection();
                    }
                    
                    // 更新智能推荐
                    updateTraitsRecommendation();
                    
                    console.log('已选性格特质:', selectedTraits);
                });
            });
            
            // 选择场景提示词点击事件 - 整个标签可点击，同时填充两个部分
            // 支持重复点击取消选择
            const choiceTags = document.querySelectorAll('.choice-prompt-tag');
            choiceTags.forEach(tag => {
                tag.addEventListener('click', function(e) {
                    // 手机优化：阻止点击时聚焦输入框
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 主动让输入框失去焦点，防止键盘弹出
                    const choiceInput1 = document.getElementById('choicePart1');
                    const choiceInput2 = document.getElementById('choicePart2');
                    if (choiceInput1 && document.activeElement === choiceInput1) {
                        choiceInput1.blur();
                    }
                    if (choiceInput2 && document.activeElement === choiceInput2) {
                        choiceInput2.blur();
                    }
                    
                    const part1 = this.getAttribute('data-part1');
                    const part2 = this.getAttribute('data-part2');
                    const currentPart1 = choiceInput1 ? choiceInput1.value.trim() : '';
                    const currentPart2 = choiceInput2 ? choiceInput2.value.trim() : '';
                    
                    // 检查是否已经选中了这个标签
                    const isAlreadySelected = this.classList.contains('selected');
                    
                    if (isAlreadySelected) {
                        // 如果已经选中，取消选择
                        this.classList.remove('selected');
                        // 清空输入框
                        document.getElementById('choicePart1').value = '';
                        document.getElementById('choicePart2').value = '';
                        console.log('已取消选择场景');
                    } else {
                        // 如果未选中，选择这个标签
                        // 同时填充两个输入框，保持以前的直接覆盖逻辑
                        document.getElementById('choicePart1').value = part1;
                        document.getElementById('choicePart2').value = part2;

                        choiceTags.forEach(t => t.classList.remove('selected'));
                        this.classList.add('selected');
                        
                        console.log('已选择场景:', part1, '→', part2);
                    }
                });
            });
            
            // 清空所有选择按钮
            const clearAllBtn = document.getElementById('clearAllPrompts');
            if (clearAllBtn) {
                clearAllBtn.addEventListener('click', function() {
                    // 清空性格特质选择
                    traitTags.forEach(tag => tag.classList.remove('selected'));
                    selectedTraits = [];
                    
                    // 清空选择场景选择
                    choiceTags.forEach(tag => tag.classList.remove('selected'));
                    
                    // 清空输入框 - 直接操作
                    const traitsInput = document.getElementById('traits');
                    const choicePart1Input = document.getElementById('choicePart1');
                    const choicePart2Input = document.getElementById('choicePart2');
                    
                    if (traitsInput) traitsInput.value = '';
                    if (choicePart1Input) choicePart1Input.value = '';
                    if (choicePart2Input) choicePart2Input.value = '';
                    
                    // 隐藏推荐
                    document.getElementById('traitsRecommendation').style.display = 'none';
                    
                    // 使用模态框提示，只显示一次
                    showModalMessage('已清空所有选择');
                    console.log('已清空所有提示词选择');
                });
            }
            
            // 更新特质输入框

/**
 * updateTraitsInput
 *
 * @returns {Promise|void}
 */
            function updateTraitsInput() {
                console.log('updateTraitsInput被调用，selectedTraits:', selectedTraits);
                const traitsInput = document.getElementById('traits');
                console.log('找到的输入框:', traitsInput);
                
                if (traitsInput) {
                    if (selectedTraits.length > 0) {
                        const newValue = selectedTraits.join('、');
                        console.log('设置输入框值为:', newValue);
                        traitsInput.value = newValue;
                    } else {
                        console.log('清空输入框');
                        traitsInput.value = '';
                    }
                    console.log('输入框当前值:', traitsInput.value);
                } else {
                    console.error('未找到ID为traits的输入框');
                    // 尝试查找其他可能的输入框
                    const possibleInputs = document.querySelectorAll('input[type="text"]');
                    console.log('找到的文本输入框:', possibleInputs.length);
                    possibleInputs.forEach((input, index) => {
                        console.log(`输入框${index}:`, input.id, input.placeholder);
                    });
                }
            }
            
            // 更新智能推荐

/**
 * updateTraitsRecommendation
 *
 * @returns {Promise|void}
 */
            function updateTraitsRecommendation() {
                const recommendationEl = document.getElementById('traitsRecommendation');
                const recommendedTraitsEl = document.getElementById('recommendedTraits');
                
                if (selectedTraits.length === 0) {
                    recommendationEl.style.display = 'none';
                    return;
                }
                
                const recommendationMap = {
                    '内向的': ['留在离家近的地方', '先一个人生活几年'],
                    '外向的': ['去外地重新开始', '鼓起勇气说出口'],
                    '敏感的': ['把喜欢藏在心里', '先一个人生活几年'],
                    '理性的': ['接下那份安稳工作', '选一眼望到头的稳定'],
                    '感性的': ['按自己的想法选', '鼓起勇气说出口'],
                    '务实的': ['按家里的意思走', '接下那份安稳工作'],
                    '浪漫的': ['鼓起勇气说出口', '试试更想做的事'],
                    '爱冒险的': ['去外地重新开始', '去过更折腾的日子'],
                    '谨慎的': ['按家里的意思走', '留在离家近的地方'],
                    '独立的': ['先一个人生活几年', '为自己争这一次'],
                    '冲动的': ['按自己的想法选', '去过更折腾的日子'],
                    '乐观的': ['试试更想做的事', '去外地重新开始'],
                    '焦虑的': ['接下那份安稳工作', '留在离家近的地方'],
                    '平静的': ['选一眼望到头的稳定', '按家里的意思走'],
                    '热情的': ['鼓起勇气说出口', '为自己争这一次']
                };

                let recommendations = [];
                selectedTraits.forEach((trait) => {
                    if (recommendationMap[trait]) {
                        recommendations.push(...recommendationMap[trait]);
                    }
                });
                
                // 去重
                recommendations = [...new Set(recommendations)];
                
                if (recommendations.length > 0) {
                    recommendedTraitsEl.textContent = recommendations.join('、');
                    recommendationEl.style.display = 'block';
                } else {
                    recommendationEl.style.display = 'none';
                }
            }
            
            // 监听输入框变化，同步到提示词选择
            const traitsInput = document.getElementById('traits');
            if (traitsInput) {
                traitsInput.addEventListener('input', function() {
                    // 简化：仅处理输入框自身逻辑，不与标签强制绑定
                    // 允许用户自由输入，不反向同步到标签
                    
                    const value = this.value.trim();
                    
                    // 当输入框有值时，强制隐藏placeholder
                    if (value) {
                        this.setAttribute('data-has-value', 'true');
                    } else {
                        this.removeAttribute('data-has-value');
                    }
                    
                    // 更新智能推荐（如果需要）
                    updateTraitsRecommendation();
                });
            }
            
            console.log('智能提示词系统初始化完成');
        }
        
        // 页面加载完成后初始化智能提示词系统
        let smartPromptInitialized = false;
        

/**
 * initializeSmartPromptOnce
 *
 * @returns {Promise|void}
 */
        function initializeSmartPromptOnce() {
            if (smartPromptInitialized) {
                console.log('智能提示词系统已经初始化过，跳过');
                return;
            }
            console.log('初始化智能提示词系统（确保只调用一次）');
            initSmartPromptSystem();
            smartPromptInitialized = true;
        }
        
        // 智能提示系统初始化（确保只调用一次）
        if (document.readyState === 'loading') {
            // DOM还在加载，添加事件监听器
            document.addEventListener('DOMContentLoaded', function() {
                initializeSmartPromptOnce();
            });
        } else {
            // DOM已经加载完成，直接初始化
            initializeSmartPromptOnce();
        }
        
        /* ==================== 移动端功能支持 ==================== */
        
        // 检测移动端设备
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        
        // 检测触摸设备
        function isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
        
        // 应用安全区域样式
        function applySafeAreaStyles() {
            if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
                document.body.classList.add('has-safe-area');
            }
        }
        
        // 键盘弹出处理
        function setupKeyboardHandling() {
            if (!isMobileDevice()) return;
            
            const inputs = document.querySelectorAll('input[type="text"]');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    document.body.classList.add('keyboard-visible');
                    // 滚动到输入框位置
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                });
                
                input.addEventListener('blur', function() {
                    document.body.classList.remove('keyboard-visible');
                });
            });
        }
        
        // 触觉反馈支持
        function setupHapticFeedback() {
            if (!navigator.vibrate) return;
            
            document.body.classList.add('haptic-supported');
            
            // 触觉反馈函数
            window.hapticFeedback = function(pattern = 10) {
                if (navigator.vibrate && isMobileDevice()) {
                    navigator.vibrate(pattern);
                }
            };
            
            // 为重要交互添加触觉反馈
            const hapticElements = document.querySelectorAll('.primary-btn, .collect-btn, .share-btn');
            hapticElements.forEach(el => {
                el.addEventListener('click', function() {
                    hapticFeedback(15);
                });
            });
        }
        
        // 移动端初始化
        function initMobileFeatures() {
            console.log('初始化移动端功能...');
            
            // 应用安全区域样式
            applySafeAreaStyles();
            
            // 设置键盘处理
            setupKeyboardHandling();
            
            // 设置触觉反馈
            setupHapticFeedback();
            
            // 添加设备类
            if (isMobileDevice()) {
                document.body.classList.add('mobile-device');
            }
            
            if (isTouchDevice()) {
                document.body.classList.add('touch-device');
            }
            
            console.log('移动端功能初始化完成');
        }
        
        // 页面加载完成后初始化移动端功能
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMobileFeatures, 100);
        });
        
    
