<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const slider = ref(null);
const runnersCanvas = ref(null);
let index = 0;
let interval = null;
let startX = 0;
let isDragging = false;

// переключение на следующий слайд
const nextSlide = () => {
  const el = slider.value;
  if (!el) return;
  const total = el.children.length;
  index = (index + 1) % total;
  el.scrollTo({
    left: index * el.clientWidth,
    behavior: "smooth",
  });
};

// переключение на предыдущий слайд
const prevSlide = () => {
  const el = slider.value;
  if (!el) return;
  const total = el.children.length;
  index = (index - 1 + total) % total;
  el.scrollTo({
    left: index * el.clientWidth,
    behavior: "smooth",
  });
};

let rafId = 0;
let lastT = 0;
let runners = [];
let particles = [];
const RUNNER_SCALE = 3.2;

const ORANGE = '#f54900';

const CARTOON = {
  outline: 3,        // толщина чёрного контура
  inner: 1.6,        // толщина оранжевых линий
  bobAmp: 4,         // подпрыгивание, px
  squash: 0.18,      // "сквош" при шаге (0..0.3)
  shadowColor: 'rgba(0,0,0,.18)',
  arrowWobbleDeg: 8, // качание стрелочек
  speedlineChance: 5 // линий скорости в сек. на бегуна
};


const handleResize = () => {
  resizeRunnersCanvas();
  setupRunners();
};

function resizeRunnersCanvas() {
  const c = runnersCanvas.value;
  if (!c) return;
  const dpi = window.devicePixelRatio || 1;
  const parent = c.parentElement;
  const cssH = Math.round(90 * RUNNER_SCALE);
  const w = parent ? parent.clientWidth : c.clientWidth;
  c.style.height = cssH + 'px';
  c.width = Math.max(1, Math.floor(w * dpi));
  c.height = Math.floor(cssH * dpi);
}

function setupRunners() {
  const c = runnersCanvas.value;
  if (!c) return;
  const dpi = window.devicePixelRatio || 1;
  const w = c.width / dpi;
  const h = c.height / dpi;
  const baseY = Math.round(h * 0.7);
  const count = Math.max(3, Math.floor(w / 260)); // количество бегунов от ширины
  runners = [];
  for (let i = 0; i < count; i++) {
    const size = (0.9 + Math.random() * 0.5) * RUNNER_SCALE;
    runners.push({
      x: -Math.random() * w * 0.6 - i * 60,
      y: baseY + (Math.random() * 6 - 3),
      size,
      speed: 70 + Math.random() * 50, // px/s
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 7 + Math.random() * 2
    });
  }
}

function spawnArrow(x, y) {
  const len = 1 + Math.random() * 8;
  particles.push({
    kind: 'arrow',
    x: x - 8 - Math.random() * 6,
    y: y - 6 + Math.random() * 12,
    vx: -(40 + Math.random() * 40),
    vy: (Math.random() - 0.5) * 20,
    len,
    life: 0.6 + Math.random() * 0.5,
    age: 0,
    angle: Math.PI,
    wobbleSpeed: 6 + Math.random() * 6,
    wobbleAmp: (CARTOON.arrowWobbleDeg * (0.5 + Math.random() * 0.5)) * Math.PI / 180
  });
  if (particles.length > 50) particles.splice(0, particles.length -50);
}

function spawnSpeedline(x, y) {
  particles.push({
    kind: 'speed',
    x: x - 4,
    y: y + 2,
    vx: -(120 + Math.random() * 120),
    vy: (Math.random() - 0.5) * 10,
    len: 12 + Math.random() * 20,
    life: 0.22 + Math.random() * 0.25,
    age: 0
  });
}

function drawSpeedline(ctx, p) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, 1 - p.age / p.life);
  // контур
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = CARTOON.outline;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x - p.len, p.y + (Math.random() - 0.5) * 4);
  ctx.stroke();
  // внутренняя линия
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = CARTOON.inner;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x - p.len, p.y);
  ctx.stroke();
  ctx.restore();
}


