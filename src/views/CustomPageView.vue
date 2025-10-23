<script setup>
import Page from '@/components/pages/Page.vue'
</script>

<template>
  <Page title="Новая страница">
    <div class="custom-page-placeholder">
      <h2 class="custom-page-placeholder__title">Страница пока пустая</h2>
      <p class="custom-page-placeholder__text">
        Авторизуйтесь в админ-панели и нажмите кнопку «Редактировать страницу», чтобы заполнить страницу контентом.
      </p>
    </div>
  </Page>
</template>

<style scoped>
.custom-page-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  gap: 1rem;
  text-align: center;
  color: #4b5563;
  background: #f9fafb;
  border-radius: 16px;
  border: 1px dashed #d1d5db;
}

.custom-page-placeholder__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.custom-page-placeholder__text {
  margin: 0;
  max-width: 520px;
  line-height: 1.6;
}
</style>
