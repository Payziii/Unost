<script setup>
import { computed, useSlots } from 'vue'

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
})

const slots = useSlots()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))

const paragraphStyles = computed(() => ({
  'font-size': '1.3rem',
  color: props.color,
  'font-weight': props.isBold ? '500' : 'normal'
}))
</script>

<template>
  <span
    v-if="hasSlotContent"
    :style="paragraphStyles"
    data-page-component="Highlight"
    :data-color="props.color"
    :data-bold="props.isBold"
  >
    <slot>{{ props.content }}</slot>
  </span>
  <span
    v-else
    :style="paragraphStyles"
    data-page-component="Highlight"
    :data-color="props.color"
    :data-bold="props.isBold"
    v-html="props.content"
  />
</template>

<style scoped>
@media (max-width: 768px) {
  span {
    font-size: 1rem !important;
  }
}
</style>
