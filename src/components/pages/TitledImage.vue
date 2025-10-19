<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false,
    default: ''
  }
});

const paragraphStyles = computed(() => ({
  'font-size': '1.3rem',
  'color': props.color,
}));
</script>

<template>
  <div class="logo-container">
    <img
      :src="src"
      :alt="alt" class="logo" />
  </div>
</template>


<style scoped>
.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
}

.logo {
    width: 65%;
    max-width: 65%;
    height: auto;
    border-radius: 8px;
}
</style>
