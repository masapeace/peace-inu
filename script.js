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

// ●修正開始: プロフィール画像切り替えロジック（実ファイル名対応）
(function() {
  const circle = document.getElementById('profileCircle');
  if (!circle) return;
  const images = [
    'img/profile01.jpg',
    'img/profile02.jpg',
    'img/profile03.jpg'
  ];
  let idx = 0;
  // 初期画像
  circle.style.backgroundImage = `url('${images[0]}')`;
  function swapImage() {
    idx = (idx + 1) % images.length;
    circle.style.opacity = 0;
    setTimeout(() => {
      console.log('切り替え画像:', images[idx]);
      circle.style.backgroundImage = `url('${images[idx]}')`;
      circle.style.opacity = 1;
    }, 800);
  }
  setInterval(swapImage, 5000);
})();
// ●修正終了
