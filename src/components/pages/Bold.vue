<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: false,
    default: ''
  }
})

const slots = useSlots()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))
</script>

<template>
  <span
    v-if="hasSlotContent"
    style="font-weight: 500"
    data-page-component="Bold"
  >
    <slot>{{ props.content }}</slot>
  </span>
  <span
    v-else
    style="font-weight: 500"
    data-page-component="Bold"
    v-html="props.content"
  />
</template>

<style scoped>
</style>
