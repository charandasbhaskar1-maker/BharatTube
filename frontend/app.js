/* =========================================================
   BHARATTUBE - CORE APPLICATION SCRIPT
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
        }, 2500);
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

            let visibleCount = 0;
            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            showToast(`${btn.textContent.trim()} कैटेगरी लोड हो गई`);
        });
    });

    // --- HEADER BUTTONS ---
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => showToast('Video Upload सुविधा जल्द आ रही है'));
    }

    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => showToast('कोई नया नोटिफिकेशन नहीं है'));
    }

    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => showToast('प्रोफ़ाइल सेक्शन जल्द उपलब्ध होगा'));
    }

    // --- HERO & CTA BUTTONS ---
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
        createChannelBtn.addEventListener('click', () => showToast('Channel Creation पेज जल्द शुरू होगा'));
    }

    const uploadVideoBtn = document.getElementById('uploadVideoBtn');
    if (uploadVideoBtn) {
        uploadVideoBtn.addEventListener('click', () => showToast('Video Upload सुविधा जल्द आ रही है'));
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
        shortsBtn.addEventListener('click', () => showToast('Shorts फ़ीड जल्द आ रही है'));
    }

    // --- BOTTOM NAVIGATION ---
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const label = item.querySelector('small') ? item.querySelector('small').textContent : 'BharatTube';
            if (label === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                showToast(`${label} सेक्शन जल्द आ रहा है`);
            }
        });
    });

    // --- VIDEO CARD CLICK ---
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || 'Video';
            showToast(`चला रहे हैं: ${title}`);
        });
    });

    // --- SHORTS CARD CLICK ---
    const shortCards = document.querySelectorAll('.short-card');
    shortCards.forEach(short => {
        short.addEventListener('click', () => {
            const title = short.querySelector('h3') ? short.querySelector('h3').textContent : 'Short';
            showToast(`Short: ${title}`);
        });
    });

});
