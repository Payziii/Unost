<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const slider = ref(null);
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

onMounted(async () => {
  await nextTick();
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

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
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
  animation: pulse 4s infinite ease-in-out;
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
</style>
