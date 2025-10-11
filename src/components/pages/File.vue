<script setup>
import { computed } from 'vue';

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
  }
});

const paragraphStyles = computed(() => ({
  'font-size': '1.05rem',
  'color': props.color,
  'text-decoration': 'underline'
}));
</script>

<template>
  <div style="display: flex; align-items: center;">
    <svg v-if="props.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 1em; height: 1em; vertical-align: middle; margin-right: 0.5em;">
      <path fill="#444" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z" stroke-width="0.5" stroke="#444"/>
    </svg>
    <a :style="paragraphStyles" :href="'http://localhost:5173/docs/'+file" target="_blank" style="display: flex; align-items: center;">
      <slot></slot>
    </a>
  </div>
</template>


<style scoped>
</style>