function drawArrow(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  const wobble = Math.sin(p.age * p.wobbleSpeed * 10) * p.wobbleAmp;
  ctx.rotate(p.angle + wobble);
  const alpha = Math.max(0, 1 - p.age / p.life);
  ctx.globalAlpha = alpha;

  // чёрный контур
  ctx.lineWidth = CARTOON.outline;
  ctx.strokeStyle = '#121212';
  ctx.beginPath();
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(p.len * 0.35, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(-p.len * 0.50, -p.len * 0.22);
  ctx.lineTo(-p.len * 0.50,  p.len * 0.22);
  ctx.closePath();
  ctx.stroke();

  // оранжевая внутренняя
  ctx.lineWidth = CARTOON.inner;
  ctx.strokeStyle = ORANGE;
  ctx.beginPath();
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(p.len * 0.35, 0);
  ctx.stroke();

  ctx.fillStyle = ORANGE;
  ctx.beginPath();
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(-p.len * 0.50, -p.len * 0.22);
  ctx.lineTo(-p.len * 0.50,  p.len * 0.22);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}


function drawStickman(ctx, x, y, s, t) {
  const impact = Math.abs(Math.sin(t));
  const xs = 1 + CARTOON.squash * impact; // растяжение по X
  const ys = 1 - CARTOON.squash * impact; // сжатие по Y
  const bob = Math.sin(t * 2) * CARTOON.bobAmp; // подпрыгивание

  ctx.save();
  ctx.translate(x, y + bob);

  // Тень (без скейла)
  ctx.save();
  ctx.fillStyle = CARTOON.shadowColor;
  ctx.beginPath();
  ctx.ellipse(0, 7 * s, 10 * s * (1 + 0.6 * impact), 3.2 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Сквош/стретч тела
  ctx.scale(xs, ys);
  const lwOut = CARTOON.outline / Math.max(xs, ys);
  const lwIn  = CARTOON.inner   / Math.max(xs, ys);

  ctx.lineJoin = 'round';
  ctx.lineCap  = 'round';

  // Туловище
  ctx.beginPath();
  ctx.moveTo(0, -6 * s);
  ctx.lineTo(0,  6 * s);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.strokeStyle = ORANGE;    ctx.lineWidth = lwIn;  ctx.stroke();

  // Руки (усиленная амплитуда)
  const arm = 8 * s;
  const armSwing = Math.sin(t) * 1.25;
  ctx.beginPath();
  ctx.moveTo(0, -4 * s);
  ctx.lineTo(Math.cos(armSwing) * arm, -4 * s + Math.sin(armSwing) * arm * 0.35);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.strokeStyle = ORANGE;    ctx.lineWidth = lwIn;  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -4 * s);
  ctx.lineTo(-Math.cos(armSwing) * arm, -4 * s - Math.sin(armSwing) * arm * 0.35);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.strokeStyle = ORANGE;    ctx.lineWidth = lwIn;  ctx.stroke();

  // Ноги (ещё сильнее)
  const leg = 10 * s;
  const legSwing = Math.sin(t + Math.PI) * 1.3;
  ctx.beginPath();
  ctx.moveTo(0, 6 * s);
  ctx.lineTo(Math.cos(legSwing) * leg, 6 * s + Math.abs(Math.sin(legSwing)) * leg * 0.7);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.strokeStyle = ORANGE;    ctx.lineWidth = lwIn;  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 6 * s);
  ctx.lineTo(-Math.cos(legSwing) * leg, 6 * s + Math.abs(Math.sin(legSwing)) * leg * 0.7);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.strokeStyle = ORANGE;    ctx.lineWidth = lwIn;  ctx.stroke();

  // Голова (слегка сплющиваем на ударе)
  ctx.save();
  ctx.translate(0, -10 * s - impact * 0.8 * s);
  ctx.scale(1 + 0.12 * impact, 1 - 0.12 * impact);
  ctx.beginPath();
  ctx.arc(0, 0, 3.6 * s, 0, Math.PI * 2);
  ctx.strokeStyle = '#121212'; ctx.lineWidth = lwOut; ctx.stroke();
  ctx.fillStyle = ORANGE; ctx.fill();
  ctx.restore();

  ctx.restore();
}


