// 🌌 Star Shower Generator
function createStarShower() {
  const star = document.createElement("div");
  star.className = "star-shower";
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;
  document.body.appendChild(star);

  setTimeout(() => star.remove(), 5000);
}

// 🌟 Pulse Nebula Glow
function pulseNebula() {
  const glow = document.querySelector(".nebula-glow");
  if (glow) {
    glow.style.opacity = 0.3 + Math.random() * 0.7;
    glow.style.transform = `scale(${1 + Math.random() * 0.2})`;
  }
}

// 🔄 Dynamic Equation Update
const eq = document.querySelector('.equation');
let current = true;

setInterval(() => {
  // Fade out
  eq.style.opacity = 0;

  setTimeout(() => {
    // Update text after fade out
    eq.textContent = current
      ? 'EIO = EII + ( + EITr )'
      : 'EIO = EII + ( - EITr )';

    current = !current;

    // Fade in
    eq.style.opacity = 1;
  }, 400); // Match the CSS transition duration
}, 1000);

//fetching text from content file
fetch('content/index-content.txt')
  .then(response => response.text())
  .then(data => {
    document.getElementById('dynamicText').innerText = data;
  });

// 🌌 Parallax Drift on Scroll
window.addEventListener("scroll", () => {
  const bg = document.querySelector(".background-layer");
  if (bg) {
    const offset = window.scrollY * 0.2;
    bg.style.transform = `translateY(${offset}px)`;
  }
});


// 🌠 Loop Effects
setInterval(createStarShower, 800);   // New star every 0.8s
setInterval(pulseNebula, 2000);       // Glow pulse every 2s
