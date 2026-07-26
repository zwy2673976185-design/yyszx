// base.js
(function(){
    const style = document.createElement('style');
    style.textContent = `
*{margin:0;padding:0;box-sizing:border-box;font-family:"Microsoft YaHei",sans-serif;}
body{height:100vh;overflow:hidden;background:transparent;}
.float-btn {
    position: fixed;
    z-index: 9999;
    width: 52px;
    height: 52px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    background-image: url(https://i.imgs.ovh/2025/09/28/75fraO.jpeg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
    border: none;
    right: 24px;
    bottom: 36px;
}
.float-btn:active { opacity: 0.8; }
.float-window {
    position: fixed;
    z-index: 997;
    width: 280px;
    height: 305px;
    background: rgba(236, 240, 247, 0.91);
    border-radius: 12px;
    border: 1.5px solid #bbb;
    backdrop-filter: blur(10px);
    overflow: hidden;
    display: none;
    box-shadow: 0 5px 24px rgba(0,0,0,0.02);
    transition: width 0.05s linear, height 0.05s linear;
}
.float-window.active { display: block; }
#businessBox {
    width:100%;
    height:100%;
    overflow:hidden;
}
.resize-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 18px;
    height: 18px;
    background: rgba(120,120,120,0.25);
    cursor: nwse-resize;
    border-top-left-radius: 6px;
}
.resize-handle:active {
    background: rgba(80,80,80,0.4);
}
`;
    document.head.appendChild(style);

    // 基础DOM
    const floatBtn = document.createElement('button');
    floatBtn.className = 'float-btn';
    const floatWin = document.createElement('div');
    floatWin.className = 'float-window';
    floatWin.innerHTML = `<div id="businessBox"></div><div class="resize-handle"></div>`;
    document.body.append(floatBtn, floatWin);

    const businessBox = document.getElementById('businessBox');
    const resizeHandle = floatWin.querySelector('.resize-handle');
    const DEFAULT_W = 280;
    const DEFAULT_H = 305;
    const MIN_W = 160;
    const MIN_H = 180;

    function getDefaultRect() {
        const saved = localStorage.getItem('winRect');
        if(saved) try { return JSON.parse(saved); }catch(e){}
        return {
            left: (window.innerWidth - DEFAULT_W) / 2,
            top: (window.innerHeight - DEFAULT_H) / 2,
            w: DEFAULT_W,
            h: DEFAULT_H
        };
    }
    let winRect = getDefaultRect();
    function applyRect(){
        floatWin.style.left = winRect.left + 'px';
        floatWin.style.top = winRect.top + 'px';
        floatWin.style.width = winRect.w + 'px';
        floatWin.style.height = winRect.h + 'px';
    }
    applyRect();
    function saveRect(){
        localStorage.setItem('winRect', JSON.stringify(winRect));
    }

    // 悬浮球开关
    floatBtn.addEventListener('click', () => floatWin.classList.toggle('active'));

    // 悬浮球拖拽
    let dragBtn = false, btnStart = null;
    floatBtn.addEventListener('mousedown', e=>{
        dragBtn = true;
        btnStart = {x:e.clientX,y:e.clientY,rect:floatBtn.getBoundingClientRect()};
        e.preventDefault();
    });
    floatBtn.addEventListener('touchstart', e=>{
        if(e.touches.length!==1) return;
        dragBtn = true;
        const t = e.touches[0];
        btnStart = {x:t.clientX,y:t.clientY,rect:floatBtn.getBoundingClientRect()};
    });

    // 窗口拖动
    let dragWin = false, winDragStart = null;
    function startWinDrag(e,cx,cy){
        const target = e.target;
        if(target === resizeHandle || target.tagName === 'BUTTON') return;
        dragWin = true;
        winDragStart = {x:cx,y:cy,rect:floatWin.getBoundingClientRect()};
        e.preventDefault();
    }
    document.addEventListener('mousedown', e=>{
        if(!floatWin.contains(e.target)) return;
        startWinDrag(e,e.clientX,e.clientY);
    });
    document.addEventListener('touchstart', e=>{
        if(!floatWin.contains(e.target) || e.touches.length!==1) return;
        const t = e.touches[0];
        startWinDrag(e,t.clientX,t.clientY);
    });

    // 缩放
    let dragResize = false, resizeStart = null;
    resizeHandle.addEventListener('mousedown', e=>{
        dragResize = true;
        resizeStart = {x:e.clientX,y:e.clientY,w:winRect.w,h:winRect.h};
        e.preventDefault();
    });
    resizeHandle.addEventListener('touchstart', e=>{
        if(e.touches.length!==1) return;
        dragResize = true;
        const t = e.touches[0];
        resizeStart = {x:t.clientX,y:t.clientY,w:winRect.w,h:winRect.h};
        e.preventDefault();
    });

    function dragMove(x,y){
        if(dragBtn){
            const dx = x - btnStart.x;
            const dy = y - btnStart.y;
            const l = Math.max(10, Math.min(btnStart.rect.left + dx, window.innerWidth - 53));
            const t = Math.max(10, Math.min(btnStart.rect.top + dy, window.innerHeight - 49));
            floatBtn.style.left = l + 'px';
            floatBtn.style.top = t + 'px';
            floatBtn.style.right = floatBtn.style.bottom = 'auto';
        }
        if(dragWin){
            const dx = x - winDragStart.x;
            const dy = y - winDragStart.y;
            winRect.left = Math.max(10, Math.min(winDragStart.rect.left + dx, window.innerWidth - winRect.w - 10));
            winRect.top = Math.max(10, Math.min(winDragStart.rect.top + dy, window.innerHeight - winRect.h - 10));
            applyRect();
        }
        if(dragResize){
            const dx = x - resizeStart.x;
            const dy = y - resizeStart.y;
            winRect.w = Math.max(MIN_W, resizeStart.w + dx);
            winRect.h = Math.max(MIN_H, resizeStart.h + dy);
            applyRect();
        }
    }
    document.addEventListener('mousemove', e=>dragMove(e.clientX,e.clientY));
    document.addEventListener('touchmove', e=>{
        if(e.touches.length!==1) return;
        const t = e.touches[0];
        dragMove(t.clientX,t.clientY);
    });

    function stopDrag(){
        if(dragBtn||dragWin||dragResize) saveRect();
        dragBtn=dragWin=dragResize=false;
        btnStart=winDragStart=resizeStart=null;
    }
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    // 全局加载功能页面方法
    window.loadBusinessModule = async function(url){
        try{
            const res = await fetch(url+"?t="+Date.now());
            const html = await res.text();
            businessBox.innerHTML = html;
            // 重新执行内部脚本
            const scripts = businessBox.querySelectorAll('script');
            scripts.forEach(old=>{
                const s = document.createElement('script');
                if(old.src) s.src = old.src;
                else s.textContent = old.textContent;
                old.replaceWith(s);
            });
            return true;
        }catch(err){
            businessBox.innerHTML = '<div style="color:red;padding:10px">加载失败</div>';
            return false;
        }
    }
})();
