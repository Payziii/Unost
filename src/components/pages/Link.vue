<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  linkTo: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: '#ff4800'
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
  color: props.color
}))
</script>

<template>
  <a
    v-if="hasSlotContent"
    :style="paragraphStyles"
    :href="linkTo"
    data-page-component="Link"
    :data-link-to="linkTo"
    :data-color="props.color"
    target="_blank"
  >
    <slot>{{ props.content }}</slot>
  </a>
  <a
    v-else
    :style="paragraphStyles"
    :href="linkTo"
    data-page-component="Link"
    :data-link-to="linkTo"
    :data-color="props.color"
    target="_blank"
    v-html="props.content"
  />
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

@media (max-width: 768px) {
  a {
    font-size: 1rem !important;
  }
}
</style>
