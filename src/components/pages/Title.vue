<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: #222;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.2rem;
  }
}
</style>
