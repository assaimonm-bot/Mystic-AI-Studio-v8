// =============================
// Mystic AI Studio v8
// app.js
// =============================

// Pages
const homePage = document.getElementById("homePage");
const imagePage = document.getElementById("imagePage");
const videoPage = document.getElementById("videoPage");
const historyPage = document.getElementById("historyPage");
const settingsPage = document.getElementById("settingsPage");

// Navigation Buttons
const homeBtn = document.getElementById("homeBtn");
const imageBtn = document.getElementById("imageBtn");
const videoBtn = document.getElementById("videoBtn");
const historyBtn = document.getElementById("historyBtn");
const settingBtn = document.getElementById("settingBtn");
const loginPageBtn = document.getElementById("loginPageBtn");

// Image
const imagePrompt = document.getElementById("imagePrompt");
const generateImage = document.getElementById("generateImage");
const imageResult = document.getElementById("imageResult");

// Video
const videoPrompt = document.getElementById("videoPrompt");
const generateVideo = document.getElementById("generateVideo");
const videoResult = document.getElementById("videoResult");

// Show Page
function showPage(page) {
    homePage.classList.add("hidden");
    imagePage.classList.add("hidden");
    videoPage.classList.add("hidden");
    historyPage.classList.add("hidden");
    settingsPage.classList.add("hidden");

    page.classList.remove("hidden");
}

// Default Page
showPage(homePage);

// Navigation
homeBtn.onclick = () => showPage(homePage);
imageBtn.onclick = () => showPage(imagePage);
videoBtn.onclick = () => showPage(videoPage);
historyBtn.onclick = () => showPage(historyPage);
settingBtn.onclick = () => showPage(settingsPage);

// Login
loginPageBtn.onclick = () => {
    window.location.href = "login.html";
};

// =========================
// AI IMAGE GENERATOR
// =========================

generateImage.onclick = async () => {

    const prompt = imagePrompt.value.trim();

    if (!prompt) {
        alert("Please enter an image prompt.");
        return;
    }

    imageResult.innerHTML = "🖼️ Generating Image...";

    try {

        const response = await fetch("/.netlify/functions/generate-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        const data = await response.json();

        if (data.image) {

            imageResult.innerHTML = `
                <img src="${data.image}" width="100%" style="border-radius:15px;">
                <br><br>
                <a href="${data.image}" download>
                    <button>⬇ Download Image</button>
                </a>
            `;

        } else {

            imageResult.innerHTML = "❌ " + (data.error || "Image generation failed.");

        }

    } catch (err) {

        imageResult.innerHTML = err.message;

    }

};

// =========================
// AI VIDEO GENERATOR
// =========================

generateVideo.onclick = async () => {

    const prompt = videoPrompt.value.trim();

    if (!prompt) {
        alert("Please enter a video prompt.");
        return;
    }

    videoResult.innerHTML = "🎬 Generating Video...";

    try {

        const response = await fetch("/.netlify/functions/generate-video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        const data = await response.json();

        if (data.video) {

            videoResult.innerHTML = `
                <video controls width="100%">
                    <source src="${data.video}" type="video/mp4">
                </video>

                <br><br>

                <a href="${data.video}" download>
                    <button>⬇ Download Video</button>
                </a>
            `;

        } else {

            videoResult.innerHTML = "❌ " + (data.error || "Video generation failed.");

        }

    } catch (err) {

        videoResult.innerHTML = err.message;

    }

};