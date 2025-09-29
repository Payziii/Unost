<template>
  <div class="dropdown">
    <Button :text="text" :route="route" />
    <div class="dropdown-content">
      <router-link v-for="(item, index) in items" :key="index" :to="item.route">
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue';

defineProps({
  text: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: white;
  min-width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px;
  padding: 10px 0;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-content a {
  color: var(--black);
  padding: 5px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: var(--soft-orange);
}
</style>