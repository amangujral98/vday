const noBtn = document.getElementById("no-btn");

let noClickCount = 0;
let runawayEnabled = false;

function handleYesClick() {
    alert("Yay! 💕");
}

function handleNoClick() {
    noClickCount++;

    // After 4 clicks, start runaway immediately
    if (noClickCount >= 4 && !runawayEnabled) {
        runawayEnabled = true;
        moveButton(); // move instantly
    } 
    else if (runawayEnabled) {
        moveButton(); // keep moving if already activated
    }
}

function moveButton() {
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}
