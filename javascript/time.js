  // Helper for random interval in seconds
  function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
// Animate two shiny dots exactly on the ring tracks
window.addEventListener('DOMContentLoaded', () => {
  const outerDot = document.querySelector('.dot-outer');
  const innerDot = document.querySelector('.dot-inner');
  const ringContainer = document.querySelector('.ring-container');
  if (!outerDot || !innerDot || !ringContainer) return;

  // Get container size (should match .ring-container CSS)
  const containerRect = ringContainer.getBoundingClientRect();
  const center = { x: 150, y: 150 }; // 300x300 container
  // Ring radii: (outer ring: 280px diameter, border 10px) => center to middle of border
  const outerRadius = 172; // 280/2
  // Place dot on the center of the border visually
  const outerDotOffset = 0; // visually, dot is centered
  // Inner ring: 180px diameter, border 8px
  const innerRadius = 125; // 230/2
  const innerDotOffset = 0;

  let tOuter = 0;
  let tInner = 0;
  let outerSpeed = 0.012; // control speed of outer dot (will change)
  let innerSpeed = 0.018; // control speed of inner dot (will change)



  // Pulse effect for outer dot
  function pulseOuterDot() {
    outerDot.classList.add('pulse-blue');
    setTimeout(() => {
      outerDot.classList.remove('pulse-blue');
    }, 500); // pulse duration
  }

  // Pulse effect for inner dot
  function pulseInnerDot() {
    innerDot.classList.add('pulse-red');
    setTimeout(() => {
      innerDot.classList.remove('pulse-red');
    }, 500); // pulse duration
  }



  // Update innerSpeed every 9 seconds and pulse both dots
  function updateInnerSpeed() {
    innerSpeed = Math.random() * (0.05 - 0.01) + 0.01;
    pulseInnerDot();
    pulseOuterDot();
    setTimeout(updateInnerSpeed, getRandomInterval(3, 13) * 1000);
  }
  updateInnerSpeed();

  // Update outerSpeed every 9 seconds with a different range (e.g., 0.006 to 0.018)
  function updateOuterSpeed() {
    outerSpeed = Math.random() * (0.03 - 0.006) + 0.006;
    setTimeout(updateOuterSpeed, getRandomInterval(3, 13) * 1000);
  }
  updateOuterSpeed();

  // Update outerSpeed every 9 seconds (optional, if you want both to be random)
  /*
  function updateOuterSpeed() {
    outerSpeed = Math.random() * (0.03 - 0.01) + 0.01;
    setTimeout(updateOuterSpeed, 9000);
  }
  updateOuterSpeed();
  */


  function animate() {
    tOuter += outerSpeed;
    tInner += innerSpeed;
    // Outer dot (moves CCW)
    const angle1 = tOuter;
    const x1 = center.x + Math.cos(angle1) * (outerRadius - outerDotOffset);
    const y1 = center.y + Math.sin(angle1) * (outerRadius - outerDotOffset);
    outerDot.style.left = `${x1}px`;
    outerDot.style.top = `${y1}px`;
    // Inner dot (moves CW, offset phase)
    const angle2 = tInner + Math.PI/3;
    const x2 = center.x + Math.cos(angle2) * (innerRadius - innerDotOffset);
    const y2 = center.y + Math.sin(angle2) * (innerRadius - innerDotOffset);
    innerDot.style.left = `${x2}px`;
    innerDot.style.top = `${y2}px`;
    // Center the dots
    outerDot.style.transform = 'translate(-50%, -50%)';
    innerDot.style.transform = 'translate(-50%, -50%)';
    requestAnimationFrame(animate);
  }
  animate();
});














// Pulse effect on hover
/*document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    node.style.transform += ' scale(1.1)';
    node.style.boxShadow = '0 0 20px rgba(255,255,255,0.6)';
  });

  node.addEventListener('mouseleave', () => {
    node.style.transform = node.style.transform.replace(' scale(1.1)', '');
    node.style.boxShadow = '0 0 12px rgba(255,255,255,0.3)';
  });
});

// Optional: Animate loop sequence (LP1 → LP2 → LP3 → LP1)
const nodes = ['lp1', 'lp2', 'lp3'];
let current = 0;

setInterval(() => {
  // Reset all nodes
  nodes.forEach(id => {
    document.querySelector(`.${id}`).style.opacity = '0.6';
  });

  // Highlight current node
  const active = document.querySelector(`.${nodes[current]}`);
  active.style.opacity = '1';
  active.style.boxShadow = '0 0 25px rgba(255,255,255,0.8)';

  current = (current + 1) % nodes.length;
}, 2000);*/
