<script setup>
import { computed } from 'vue'
import Card from './Card.vue'

const props = defineProps({
  maxCardsPerRow: {
    type: Number,
    default: 0
  },
  items: {
    type: Array,
    default: () => []
  }
})

const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0)
</script>

<template>
  <div
    class="cards"
    :class="{ 'limited-cards': maxCardsPerRow > 0 }"
    :style="maxCardsPerRow > 0 ? { '--max-cards': maxCardsPerRow } : {}"
  >
    <template v-if="hasItems">
      <Card
        v-for="(card, index) in props.items"
        :key="card.id || index"
        :title="card.title"
        :isButton="card.isButton"
        :buttonText="card.buttonText"
        :buttonLink="card.buttonLink"
        :content="card.content"
      />
    </template>
    <slot v-else></slot>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
  gap: 24px;
  justify-content: center;
}

/* Ограничение максимального количества карточек */
.cards.limited-cards {
  grid-template-columns: repeat(auto-fit, minmax(
    min(300px, calc(100% / var(--max-cards) - 24px)),
    1fr
  ));
  max-width: calc(var(--max-cards) * 450px + (var(--max-cards) - 1) * 24px);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .cards.limited-cards {
    grid-template-columns: 1fr;
  }
}
</style>
