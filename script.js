document.addEventListener('DOMContentLoaded', function() {
    // 顶部导航栏平滑滚动
    const navLinks = document.querySelectorAll('.top-nav nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // 70px 是导航栏的高度
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 角色认证卡片悬停效果
    const certificationCards = document.querySelectorAll('.certification-card');
    const certificationInfoBar = document.querySelector('.certification-info-bar');

    if (certificationCards.length > 0 && certificationInfoBar) {
        const defaultInfoText = certificationInfoBar.textContent;

        certificationCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                const info = this.getAttribute('data-info');
                if (info) {
                    certificationInfoBar.textContent = info;
                }
            });

            card.addEventListener('mouseout', function() {
                certificationInfoBar.textContent = defaultInfoText; // 恢复默认文字
            });
        });
    }

    // 统一处理按钮点击事件
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonAction = this.dataset.action;
            const buttonHref = this.dataset.href;
            const buttonTarget = this.dataset.target;

            if (buttonAction === 'scrollTo' && buttonHref && buttonHref.startsWith('#')) {
                event.preventDefault();
                const targetId = buttonHref.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // 70px 是导航栏的高度
                        behavior: 'smooth'
                    });
                }
            } else if (buttonAction === 'openLink' && buttonHref) {
                if (buttonTarget === '_blank') {
                    window.open(buttonHref, '_blank');
                } else {
                    window.location.href = buttonHref;
                }
            }
        });
    });

    // 优秀伙伴卡片悬停效果 - 更新为使用共享的 .partner-contribution-bar
    const partnerCards = document.querySelectorAll('.partner-card');
    const partnerContributionBar = document.querySelector('.partner-contribution-bar');
    const defaultPartnerBarText = '鼠标划过伙伴卡片查看贡献详情';

    if (partnerContributionBar) {
        partnerCards.forEach(card => {
            const contributionText = card.getAttribute('data-contribution');

            card.addEventListener('mouseover', () => {
                if (contributionText) {
                    partnerContributionBar.textContent = contributionText;
                } else {
                    partnerContributionBar.textContent = defaultPartnerBarText;
                }
            });

            card.addEventListener('mouseout', () => {
                partnerContributionBar.textContent = defaultPartnerBarText;
            });
        });
    }

    // 导航栏链接高亮逻辑
    const sections = document.querySelectorAll('section[id]');

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            // Check if the link's href matches the current section or if it's the knowledge_base.html page itself
            if (link.getAttribute('href') === `#${currentSectionId}` || 
                (window.location.pathname.includes('knowledge_base.html') && link.getAttribute('href') === 'knowledge_base.html') ||
                (window.location.pathname.includes('events.html') && link.getAttribute('href') === 'events.html')) {
                link.classList.add('active-nav-link');
            }
        });
    }

    window.addEventListener('scroll', changeNavOnScroll);
    // Initial check in case the page is loaded at a scrolled position or for non-scrolling pages like knowledge_base.html
    changeNavOnScroll();

    // 知识库分类导航选项卡切换
    const categoryTabs = document.querySelectorAll('.category-tabs .tab-item');
    const blogSubCategories = document.getElementById('blog-sub-categories');



    const techArticleCardsContainer = document.getElementById('tech-article-cards-container');

    // 示例技术文章数据
    const sampleArticles = {
        'data-analysis': [
            { title: 'AI编程入门指南', description: '从零开始学习AI编程的完整指南，包含实践案例和代码示例', author: '李明', tags: ['AI', '编程', '入门'], link: '#' },
            { title: '数据可视化技巧', description: '深入探讨如何使用Python进行高效的数据可视化展示。', author: '王芳', tags: ['数据可视化', 'Python', '技巧'], link: '#' },
            { title: '机器学习实战教程', description: '通过实际项目学习机器学习的核心算法和应用场景。', author: '赵雷', tags: ['机器学习', '实战', '教程'], link: '#' },
        ],
        'game-dev': [
            { title: '前端框架对比: React vs Vue vs Angular', description: '深入分析三大前端框架的优缺点，帮助你选择最适合的技术栈', author: '张华', tags: ['前端', '框架', '技术选型'], link: '#' },
            { title: '游戏设计模式解析', description: '探讨游戏中常用的设计模式，提升代码质量和可维护性。', author: '刘洋', tags: ['游戏设计', '设计模式', '架构'], link: '#' },
            { title: '物理引擎在游戏中的应用', description: '介绍不同物理引擎的特点及其在现代游戏开发中的应用。', author: '陈晨', tags: ['物理引擎', '游戏开发', '高级'], link: '#' },
        ],
        'text-analysis': [
            { title: '云原生应用开发实践', description: '探索云原生架构的设计原则和最佳实践，从开发到部署的全流程指南', author: '王强', tags: ['云原生', 'DevOps', '容器化'], link: '#' },
            { title: '自然语言处理进阶', description: '深入学习NLP领域的高级技术，如Transformer和BERT。', author: '李静', tags: ['NLP', 'AI', '进阶'], link: '#' },
            { title: '文本情感分析项目', description: '手把手教你完成一个基于深度学习的文本情感分析项目。', author: '吴迪', tags: ['情感分析', '深度学习', '项目'], link: '#' },
        ],
        'lite-app-dev': [
            { title: '轻量级应用架构设计', description: '探讨构建高性能、可扩展轻量级应用的架构思路。', author: '周敏', tags: ['轻量应用', '架构', '性能'], link: '#' },
            { title: 'Electron桌面应用开发', description: '使用Electron快速构建跨平台的桌面应用程序。', author: '孙悦', tags: ['Electron', '桌面应用', '跨平台'], link: '#' },
            { title: 'Serverless应用实践', description: '了解Serverless架构的优势，并动手实践一个Serverless应用。', author: '郑凯', tags: ['Serverless', '云计算', '实践'], link: '#' },
        ],
        'mini-program-dev': [
            { title: '小程序云开发详解', description: '全面解析小程序云开发能力，助力快速迭代。', author: '何平', tags: ['小程序', '云开发', '后端'], link: '#' },
            { title: '小程序性能优化指南', description: '分享小程序加载速度和运行流畅度的优化技巧。', author: '冯伟', tags: ['小程序', '性能优化', '前端'], link: '#' },
            { title: '跨平台小程序框架对比', description: '对比Taro、uni-app等主流跨平台小程序框架的特点。', author: '曹阳', tags: ['小程序', '跨平台', '框架'], link: '#' },
        ],
        'math-modeling': [
            { title: '数学建模算法精讲', description: '详细讲解数学建模中常用的核心算法及其Python实现。', author: '田甜', tags: ['数学建模', '算法', 'Python'], link: '#' },
            { title: '优秀数模论文解析', description: '分析国赛、美赛获奖论文的写作思路和亮点。', author: '金鑫', tags: ['数学建模', '论文写作', '竞赛'], link: '#' },
            { title: 'MATLAB在数学建模中的应用', description: '系统介绍MATLAB在数据处理、模型求解和可视化方面的应用。', author: '石磊', tags: ['MATLAB', '数学建模', '工具'], link: '#' },
        ],
        'mcp-practice': [
            { title: '玩转Trae MCP平台', description: 'Trae MCP平台功能全解析与实战技巧分享。', author: '官方团队', tags: ['Trae MCP', '平台', '教程'], link: '#' },
            { title: 'MCP数据处理流程优化', description: '学习如何在MCP中高效处理和分析大规模数据集。', author: '技术支持', tags: ['MCP', '数据处理', '优化'], link: '#' },
            { title: 'MCP模型部署与监控', description: '介绍在MCP上部署机器学习模型并进行实时监控的最佳实践。', author: '研发专家', tags: ['MCP', '模型部署', '监控'], link: '#' },
        ]
    };

    function displayTechArticles(subcategory) {
        if (!techArticleCardsContainer) return;
        techArticleCardsContainer.innerHTML = ''; // 清空现有卡片
        const articles = sampleArticles[subcategory] || [];

        if (articles.length === 0) {
            techArticleCardsContainer.innerHTML = `<p style="text-align:center; color: #777;">暂无 '${subcategory}' 分类的技术文章。</p>`;
            techArticleCardsContainer.style.display = 'block'; // 确保提示信息可见
            return;
        }

        articles.forEach(article => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('tech-article-card-detailed'); // 使用新的CSS类名
            let tagsHTML = '';
            if (article.tags && article.tags.length > 0) {
                tagsHTML = article.tags.map(tag => `<span class="tag-item">#${tag}</span>`).join('');
            }

            cardElement.innerHTML = `
                <h3>${article.title}</h3>
                <p class="description">${article.description}</p>
                <div class="meta-info">
                    <span class="author">作者: ${article.author}</span>
                </div>
                <div class="tags-container">
                    ${tagsHTML}
                </div>
                <a href="${article.link || '#'}" class="btn btn-read-full" target="_blank">阅读全文</a>
            `;
            techArticleCardsContainer.appendChild(cardElement);
        });
        techArticleCardsContainer.style.display = 'grid'; // 使用grid布局显示卡片
    }

    if (blogSubCategories) { // blogSubCategories 是二级导航的容器
        const secondaryTabs = blogSubCategories.querySelectorAll('.tab-item-secondary');
        secondaryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                secondaryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // 点击时也显示文章，保持与悬停一致的行为
                displayTechArticles(tab.dataset.subcategory);
            });

            tab.addEventListener('mouseover', () => {
                // 悬停时，如果技术博客主分类是激活的，才显示文章
                const techBlogMainTab = document.querySelector('.category-tabs .tab-item[data-category="blog"]');
                if (techBlogMainTab && techBlogMainTab.classList.contains('active')) {
                    displayTechArticles(tab.dataset.subcategory);
                }
            });
        });
    }

    // 更新主选项卡切换逻辑
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            // 先移除所有主选项卡的 active 状态
            categoryTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的主选项卡添加 active 状态
            tab.classList.add('active');

            if (category === 'blog') {
                if (blogSubCategories) blogSubCategories.style.display = 'flex';
                if (techArticleCardsContainer) {
                    // 当“技术博客”被点击时，检查是否有已激活的子分类，有则显示其文章，否则显示提示
                    const activeSubTab = blogSubCategories ? blogSubCategories.querySelector('.tab-item-secondary.active') : null;
                    if (activeSubTab) {
                        displayTechArticles(activeSubTab.dataset.subcategory);
                    } else {
                        // 如果没有激活的子分类，可以默认显示第一个子分类的文章或提示
                        const firstSubTab = blogSubCategories ? blogSubCategories.querySelector('.tab-item-secondary') : null;
                        if (firstSubTab) {
                            displayTechArticles(firstSubTab.dataset.subcategory);
                            // firstSubTab.classList.add('active'); // 可选：默认激活第一个子分类
                        } else {
                            techArticleCardsContainer.innerHTML = `<p style="text-align:center; color: #777;">请选择一个子分类查看技术文章。</p>`;
                            techArticleCardsContainer.style.display = 'block';
                        }
                    }
                }
            } else {
                if (blogSubCategories) blogSubCategories.style.display = 'none';
                if (techArticleCardsContainer) techArticleCardsContainer.style.display = 'none';
            }
        });
    });

    // 初始化页面加载时：
    const initiallyActiveMainTab = document.querySelector('.categories-nav .tab-item.active');
    if (initiallyActiveMainTab && initiallyActiveMainTab.dataset.category === 'blog') {
        if (blogSubCategories) blogSubCategories.style.display = 'flex';
        if (techArticleCardsContainer) {
            const activeSubTab = blogSubCategories.querySelector('.tab-item-secondary.active');
            if (activeSubTab) {
                displayTechArticles(activeSubTab.dataset.subcategory);
            } else {
                const firstSubTab = blogSubCategories.querySelector('.tab-item-secondary');
                if (firstSubTab) {
                    // firstSubTab.classList.add('active'); // 默认激活第一个子分类
                    displayTechArticles(firstSubTab.dataset.subcategory);
                } else {
                    techArticleCardsContainer.innerHTML = `<p style="text-align:center; color: #777;">请选择一个子分类查看技术文章。</p>`;
                    techArticleCardsContainer.style.display = 'block';
                }
            }
        }
    } else {
        if (blogSubCategories) blogSubCategories.style.display = 'none';
        if (techArticleCardsContainer) techArticleCardsContainer.style.display = 'none';
    }
});