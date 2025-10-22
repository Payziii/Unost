<script setup>
import { computed, nextTick, onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageContentRenderer from './PageContentRenderer.vue'
import PageEditor from '../editor/PageEditor.vue'
import { fetchPageContent, savePageContent } from '@/services/pageContentService'
import { sanitizeComponents } from '../editor/componentLibrary'

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

const defaultContentRef = ref(null)
const defaultTemplateComponents = shallowRef([])

const isAdmin = computed(() => localStorage.getItem('user_role') === 'admin')
const routePath = computed(() => route.path)
const hasCustomContent = computed(() => components.value.length > 0)
const isEditable = computed(() => routePath.value !== '/')
const currentTitle = computed(() => pageTitle.value || props.title)
const deepClone = (value) => {
  if (value === undefined) {
    return undefined
  }

  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value)
    } catch (_) {
      // ignore and fallback
    }
  }

  if (value === null) {
    return null
  }

  try {
    return JSON.parse(JSON.stringify(value))
  } catch (_) {
    return value
  }
}

const getPlainComponents = (source) => {
  if (!Array.isArray(source)) return []
  return source
    .map(item => deepClone(toRaw(item)))
    .filter(item => item !== undefined)
}

const editorInitialComponents = computed(() => {
  const source = hasCustomContent.value
    ? getPlainComponents(components.value)
    : getPlainComponents(defaultTemplateComponents.value)

  return sanitizeComponents(source)
})

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toBoolean = (value) => {
  if (typeof value === 'boolean') {
    return value
  }
  return String(value).toLowerCase() === 'true'
}

const getTextContent = (el) => (el?.textContent || '').trim()
const getInnerHtml = (el) => (el?.innerHTML || '').trim()

const extractAlign = (element) => {
  if (!element) return 'center'
  const datasetAlign = element.dataset?.textAlign
  if (datasetAlign) return datasetAlign
  const classAlign = Array.from(element.classList || [])
    .find(className => className.startsWith('text-align-'))
  return classAlign ? classAlign.replace('text-align-', '') : 'center'
}

const extractCardItem = (element) => {
  if (!element) {
    return {
      title: '',
      content: '',
      isButton: false,
      buttonText: '',
      buttonLink: ''
    }
  }

  const clone = element.cloneNode(true)
  const header = clone.querySelector('h1')
  if (header) header.remove()
  const buttonWrapper = clone.querySelector('.baton')
  if (buttonWrapper) buttonWrapper.remove()

  return {
    title: element.dataset?.cardTitle || getTextContent(element.querySelector('h1')),
    content: getInnerHtml(clone),
    isButton: toBoolean(element.dataset?.cardButton),
    buttonText: element.dataset?.cardButtonText || '',
    buttonLink: element.dataset?.cardButtonLink || ''
  }
}

const extractComponentFromElement = (element) => {
  if (!(element instanceof HTMLElement)) return null

  const type = element.dataset?.pageComponent
  if (!type) {
    const child = Array.from(element.children).find(
      (node) => node instanceof HTMLElement && node.dataset?.pageComponent
    )
    return child ? extractComponentFromElement(child) : null
  }

  switch (type) {
    case 'Title':
      return {
        type: 'Title',
        props: {
          content: getTextContent(element)
        }
      }
    case 'Text':
      return {
        type: 'Text',
        props: {
          content: getInnerHtml(element),
          align: extractAlign(element)
        }
      }
    case 'Highlight':
      return {
        type: 'Highlight',
        props: {
          content: getInnerHtml(element),
          color: element.dataset?.color || '#ff4800',
          isBold: toBoolean(element.dataset?.bold)
        }
      }
    case 'Link':
      return {
        type: 'Link',
        props: {
          content: getInnerHtml(element),
          linkTo: element.dataset?.linkTo || element.getAttribute('href') || '#',
          color: element.dataset?.color || '#ff4800'
        }
      }
    case 'File': {
      const fileLink = element.querySelector('a')
      const absoluteHref = fileLink?.getAttribute('href') || ''
      const fileName = element.dataset?.file || absoluteHref.replace(/^.*\/docs\//, '')
      return {
        type: 'File',
        props: {
          file: fileName,
          content: getInnerHtml(fileLink),
          color: element.dataset?.color || '#ff4800',
          icon: toBoolean(element.dataset?.icon)
        }
      }
    }
    case 'CardGrid': {
      const cardElements = Array.from(element.children).filter(
        (node) => node instanceof HTMLElement && node.dataset?.pageComponent === 'Card'
      )
      const items = cardElements.map(extractCardItem)
      return {
        type: 'CardGrid',
        props: {
          maxCardsPerRow: toNumber(element.dataset?.maxCards, 0),
          items
        }
      }
    }
    case 'Card': {
      const card = extractCardItem(element)
      return {
        type: 'Card',
        props: {
          title: card.title,
          content: card.content,
          isButton: card.isButton,
          buttonText: card.buttonText,
          buttonLink: card.buttonLink
        }
      }
    }
    case 'Bold':
      return {
        type: 'Bold',
        props: {
          content: getInnerHtml(element)
        }
      }
    case 'TitledImage':
      return {
        type: 'TitledImage',
        props: {
          src: element.dataset?.src || element.querySelector('img')?.getAttribute('src') || '',
          alt: element.dataset?.alt || element.querySelector('img')?.getAttribute('alt') || ''
        }
      }
    default:
      return null
  }
}

const collectDefaultTemplate = async () => {
  await nextTick()
  const root = defaultContentRef.value
  if (!root) {
    defaultTemplateComponents.value = []
    return
  }

  const collected = Array.from(root.children)
    .map((child) => extractComponentFromElement(child))
    .filter(Boolean)

  defaultTemplateComponents.value = collected.length ? sanitizeComponents(collected) : []
}

const updateDefaultTemplate = async () => {
  if (!hasCustomContent.value) {
    await collectDefaultTemplate()
  } else {
    defaultTemplateComponents.value = []
  }
}

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
    await updateDefaultTemplate()
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
    await updateDefaultTemplate()
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
          <div
            v-else
            ref="defaultContentRef"
            class="page-default-content"
          >
            <slot />
          </div>
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
      :initial-components="editorInitialComponents"
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

.page-default-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
