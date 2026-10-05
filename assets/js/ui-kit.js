/* =========================================================
   BHARATTUBE GLOBAL UI-KIT & NAVIGATION ENGINE
   Auto-detects current directory & resolves 404 path issues
   ========================================================= */

(function () {
    // Current location check (Root me hai ya pages folder me)
    const isPagesFolder = window.location.pathname.includes('/pages/');

    // Relative path prefixes
    const pathToPages = isPagesFolder ? '' : 'pages/';
    const pathToHome = isPagesFolder ? '../index.html' : 'index.html';

    // SVG Icons Map
    const navIcons = {
        home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        shorts: '<svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5-1.1-.46 1.05-.53c1.78-.9 2.5-3.08 1.6-4.86-.9-1.78-3.08-2.5-4.86-1.6L6.5 5.67c-1.78.9-2.5 3.08-1.6 4.86.32.64.83 1.13 1.44 1.43l1.2.5 1.1.46-1.05.53c-1.78.9-2.5 3.08-1.6 4.86.63 1.25 1.88 1.99 3.23 1.99.55 0 1.11-.13 1.63-.39l6.76-3.3c1.78-.9 2.5-3.08 1.6-4.86-.32-.64-.83-1.13-1.44-1.43zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>',
        plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
        subs: '<svg viewBox="0 0 24 24"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/></svg>',
        you: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>'
    };

    function renderBottomNav() {
        // Purana duplicate bar hatayein agar ho
        const existingBar = document.querySelector('.bt-bottom-bar');
        if (existingBar) existingBar.remove();

        const currentPath = window.location.pathname;

        const navHtml = `
        <nav class="bt-bottom-bar" style="position:fixed; bottom:0; left:0; right:0; height:var(--bottom-bar-height, 56px); background:#0f0f0f; display:flex; align-items:center; justify-content:space-around; border-top:1px solid #272727; z-index:9999;">
            <a href="${pathToHome}" class="bt-nav-item ${(!isPagesFolder || currentPath.endsWith('index.html')) ? 'active' : ''}" style="color:${(!isPagesFolder || currentPath.endsWith('index.html')) ? '#fff' : '#aaa'}; display:flex; flex-direction:column; align-items:center; font-size:10px; text-decoration:none;">
                <div style="width:24px; height:24px; fill:currentColor;">${navIcons.home}</div>
                <span style="margin-top:2px;">Home</span>
            </a>
            
            <a href="${pathToPages}shorts.html" class="bt-nav-item ${currentPath.includes('shorts.html') ? 'active' : ''}" style="color:${currentPath.includes('shorts.html') ? '#fff' : '#aaa'}; display:flex; flex-direction:column; align-items:center; font-size:10px; text-decoration:none;">
                <div style="width:24px; height:24px; fill:currentColor;">${navIcons.shorts}</div>
                <span style="margin-top:2px;">Shorts</span>
            </a>
            
            <a href="${pathToPages}upload.html" class="bt-nav-item-plus" style="background:#272727; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; color:#fff; text-decoration:none;">
                <div style="width:24px; height:24px; fill:#fff;">${navIcons.plus}</div>
            </a>
            
            <a href="${pathToPages}channel.html" class="bt-nav-item ${currentPath.includes('channel.html') ? 'active' : ''}" style="color:${currentPath.includes('channel.html') ? '#fff' : '#aaa'}; display:flex; flex-direction:column; align-items:center; font-size:10px; text-decoration:none;">
                <div style="width:24px; height:24px; fill:currentColor;">${navIcons.subs}</div>
                <span style="margin-top:2px;">Subscriptions</span>
            </a>
            
            <a href="${pathToPages}profile.html" class="bt-nav-item ${currentPath.includes('profile.html') ? 'active' : ''}" style="color:${currentPath.includes('profile.html') ? '#fff' : '#aaa'}; display:flex; flex-direction:column; align-items:center; font-size:10px; text-decoration:none;">
                <div style="width:24px; height:24px; fill:currentColor;">${navIcons.you}</div>
                <span style="margin-top:2px;">You</span>
            </a>
        </nav>
        `;

        document.body.insertAdjacentHTML('beforeend', navHtml);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderBottomNav);
    } else {
        renderBottomNav();
    }
})();
