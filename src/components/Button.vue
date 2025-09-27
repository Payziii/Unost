<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  route: {
    type: String,
    required: false,
    default: null,
  },
})
</script>

<template>
  <div class="button">
    <a v-if="link" :href="link" class="button-link">{{ text }}</a>
    <router-link v-else-if="route" :to="route" class="button-link">{{ text }}</router-link>
    <p v-else class="button-link">{{ text }}</p>
  </div>
</template>

<style scoped>
.button {
  display: inline-block;
  background: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: var(--soft-orange);
    .button-link {
      color: var(--black);
    }
  }

  .button-link {
    color: var(--white);
    text-decoration: none;
    font-weight: 600;
    font-size: 20px;
    transition: color 0.3s ease;
  }

}
</style>
