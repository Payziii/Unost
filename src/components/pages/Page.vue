<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageContentRenderer from './PageContentRenderer.vue'
import PageEditor from '../editor/PageEditor.vue'
import { fetchPageContent, savePageContent } from '@/services/pageContentService'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default:
      'ГАПОУ СО «Техникум имени А.С. Попова»'
  }
})

const route = useRoute()
const pageTitle = ref(props.title)
const components = ref([])
const loading = ref(false)
const error = ref('')
const editorOpen = ref(false)
const saving = ref(false)

const isAdmin = computed(() => localStorage.getItem('user_role') === 'admin')
const routePath = computed(() => route.path)
const hasCustomContent = computed(() => components.value.length > 0)
const isEditable = computed(() => routePath.value !== '/')
const currentTitle = computed(() => pageTitle.value || props.title)

const setDocumentTitle = (title) => {
  if (title) {
    document.title = title
  }
}

const loadContent = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await fetchPageContent(routePath.value)
    components.value = Array.isArray(data?.components) ? data.components : []
    pageTitle.value = data?.title || props.title
  } catch (err) {
    console.error('Failed to load page content', err)
    error.value = err?.message || 'Не удалось загрузить контент страницы'
    components.value = []
    pageTitle.value = props.title
  } finally {
    loading.value = false
    setDocumentTitle(currentTitle.value)
  }
}

const openEditor = () => {
  editorOpen.value = true
}

const closeEditor = () => {
  editorOpen.value = false
}

const handleSave = async (payload) => {
  if (!isAdmin.value) return

  saving.value = true
  error.value = ''

  try {
    const response = await savePageContent(routePath.value, payload)
    components.value = Array.isArray(response?.components) ? response.components : payload.components
    pageTitle.value = response?.title || payload.title || props.title
    editorOpen.value = false
    setDocumentTitle(currentTitle.value)
  } catch (err) {
    console.error('Failed to save page content', err)
    error.value = err?.message || 'Не удалось сохранить изменения'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  setDocumentTitle(currentTitle.value)
  loadContent()
})

watch(
  () => routePath.value,
  () => {
    pageTitle.value = props.title
    if (editorOpen.value) {
      editorOpen.value = false
    }
    loadContent()
  }
)

watch(currentTitle, (value) => setDocumentTitle(value))
</script>

<template>
  <teleport to="head">
    <title>{{ currentTitle }}</title>
  </teleport>

  <div class="page-container">
    <div class="main">
      <div class="max">
        <div v-if="loading" class="page-state">
          Загрузка контента…
        </div>
        <template v-else>
          <PageContentRenderer
            v-if="hasCustomContent"
            :components="components"
          />
          <slot v-else />
        </template>
      </div>
    </div>

    <p v-if="error && isAdmin" class="page-error">
      {{ error }}
    </p>

    <div
      v-if="isAdmin && isEditable"
      class="page-editor-toolbar"
    >
      <button
        type="button"
        class="page-editor-button"
        @click="openEditor"
      >
        {{ hasCustomContent ? 'Редактировать страницу' : 'Создать контент' }}
      </button>
      <span v-if="!hasCustomContent" class="page-editor-hint">
        Сейчас используется контент из шаблонного файла
      </span>
    </div>

    <PageEditor
      v-if="editorOpen"
      :open="editorOpen"
      :initial-title="currentTitle"
      :initial-components="components"
      :saving="saving"
      @cancel="closeEditor"
      @save="handleSave"
    />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.max {
  width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  padding: 32px 48px 24px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  gap: 24px;
  background: #ffffff;
}

.page-state {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
}

.page-error {
  color: #dc2626;
  text-align: center;
  font-size: 0.95rem;
}

.page-editor-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 32px 24px;
}

.page-editor-button {
  border: none;
  border-radius: 24px;
  background: linear-gradient(90deg, #f97316, #fb923c);
  color: #fff;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.page-editor-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.35);
}

.page-editor-hint {
  color: #6b7280;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .max {
    width: 95%;
    padding: 28px 32px 20px;
  }
}

@media (max-width: 768px) {
  .max {
    width: 100%;
    padding: 20px 20px 16px;
    border-radius: 16px;
  }

  .page-editor-toolbar {
    padding: 0 16px 16px;
  }
}
</style>
