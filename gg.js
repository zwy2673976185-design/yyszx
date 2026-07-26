// func.js 更新版：宠物修改为公告
(function(){
    const style = document.createElement('style');
    style.textContent = `
.main-ui {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.window-header {
    padding: 7px 14px;
    font-size: 13px;
    color: #333;
    font-weight: 539;
    text-align: center;
    border-bottom: 1px solid #ddd;
    user-select: none;
    flex-shrink: 0;
}
.main-body {
    display: flex;
    flex: 1;
    min-height: 0;
}
.sidebar {
    width: 77px;
    background: rgba(248, 250, 255, 0.82);
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    align-items: center;
    flex-shrink: 0;
    overflow-y: auto;
}
.sidebar::-webkit-scrollbar { width: 2px; }
.sidebar::-webkit-scrollbar-thumb { background: #aaa; border-radius: 2px; }
.nav-label {
    width: 66px;
    font-size: 9px;
    font-weight: 501;
    color: #fff;
    text-align: center;
    padding: 3px 0;
    margin-bottom: 3px;
    background: linear-gradient(90deg, #787, #556);
    border-radius: 3px;
}
.nav-item {
    display: flex;
    align-items: center;
    gap: 2px;
    width: 71px;
    padding: 10px 3px;
    margin: 2px 0;
    background: rgba(212, 219, 225, 0.34);
    color: #444;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 9px;
    text-align: left;
    transition: background 0.12s;
}
.nav-item:hover { background: rgba(180, 187, 199, 0.39); color: #222; }
.nav-item.active { background: linear-gradient(90deg, #656a7b, #4b4d5f); color: white; }
.nav-icon { font-size: 10px; width: 14px; text-align: center; }
.content-area {
    flex: 1;
    overflow-y: auto;
    background: rgba(232, 238, 245, 0.27);
    padding: 6px 5px;
}
.tab-content {
    display: none;
    height: 97%;
}
.tab-content.active { display: block; }
.home-buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: flex-start;
    padding: 4px 0;
}
.home-row {
    display: flex;
    gap: 5px;
    justify-content: center;
}
.home-btn {
    flex: 1;
    padding: 12px 2px;
    border: none;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 562;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    background: #fff;
    color: #333;
    border: 1px solid #ddd;
}
.home-btn:active { background: #ececec; }
.placeholder-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 96%;
    color: #777;
    font-size: 12px;
}
.placeholder-icon { font-size: 24px; margin-bottom: 5px; }
.content-area::-webkit-scrollbar { width: 2px; }
.content-area::-webkit-scrollbar-track { background: transparent; }
.content-area::-webkit-scrollbar-thumb { background: #656a7b; border-radius: 2px; }
`;
    document.head.appendChild(style);

    // 功能面板DOM（宠物=>公告）
    const wrap = document.createElement('div');
    wrap.className = 'main-ui';
    wrap.innerHTML = `
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
        <button class="nav-item" data-tab="notice"><span class="nav-icon">📢</span><span>公告</span></button>
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
        <div id="notice" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">📢</div><div>公告</div></div></div>
        <div id="qita" class="tab-content"><div class="placeholder-tab"><div class="placeholder-icon">⚙️</div><div>其他</div></div></div>
    </div>
</div>
`;
    // 插入到壳的容器
    const box = document.getElementById('businessBox');
    if(box) box.appendChild(wrap);

    // 菜单切换逻辑
    const navItems = wrap.querySelectorAll('.nav-item');
    const tabContents = wrap.querySelectorAll('.tab-content');
    navItems.forEach(item=>{
        item.onclick = function(e){
            e.stopPropagation();
            const t = this.dataset.tab;
            navItems.forEach(n=>n.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(tb=>tb.classList.remove('active'));
            wrap.querySelector(`#${t}`).classList.add('active');
        }
    })
    // 按钮预留回调，后续对接Lua交互
    wrap.querySelector('#fangshanBtn').onclick = e=>{
        e.stopPropagation();
        if(window.callGG) window.callGG("fangshan");
    }
    wrap.querySelector('#logBtn').onclick = e=>{
        e.stopPropagation();
        if(window.callGG) window.callGG("log");
    }
    wrap.querySelector('#globalSearchBtn').onclick = e=>{
        e.stopPropagation();
        if(window.callGG) window.callGG("search");
    }
})();
