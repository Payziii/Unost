<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isButton: {
    type: Boolean,
    required: false,
    default: false
  },
  buttonText: {
    type: String,
    required: false
  },
  buttonLink: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
})

const slots = useSlots()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))
</script>

<template>
  <div
    class="card"
    data-page-component="Card"
    :data-card-title="title"
    :data-card-button="props.isButton"
    :data-card-button-text="props.buttonText || ''"
    :data-card-button-link="props.buttonLink || ''"
  >
    <h1>{{ title }}</h1>
    <template v-if="hasSlotContent">
      <slot>{{ props.content }}</slot>
    </template>
    <div v-else class="card-content" v-html="props.content" />
    <a v-if="isButton" :href="buttonLink" target="_blank" class="baton">
      {{ buttonText }}
    </a>
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.baton {
  margin-top: auto;
  align-self: center;
  background-color: var(--orang);
  color: var(--black);
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.baton:hover {
  background-color: var(--orang-dark, #e87c00);
}

h1 {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #1b1b1b;
}

a {
  text-decoration: none;
  color: #1b1b1b;
  font-weight: 500;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.2rem;
  }
}
</style>
