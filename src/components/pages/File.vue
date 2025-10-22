<script setup>
const props = defineProps({
  file: {
    type: String,
    required: true
  },
  color: { 
    type: String,
    required: false,
    default: '#ff4800' 
  },
  icon: {
    type: Boolean,
    required: false,
    default: false
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<template>
  <div class="link-container">
    <svg v-if="props.icon" class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="#444" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z" stroke-width="0.5" stroke="#444"/>
    </svg>
    <a class="link" :href="'http://localhost:5173/docs/'+file" target="_blank" :style="{ color: color }">
      <slot>{{ props.content }}</slot>
    </a>
  </div>
</template>

<style scoped>
.link-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.link-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 2px; 
}

.link {
  font-size: 1.3rem;
  text-decoration: none;
  transition: all 0.3s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex: 1;
  min-width: 0;
}

.link:hover {
  text-decoration: underline;
  transform: scale(1.01);
}

@media (max-width: 768px) {
  .link {
    font-size: 1rem;
  }
  
  .link-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
