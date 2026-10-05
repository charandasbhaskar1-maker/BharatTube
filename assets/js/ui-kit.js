/* =========================================================
   BHARATTUBE REPO-AWARE NAVIGATION ENGINE
   Handles routing seamlessly on GitHub Pages
   ========================================================= */

(function () {
    // Detect GitHub Pages repo name from current URL
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Agar URL me repo ka naam hai (e.g. /BharatTube/...) toh base path wahi banega
    let basePath = '';
    if (pathSegments.length > 0 && pathSegments[0].toLowerCase().includes('bharattube')) {
        basePath = '/' + pathSegments[0] + '/';
    } else {
        basePath = '/';
    }

    const homeUrl = basePath + 'index.html';
    const shortsUrl = basePath + 'pages/shorts.html';
    const uploadUrl = basePath + 'pages/upload.html';
    const channelUrl = basePath + 'pages/channel.html';
    const profileUrl = basePath + 'pages/profile.html';

    const navIcons = {
        home: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        shorts: '<svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5-1.1-.46 1.05-.53c1.78-.9 2.5-3.08 1.6-4.86-.9-1.78-3.08-2.5-4.86-1.6L6.5 5.67c-1.78.9-2.5 3.08-1.6 4.86.32.64.83 1.13 1.44 1.43l1.2.5 1.1.46-1.05.53c-1.78.9-2.5 3.08-1.6 4.86.63 1.25 1.88 1.99 3.23 1.99.55 0 1.11-.13 1.63-.39l6.76-3.3c1.78-.9 2.5-3.08 1.6-4.86-.32-.64-.83-1.13-1.44-1.43zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>',
        plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
        subs: '<svg viewBox="0 0 24 24"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/></svg>',
        you: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>'
    };

    function renderNav() {
        const oldNav = document.querySelector('.bt-bottom-bar');
        if (oldNav) oldNav.remove();

        const current = window.location.pathname;

        const nav = document.createElement('nav');
        nav.className = 'bt-bottom-bar';
        nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;height:56px;background:#0f0f0f;display:flex;align-items:center;justify-content:space-around;border-top:1px solid #272727;z-index:99999;';

        nav.innerHTML = `
            <a href="${homeUrl}" style="color:${(current.endsWith('index.html') || current.endsWith('/')) ? '#fff' : '#aaa'};display:flex;flex-direction:column;align-items:center;font-size:10px;text-decoration:none;">
                <div style="width:24px;height:24px;fill:currentColor;">${navIcons.home}</div>
                <span style="margin-top:2px;">Home</span>
            </a>
            <a href="${shortsUrl}" style="color:${current.includes('shorts.html') ? '#fff' : '#aaa'};display:flex;flex-direction:column;align-items:center;font-size:10px;text-decoration:none;">
                <div style="width:24px;height:24px;fill:currentColor;">${navIcons.shorts}</div>
                <span style="margin-top:2px;">Shorts</span>
            </a>
            <a href="${uploadUrl}" style="background:#272727;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;">
                <div style="width:24px;height:24px;fill:#fff;">${navIcons.plus}</div>
            </a>
            <a href="${channelUrl}" style="color:${current.includes('channel.html') ? '#fff' : '#aaa'};display:flex;flex-direction:column;align-items:center;font-size:10px;text-decoration:none;">
                <div style="width:24px;height:24px;fill:currentColor;">${navIcons.subs}</div>
                <span style="margin-top:2px;">Subscriptions</span>
            </a>
            <a href="${profileUrl}" style="color:${current.includes('profile.html') ? '#fff' : '#aaa'};display:flex;flex-direction:column;align-items:center;font-size:10px;text-decoration:none;">
                <div style="width:24px;height:24px;fill:currentColor;">${navIcons.you}</div>
                <span style="margin-top:2px;">You</span>
            </a>
        `;

        document.body.appendChild(nav);

        // Home video cards ke links ko bhi dynamically correct karein
        document.querySelectorAll('a[href*="watch.html"]').forEach(card => {
            const currentHref = card.getAttribute('href');
            if (!currentHref.startsWith('http') && !currentHref.startsWith('/')) {
                const query = currentHref.includes('?') ? currentHref.substring(currentHref.indexOf('?')) : '';
                card.setAttribute('href', basePath + 'pages/watch.html' + query);
            }
        });
        
        // Header profile icon link fix
        const headerProfile = document.querySelector('header a[href*="profile.html"]');
        if (headerProfile) {
            headerProfile.setAttribute('href', profileUrl);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderNav);
    } else {
        renderNav();
    }
})();
