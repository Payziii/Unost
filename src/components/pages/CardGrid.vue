<script setup>
defineProps({
  maxCardsPerRow: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="cards" :class="{ 'limited-cards': maxCardsPerRow > 0 }" :style="maxCardsPerRow > 0 ? { '--max-cards': maxCardsPerRow } : {}">
    <slot></slot>
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
</style>