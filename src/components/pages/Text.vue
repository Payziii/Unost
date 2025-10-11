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
  font-size: 1.05rem;
  color: #444;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
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
