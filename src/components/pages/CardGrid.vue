<script setup>
</script>

<template>
  <div class="cards">
    <slot></slot>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
  gap: 24px;
  justify-content: center; /* сетка как блок будет центрирована */
}

</style>
