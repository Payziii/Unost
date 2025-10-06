
<script setup>
import { ref } from 'vue';

const showFeedback = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');

function openFeedback() {
  showFeedback.value = true;
}

function closeFeedback() {
  showFeedback.value = false;
  name.value = '';
  email.value = '';
  message.value = '';
}

function submitFeedback() {
  
  alert(`Спасибо за обращение, ${name.value}!`);
  closeFeedback();
}
</script>

<template>
  <div class="main">
    <div class="isp3304">
      <h1>
        Государственное автономное профессиональное образовательное учреждение Свердловской области «Верхнепышминский механико-технологический техникум «Юность»
      </h1>
      <div class="map-container">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A1f4fa582c6cdaeb78b1c03ef2acfcb40c705125817b2754188f8758ddfbf892e&amp;source=constructor"
          width="674"
          height="493"
          frameborder="0"
        ></iframe>
      </div>
      <p>
        624096, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, 53<br>
        Тел/факс: +7 (34368) 5-44-86<br>
        E-mail: lobastov07@mail.ru<br>
        Адреса сайта: вп-юность.рф<br>
        <br>
        Директор: Лобастов Виталий Геннадьевич
      </p>
      <!-- Кнопка обратной связи (внизу блока) -->
      <button @click="openFeedback" style="margin-top: 32px; padding: 12px 32px; border-radius: 8px; background: #2d72d9; color: #fff; border: none; font-size: 1.1rem; cursor: pointer; align-self: center;">Обратная связь</button>
    </div>

    <!-- Модальное окно формы обратной связи -->
    <div v-if="showFeedback" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: #fff; border-radius: 16px; padding: 32px 24px; min-width: 320px; max-width: 90vw; box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18); position: relative;">
        <button @click="closeFeedback" style="position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #888;">&times;</button>
        <h2 style="margin-bottom: 18px; text-align: center;">Форма обратной связи</h2>
        <form @submit.prevent="submitFeedback" style="display: flex; flex-direction: column; gap: 16px;">
          <input v-model="name" type="text" placeholder="Ваше имя" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />
          <input v-model="email" type="email" placeholder="Email" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;" />
          <textarea v-model="message" placeholder="Текст обращения" required rows="4" style="padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem;"></textarea>
          <button type="submit" style="padding: 10px 0; border-radius: 6px; background: #2d72d9; color: #fff; border: none; font-size: 1.1rem; cursor: pointer;">Отправить</button>
        </form>
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
  /* background-color: var(--soft-white, #fff); */
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  gap: 24px;
}

.isp3304 h1 {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #222;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
}

.map-container iframe {
  border: none;
  width: 100%;
  max-width: 674px;
  height: 400px;
  min-height: 300px;
  background: #eaeaea;
}

.isp3304 p {
  text-align: center;
  font-size: 1.05rem;
  color: #444;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
}
</style>
