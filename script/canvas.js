let bgCanvas = document.getElementById('bgCanvas');
let introCanvas = document.getElementById('introCanvas');
let bgCtx = bgCanvas.getContext('2d');
let introCtx = introCanvas.getContext('2d');

let width, height;
let dpr = window.devicePixelRatio || 1;

let stars = [];       // 작은 별 (채워진 원)
let softCircles = []; // 크고 부드러운 채워진 원 (흐릿함, 자연스러운 깜빡임)
let blurs = [];       // 큰 블러 원

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

// 요소 초기화 
function initElements() {
  stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: randomRange(0.3, 1.2),
    alpha: randomRange(0.3, 0.8),
    alphaSpeed: randomRange(0.0003, 0.0015),
    alphaDir: Math.random() < 0.5 ? 1 : -1,
    vx: randomRange(-0.05, 0.05),
    vy: randomRange(-0.05, 0.05),
  }));

  softCircles = Array.from({ length: 20 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: randomRange(30, 90),
    alpha: randomRange(0.02, 0.1),
    alphaSpeed: randomRange(0.00005, 0.0003),
    alphaDir: Math.random() < 0.5 ? 1 : -1,
    vx: randomRange(-0.03, 0.03),
    vy: randomRange(-0.03, 0.03),
  }));

  blurs = Array.from({ length: 3 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: randomRange(150, 400),
    alpha: randomRange(0.015, 0.045),
    vx: randomRange(-0.01, 0.01),
    vy: randomRange(-0.01, 0.01),
  }));
}

// 속도 변화량 및 제한 키우기
function updateVelocity(obj, maxSpeed) {
  obj.vx += (Math.random() - 0.5) * 0.005; // 변화량 확대
  obj.vy += (Math.random() - 0.5) * 0.005;

  // 속도 제한
  if (obj.vx > maxSpeed) obj.vx = maxSpeed;
  if (obj.vx < -maxSpeed) obj.vx = -maxSpeed;
  if (obj.vy > maxSpeed) obj.vy = maxSpeed;
  if (obj.vy < -maxSpeed) obj.vy = -maxSpeed;
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;

  [bgCanvas, introCanvas].forEach(canvas => {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    let ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  });

  initElements();
}

window.addEventListener('resize', resize);
resize();
/* 배경 그라데이션 */
function drawBackground(ctx, isMain) {
  let grad = ctx.createLinearGradient(0, 0, 0, height);
  if (isMain) {
    grad.addColorStop(1, "#a774ff");
    grad.addColorStop(0, "#090030");
  } else {
    grad.addColorStop(0, "#FEEBE8");
    grad.addColorStop(1, "#AED4CE");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function drawBlurCircle(ctx, x, y, r, alpha) {
  let grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawElements(ctx) {
  // 작은 별 (채워진 원, 깜빡임 + 이동)
  for (let star of stars) {
    updateVelocity(star, 0.07); // 속도 제한 넓게

    star.x += star.vx;
    star.y += star.vy;

    // 화면 감싸기 처리 - 반대편에서 자연스레 등장
    if (star.x < -star.r) star.x = width + star.r;
    else if (star.x > width + star.r) star.x = -star.r;
    if (star.y < -star.r) star.y = height + star.r;
    else if (star.y > height + star.r) star.y = -star.r;

    star.alpha += star.alphaSpeed * star.alphaDir;
    if (star.alpha >= 1) star.alphaDir = -1;
    else if (star.alpha <= 0.2) star.alphaDir = 1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha.toFixed(3)})`;
    ctx.fill();
  }

  // 크고 부드러운 원 (흐릿하고 천천히 움직임 + 깜빡임)
  for (let dot of softCircles) {
    updateVelocity(dot, 0.04);

    dot.x += dot.vx;
    dot.y += dot.vy;

    if (dot.x < -dot.r) dot.x = width + dot.r;
    else if (dot.x > width + dot.r) dot.x = -dot.r;
    if (dot.y < -dot.r) dot.y = height + dot.r;
    else if (dot.y > height + dot.r) dot.y = -dot.r;

    dot.alpha += dot.alphaSpeed * dot.alphaDir;
    if (dot.alpha >= 0.15) dot.alphaDir = -1;
    else if (dot.alpha <= 0.02) dot.alphaDir = 1;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${dot.alpha.toFixed(3)})`;
    ctx.fill();
  }

  // 큰 블러 원 (천천히 움직임)
  for (let blur of blurs) {
    updateVelocity(blur, 0.02);

    blur.x += blur.vx;
    blur.y += blur.vy;

    if (blur.x < -blur.r) blur.x = width + blur.r;
    else if (blur.x > width + blur.r) blur.x = -blur.r;
    if (blur.y < -blur.r) blur.y = height + blur.r;
    else if (blur.y > height + blur.r) blur.y = -blur.r;

    drawBlurCircle(ctx, blur.x, blur.y, blur.r, blur.alpha);
  }
}

function loop() {
  drawBackground(bgCtx, true);
  drawElements(bgCtx);
  drawBackground(introCtx, false);
  drawElements(introCtx);
  requestAnimationFrame(loop);
}

loop();