<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { fetchNewsList } from "@/services/newsService";

const slider = ref(null);
const runnersCanvas = ref(null);
const router = useRouter();

const newsItems = ref([]);
const newsLoading = ref(false);
const newsError = ref("");
let index = 0;
let interval = null;
let startX = 0;
let isDragging = false;
let sliderEventsBound = false;

// ╨┐╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ ╨╜╨░ ╤Б╨╗╨╡╨┤╤Г╤О╤Й╨╕╨╣ ╤Б╨╗╨░╨╣╨┤
const nextSlide = () => {
  const el = slider.value;
  if (!el) return;
  const total = el.children.length;
  if (!total) return;
  index = (index + 1) % total;
  el.scrollTo({
    left: index * el.clientWidth,
    behavior: "smooth",
  });
};

// ╨┐╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ ╨╜╨░ ╨┐╤А╨╡╨┤╤Л╨┤╤Г╤Й╨╕╨╣ ╤Б╨╗╨░╨╣╨┤
const prevSlide = () => {
  const el = slider.value;
  if (!el) return;
  const total = el.children.length;
  if (!total) return;
  index = (index - 1 + total) % total;
  el.scrollTo({
    left: index * el.clientWidth,
    behavior: "smooth",
  });
};

const stopAutoplay = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

const startAutoplay = () => {
  stopAutoplay();
  const el = slider.value;
  if (!el) return;
  const total = el.children.length;
  if (total <= 1) return;
  interval = setInterval(nextSlide, 8000);
};

const resetSliderPosition = (behavior = "auto") => {
  const el = slider.value;
  if (!el) return;
  index = 0;
  el.scrollTo({
    left: 0,
    behavior
  });
};

const handleTouchStart = (event) => {
  if (!slider.value) return;
  startX = event.touches[0].clientX;
  isDragging = true;
  stopAutoplay();
};

const handleTouchMove = (event) => {
  if (!isDragging || !slider.value) return;
  const deltaX = event.touches[0].clientX - startX;
  slider.value.scrollLeft = index * slider.value.clientWidth - deltaX;
};

const handleTouchEnd = (event) => {
  if (!slider.value) return;
  isDragging = false;
  const deltaX = event.changedTouches[0].clientX - startX;
  const el = slider.value;
  const threshold = el.clientWidth * 0.2;
  const total = el.children.length;

  if (Math.abs(deltaX) > threshold && total) {
    if (deltaX > 0) {
      index = (index - 1 + total) % total;
    } else {
      index = (index + 1) % total;
    }
  }

  el.scrollTo({
    left: index * el.clientWidth,
    behavior: "smooth",
  });

  startAutoplay();
};

const bindSliderEvents = () => {
  const el = slider.value;
  if (!el || sliderEventsBound) return;

  el.addEventListener("touchstart", handleTouchStart, { passive: true });
  el.addEventListener("touchmove", handleTouchMove, { passive: true });
  el.addEventListener("touchend", handleTouchEnd, { passive: true });
  sliderEventsBound = true;
};

const unbindSliderEvents = () => {
  if (!sliderEventsBound) return;
  const el = slider.value;
  if (!el) {
    sliderEventsBound = false;
    return;
  }
  el.removeEventListener("touchstart", handleTouchStart);
  el.removeEventListener("touchmove", handleTouchMove);
  el.removeEventListener("touchend", handleTouchEnd);
  sliderEventsBound = false;
};

const openNews = (item) => {
  if (!item) return;

  const highlight = item.slug || item.id;
  const query = highlight ? { highlight: highlight.toString() } : {};

  router.push({
    path: "/news",
    query,
  });
};

const truncate = (text, limit = 140) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
};

const loadNews = async () => {
  stopAutoplay();
  try {
    newsLoading.value = true;
    newsError.value = "";
    const data = await fetchNewsList({ limit: 9 });
    newsItems.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка загрузки новостей:", error);
    newsError.value = error.message || "Не удалось загрузить новости";
    newsItems.value = [];
  } finally {
    newsLoading.value = false;
  }
};

