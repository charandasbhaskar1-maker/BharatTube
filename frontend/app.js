/* =========================================================
   BHARATTUBE - CORE APPLICATION SCRIPT WITH RELIABLE ROUTING
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const toast = document.getElementById('toast');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const categoryButtons = document.querySelectorAll('.category');
    const videoCards = document.querySelectorAll('.video-card');
    const bottomNavItems = document.querySelectorAll('.bottom-item');

    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    // Repository name detect karke exact path banana
    function getCleanUrl(pageFile, query = '') {
        const pathParts = window.location.pathname.split('/').filter(p => p.length > 0);
        const repoName = (pathParts.length > 0 && pathParts[0] !== 'frontend' && pathParts[0] !== 'pages') ? `/${pathParts[0]}` : '';
        const queryString = query ? `?${query}` : '';
        return `${window.location.origin}${repoName}/pages/${pageFile}${queryString}`;
    }

    function goTo(pageFile, query = '') {
        window.location.href = getCleanUrl(pageFile, query);
    }

    // Search Logic
    function performSearch(query) {
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) {
            showToast('Kripya kuch likhkar khojein');
            videoCards.forEach(card => card.style.display = 'block');
            return;
        }

        let matchCount = 0;
        videoCards.forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const category = (card.getAttribute('data-category') || '').toLowerCase();

            if (title.includes(cleanQuery) || category.includes(cleanQuery)) {
                card.style.display = 'block';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        showToast(`'${query}' ke liye ${matchCount} video mile`);
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }

    if (mobileSearchBtn && mobileSearchInput) {
        mobileSearchBtn.addEventListener('click', () => performSearch(mobileSearchInput.value));
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(mobileSearchInput.value);
        });
    }

    // Categories
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            showToast(`${btn.textContent.trim()} category load ho gayi`);
        });
    });

    // Header Buttons
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => goTo('upload.html'));
    }

    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => showToast('Koi naya notification nahi hai'));
    }

    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => goTo('profile.html'));
    }

    // Hero Buttons
    const startWatchingBtn = document.getElementById('startWatchingBtn');
    if (startWatchingBtn) {
        startWatchingBtn.addEventListener('click', () => {
            const videoGrid = document.getElementById('videoGrid');
            if (videoGrid) videoGrid.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const createChannelBtn = document.getElementById('createChannelBtn');
    if (createChannelBtn) {
        createChannelBtn.addEventListener('click', () => goTo('channel.html'));
    }

    const uploadVideoBtn = document.getElementById('uploadVideoBtn');
    if (uploadVideoBtn) {
        uploadVideoBtn.addEventListener('click', () => goTo('upload.html'));
    }

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            videoCards.forEach(card => card.style.display = 'block');
            categoryButtons.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.category[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
            showToast('Videos refresh ho gaye');
        });
    }

    const shortsBtn = document.getElementById('shortsBtn');
    if (shortsBtn) {
        shortsBtn.addEventListener('click', () => goTo('shorts.html'));
    }

    // Bottom Navigation
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('small') ? item.querySelector('small').textContent.trim() : '';

            if (label === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (label === 'Shorts') {
                goTo('shorts.html');
            } else if (label === 'Create') {
                goTo('upload.html');
            } else if (label === 'You') {
                goTo('profile.html');
            } else if (label === 'Subscriptions') {
                showToast('Subscriptions list jald aayegi');
            }
        });
    });

    // Video Cards Click -> Watch Page
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || 'BharatTube Video';
            const channel = card.querySelector('.video-info p') ? card.querySelector('.video-info p').textContent.trim() : 'Bharat Creator';
            const views = card.querySelector('.video-info span') ? card.querySelector('.video-info span').textContent.trim() : '100K views';

            const queryParams = new URLSearchParams({
                title: title,
                channel: channel,
                views: views
            }).toString();

            goTo('watch.html', queryParams);
        });
    });

    // Shorts Card Click -> Shorts Page
    const shortCards = document.querySelectorAll('.short-card');
    shortCards.forEach(short => {
        short.addEventListener('click', () => {
            goTo('shorts.html');
        });
    });

});