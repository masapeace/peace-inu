// Simple glowing particles effect for background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#00ffe7', '#ff00cc', '#00ff9c', '#fff'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  const r = Math.random() * 2 + 1;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r,
    color: colors[Math.floor(Math.random() * colors.length)],
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
    alpha: Math.random() * 0.6 + 0.2
  };
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }
}

function updateParticles() {
  for (const p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      Object.assign(p, createParticle());
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }
  }
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

function initParticles(num = 60) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push(createParticle());
  }
}

initParticles();
animate();
