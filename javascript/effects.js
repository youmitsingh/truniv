// Dropdown menu toggle (click to open/close)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.dropbtn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = btn.closest('.dropdown');
      const content = dropdown.querySelector('.dropdown-content');
      // Toggle open/close
      if (content.style.display === 'block') {
        content.style.display = '';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        // Close any other open dropdowns
        document.querySelectorAll('.dropdown-content').forEach(function(dc) {
          dc.style.display = '';
        });
        content.style.display = 'block';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  // Close dropdown when a menu option is clicked
  document.querySelectorAll('.dropdown-content a').forEach(function(link) {
    link.addEventListener('click', function() {
      const dropdown = link.closest('.dropdown');
      const content = dropdown.querySelector('.dropdown-content');
      const btn = dropdown.querySelector('.dropbtn');
      content.style.display = '';
      btn.setAttribute('aria-expanded', 'false');
    });
  });
  // Close dropdown if click outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(function(dc) {
        dc.style.display = '';
      });
      document.querySelectorAll('.dropbtn').forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
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
    glow.style.transform = `scale(${1 + Math.random() * 0.4})`;
  }
}

// 🔄 Dynamic Equation and image Update
const eq = document.querySelector('.equation');
const img = document.querySelector('.giver-receiver');
let current = true;

setInterval(() => {
  // Slide up
  img.style.transform = 'translateY(-5px)';
  img.style.opacity = 0.6;

  eq.style.opacity = 0;

  setTimeout(() => {
    // Switch image
    img.src = current
      ? 'images/giver-receiver.png'
      : 'images/giver-receiver-alt.png';

    // Switch equation
    eq.textContent = current
      ? 'EIO = EII + ( + EITr )'
      : 'EIO = EII + ( - EITr )';

    current = !current;

    // Slide down
    img.style.transform = 'translateY(0)';
    img.style.opacity = 1;
    eq.style.opacity = 1;
  }, 300); // Quick switch timing
}, 1000);



// 🔄 Dynamic Equation and image end

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
