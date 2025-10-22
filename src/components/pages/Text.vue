<script setup>
import { computed, useSlots } from 'vue'
import Bold from './Bold.vue'
import Highlight from './Highlight.vue'
import Link from './Link.vue'

const props = defineProps({
  align: {
    type: String,
    required: false,
    default: 'center'
  },
  content: {
    type: [String, Array],
    required: false,
    default: ''
  }
})

const inlineComponentMap = {
  Bold,
  Highlight,
  Link
}

const slots = useSlots()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))

const inlineSegments = computed(() => {
  if (hasSlotContent.value || !Array.isArray(props.content)) {
    return null
  }

  return props.content.map((segment, index) => {
    const key = segment?.id ?? `segment-${index}`

    if (typeof segment === 'string') {
      return {
        key,
        type: 'text',
        value: segment
      }
    }

    if (!segment || typeof segment !== 'object') {
      return {
        key,
        type: 'text',
        value: ''
      }
    }

    if (segment.type === 'text' || !segment.type) {
      const value = segment.value ?? segment.content ?? ''
      return {
        key,
        type: 'text',
        value: typeof value === 'string' ? value : ''
      }
    }

    const inlineComponent = inlineComponentMap[segment.type]
    if (!inlineComponent) {
      return {
        key,
        type: 'text',
        value: ''
      }
    }

    const propsPayload = segment.props ?? {
      content: segment.content ?? ''
    }

    return {
      key,
      type: segment.type,
      component: inlineComponent,
      props: {
        ...propsPayload,
        content: propsPayload.content ?? ''
      }
    }
  })
})
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
    v-else-if="inlineSegments"
    :class="`text-align-${align}`"
    data-page-component="Text"
    :data-text-align="align"
  >
    <template v-for="segment in inlineSegments" :key="segment.key">
      <component
        v-if="segment.type !== 'text'"
        :is="segment.component"
        v-bind="segment.props"
      />
      <span
        v-else
        class="text-segment"
        v-html="segment.value"
      />
    </template>
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

.text-segment {
  display: inline;
}
</style>
