<script setup>
defineProps({
  align: {
    type: String,
    required: false,
    default: 'center'
  }
})
</script>

<template>
  <p :class="`text-align-${align}`">
    <slot></slot>
  </p>
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
