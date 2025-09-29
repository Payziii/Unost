<script setup>
import Button from '@/components/Button.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { ref, onMounted } from 'vue';

</script>

<template>
  <div class="header">
    <div class="upper">
      <div class="left">
        <img src="/images/logo/logo.png" class="logo" />
        <div class="texta">
          <h1>ГАПОУ СО «ВПМТТ «Юность»</h1>
          <h2>Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53</h2>
        </div>
      </div>
      <div class="navbar">
        <div class="contact">
          <img src="/images/icons/email.svg" class="icon" />
          <a href="mailto:lobastov07@mail.ru">lobastov07@mail.ru</a>
        </div>
        <div class="contact">
          <img src="/images/icons/phone.svg" class="icon" />
          <a href="tel:+73436854486">+7 (34368) 5-44-86</a>
        </div>
        <div class="contact">
          <img src="/images/icons/vk.svg" class="icon" />
          <a href="https://vk.com/vpmtt">ВКонтакте</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg, var(--orange) 0%, var(--soft-orange) 50%, var(--orange) 100%);
  margin-top: 20px;
}

.upper {
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 100%;

  h2 {
    font-size: 15px;
    font-weight: 500;
    color: var(--white);
  }

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
      color: var(--white);
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.navbar {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;

  .contact {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      width: 20px;
      height: 20px;
    }

    a {
      text-decoration: underline;
      color: var(--white)
    }
  }
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

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}
</style>