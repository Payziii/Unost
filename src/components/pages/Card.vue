<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: false,
    default: ""
  }
});
</script>

<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: #fffcf7;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 200px;
  max-width: 700px;
  border-radius: 12px;
  padding: 10px 20px 20px 20px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.08);
}

h1 {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #1b1b1b;
}
</style>