watch(newsItems, async (items) => {
  await nextTick();
  bindSliderEvents();
  resetSliderPosition(items.length ? "auto" : "smooth");
  if (items.length > 1) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
});

let rafId = 0;
let lastT = 0;
let runners = [];
let particles = [];
const RUNNER_SCALE = 3.2;

let ctx2d = null;
let io = null;

const particlePool = [];
const PERF = { maxParticles: 120, gravity: 4, arrowsPerSec: 6 };


const ORANGE = '#f54900';

const CARTOON = {
  line: 2,             // ╨╡╨┤╨╕╨╜╨░╤П ╤В╨╛╨╗╤Й╨╕╨╜╨░ ╨╗╨╕╨╜╨╕╨╣
  color: ORANGE,       // ╨╛╨┤╨╕╨╜ ╤Ж╨▓╨╡╤В -> ╨╝╨╡╨╜╤М╤И╨╡ ╤Б╨╝╨╡╨╜ ╤Б╨╛╤Б╤В╨╛╤П╨╜╨╕╤П ╨║╨╛╨╜╤В╨╡╨║╤Б╤В╨░
  bobAmp: 3,           // ╨┐╨╛╨┤╨┐╤А╤Л╨│╨╕╨▓╨░╨╜╨╕╨╡
  squash: 0.12,        // ╤Б╨║╨▓╨╛╤И/╤Б╤В╤А╨╡╤В╤З
  arrowWobbleDeg: 6,   // ╨║╨░╤З╨░╨╜╨╕╨╡ ╤Б╤В╤А╨╡╨╗╨╛╤З╨╡╨║
  speedlineChance: 3   // ╨╗╨╕╨╜╨╕╨╣ ╤Б╨║╨╛╤А╨╛╤Б╤В╨╕ ╨▓ ╤Б╨╡╨║. ╨╜╨░ ╨▒╨╡╨│╤Г╨╜╨░
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
  const count = Math.max(3, Math.floor(w / 260)); // ╨║╨╛╨╗╨╕╤З╨╡╤Б╤В╨▓╨╛ ╨▒╨╡╨│╤Г╨╜╨╛╨▓ ╨╛╤В ╤И╨╕╤А╨╕╨╜╤Л
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
  if (particles.length >= PERF.maxParticles) return;
  const p = particlePool.pop() || {};
  p.kind = 'arrow';
  p.x = x - 6 - Math.random() * 6;
  p.y = y - 5 + Math.random() * 10;
  p.vx = -(40 + Math.random() * 40);
  p.vy = (Math.random() - 0.5) * 18;
  p.len = 8 + Math.random() * 10;
  p.life = 0.55 + Math.random() * 0.45;
  p.age = 0;
  p.angle = Math.PI;
  p.wobbleSpeed = 6 + Math.random() * 6;
  p.wobbleAmp = (CARTOON.arrowWobbleDeg * (0.5 + Math.random() * 0.5)) * Math.PI / 180;
  particles.push(p);
}

function spawnSpeedline(x, y) {
  if (particles.length >= PERF.maxParticles) return;
  const p = particlePool.pop() || {};
  p.kind = 'speed';
  p.x = x - 4;
  p.y = y + 2;
  p.vx = -(120 + Math.random() * 100);
  p.vy = (Math.random() - 0.5) * 8;
  p.len = 10 + Math.random() * 18;
  p.life = 0.20 + Math.random() * 0.22;
  p.age = 0;
  p.dy = (Math.random() - 0.5) * 3; // ╤Д╨╕╨║╤Б╨╕╤А╤Г╨╡╨╝ ╨╜╨░╨║╨╗╨╛╨╜ ╨╛╨┤╨╕╨╜ ╤А╨░╨╖
  particles.push(p);
}