function tick(time) {
  const c = runnersCanvas.value;
  if (!c) { rafId = requestAnimationFrame(tick); return; }
  const ctx = c.getContext('2d');
  const dpi = window.devicePixelRatio || 1;
  const w = c.width / dpi;
  const h = c.height / dpi;

  const now = time * 0.001;
  const dt = lastT ? Math.min(0.035, now - lastT) : 0.016;
  lastT = now;

  // очистка
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.setTransform(dpi, 0, 0, dpi, 0, 0); // рисуем в CSS‑пикселях

  // бегуны
  for (const r of runners) {
  r.x += r.speed * dt;
  r.phase += r.phaseSpeed * dt;
  drawStickman(ctx, r.x, r.y, r.size, r.phase);
  if (Math.random() < CARTOON.speedlineChance * dt) spawnSpeedline(r.x - 8, r.y + 4);
  if (Math.random() < 10 * dt) spawnArrow(r.x - 6, r.y);
  if (r.x > w + 30) r.x = -30 - Math.random() * 60;
}


  // партиклы
  for (let i = particles.length - 1; i >= 0; i--) {
  const p = particles[i];
  p.age += dt;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  p.vy += 5 * dt;
  if (p.kind === 'speed') drawSpeedline(ctx, p);
  else drawArrow(ctx, p);
  if (p.age >= p.life) particles.splice(i, 1);
}


  rafId = requestAnimationFrame(tick);
}

function initRunnersAnimation() {
  resizeRunnersCanvas();
  setupRunners();
  window.addEventListener('resize', handleResize, { passive: true });
  rafId = requestAnimationFrame(tick);
}

onMounted(async () => {
  await nextTick();
  initRunnersAnimation();
  const el = slider.value;
  if (!el) return;

  const total = el.children.length;
  interval = setInterval(nextSlide, 10000);

  // свайпы
  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(interval);
  });

  el.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    el.scrollLeft = index * el.clientWidth - deltaX;
  });

  el.addEventListener("touchend", (e) => {
    isDragging = false;
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      const total = el.children.length;
      if (deltaX > 0) index = Math.max(0, index - 1);
      else index = Math.min(total - 1, index + 1);
    }
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
    interval = setInterval(nextSlide, 7500);
  });
});

