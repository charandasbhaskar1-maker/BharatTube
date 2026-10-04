/* =========================================================
   BHARATTUBE - CORE APPLICATION SCRIPT WITH RELIABLE ROUTING
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTS ---
    const toast = document.getElementById('toast');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const categoryButtons = document.querySelectorAll('.category');
    const videoCards = document.querySelectorAll('.video-card');
    const bottomNavItems = document.querySelectorAll('.bottom-item');

    // --- TOAST FUNCTION ---
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

    // --- SAFE NAVIGATION HELPER ---
    // Yeh check karta hai ki site root se chal rahi hai ya frontend folder se
    function getPageUrl(pageName, queryParams = '') {
        const isInsideFrontend = window.location.pathname.includes('/frontend/');
        const prefix = isInsideFrontend ? '../pages/' : 'pages/';
        const query = queryParams ? `?${queryParams}` : '';
        return `${prefix}${pageName}${query}`;
    }

    function navigateTo(pageName, queryParams = '') {
        window.location.href = getPageUrl(pageName, queryParams);
    }

    // --- SEARCH LOGIC ---
    function performSearch(query) {
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) {
            showToast('कृपया कुछ लिखकर खोजें');
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

        showToast(`'${query}' के लिए ${matchCount} वीडियो मिले`);
    }

    // Desktop Search
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }

    // Mobile Search
    if (mobileSearchBtn && mobileSearchInput) {
        mobileSearchBtn.addEventListener('click', () => performSearch(mobileSearchInput.value));
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(mobileSearchInput.value);
        });
    }

    // --- CATEGORY FILTER ---
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

            showToast(`${btn.textContent.trim()} कैटेगरी लोड हो गई`);
        });
    });

    // --- HEADER BUTTONS ROUTING ---
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => navigateTo('upload.html'));
    }

    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => showToast('कोई नया नोटिफिकेशन नहीं है'));
    }

    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => navigateTo('profile.html'));
    }

    // --- HERO & CTA BUTTONS ROUTING ---
    const startWatchingBtn = document.getElementById('startWatchingBtn');
    if (startWatchingBtn) {
        startWatchingBtn.addEventListener('click', () => {
            const videoGrid = document.getElementById('videoGrid');
            if (videoGrid) {
                videoGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const createChannelBtn = document.getElementById('createChannelBtn');
    if (createChannelBtn) {
        createChannelBtn.addEventListener('click', () => navigateTo('channel.html'));
    }

    const uploadVideoBtn = document.getElementById('uploadVideoBtn');
    if (uploadVideoBtn) {
        uploadVideoBtn.addEventListener('click', () => navigateTo('upload.html'));
    }

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            videoCards.forEach(card => card.style.display = 'block');
            categoryButtons.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.category[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
            showToast('वीडियो रीफ़्रेश हो गए');
        });
    }

    const shortsBtn = document.getElementById('shortsBtn');
    if (shortsBtn) {
        shortsBtn.addEventListener('click', () => navigateTo('shorts.html'));
    }

    // --- BOTTOM NAVIGATION ROUTING ---
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('small') ? item.querySelector('small').textContent.trim() : '';

            if (label === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (label === 'Shorts') {
                navigateTo('shorts.html');
            } else if (label === 'Create') {
                navigateTo('upload.html');
            } else if (label === 'You') {
                navigateTo('profile.html');
            } else if (label === 'Subscriptions') {
                showToast('Subscriptions सूची जल्द आ रही है');
            }
        });
    });

    // --- VIDEO CARD CLICK -> OPEN WATCH PAGE ---
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

            navigateTo('watch.html', queryParams);
        });
    });

    // --- SHORTS CARD CLICK -> OPEN SHORTS VIEWER ---
    const shortCards = document.querySelectorAll('.short-card');
    shortCards.forEach(short => {
        short.addEventListener('click', () => {
            navigateTo('shorts.html');
        });
    });

});
