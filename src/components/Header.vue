<script setup>
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="header">
      <div class="upper">
        <div class="left">
          <img src="/images/logo/logo.png" class="logo" />
          <h1>ГАПОУ СО ВП МТТ "Юность"</h1>
        </div>
        <div class="right">
          <div class="search">
            <input type="text" placeholder="Поиск..." />
          </div>
          <Button text="Контакты" route="/contacts" />
          <Button text="Личный кабинет" route="/login" />
        </div>
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
</style>