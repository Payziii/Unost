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
          <h3>© 2025 <a href="https://github.com/Payziii" target="_blank">Payziii</a>,
            <a href="https://github.com/Ab4kshin" target="_blank">Ab4kshin</a>,
            <a href="https://github.com/LegendaUral" target="_blank">LegendaUral</a>,
            <a href="https://github.com/SenkoBread07" target="_blank">SenkoBread07</a>
          </h3>
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
  padding-left: 70px;
  padding-right: 70px;
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

  h3 {
    font-size: 15px;
    font-weight: 400;
    color: var(--white);
    a {
      text-decoration: none;
      color: var(--white);
    }
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
      color: var(--white);
    }
  }
}

/* 📱 Мобильная адаптация */
@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 20px 10px;
  }

  .upper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 15px;
  }

  .upper .left {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
  }

  .upper .left .logo {
    height: 40px;
  }

  .upper .left h1 {
    font-size: 18px;
  }

  .upper .left h2 {
    font-size: 13px;
  }

  .upper .left h3 {
    font-size: 12px;
    line-height: 1.4;
  }

  .navbar {
    align-items: center;
    text-align: center;
  }

  .navbar .contact {
    flex-direction: row;
    justify-content: center;
    gap: 8px;
  }

  .navbar .icon {
    width: 18px;
    height: 18px;
  }

  .navbar a {
    font-size: 14px;
  }
}
</style>
