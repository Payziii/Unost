<script setup>
import { computed } from 'vue';

const props = defineProps({
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
  <span :style="paragraphStyles">
    <slot></slot>
  </span>
</template>

<style scoped>
</style>
