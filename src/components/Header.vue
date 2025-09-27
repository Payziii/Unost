<script setup>
import Button from '@/components/Button.vue';
import { ref, onMounted } from 'vue';

const titleElement = ref(null);
const titles = [
  "ГАПОУ СО «ВПМТТ «Юность»",
  "ГАПОУ СО Верхнепышминский механико-технологический техникум «Юность»"
];
let isAnimating = false;

const typeWriter = async (element, titlesArray, speed = 100) => {
  if (isAnimating) return;
  isAnimating = true;
  
  while (true) {
    const text = titlesArray[Math.floor(Math.random() * titlesArray.length)];
    
    for (let i = 0; i <= text.length; i++) {
      element.textContent = text.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    for (let i = text.length; i >= 0; i--) {
      element.textContent = text.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};

onMounted(() => {
  if (titleElement.value) {
    typeWriter(titleElement.value, titles, 100);
  }
});
</script>

<template>
    <div class="header">
      <div class="upper">
        <div class="left">
          <img src="/images/logo/logo.png" class="logo" />
          <h1 ref="titleElement" id="title" class="typing-text"></h1>
        </div>
        <div class="right">
          <img src="/images/icons/eye.svg" class="icon" />
          <div class="search">
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
      </div>
    <div class="navbar">
      <Button text="Основные сведения" route="/" />
      <Button text="Студентам" route="/news" />
      <Button text="Абитуриентам" route="/timetable" />
      <Button text="Структура" route="/students" />
      <Button text="Новости" route="/applicants" />
      <Button text="Контакты" route="/teachers" />
      <Button text="Личный кабинет" route="/about" />
    </div>
    </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg,var(--orange) 0%, var(--soft-orange) 50%, var(--orange) 100%);
}

.upper {
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 50%;

  .left {
    display: flex;
    align-items: center;
    gap: 20px;

    .logo {
      height: 50px;
      width: auto;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--black);
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.navbar {
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.search {
  display: inline-block;
  background: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background 0.3s;
  cursor: pointer;
}

.search:hover {
  background: var(--soft-orange);
}

.search input {
  color: var(--black);
  font-weight: 600;
  font-size: 20px;
  transition: color 0.3s ease;
  background: transparent;
  border: none;
  outline: none;
  width: 100px;
}


.search input::placeholder {
  color: var(--white);
}

.search:hover input::placeholder {
  color: var(--black);
}

.typing-text::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>