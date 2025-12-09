<template>
  <div class="header">
    <div class="upper">
      <div class="left">
        <router-link to="/" class="logo-wrap">
          <img src="/images/logo/logo.png" class="logo" />
          <div class="texta">
            <h1>ВПМТТ «Юность»</h1>
            <h2>Механико-технологический техникум</h2>
          </div>
        </router-link>

        <div class="nav-links">
          <template v-for="section in navigationSections" :key="section.id">

            <DropdownMenu v-if="hasValidSubItems(section)" :text="section.label" :route="section.route || '/'"
              :items="section.items" />

            <Button v-else :text="section.label" :route="section.route || '#'" />

          </template>

          <Button text="Контакты" route="/kontakty" />
          <Button text="Личный кабинет" :route="profileRoute" @click="handleProfileClick" />
        </div>

        <button class="burger" @click="toggleMenu">☰</button>
      </div>

      <!-- ПК-кнопка -->
      <Button2 class="desktop-apply" text="Подать заявку" route="/novosti" />
    </div>

    <!-- Мобильное бургер-меню -->
    <transition name="slide">
      <div class="mobile-menu" v-if="isMenuOpen">
        <template v-for="section in navigationSections" :key="`mobile-${section.id}`">

          <DropdownMenu v-if="hasValidSubItems(section)" :text="section.label" :route="section.route || '/'"
            :items="section.items" />

          <Button v-else :text="section.label" :route="section.route || '#'" />

        </template>

        <Button text="Контакты" route="/kontakty" />
        <Button text="Личный кабинет" :route="profileRoute" @click="handleProfileClick" />
        <Button2 class="mobile-apply" text="Подать заявку" route="/novosti" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue';
import Button2 from '@/components/Button2.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { fetchHeaderNavigation } from '@/services/navigationService';
import { sanitizeNavigationConfig, NAVIGATION_UPDATE_EVENT } from '@/utils/navigation';
import { getDefaultNavigationConfig } from '@/config/navigation-defaults.js';

const router = useRouter();
const isMenuOpen = ref(false);
const navigationSections = ref(getDefaultNavigationConfig());

const hasValidSubItems = (section) => {
  if (!Array.isArray(section.items)) return false;
  
  if (section.items.length === 0) return false;

  return section.items.some(item => item && Object.keys(item).length > 0);
};

// Реактивные данные для пользователя
const userRole = ref('');
const isLoggedIn = ref(false);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

// Функция для проверки статуса авторизации
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  userRole.value = localStorage.getItem('user_role') || '';
  isLoggedIn.value = !!token;
};

const applyNavigationConfig = (config) => {
  navigationSections.value = sanitizeNavigationConfig(config);
};

const loadNavigation = async (force = false) => {
  try {
    const config = await fetchHeaderNavigation({ force });
    applyNavigationConfig(config);
  } catch (error) {
    console.error('Не удалось загрузить меню навигации', error);
    navigationSections.value = getDefaultNavigationConfig();
  }
};

const handleNavigationUpdate = (event) => {
  if (event?.detail) {
    applyNavigationConfig(event.detail);
  } else {
    loadNavigation(true);
  }
};

// Вычисляемое свойство для маршрута профиля
const profileRoute = computed(() => {
  // Всегда ведем на логин, если пользователь не авторизован
  if (!isLoggedIn.value) return '/login';
  
  // Для авторизованных пользователей определяем маршрут по роли
  return userRole.value === 'admin' ? '/admin/kniga-zhalob' : '/profile';
});

// Обработчик клика по кнопке профиля
const handleProfileClick = (event) => {
  // Если пользователь не авторизован, разрешаем стандартное поведение (переход на /login)
  if (!isLoggedIn.value) {
    isMenuOpen.value = false;
    return;
  }
  
  // Если пользователь авторизован как админ, перенаправляем в админ-панель
  if (userRole.value === 'admin') {
    event.preventDefault();
    router.push('/admin/kniga-zhalob');
  }
  // Для студентов разрешаем стандартное поведение (переход на /profile)
  
  // Закрываем мобильное меню после клика
  isMenuOpen.value = false;
};

onMounted(() => {
  checkAuthStatus();
  loadNavigation();
  
  // Слушаем изменения в localStorage для обновления статуса авторизации
  window.addEventListener('storage', checkAuthStatus);
  window.addEventListener(NAVIGATION_UPDATE_EVENT, handleNavigationUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', checkAuthStatus);
  window.removeEventListener(NAVIGATION_UPDATE_EVENT, handleNavigationUpdate);
});
</script>

<style scoped>
.header {
  width: 100%;
  background-color: var(--orang);
  margin-bottom: 20px;
}

.upper {
  padding: 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
}

.left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo {
  height: 50px;
  width: auto;
}

h1 {
  font-size: 18px;
  font-weight: 700;
  color: var(--white);
}

h2 {
  font-size: 14px;
  color: var(--white);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.burger {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 26px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: var(--orang);
  padding: 10px 20px;
  gap: 10px;
}

.desktop-apply {
  display: block;
}

.mobile-apply {
  display: none;
}

/* плавная анимация */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 📱 Адаптация под мобильные устройства */
@media (max-width: 768px) {
  .upper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px 15px;
    gap: 10px;
    text-align: center;
  }

  .left {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .logo {
    height: 40px;
  }

  h1 {
    font-size: 16px;
  }

  h2 {
    font-size: 12px;
  }

  .nav-links {
    display: none;
  }

  .burger {
    display: block;
    font-size: 28px;
    margin-top: 5px;
  }

  /* скрываем десктопную кнопку */
  .desktop-apply {
    display: none;
  }

  /* показываем кнопку в мобильном меню */
  .mobile-apply {
    display: block;
    width: 100%;
  }

  .mobile-menu {
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    gap: 12px;
    background: var(--orang);
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  .mobile-menu a,
  .mobile-menu button {
    font-size: 15px;
  }

  .texta {
    text-align: center;
  }
}
</style>
