// ==========================================
// BharatTube - Frontend Controller
// ==========================================

const searchInput = document.getElementById("searchInput");
const videoGrid = document.getElementById("videoGrid");
const toast = document.getElementById("toast");


// ==========================================
// TOAST MESSAGE
// ==========================================

function showMessage(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ==========================================
// VIDEO SEARCH
// ==========================================

function searchVideos() {

    const query = searchInput.value.trim().toLowerCase();

    const cards = document.querySelectorAll(".video-card");

    if (!query) {

        cards.forEach(card => {
            card.style.display = "";
        });

        showMessage("Showing all videos");

        return;
    }

    let found = 0;

    cards.forEach(card => {

        const title = card
            .querySelector("h3")
            ?.textContent
            .toLowerCase() || "";

        const channel = card
            .querySelector("p")
            ?.textContent
            .toLowerCase() || "";

        if (
            title.includes(query) ||
            channel.includes(query)
        ) {

            card.style.display = "";

            found++;

        } else {

            card.style.display = "none";
        }
    });


    if (found === 0) {

        showMessage("No videos found");

    } else {

        showMessage(found + " video(s) found");
    }
}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            searchVideos();

        }

    });

}


// ==========================================
// CATEGORY FILTER
// ==========================================

const categoryButtons =
    document.querySelectorAll(".categories button");


categoryButtons.forEach(button => {

    button.addEventListener("click", function() {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category = this.textContent.trim();

        showMessage(category + " selected");

    });

});


// ==========================================
// VIDEO CLICK
// ==========================================

document.addEventListener("click", function(event) {

    const card = event.target.closest(".video-card");

    if (!card) return;

    const title =
        card.querySelector("h3")?.textContent ||
        "Video";

    showMessage(
        "Watch page for: " + title
    );

});


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("BharatTube frontend loaded");

});