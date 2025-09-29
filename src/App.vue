<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(true)
const icons = ref([]) 

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
    
    const x = side === 0 
      ? Math.random() * 3 
      : 93 + Math.random() * 7 
    
    const randomIcon = {
      id: Date.now() + i, 
      path: iconPaths[Math.floor(Math.random() * iconPaths.length)],
      rotation: Math.floor(Math.random() * 360), 
      x: x, 
      y: Math.random() * 100, 
      side: side
    }
    icons.value.push(randomIcon)
  }
}

onMounted(() => {
  generateRandomIcons()
  setTimeout(hideSplash, 1000)
})
</script>

<template>
  <SplashScreen v-if="showSplash" />
  
  <div class="app-container">
    <Header/>
    <RouterView />
    <Footer/>
    
    <div class="random-icons-container">
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
  </div>
</template>

<style>
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

.left-side {
  transform-origin: right center; 
}

.right-side {
  transform-origin: left center; 
}

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

<style>

</style>