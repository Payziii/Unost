<template>
  <div class="dropdown" ref="dropdownRef">
    <Button :text="text" :route="route" @click="handleButtonClick" />

    <div v-if="isMobile && isOpen" class="overlay" @click="closeDropdown"></div>

    <div
      class="dropdown-content"
      :class="{ mobile: isMobile }"
      v-show="!isMobile || isOpen"
      @click.stop
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="dropdown-item"
        @mouseenter="handleMouseEnter(item, index)"
        @mouseleave="handleMouseLeave"
      >
        <router-link
          v-if="!hasSubitems(item)"
          :to="item.route"
          @click="closeDropdown"
        >
          {{ item.text }}
        </router-link>

        <div
          v-else
          class="has-submenu"
          @click="handleSubmenuClick(item)"
        >
          <span>{{ item.text }}</span>
          <svg class="arrow" width="10" height="10" viewBox="0 0 24 24">
            <path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>

          <div
            v-if="!isMobile && hovered === index"
            class="submenu"
          >
            <router-link
              v-for="(sub, i) in item.subitems"
              :key="i"
              :to="sub.route"
              @click="closeDropdown"
            >
              {{ sub.text }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isMobile && activeSubmenu && activeSubmenu.length" class="submenu-modal">
        <div class="submenu-items">
          <router-link
            v-for="(sub, i) in activeSubmenu"
            :key="i"
            :to="sub.route"
            @click="closeDropdown"
          >
            {{ sub.text }}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  text: String,
  route: String,
  items: Array
});

const isOpen = ref(false);
const isMobile = ref(false);
const dropdownRef = ref(null);
const hovered = ref(null);       // Хранит индекс активного элемента (для десктопа)
const activeSubmenu = ref(null); // Хранит массив подпунктов (для мобилки)

// Хелпер для надежной проверки наличия подпунктов
const hasSubitems = (item) => {
  return item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleButtonClick = (e) => {
  if (isMobile.value) {
    e.preventDefault();
    isOpen.value = !isOpen.value;
  }
};

// Логика наведения (Десктоп)
const handleMouseEnter = (item, index) => {
  if (isMobile.value) return;
  
  // Если у элемента есть подменю -> открываем его
  if (hasSubitems(item)) {
    hovered.value = index;
  } else {
    // Если навели на обычную ссылку -> закрываем соседние открытые подменю
    hovered.value = null;
  }
};

const handleMouseLeave = () => {
  if (!isMobile.value) {
    // Можно добавить небольшую задержку здесь, если меню дергается
    // hovered.value = null; 
  }
};

// Логика клика по папке (Мобилка)
const handleSubmenuClick = (item) => {
  if (isMobile.value && hasSubitems(item)) {
    isOpen.value = false; // Закрываем родительское меню
    
    // Имитация анимации перехода
    setTimeout(() => {
      activeSubmenu.value = item.subitems;
    }, 150);
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  hovered.value = null;
  activeSubmenu.value = null;
};

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    // Не закрываем, если кликнули внутри модального окна подменю (оно вне dropdownRef)
    const modal = document.querySelector('.submenu-modal');
    if (modal && modal.contains(e.target)) return;
    
    closeDropdown();
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: white;
  min-width: 320px; /* Немного шире для длинных названий */
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 100;
  border-radius: 8px;
  padding: 10px 0;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.25s, transform 0.25s;
}

/* Показываем меню при наведении на сам блок .dropdown */
.dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  position: relative; /* Важно для позиционирования sub-menu */
}

.dropdown-content a {
  color: var(--black);
  padding: 8px 15px; /* Чуть больше отступы */
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
  font-size: 14px;
  line-height: 1.4;
}

.dropdown-content a:hover {
  background-color: var(--soft-orange);
}

/* Пункт со стрелочкой */
.has-submenu {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
}

.has-submenu:hover {
  background-color: var(--soft-orange);
}

/* Подменю (выпадает справа) */
.submenu {
  position: absolute;
  top: -5px; /* Чуть выше, чтобы перекрывало границу */
  left: 100%; /* Справа от родителя */
  background: white;
  min-width: 260px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 200;
  margin-left: 2px; /* Небольшой отступ */
}

.submenu a {
  padding: 8px 15px;
  display: block;
  color: var(--black);
}

.arrow {
  margin-left: 10px;
  flex-shrink: 0;
}

/* === МОБИЛЬНЫЕ СТИЛИ === */

/* Мобильное окно подменю */
.submenu-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  z-index: 2100;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  padding: 15px 0;
  display: flex;
  flex-direction: column;
}

.submenu-items a {
  padding: 12px 20px;
  color: var(--black);
  text-decoration: none;
  text-align: center; /* Центрируем текст на мобилках */
  border-bottom: 1px solid #f0f0f0;
}

.submenu-items a:last-child {
  border-bottom: none;
}

.submenu-items a:hover {
  background-color: var(--soft-orange);
}

.dropdown-content.mobile {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 85%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  z-index: 2001;
  padding: 15px 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  opacity: 1 !important;
  visibility: visible !important;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  backdrop-filter: blur(2px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: white;
  min-width: 300px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 100;
  border-radius: 8px;
  padding: 10px 0;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.25s, transform 0.25s;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-content a {
  color: var(--black);
  padding: 6px 12px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: var(--soft-orange);
}

/* пункт со стрелочкой */
.has-submenu {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;
}

.has-submenu:hover {
  background-color: var(--soft-orange);
}

/* подменю открывается рядом */
.submenu {
  position: absolute;
  top: 0;
  left: 100%;
  background: white;
  min-width: 250px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 200;
}

.submenu a {
  padding: 6px 12px;
  display: block;
  color: var(--black);
}

.submenu a:hover {
  background-color: var(--soft-orange);
}

.arrow {
  margin-left: 6px;
}

/* Мобильное окно подменю */
.submenu-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  z-index: 2100;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.submenu-items a {
  padding: 10px 20px;
  color: var(--black);
  text-decoration: none;
  text-align: center;
}

.submenu-items a:hover {
  background-color: var(--soft-orange);
}


.submenu-header {
  display: flex;
  align-items: center;
  background: var(--orang);
  color: white;
  padding: 10px 15px;
  gap: 10px;
}

.submenu-header button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.submenu-items a {
  padding: 10px 15px;
  display: block;
  color: var(--black);
}

.submenu-items a:hover {
  background-color: var(--soft-orange);
}

/* Мобильный режим */
.dropdown-content.mobile {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 85%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  z-index: 2001;
  padding: 15px 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  opacity: 1 !important;
  visibility: visible !important;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
