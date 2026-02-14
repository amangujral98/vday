const mainImage = document.getElementById("main-image")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")
const music = document.getElementById("bg-music")

let noClickCount = 0
let runawayEnabled = false

// Customize your 4 images here
const imageStages = [
    "images/img1.jpeg",
    "images/img2.jpeg",
    "images/img3.jpeg",
    "images/img4.jpeg"
]

/* ---- MUSIC ---- */
music.volume = 0.3

document.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(() => {})
    }
}, { once: true })

function toggleMusic() {
    if (music.paused) {
        music.play().catch(() => {})
        document.getElementById('music-toggle').textContent = '🔊'
    } else {
        music.pause()
        document.getElementById('music-toggle').textContent = '🔇'
    }
}

/* ---- YES BUTTON ---- */
function handleYesClick() {
    window.location.href = "yes.html"
}

/* ---- NO BUTTON ---- */
function handleNoClick() {
    noClickCount++

    // Change image on each click (max 4)
    if (noClickCount <= 4) {
        mainImage.style.opacity = "0"
        setTimeout(() => {
            mainImage.src = imageStages[noClickCount - 1]
            mainImage.style.opacity = "1"
        }, 150)
    }

    // Grow Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.25}px`

    // Shrink No button slightly
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 12)}px`
    }

    // After 4 clicks → runaway
    if (noClickCount >= 4 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

/* ---- RUNAWAY LOGIC ---- */
function enableRunaway() {
    noBtn.addEventListener("mouseover", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY

    noBtn.style.position = "fixed"
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = "50"
}
