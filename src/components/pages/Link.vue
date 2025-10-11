<script setup>
import { computed } from 'vue';

const props = defineProps({
  linkTo: {
    type: String,
    required: true
  },
  color: { 
    type: String,
    required: false,
    default: '#ff4800' 
  }
});

const paragraphStyles = computed(() => ({
  'font-size': '1.3rem',
  'color': props.color,
}));
</script>

<template>
  <a :style="paragraphStyles" :href="linkTo" target="_blank">
    <slot></slot>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  text-decoration: underline;
  scale: 1.01
}
</style>
