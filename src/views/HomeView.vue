<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const slider = ref(null);
let index = 0;
let interval = null;

onMounted(async () => {
  await nextTick();
  const el = slider.value;
  if (!el) return;

  const total = el.children.length;

  interval = setInterval(() => {
    index = (index + 1) % total;
    el.scrollTo({
      left: index * el.clientWidth, // считаем по ширине контейнера
      behavior: "smooth"
    });
  }, 7500);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>


<template>
  <div class="main">
    <div class="isp3304">
      <div class="title">
        <h1>ВПМТТ «ЮНОСТЬ»</h1>
        <div class="description">
          <p>Техникум, готовящий квалифицированных специалистов для современной экономики и промышленности. Практическое
            обучение, сильные мастерские и поддержка трудоустройства.
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
      <div class="slider" ref="slider">
        <div class="card">
          <img src="/images/cards/2.jpg" alt="">
          <h3>Осень 2025 — приём документов открыт</h3>
          <p>Узнайте условия приёма и направления обучения.</p>
        </div>
        <div class="card">
          <img src="/images/cards/1.jpg" alt="">
          <h3>Зимний набор</h3>
          <p>Подробности о программах и датах поступления.</p>
        </div>
        <div class="card">
          <img src="/images/cards/1.jpg" alt="">
          <h3>Весенний набор</h3>
          <p>Зарегистрируйся на экскурсию в кампус.</p>
        </div>
      </div>

      <!-- <a href="https://may9.ru/" target="_blank" rel="noopener">
        <img src="/images/other/may9.png">
      </a> -->
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
  background: none;
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 100px;
  justify-content: center;
  border-radius: 24px;
  padding: 10px;
}

.title {
  width: 40%;
  margin-top: 175px;

  h1 {
    font-weight: 700;
    font-size: 340%;
    color: #000;
  }
}

.description {
  background-color: #fffcf7;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0px 2.5px 5px 2px rgba(0, 0, 0, 0.2);

  p {
    font-size: 16px;
  }
}

.btns {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 20px;

  p {
    color: var(--white);
    font-weight: 600;
  }

  .button1 {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: #f54900;
    padding: 5px 10px;
    width: 200px;
    height: 50px;
    border-radius: 8px;
  }

  .button2 {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: #fff;
    padding: 5px 10px;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    border-color: rgba(245, 73, 0, 0.3);
    border-style: solid;
    border-width: 2px;

    p {
      color: var(--black);
      font-weight: 600;
    }
  }

}

.slider {
  margin-top: 10px;
  width: 40%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;   /* ключ для анимации */
  padding: 20px 0;
}

.card {
  min-width: 100%;
  flex: 0 0 100%;
  background: #fffcf7;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
  overflow: hidden;            /* чтобы картинка не вылезала за границы */
  display: flex;
  flex-direction: column;
  height: 550px;               /* фиксируем высоту карточки (можешь поменять) */
}

.card img {
  height: 50%;                 /* половина высоты карточки */
  width: 100%;
  object-fit: cover;            /* обрезаем/масштабируем */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin: 0;                    /* убираем любые внешние отступы */
  display: block;               /* убираем дефолтный "inline" отступ */
}

.card h3, 
.card p {
  margin: 10px 15px;            /* отступы только внутри текста */
}

</style>