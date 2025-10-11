<script setup>
</script>

<template>
  <div class="cards">
    <slot></slot>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-around;
}
</style>
