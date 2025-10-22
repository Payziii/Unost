<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  align: {
    type: String,
    required: false,
    default: 'center'
  },
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
  <p
    v-if="hasSlotContent"
    :class="`text-align-${align}`"
    data-page-component="Text"
    :data-text-align="align"
  >
    <slot>{{ props.content }}</slot>
  </p>
  <p
    v-else
    :class="`text-align-${align}`"
    data-page-component="Text"
    :data-text-align="align"
    v-html="props.content"
  />
</template>

<style scoped>
p {
  font-size: 1.3rem;
  color: #1b1b1b;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  p {
    font-size: 1rem;
  }
}

.text-align-left {
  text-align: left;
}
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.text-align-justify {
  text-align: justify;
}
</style>
