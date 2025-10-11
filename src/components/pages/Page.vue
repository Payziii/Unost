<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: 'Юность - Верхнепышминский механико-технологический техникум'
  }
})
</script>

<template>
<head>
  <title>{{ title }}</title>
</head>
  <div class="main">
    <div class="max">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.max {
  width: 90%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border-radius: 24px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  gap: 24px;
}
</style>
