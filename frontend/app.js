// ======================================================
// BHARATTUBE - FRONTEND CONTROLLER
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const mobileSearchInput =
        document.getElementById("mobileSearchInput");

    const searchBtn =
        document.getElementById("searchBtn");

    const mobileSearchBtn =
        document.getElementById("mobileSearchBtn");

    const videoCards =
        document.querySelectorAll(".video-card");

    const categories =
        document.querySelectorAll(".category");

    const toast =
        document.getElementById("toast");


    // ==================================================
    // TOAST
    // ==================================================

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    // ==================================================
    // SEARCH
    // ==================================================

    function performSearch(value) {

        const query =
            value.trim().toLowerCase();

        let found = 0;

        videoCards.forEach(card => {

            const title =
                (
                    card.dataset.title ||
                    card.querySelector("h3")?.textContent ||
                    ""
                ).toLowerCase();

            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();

            if (
                query === "" ||
                title.includes(query) ||
                category.includes(query)
            ) {

                card.style.display = "";

                found++;

            } else {

                card.style.display = "none";
            }
        });


        if (query === "") {

            showToast("Showing all videos");

        } else if (found === 0) {

            showToast("No videos found");

        } else {

            showToast(found + " video(s) found");
        }
    }


    // ==================================================
    // DESKTOP SEARCH
    // ==================================================

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            performSearch(
                searchInput?.value || ""
            );

        });

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    performSearch(
                        searchInput.value
                    );

                }

            }
        );

    }


    // ==================================================
    // MOBILE SEARCH
    // ==================================================

    if (mobileSearchBtn) {

        mobileSearchBtn.addEventListener(
            "click",
            () => {

                performSearch(
                    mobileSearchInput?.value || ""
                );

            }
        );

    }


    if (mobileSearchInput) {

        mobileSearchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    performSearch(
                        mobileSearchInput.value
                    );

                }

            }
        );

    }


    // ==================================================
    // CATEGORY FILTER
    // ==================================================

    categories.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categories.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                button.classList.add("active");

                const category =
                    button.dataset.category;

                let found = 0;

                videoCards.forEach(card => {

                    if (
                        category === "all" ||
                        card.dataset.category === category
                    ) {

                        card.style.display = "";

                        found++;

                    } else {

                        card.style.display = "none";

                    }

                });

                showToast(
                    button.textContent.trim()
                    + " • "
                    + found
                    + " video(s)"
                );

            }
        );

    });


    // ==================================================
    // VIDEO CARD
    // ==================================================

    videoCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const title =
                    card.dataset.title ||
                    "Selected video";

                showToast(
                    "Opening: " + title
                );

            }
        );

    });


    // ==================================================
    // HERO BUTTONS
    // ==================================================

    const startWatchingBtn =
        document.getElementById(
            "startWatchingBtn"
        );

    if (startWatchingBtn) {

        startWatchingBtn.addEventListener(
            "click",
            () => {

                document
                    .getElementById("videoGrid")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    const createChannelBtn =
        document.getElementById(
            "createChannelBtn"
        );

    if (createChannelBtn) {

        createChannelBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "Channel creation will be added next"
                );

            }
        );

    }


    // ==================================================
    // UPLOAD BUTTONS
    // ==================================================

    const uploadBtn =
        document.getElementById(
            "uploadBtn"
        );

    const uploadVideoBtn =
        document.getElementById(
            "uploadVideoBtn"
        );

    function uploadMessage() {

        showToast(
            "Video upload system will be added next"
        );

    }

    if (uploadBtn) {

        uploadBtn.addEventListener(
            "click",
            uploadMessage
        );

    }

    if (uploadVideoBtn) {

        uploadVideoBtn.addEventListener(
            "click",
            uploadMessage
        );

    }


    // ==================================================
    // PROFILE
    // ==================================================

    const profileBtn =
        document.getElementById(
            "profileBtn"
        );

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "Login / Profile system will be added next"
                );

            }
        );

    }


    // ==================================================
    // NOTIFICATION
    // ==================================================

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "No new notifications"
                );

            }
        );

    }


    // ==================================================
    // SHORTS
    // ==================================================

    const shortsBtn =
        document.getElementById(
            "shortsBtn"
        );

    const shortsNav =
        document.getElementById(
            "shortsNav"
        );

    function openShorts() {

        document
            .querySelector(".shorts-grid")
            ?.scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            "Bharat Shorts"
        );

    }

    if (shortsBtn) {

        shortsBtn.addEventListener(
            "click",
            openShorts
        );

    }

    if (shortsNav) {

        shortsNav.addEventListener(
            "click",
            openShorts
        );

    }


    // ==================================================
    // CREATE NAV
    // ==================================================

    const createNav =
        document.getElementById(
            "createNav"
        );

    if (createNav) {

        createNav.addEventListener(
            "click",
            uploadMessage
        );

    }


    // ==================================================
    // SUBSCRIPTIONS
    // ==================================================

    const subscriptionsNav =
        document.getElementById(
            "subscriptionsNav"
        );

    if (subscriptionsNav) {

        subscriptionsNav.addEventListener(
            "click",
            () => {

                showToast(
                    "Login required for subscriptions"
                );

            }
        );

    }


    // ==================================================
    // YOU / PROFILE
    // ==================================================

    const youNav =
        document.getElementById(
            "youNav"
        );

    if (youNav) {

        youNav.addEventListener(
            "click",
            () => {

                showToast(
                    "Login required"
                );

            }
        );

    }


    // ==================================================
    // REFRESH
    // ==================================================

    const refreshBtn =
        document.getElementById(
            "refreshBtn"
        );

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            () => {

                videoCards.forEach(card => {

                    card.style.display = "";

                });

                categories.forEach(
                    category => {

                        category.classList.remove(
                            "active"
                        );

                    }
                );

                const allCategory =
                    document.querySelector(
                        '[data-category="all"]'
                    );

                if (allCategory) {

                    allCategory.classList.add(
                        "active"
                    );

                }

                if (searchInput) {

                    searchInput.value = "";

                }

                if (mobileSearchInput) {

                    mobileSearchInput.value = "";

                }

                showToast(
                    "Videos refreshed"
                );

            }
        );

    }


    // ==================================================
    // INITIAL MESSAGE
    // ==================================================

    console.log(
        "BharatTube frontend loaded successfully."
    );

});