window.initMainUI = function() {
    const mainUI = document.getElementById('mainUI');
    if (!mainUI) return;
    mainUI.innerHTML = '<div class="window-header">yyszx</div><div class="main-body"><div class="sidebar">...</div><div class="content-area">...</div></div>';
    // 绑定事件等...
};
