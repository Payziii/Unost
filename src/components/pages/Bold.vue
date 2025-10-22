<script setup>
const props = defineProps({
  content: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<template>
  <span style="font-weight: 500">
    <slot>{{ props.content }}</slot>
  </span>
</template>

<style scoped>
</style>
