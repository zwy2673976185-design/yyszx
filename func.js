// ====== 功能脚本：渲染功能界面并绑定事件 ======
window.initMainUI = function() {
    const mainUI = document.getElementById('mainUI');
    if (!mainUI) return;

    // 注入功能界面的 HTML 结构
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
                <div id="renwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">👤</div><div>人物</div><div style="font-size:9px;color:#aaa;">人物相关功能</div></div></div>
                <div id="wuli" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚡</div><div>物理</div><div style="font-size:9px;color:#aaa;">物理效果调整</div></div></div>
                <div id="diejia" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔁</div><div>叠加</div><div style="font-size:9px;color:#aaa;">叠加模式设置</div></div></div>
                <div id="zhuangbei" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🛡️</div><div>装备</div><div style="font-size:9px;color:#aaa;">装备管理</div></div></div>
                <div id="wuzhong" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔄</div><div>无中替换</div><div style="font-size:9px;color:#aaa;">替换功能设置</div></div></div>
                <div id="chongwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🐾</div><div>宠物</div><div style="font-size:9px;color:#aaa;">宠物系统</div></div></div>
                <div id="qita" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚙️</div><div>其他</div><div style="font-size:9px;color:#aaa;">其他设置</div></div></div>
            </div>
        </div>
    `;

    // 功能按钮事件（在这里写你的实际代码）
    document.getElementById('fangshanBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        // ===== 防闪功能代码写在这里 =====
        // 例如：
        // gg.clearResults();
        // gg.searchNumber("123456789", gg.TYPE_DWORD);
        // if (gg.getResultCount() > 0) {
        //     gg.editAll("-99999999", gg.TYPE_DWORD);
        //     gg.toast("防闪已启用");
        // } else {
        //     gg.toast("未找到目标值");
        // }
        alert('防闪功能已启动（占位）');
    });

    document.getElementById('logBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        alert('日志说明：这里是日志说明内容（占位）');
    });

    document.getElementById('globalSearchBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        alert('全局搜值功能已启动（占位）');
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

    // 注入功能界面所需的 CSS
    const style = document.createElement('style');
    style.textContent = `
        .main-body { display: flex; flex: 1; min-height: 0; }
        .content-area { flex: 1; overflow-y: auto; background: rgba(230, 236, 244, 0.265); padding: 6px 5px; }
        .tab-content { display: none; height: 96%; }
        .tab-content.active { display: block; }
        .home-buttons { display: flex; flex-direction: column; gap: 6px; padding: 4px 0; }
        .home-row { display: flex; gap: 5px; justify-content: center; }
        .home-btn { flex: 1; padding: 12px 2px; border: none; border-radius: 5px; font-size: 11px; font-weight: 575; cursor: pointer; text-align: center; white-space: nowrap; background: #fff; color: #333; border: 1px solid #ddd; }
        .home-btn:active { background: #ececec; }
        .placeholder-tab { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 96%; color: #777; font-size: 12px; }
        .placeholder-icon { font-size: 28px; margin-bottom: 5px; }
        .nav-item { display: flex; align-items: center; gap: 2px; width: 72px; padding: 10px 3px; margin: 2px 0; background: rgba(207, 214, 224, 0.355); color: #444; border: none; border-radius: 4px; cursor: pointer; font-size: 9px; text-align: left; }
        .nav-item:hover { background: rgba(175, 183, 196, 0.408); color: #222; }
        .nav-item.active { background: linear-gradient(90deg, #656a7b, #4b4d5f); color: white; }
        .nav-icon { font-size: 10px; width: 14px; text-align: center; }
    `;
    document.head.appendChild(style);
};
