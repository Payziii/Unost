<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: { 
    type: String,
    required: false,
    default: '#ff4800' 
  },
  isBold: {
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

const paragraphStyles = computed(() => ({
  'font-size': '1.3rem',
  'color': props.color,
  'font-weight': props.isBold ? '500' : 'normal'
}));
</script>

<template>
  <span :style="paragraphStyles">
    <slot>{{ props.content }}</slot>
  </span>
</template>

<style scoped>
@media (max-width: 768px) {
  span {
    font-size: 1rem !important;
  }
}
</style>
