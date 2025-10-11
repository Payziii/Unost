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
  'font-size': '1.05rem',
  'color': props.color,
  'text-decoration': 'underline'
}));
</script>

<template>
  <a :style="paragraphStyles" :href="linkTo" target="_blank">
    <slot></slot>
  </a>
</template>

<style scoped>
</style>