onBeforeUnmount(() => {
  clearInterval(interval);
  cancelAnimationFrame(rafId);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <head>
    <title>ГАПОУ СО ВПМТТ «Юность»</title>
  </head>
  <div class="main">
    <div class="isp3304">
      <div class="title">
        <h1>ВПМТТ «ЮНОСТЬ»</h1>
        <div class="description">
          <p>
            Техникум, готовящий квалифицированных специалистов для современной экономики и промышленности.
            Практическое обучение, сильные мастерские и поддержка трудоустройства.
          </p>
        </div>
        <div class="btns">
          <div class="button1">
            <p>Наши направления</p>
          </div>
          <div class="button2">
            <p>Узнать больше</p>
          </div>
        </div>
        <canvas class="runners-canvas" ref="runnersCanvas" aria-hidden="true"></canvas>
      </div>

      <div class="slider-wrapper">
        <div class="slider" ref="slider">
          <div class="card">
            <img src="/images/cards/2.jpg" alt="">
            <h3>3D модель Юности</h3>
            <p>Узнайте, как выглядит учебное заведение внутри</p>
            <div class="baton"><a>Просмотреть</a></div>
          </div>

          <div class="card">
            <img src="/images/cards/1.jpg" alt="">
            <h3>Набор 2025</h3>
            <p>У вас есть шанс поступить к нам!</p>
            <div class="baton"><a>Подать документы</a></div>
          </div>

          <div class="card">
            <img src="/images/cards/1.jpg" alt="">
            <h3>Очень интересная новость</h3>
            <p>
              Данный текст можно не читать и в нем ничего нет — он лишь показывает длину описания для блока карточки.
            </p>
            <div class="baton"><a>Войти в личный кабинет</a></div>
          </div>
        </div>

        <button class="nav-btn left" @click="prevSlide">‹</button>
        <button class="nav-btn right" @click="nextSlide">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.isp3304 {
  height: 100vh;
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 100px;
  justify-content: center;
  border-radius: 24px;
  padding: 10px;
}

/* ====== Десктоп ====== */
.title {
  width: 40%;
  margin-top: 50px;
  /* animation: pulse 4s infinite ease-in-out; */
}

.title h1 {
  font-weight: 700;
  font-size: 340%;
  color: #000;
}

/* ====== Мобильная адаптация ====== */
@media (max-width: 900px) {
  .isp3304 {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 30px;
    padding: 0;
  }

  .title {
    display: none; /* 🔥 Скрываем блок с заголовком и описанием */
  }

  .slider-wrapper {
    width: 100%;
    margin-top: 20px;
  }

  .card {
    height: auto;
    border-radius: 16px;
  }

  .card img {
    height: 250px;
  }

  .nav-btn {
    display: none; /* 🔥 Скрываем стрелки */
  }

  .slider {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }

  .slider::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .card h3 {
    font-size: 20px;
  }

  .card p {
    font-size: 14px;
    margin: 10px;
  }

  .baton {
    font-size: 14px;
    padding: 8px 12px;
  }
}

/* ====== Остальные стили ====== */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.description {
  background-color: #fffcf7;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0px 2.5px 5px 2px rgba(0, 0, 0, 0.2);
}

.btns {
  margin-top: 25px;
  display: flex;
  gap: 20px;
}

.button1, .button2 {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  border-radius: 8px;
}

.button1 {
  background-color: #f54900;
}

.button2 {
  background-color: #fff;
  border: 2px solid rgba(245, 73, 0, 0.3);
}

.slider-wrapper {
  position: relative;
  width: 40%;
  align-self: center;
}

.slider {
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.card {
  flex: 0 0 100%;
  background: #fffcf7;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  height: 600px;
  scroll-snap-align: start;
}

.card img {
  height: 70%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.nav-btn {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 37.5%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  font-size: 32px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
}

.nav-btn.left { left: 10px; }
.nav-btn.right { right: 10px; }

.card h3, .card p {
  align-self: center;
  margin: 10px 15px;
}

.card .baton {
  margin-top: auto;
  align-self: center;
  margin-bottom: 20px;
  background-color: var(--orang);
  color: var(--black);
  padding: 10px 20px;
  border-radius: 8px;
}

/* ==== Мобильная оптимизация ==== */
@media (max-width: 900px) {
  .isp3304 {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 20px;
    padding: 0;
    width: 100%;
  }

  /* Показываем только заголовок h1 */
  .title {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .title h1 {
    display: block;
    font-size: 26px;
    margin-bottom: 10px;
  }

  .title .description,
  .title .btns {
    display: none;
  }

  /* Слайдер */
  .slider-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 10px;
    padding: 10px;
    scrollbar-width: none; /* Firefox */
  }

  .slider::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .card {
    flex: 0 0 90%; /* карточка занимает почти весь экран */
    border-radius: 16px;
    height: auto;
    scroll-snap-align: center;
    background: #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }

  .card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
  }

  .card h3 {
    font-size: 18px;
    text-align: center;
  }

  .card p {
    font-size: 14px;
    text-align: center;
    margin: 10px;
  }

  .baton {
    display: block;
    margin: 10px auto 20px;
    text-align: center;
    background-color: var(--orange);
    color: white;
    border-radius: 8px;
    padding: 8px 16px;
    width: fit-content;
  }

  /* Убираем стрелки */
  .nav-btn {
    display: none;
  }
}

.title { position: relative; }

.runners-canvas {
  width: 100%;
  height: 170px;        /* должно совпадать с cssH в JS */
  margin-top: 12px;
  display: block;
  pointer-events: none; /* чтобы не мешать кликам */
}
</style>
