/* =========================================================
   BHARATTUBE UI KIT: GLOBAL NAVIGATION & SHARED COMPONENTS
   ========================================================= */

(function() {
    function injectBottomNavigation() {
        if (document.querySelector('.bt-bottom-bar')) return;

        const currentPath = window.location.pathname;
        const isPagesDir = currentPath.includes('/pages/');
        const basePrefix = isPagesDir ? '' : 'pages/';
        const homePrefix = isPagesDir ? '../frontend/' : '';

        const navHtml = `
            <nav class="bt-bottom-bar">
                <a href="${homePrefix}index.html" class="bt-nav-item ${currentPath.includes('index.html') ? 'active' : ''}">
                    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <span>Home</span>
                </a>
                <a href="${basePrefix}shorts.html" class="bt-nav-item ${currentPath.includes('shorts.html') ? 'active' : ''}">
                    <svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5-3.07-1.28V4.3a2.3 2.3 0 0 0-3.32-2.07L4.54 5.22A2.3 2.3 0 0 0 3.3 7.27v9.45a2.3 2.3 0 0 0 1.24 2.05l5.64 3a2.3 2.3 0 0 0 3.32-2.06v-4.24l3.07 1.28 1.2.5a2.3 2.3 0 0 0 3.1-2.14V12.46a2.3 2.3 0 0 0-3.1-2.14z"/></svg>
                    <span>Shorts</span>
                </a>
                <a href="${basePrefix}upload.html" class="bt-nav-item">
                    <div class="bt-create-circle">
                        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </div>
                </a>
                <a href="${basePrefix}subscriptions.html" class="bt-nav-item ${currentPath.includes('subscriptions.html') ? 'active' : ''}">
                    <svg viewBox="0 0 24 24"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/></svg>
                    <span>Subscriptions</span>
                </a>
                <a href="${basePrefix}profile.html" class="bt-nav-item ${currentPath.includes('profile.html') ? 'active' : ''}">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    <span>You</span>
                </a>
            </nav>
        `;
        document.body.insertAdjacentHTML('beforeend', navHtml);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectBottomNavigation);
    } else {
        injectBottomNavigation();
    }
})();
