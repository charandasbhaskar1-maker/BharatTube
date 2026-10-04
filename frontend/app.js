/* =========================================================
   BHARATTUBE - CORE APPLICATION SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const toast = document.getElementById('toast');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const categoryButtons = document.querySelectorAll('.category');
    const videoCards = document.querySelectorAll('.video-card');

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

    // --- CATEGORY BAR ---
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

    // --- NOTIFICATION BUTTON ---
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => showToast('कोई नया नोटिफिकेशन नहीं है'));
    }

    // --- START WATCHING (SCROLL) ---
    const startWatchingBtn = document.getElementById('startWatchingBtn');
    if (startWatchingBtn) {
        startWatchingBtn.addEventListener('click', () => {
            const videoGrid = document.getElementById('videoGrid');
            if (videoGrid) videoGrid.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- REFRESH BUTTON ---
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

    // --- SUBSCRIPTIONS PLACEHOLDER ---
    const subscriptionsNav = document.getElementById('subscriptionsNav');
    if (subscriptionsNav) {
        subscriptionsNav.addEventListener('click', () => {
            showToast('Subscriptions सूची जल्द आ रही है');
        });
    }

});
