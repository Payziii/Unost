<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const slots = useSlots()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))
</script>

<template>
  <h1
    v-if="hasSlotContent"
    data-page-component="Title"
  >
    <slot>{{ props.content }}</slot>
  </h1>
  <h1
    v-else
    data-page-component="Title"
    v-html="props.content"
  />
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: #222;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.2rem;
  }
}
</style>
