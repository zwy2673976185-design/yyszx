// ====== yyszx 功能脚本 ======
window.initMainUI = function() {
    const mainUI = document.getElementById('mainUI');
    if (!mainUI) return;

    // 注入功能界面 HTML
    mainUI.innerHTML = `
        <div class="window-header">yyszx</div>
        <div class="main-body">
            <div class="sidebar">
                <div class="nav-label">yyszx</div>
                <button class="nav-item active" data-tab="home"><span class="nav-icon">🏠</span><span>主菜单</span></button>
                <button class="nav-item" data-tab="renwu"><span class="nav-icon">👤</span><span>人物</span></button>
                <button class="nav-item" data-tab="wuli"><span class="nav-icon">⚡</span><span>物理</span></button>
                <button class="nav-item" data-tab="diejia"><span class="nav-icon">🔁</span><span>叠加</span></button>
                <button class="nav-item" data-tab="zhuangbei"><span class="nav-icon">🛡️</span><span>装备</span></button>
                <button class="nav-item" data-tab="wuzhong"><span class="nav-icon">🔄</span><span>无中替换</span></button>
                <button class="nav-item" data-tab="chongwu"><span class="nav-icon">🐾</span><span>宠物</span></button>
                <button class="nav-item" data-tab="qita"><span class="nav-icon">⚙️</span><span>其他</span></button>
            </div>
            <div class="content-area">
                <div id="home" class="tab-content active">
                    <div class="home-buttons">
                        <div class="home-row">
                            <button class="home-btn" id="fangshanBtn">🛡️ 防闪</button>
                            <button class="home-btn" id="logBtn">📋 日志说明</button>
                        </div>
                        <div class="home-row">
                            <button class="home-btn" id="globalSearchBtn">🔍 全局搜值</button>
                        </div>
                    </div>
                </div>
                <div id="renwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">👤</div><div>人物</div></div></div>
                <div id="wuli" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚡</div><div>物理</div></div></div>
                <div id="diejia" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔁</div><div>叠加</div></div></div>
                <div id="zhuangbei" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🛡️</div><div>装备</div></div></div>
                <div id="wuzhong" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔄</div><div>无中替换</div></div></div>
                <div id="chongwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🐾</div><div>宠物</div></div></div>
                <div id="qita" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚙️</div><div>其他</div></div></div>
            </div>
        </div>
    `;

    // 绑定按钮事件
    document.getElementById('fangshanBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        gg.toast('防闪功能待实现');
    });
    document.getElementById('logBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        gg.alert('日志说明：这里是功能说明');
    });
    document.getElementById('globalSearchBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        gg.toast('全局搜值待实现');
    });

    // 导航切换
    const navItems = mainUI.querySelectorAll('.nav-item');
    const tabContents = mainUI.querySelectorAll('.tab-content');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const targetTab = this.dataset.tab;
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
};
