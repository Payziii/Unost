<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(true)
const icons = ref([])
const showScrollTop = ref(false)
const route = useRoute()

const iconPaths = [
  '/images/icons/back/1.svg',
  '/images/icons/back/2.svg',
  '/images/icons/back/3.svg',
  '/images/icons/back/4.svg',
  '/images/icons/back/5.svg',
  '/images/icons/back/6.svg',
  '/images/icons/back/7.svg'
]

const hideSplash = () => {
  const splashElement = document.querySelector('.splash-screen')
  splashElement.classList.add('fade-out')
  setTimeout(() => {
    showSplash.value = false
  }, 500)
}

const generateRandomIcons = () => {
  const iconsCount = 15
  for (let i = 0; i < iconsCount; i++) {
    const side = Math.floor(Math.random() * 2)
    const x = side === 0 ? Math.random() * 3 : 93 + Math.random() * 7
    const randomIcon = {
      id: Date.now() + i,
      path: iconPaths[Math.floor(Math.random() * iconPaths.length)],
      rotation: Math.floor(Math.random() * 360),
      x,
      y: Math.random() * 100,
      side
    }
    icons.value.push(randomIcon)
  }
}

const checkScroll = () => {
  const routerView = document.querySelector('.router-view-wrapper')
  if (!routerView) return

  const viewHeight = routerView.scrollHeight
  const screenHeight = window.innerHeight
  const scrolledDown = window.scrollY > 300

  // показываем, если страница длинная и пользователь пролистал вниз
  showScrollTop.value = viewHeight > screenHeight * 1.2 && scrolledDown
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  // скрыть кнопку, чтобы не мигала во время скролла вверх
  showScrollTop.value = false
}

onMounted(async () => {
  generateRandomIcons()
  setTimeout(hideSplash, 1000)
  await nextTick()

  // немного подождём, чтобы RouterView отрисовался
  setTimeout(checkScroll, 600)

  window.addEventListener('resize', checkScroll)
  window.addEventListener('scroll', checkScroll)
})

// при размонтировании — очистка
onUnmounted(() => {
  window.removeEventListener('resize', checkScroll)
  window.removeEventListener('scroll', checkScroll)
})

// следим за переходами между страницами
watch(
  () => route.fullPath,
  async () => {
    // скрыть кнопку при переходе
    showScrollTop.value = false
    // дождаться рендера новой страницы
    await nextTick()
    // через небольшой таймаут пересчитать высоту новой страницы
    setTimeout(checkScroll, 500)
  }
)
</script>

<template>
  <SplashScreen v-if="showSplash" />

  <div class="app-container">
    <Header />
    <div class="router-view-wrapper">
      <RouterView />
    </div>
    <Footer />

    <div class="random-icons-container" hidden>
      <img
        v-for="icon in icons"
        :key="icon.id"
        :src="icon.path"
        class="random-icon"
        :class="{ 'left-side': icon.side === 0, 'right-side': icon.side === 1 }"
        :style="{
          transform: `rotate(${icon.rotation}deg)`,
          left: `${icon.x}%`,
          top: `${icon.y}%`
        }"
        alt=""
      />
    </div>

    <!-- Кнопка прокрутки вверх -->
    <transition name="fade">
      <button
        v-if="showScrollTop"
        class="scroll-top-btn"
        @click="scrollToTop"
        title="Наверх"
      >
        ↑
      </button>
    </transition>
  </div>
</template>

<style>

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.router-view-wrapper {
  flex: 1 0 auto; /* Занимает всё доступное пространство */
}

/* Или если нужно, чтобы контент растягивался */
.router-view-wrapper {
  flex: 1;
}

/* Кнопка "наверх" */
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #222;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: background 0.3s ease, transform 0.3s ease;
  z-index: 1000;
}
.scroll-top-btn:hover {
  background: #444;
  transform: translateY(-2px);
}

/* Анимация появления / исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Остальные стили */
.app-container {
  position: relative;
  min-height: 100vh;
}
.random-icons-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
.random-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.6;
  transform-origin: center;
  filter: invert(90%);
  animation: fadeIn 1.5s ease-in-out;
}
.left-side { transform-origin: right center; }
.right-side { transform-origin: left center; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: rotate(0deg) scale(0.3);
  }
  to {
    opacity: 0.6;
    transform: rotate(var(--rotation)) scale(1);
  }
}
</style>
