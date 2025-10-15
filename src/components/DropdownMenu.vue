<template>
  <div class="dropdown" ref="dropdownRef">
    <Button :text="text" :route="route" @click="handleButtonClick" />

    <!-- затемнение -->
    <div v-if="isMobile && isOpen" class="overlay" @click="closeDropdown"></div>

    <!-- выпадающее меню -->
    <div
      class="dropdown-content"
      :class="{ mobile: isMobile }"
      v-show="!isMobile || isOpen"
      @click.stop
    >
      <router-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.route"
        @click="closeDropdown"
      >
        {{ item.text }}
      </router-link>
    </div>
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

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleButtonClick = (e) => {
  if (isMobile.value) {
    e.preventDefault();
    isOpen.value = !isOpen.value;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
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
  z-index: 10;
}

/* ===== ДЕСКТОП ===== */
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
  padding: 5px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: var(--soft-orange);
}

/* ===== МОБИЛЬНАЯ ВЕРСИЯ ===== */
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

/* полупрозрачный фон */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
}

/* исправляем родителя */
@media (max-width: 768px) {
  .dropdown {
    position: static !important;
  }
}
</style>
