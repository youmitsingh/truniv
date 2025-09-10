// Dropdown menu toggle (click to open/close)
document.addEventListener('DOMContentLoaded', function () {
  // Book cover zoom for mobile and desktop (toggle on tap/click)
  document.querySelectorAll('.book-cover').forEach(function(cover) {
    cover.addEventListener('click', function(e) {
      // If already zoomed, any tap zooms out
      if (cover.classList.contains('zoomed')) {
        cover.classList.remove('zoomed');
      } else {
        // Remove zoom from all others
        document.querySelectorAll('.book-cover.zoomed').forEach(function(other) {
          other.classList.remove('zoomed');
        });
        cover.classList.add('zoomed');
      }
    });
    cover.addEventListener('touchend', function(e) {
      // If already zoomed, any tap zooms out
      if (cover.classList.contains('zoomed')) {
        cover.classList.remove('zoomed');
      } else {
        document.querySelectorAll('.book-cover.zoomed').forEach(function(other) {
          other.classList.remove('zoomed');
        });
        cover.classList.add('zoomed');
      }
    });
  });
  // Remove zoom if clicking/tapping anywhere else
  document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('book-cover')) {
      document.querySelectorAll('.book-cover.zoomed').forEach(function(cover) {
        cover.classList.remove('zoomed');
      });
    }
  });
  document.addEventListener('touchend', function(e) {
    if (!e.target.classList.contains('book-cover')) {
      document.querySelectorAll('.book-cover.zoomed').forEach(function(cover) {
        cover.classList.remove('zoomed');
      });
    }
  });

//Drop down menu toggle (click to open/close)
  document.addEventListener('DOMContentLoaded', function () {
  // Track currently open dropdown
  let activeDropdown = null;

  document.querySelectorAll('.dropbtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const dropdown = btn.closest('.dropdown');
      const content = dropdown.querySelector('.dropdown-content');

      // If this dropdown is already open, close it
      if (activeDropdown === content) {
        content.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        activeDropdown = null;
        return;
      }

      // Close any previously open dropdown
      if (activeDropdown) {
        activeDropdown.style.display = 'none';
        document.querySelectorAll('.dropbtn').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
        });
      }

      // Open the current dropdown
      content.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
      activeDropdown = content;
    });
  });

  // Close dropdown when a menu option is clicked
  document.querySelectorAll('.dropdown-content a').forEach(function (link) {
    link.addEventListener('click', function () {
      const dropdown = link.closest('.dropdown');
      const content = dropdown.querySelector('.dropdown-content');
      const btn = dropdown.querySelector('.dropbtn');
      content.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
      activeDropdown = null;
    });
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
      if (activeDropdown) {
        activeDropdown.style.display = 'none';
        document.querySelectorAll('.dropbtn').forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
        activeDropdown = null;
      }
    }
  });
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