function drawSpeedline(ctx, p) {
  const a = 1 - p.age / p.life;
  if (a <= 0) return;
  ctx.globalAlpha = a;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x - p.len, p.y + p.dy);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawArrow(ctx, p) {
  const a = 1 - p.age / p.life;
  if (a <= 0) return;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle + Math.sin(p.age * p.wobbleSpeed * 10) * p.wobbleAmp);
  ctx.globalAlpha = a;

  // ╤Б╤В╤А╨╡╨╗╨║╨░ ╤В╨╛╨╗╤М╨║╨╛ ╨║╨╛╨╜╤В╤Г╤А╨╛╨╝ (╨╛╨┤╨╕╨╜ ╨┐╤А╨╛╤Е╨╛╨┤)
  ctx.beginPath();
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(p.len * 0.35, 0);
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(-p.len * 0.50, -p.len * 0.22);
  ctx.moveTo(-p.len * 0.1, 0);
  ctx.lineTo(-p.len * 0.50,  p.len * 0.22);
  ctx.stroke();

  ctx.restore();
}



function drawStickman(ctx, x, y, s, t) {
  const impact = Math.abs(Math.sin(t));
  const xs = 1 + CARTOON.squash * impact;
  const ys = 1 - CARTOON.squash * impact;
  const bob = Math.sin(t * 2) * CARTOON.bobAmp;

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.scale(xs, ys);

  const arm = 8 * s;
  const leg = 10 * s;
  const armSwing = Math.sin(t) * 1.15;
  const legSwing = Math.sin(t + Math.PI) * 1.2;

  // ╤В╤Г╨╗╨╛╨▓╨╕╤Й╨╡
  ctx.beginPath();
  ctx.moveTo(0, -6 * s);
  ctx.lineTo(0,  6 * s);
  ctx.stroke();

  // ╤А╤Г╨║╨╕
  ctx.beginPath();
  ctx.moveTo(0, -4 * s);
  ctx.lineTo(Math.cos(armSwing) * arm, -4 * s + Math.sin(armSwing) * arm * 0.32);
  ctx.moveTo(0, -4 * s);
  ctx.lineTo(-Math.cos(armSwing) * arm, -4 * s - Math.sin(armSwing) * arm * 0.32);
  ctx.stroke();

  // ╨╜╨╛╨│╨╕
  ctx.beginPath();
  ctx.moveTo(0, 6 * s);
  ctx.lineTo(Math.cos(legSwing) * leg, 6 * s + Math.abs(Math.sin(legSwing)) * leg * 0.65);
  ctx.moveTo(0, 6 * s);
  ctx.lineTo(-Math.cos(legSwing) * leg, 6 * s + Math.abs(Math.sin(legSwing)) * leg * 0.65);
  ctx.stroke();

  // ╨│╨╛╨╗╨╛╨▓╨░ тАФ ╤В╨╛╨╗╤М╨║╨╛ ╨║╨╛╨╜╤В╤Г╤А (╤Б╨║╨▓╨╛╤И ╤З╨╡╤А╨╡╨╖ scale)
  ctx.save();
  ctx.translate(0, -10 * s - impact * 0.7 * s);
  ctx.scale(1 + 0.10 * impact, 1 - 0.10 * impact);
  ctx.beginPath();
  ctx.arc(0, 0, 3.6 * s, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function onVis() {
  if (document.hidden) {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  } else {
    if (!rafId) { lastT = 0; rafId = requestAnimationFrame(tick); }
  }
}


function tick(time) {
  const c = runnersCanvas.value;
  const ctx = ctx2d;
  if (!c || !ctx) { rafId = requestAnimationFrame(tick); return; }

  const dpi = window.devicePixelRatio || 1;
  const w = c.width / dpi;
  const h = c.height / dpi;

  const now = time * 0.001;
  const dt = lastT ? Math.min(0.035, now - lastT) : 0.016;
  lastT = now;

  // ╨╛╤З╨╕╤Б╤В╨║╨░ (╨╜╨╡ ╤Б╨▒╨╕╨▓╨░╤П DPI-╨╜╨░╤Б╤В╤А╨╛╨╣╨║╨╕)
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
  ctx.setTransform(dpi, 0, 0, dpi, 0, 0);

  // ╨╡╨┤╨╕╨╜╤Л╨╡ ╨╜╨░╤Б╤В╤А╨╛╨╣╨║╨╕ ╨┐╨╡╤А╨░ ╨╜╨░ ╨║╨░╨┤╤А
  ctx.lineJoin = 'round';
  ctx.lineCap  = 'round';
  ctx.strokeStyle = CARTOON.color;
  ctx.lineWidth   = CARTOON.line;

  // ╨▒╨╡╨│╤Г╨╜╤Л
  for (const r of runners) {
    r.x += r.speed * dt;
    r.phase += r.phaseSpeed * dt;
    drawStickman(ctx, r.x, r.y, r.size, r.phase);

    if (particles.length < PERF.maxParticles && Math.random() < CARTOON.speedlineChance * dt)
      spawnSpeedline(r.x - 8, r.y + 4);
    if (particles.length < PERF.maxParticles && Math.random() < PERF.arrowsPerSec * dt)
      spawnArrow(r.x - 6, r.y);

    if (r.x > w + 30) r.x = -30 - Math.random() * 60;
  }

  // ╨┐╨░╤А╤В╨╕╨║╨╗╤Л
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += PERF.gravity * dt;

    if (p.kind === 'speed') drawSpeedline(ctx, p);
    else drawArrow(ctx, p);

    if (p.age >= p.life) {
      particles.splice(i, 1);
      particlePool.push(p); // ╨▓╨╛╨╖╨▓╤А╨░╤В ╨▓ ╨┐╤Г╨╗
    }
  }

  rafId = requestAnimationFrame(tick);
}




function initRunnersAnimation() {
  resizeRunnersCanvas();
  setupRunners();

  // ╨║╤Н╤И ╨║╨╛╨╜╤В╨╡╨║╤Б╤В╨░ (desynchronized тАФ hint ╨▒╤А╨░╤Г╨╖╨╡╤А╤Г)
  ctx2d = runnersCanvas.value.getContext('2d', { alpha: true, desynchronized: true });

  rafId = requestAnimationFrame(tick);

  // ╨┐╨░╤Г╨╖╨░, ╨║╨╛╨│╨┤╨░ ╨║╨░╨╜╨▓╨░╤Б ╨╜╨╡ ╨▓ ╨▓╤М╤О╨┐╨╛╤А╤В╨╡
  io = new IntersectionObserver(([e]) => {
    if (!e) return;
    if (e.isIntersecting) {
      if (!rafId) { lastT = 0; rafId = requestAnimationFrame(tick); }
    } else {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    }
  }, { root: null, threshold: 0 });
  io.observe(runnersCanvas.value);

  document.addEventListener('visibilitychange', onVis, { passive: true });
}


onMounted(async () => {
  await nextTick();
  initRunnersAnimation();
  bindSliderEvents();
  await loadNews();
});

onBeforeUnmount(() => {
  stopAutoplay();
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('visibilitychange', onVis);
  if (io) io.disconnect();
  unbindSliderEvents();
  ctx2d = null;
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
          <template v-if="newsLoading">
            <div class="card card--placeholder">
              <h3>Новости загружаются...</h3>
              <p>Пожалуйста, подождите.</p>
              <div class="baton"><button type="button" disabled>Скоро</button></div>
            </div>
          </template>
          <template v-else-if="newsError">
            <div class="card card--placeholder">
              <h3>Не удалось загрузить новости</h3>
              <p>{{ newsError }}</p>
              <div class="baton"><button type="button" @click="loadNews">Повторить</button></div>
            </div>
          </template>
          <template v-else-if="newsItems.length === 0">
            <div class="card card--placeholder">
              <h3>Новости появятся совсем скоро</h3>
              <p>Мы готовим свежие материалы.</p>
              <div class="baton"><button type="button" @click="loadNews">Обновить</button></div>
            </div>
          </template>
          <template v-else>
            <div
              class="card"
              v-for="item in newsItems"
              :key="item.id || item.slug"
            >
              <img
                v-if="item.image_url"
                :src="item.image_url"
                :alt="item.title"
              />
              <h3>{{ item.title }}</h3>
              <p>{{ truncate(item.content) }}</p>
              <div class="baton">
                <button type="button" @click="openNews(item)">Подробнее</button>
              </div>
            </div>
          </template>
        </div>

        <button class="nav-btn left" @click="prevSlide" :disabled="newsItems.length <= 1">‹</button>
        <button class="nav-btn right" @click="nextSlide" :disabled="newsItems.length <= 1">›</button>
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
  min-height: 100vh;
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 100px;
  justify-content: center;
  border-radius: 24px;
  padding: 10px;
}

/* ====== ╨Ф╨╡╤Б╨║╤В╨╛╨┐ ====== */
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

/* ====== ╨Ь╨╛╨▒╨╕╨╗╤М╨╜╨░╤П ╨░╨┤╨░╨┐╤В╨░╤Ж╨╕╤П ====== */
@media (max-width: 900px) {
  .isp3304 {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 30px;
    padding: 0;
  }

  .title {
    display: none; /* ЁЯФе ╨б╨║╤А╤Л╨▓╨░╨╡╨╝ ╨▒╨╗╨╛╨║ ╤Б ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨╛╨╝ ╨╕ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡╨╝ */
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
    display: none; /* ЁЯФе ╨б╨║╤А╤Л╨▓╨░╨╡╨╝ ╤Б╤В╤А╨╡╨╗╨║╨╕ */
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

/* ====== ╨Ю╤Б╤В╨░╨╗╤М╨╜╤Л╨╡ ╤Б╤В╨╕╨╗╨╕ ====== */
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

.card .baton button {
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
}

.card.card--placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card.card--placeholder .baton {
  background-color: rgba(245, 73, 0, 0.12);
  color: var(--black);
}

.nav-btn[disabled] {
  opacity: 0.4;
  cursor: default;
}

/* ==== ╨Ь╨╛╨▒╨╕╨╗╤М╨╜╨░╤П ╨╛╨┐╤В╨╕╨╝╨╕╨╖╨░╤Ж╨╕╤П ==== */
@media (max-width: 900px) {
  .isp3304 {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 20px;
    padding: 0;
    width: 100%;
  }

  /* ╨Я╨╛╨║╨░╨╖╤Л╨▓╨░╨╡╨╝ ╤В╨╛╨╗╤М╨║╨╛ ╨╖╨░╨│╨╛╨╗╨╛╨▓╨╛╨║ h1 */
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

  /* ╨б╨╗╨░╨╣╨┤╨╡╤А */
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
    flex: 0 0 90%; /* ╨║╨░╤А╤В╨╛╤З╨║╨░ ╨╖╨░╨╜╨╕╨╝╨░╨╡╤В ╨┐╨╛╤З╤В╨╕ ╨▓╨╡╤Б╤М ╤Н╨║╤А╨░╨╜ */
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

  /* ╨г╨▒╨╕╤А╨░╨╡╨╝ ╤Б╤В╤А╨╡╨╗╨║╨╕ */
  .nav-btn {
    display: none;
  }
}

.title { position: relative; }

.runners-canvas {
  width: 100%;
  height: 170px;        /* ╨┤╨╛╨╗╨╢╨╜╨╛ ╤Б╨╛╨▓╨┐╨░╨┤╨░╤В╤М ╤Б cssH ╨▓ JS */
  margin-top: 12px;
  display: block;
  pointer-events: none; /* ╤З╤В╨╛╨▒╤Л ╨╜╨╡ ╨╝╨╡╤И╨░╤В╤М ╨║╨╗╨╕╨║╨░╨╝ */
}
</style>

