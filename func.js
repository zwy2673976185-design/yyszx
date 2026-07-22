// func.js – 专为 GameGuardian 修改器设计的功能脚本
window.initMainUI = function() {
    var mainUI = document.getElementById('mainUI');
    if (!mainUI) return;

    // 注入功能界面 HTML（使用 innerHTML，GG 的 WebView 通常支持）
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
                <div id="renwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">👤</div><div>人物</div><div style="font-size:9px;color:#aaa;">人物相关功能（待开发）</div></div></div>
                <div id="wuli" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚡</div><div>物理</div><div style="font-size:9px;color:#aaa;">物理效果调整（待开发）</div></div></div>
                <div id="diejia" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔁</div><div>叠加</div><div style="font-size:9px;color:#aaa;">叠加模式设置（待开发）</div></div></div>
                <div id="zhuangbei" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🛡️</div><div>装备</div><div style="font-size:9px;color:#aaa;">装备管理（待开发）</div></div></div>
                <div id="wuzhong" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🔄</div><div>无中替换</div><div style="font-size:9px;color:#aaa;">替换功能设置（待开发）</div></div></div>
                <div id="chongwu" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">🐾</div><div>宠物</div><div style="font-size:9px;color:#aaa;">宠物系统（待开发）</div></div></div>
                <div id="qita" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚙️</div><div>其他</div><div style="font-size:9px;color:#aaa;">其他设置（待开发）</div></div></div>
            </div>
        </div>
    `;

    // ====== 功能按钮事件（使用 gg 对象） ======
    // 防闪功能
    document.getElementById('fangshanBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (typeof gg === 'undefined') {
            alert('未检测到 GG 修改器环境');
            return;
        }
        gg.toast('🛡️ 防闪功能启动中...');
        // 示例：搜索数值 100（DWORD类型）并修改为 -99999
        gg.clearResults();
        gg.searchNumber('100', gg.TYPE_DWORD);
        if (gg.getResultCount() > 0) {
            gg.editAll('-99999', gg.TYPE_DWORD);
            gg.toast('✅ 防闪已生效');
        } else {
            gg.toast('⚠️ 未找到目标数值');
        }
    });

    // 日志说明
    document.getElementById('logBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (typeof gg !== 'undefined') {
            gg.alert(
                '📋 日志说明\n\n' +
                '1. 防闪：修改数值防止闪退\n' +
                '2. 全局搜值：搜索任意数值\n' +
                '3. 其他功能正在开发中...\n\n' +
                '版本：v1.0'
            );
        } else {
            alert('日志说明：此处为功能说明占位');
        }
    });

    // 全局搜值
    document.getElementById('globalSearchBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (typeof gg === 'undefined') {
            alert('未检测到 GG 修改器环境');
            return;
        }
        // 弹出输入框让用户输入数值
        gg.prompt('请输入要搜索的数值', ['100'], ['number']);
        gg.toast('🔍 开始全局搜索...');
        // 注意：gg.prompt 是异步的，需要监听结果
        // 这里简化处理，实际使用时需配合回调
        gg.clearResults();
        gg.searchNumber('100', gg.TYPE_DWORD);
        var count = gg.getResultCount();
        gg.toast('搜索结果数量：' + count);
    });

    // ====== 导航切换 ======
    var navItems = mainUI.querySelectorAll('.nav-item');
    var tabContents = mainUI.querySelectorAll('.tab-content');
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', function(e) {
            e.stopPropagation();
            var targetTab = this.getAttribute('data-tab');
            // 移除所有 active
            for (var j = 0; j < navItems.length; j++) {
                navItems[j].classList.remove('active');
            }
            this.classList.add('active');
            for (var k = 0; k < tabContents.length; k++) {
                tabContents[k].classList.remove('active');
            }
            document.getElementById(targetTab).classList.add('active');
        });
    }
};
