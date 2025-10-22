<script setup>
import { computed } from 'vue'
import Title from './Title.vue'
import Text from './Text.vue'
import Highlight from './Highlight.vue'
import Link from './Link.vue'
import File from './File.vue'
import CardGrid from './CardGrid.vue'
import Card from './Card.vue'
import TitledImage from './TitledImage.vue'
import Bold from './Bold.vue'

const props = defineProps({
  components: {
    type: Array,
    default: () => []
  }
})

const componentMap = {
  Title,
  Text,
  Highlight,
  Link,
  File,
  CardGrid,
  Card,
  TitledImage,
  Bold
}

const normalizeProps = (rawProps = {}) => {
  const propsCopy = { ...rawProps }
  if (propsCopy.cards && !propsCopy.items) {
    propsCopy.items = propsCopy.cards
  }
  return propsCopy
}

const renderedComponents = computed(() =>
  (props.components || [])
    .map((item, index) => {
      const component = componentMap[item.type] || null
      return {
        key: item.id || `${item.type}-${index}`,
        component,
        props: normalizeProps(item.props || {})
      }
    })
    .filter(item => item.component)
)
</script>

<template>
  <div class="page-content-renderer">
    <component
      v-for="component in renderedComponents"
      :key="component.key"
      :is="component.component"
      v-bind="component.props"
    />
  </div>
</template>

<style scoped>
.page-content-renderer {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
