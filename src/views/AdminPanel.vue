<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { savePageContent } from '@/services/pageContentService'
import { routeConfig } from '@/router/route-config.js'
import { fetchHeaderNavigation, saveHeaderNavigation } from '@/services/navigationService'
import { sanitizeNavigationConfig, normalizeRoutePath, NAVIGATION_UPDATE_EVENT } from '@/utils/navigation'
import { getDefaultNavigationConfig } from '@/config/navigation-defaults.js'

const router = useRouter()
const complaints = ref([])
const feedback = ref([])
const news = ref([])
const stats = ref({})
const feedbackStats = ref({})
const loading = ref(true)
const feedbackLoading = ref(true)
const newsLoading = ref(true)
const error = ref('')
const newsError = ref('')
const activeTab = ref('complaints')
const newsForm = ref({
  title: '',
  content: '',
  image: null
})
const newsSubmitting = ref(false)
const previewImage = ref('')
const newsFileInputKey = ref(0)
const pageForm = ref({
  path: '',
  title: ''
})
const pageSubmitting = ref(false)
const pageError = ref('')
const pageSuccess = ref('')
const navigationDraft = ref(getDefaultNavigationConfig())
const navigationOriginal = ref(getDefaultNavigationConfig())
const navigationLoading = ref(false)
const navigationSaving = ref(false)
const navigationError = ref('')
const navigationSuccess = ref('')
const sectionPageSelections = ref({})
const collapsedSections = ref({})

const API_BASE_URL = 'http://юность.панксквад.рф/api'
const CREATED_PAGES_STORAGE_KEY = 'unost.admin.createdPages'
const routeSuggestionId = 'navigation-route-suggestions'
const createdPages = ref([])

// Функции для работы с жалобами
const fetchComplaints = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/complaints`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 403) {
        error.value = 'У вас нет прав для просмотра жалоб'
        return
      }
      throw new Error('Ошибка загрузки жалоб')
    }

    complaints.value = await response.json()
  } catch (err) {
    console.error('Ошибка загрузки жалоб:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Функции для работы с обратной связью
const fetchFeedback = async () => {
  try {
    feedbackLoading.value = true
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/feedback`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 403) {
        error.value = 'У вас нет прав для просмотра обратной связи'
        return
      }
      throw new Error('Ошибка загрузки обратной связи')
    }

    feedback.value = await response.json()
  } catch (err) {
    console.error('Ошибка загрузки обратной связи:', err)
    error.value = err.message
  } finally {
    feedbackLoading.value = false
  }
}

const fetchNews = async () => {
  try {
    newsLoading.value = true
    newsError.value = ''

    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/news?include_empty=true`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      if (response.status === 403) {
        newsError.value = 'У вас нет прав для просмотра новостей'
        return
      }
      throw new Error('Ошибка загрузки новостей')
    }

    news.value = await response.json()
  } catch (err) {
    console.error('Ошибка загрузки новостей:', err)
    newsError.value = err.message
  } finally {
    newsLoading.value = false
  }
}

const resetNewsForm = () => {
  newsForm.value = {
    title: '',
    content: '',
    image: null
  }
  previewImage.value = ''
  newsFileInputKey.value += 1
}

const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    newsForm.value.image = file
    previewImage.value = URL.createObjectURL(file)
  } else {
    newsForm.value.image = null
    previewImage.value = ''
  }
}

const submitNews = async () => {
  if (!newsForm.value.title.trim() || !newsForm.value.content.trim()) {
    newsError.value = 'Пожалуйста, заполните все обязательные поля'
    return
  }

  try {
    newsSubmitting.value = true
    newsError.value = ''

    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const formData = new FormData()
    formData.append('title', newsForm.value.title)
    formData.append('content', newsForm.value.content)
    if (newsForm.value.image) {
      formData.append('image', newsForm.value.image)
    }

    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      if (response.status === 403) {
        newsError.value = 'У вас нет прав для создания новостей'
        return
      }
      throw new Error('Ошибка сохранения новости')
    }

    const createdNews = await response.json()
    news.value = [createdNews, ...news.value]
    resetNewsForm()

    const editPath = createdNews.page_path || `/news/${createdNews.slug}`
    await router.push({
      path: editPath,
      query: { edit: 'true', from: 'admin-news' }
    })
  } catch (err) {
    console.error('Ошибка создания новости:', err)
    newsError.value = err.message
  } finally {
    newsSubmitting.value = false
  }
}

const resetPageForm = () => {
  pageForm.value = {
    path: '',
    title: ''
  }
}

const normalizePagePath = (value) => {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/')
  const withoutSpaces = collapsed.replace(/\s+/g, '-')
  const normalized = withoutSpaces.length > 1 && withoutSpaces.endsWith('/')
    ? withoutSpaces.slice(0, -1)
    : withoutSpaces

  const lowercased = normalized.toLowerCase()
  const sanitized = lowercased.replace(/[^a-z0-9а-яё/_-]+/gi, '-')
  return sanitized.replace(/-+/g, '-')
}

const cloneNavigation = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch (_) {
    if (Array.isArray(value)) {
      return value.map((item) => cloneNavigation(item))
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, cloneNavigation(entry)])
      )
    }
    return []
  }
}

const loadCreatedPages = () => {
  if (typeof localStorage === 'undefined') {
    return []
  }

  try {
    const raw = localStorage.getItem(CREATED_PAGES_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((item) => {
        if (typeof item === 'string') {
          const path = normalizeRoutePath(item)
          return path ? { path, title: '' } : null
        }

        const path = normalizeRoutePath(item?.path || '')
        if (!path) {
          return null
        }

        const title = typeof item?.title === 'string' ? item.title : ''
        return { path, title }
      })
      .filter(Boolean)
  } catch (_) {
    return []
  }
}

const storeCreatedPages = (pages) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    const sanitized = Array.isArray(pages)
      ? pages
          .map((item) => ({
            path: normalizeRoutePath(item?.path || ''),
            title: typeof item?.title === 'string' ? item.title : ''
          }))
          .filter((item) => item.path)
      : []

    if (sanitized.length === 0) {
      localStorage.removeItem(CREATED_PAGES_STORAGE_KEY)
    } else {
      localStorage.setItem(CREATED_PAGES_STORAGE_KEY, JSON.stringify(sanitized))
    }
  } catch (_) {
    // ignore storage errors
  }
}

const trackCreatedPage = (path, title = '') => {
  const normalized = normalizeRoutePath(path)
  if (!normalized) {
    return
  }

  const existing = createdPages.value.find((item) => item.path === normalized)
  if (existing) {
    if (title && !existing.title) {
      existing.title = title
      storeCreatedPages(createdPages.value)
    }
    return
  }

  const record = {
    path: normalized,
    title: title || ''
  }

  createdPages.value = [...createdPages.value, record]
  storeCreatedPages(createdPages.value)
}

createdPages.value = loadCreatedPages()

const submitPageForm = async () => {
  pageError.value = ''
  pageSuccess.value = ''

  const normalizedPath = normalizePagePath(pageForm.value.path)

  if (!normalizedPath) {
    pageError.value = 'Укажите путь, например /novaya-stranica'
    return
  }

  if (normalizedPath === '/') {
    pageError.value = 'Нельзя создавать страницу с адресом корневого каталога'
    return
  }

  if (routeConfig[normalizedPath]) {
    pageError.value = 'Такой маршрут уже существует в системе'
    return
  }

  try {
    pageSubmitting.value = true
    pageForm.value.path = normalizedPath

    const pageTitle = pageForm.value.title.trim()

    await savePageContent(normalizedPath, {
      title: pageTitle || null,
      components: []
    })

    pageSuccess.value = `Страница ${normalizedPath} создана.`
    trackCreatedPage(normalizedPath, pageTitle)
    const editQuery = { edit: 'true', from: 'admin-pages' }
    resetPageForm()
    await router.push({ path: normalizedPath, query: editQuery })
  } catch (err) {
    console.error('Ошибка при создании страницы:', err)
    pageError.value = err?.message || 'Не удалось создать страницу'
  } finally {
    pageSubmitting.value = false
  }
}

const routeSuggestionOptions = computed(() => {
  const baseRoutes = Object.keys(routeConfig || {})
  const customRoutes = createdPages.value.map((item) => item.path)
  return Array.from(new Set([...baseRoutes, ...customRoutes])).sort((a, b) => a.localeCompare(b, 'ru'))
})

const serializeNavigation = (config) => {
  try {
    return JSON.stringify(sanitizeNavigationConfig(config))
  } catch (_) {
    return '[]'
  }
}

const navigationHasChanges = computed(() => {
  return serializeNavigation(navigationDraft.value) !== serializeNavigation(navigationOriginal.value)
})

const handleNavigationBroadcast = (event) => {
  if (navigationSaving.value || navigationHasChanges.value) {
    return
  }

  if (event?.detail) {
    setNavigationDraft(event.detail)
  } else {
    loadNavigationConfig()
  }
}

const generateSectionId = (label = '') => {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0430-\u044f\u0451_-]+/gi, '')

  const base = normalized || 'section'
  let id = base
  let counter = 1
  const existingIds = new Set(navigationDraft.value.map((section) => section.id))

  while (existingIds.has(id)) {
    id = `${base}-${counter}`
    counter += 1
  }

  return id
}

const getSectionKey = (section, index) => {
  if (section?.id && typeof section.id === 'string' && section.id.trim()) {
    return section.id.trim()
  }
  return `section-${index + 1}`
}

const isSectionCollapsed = (key) => !!collapsedSections.value[key]

const toggleSectionCollapse = (key) => {
  collapsedSections.value = {
    ...collapsedSections.value,
    [key]: !collapsedSections.value[key]
  }
}


const setNavigationDraft = (config) => {
  const sanitized = sanitizeNavigationConfig(config)
  navigationOriginal.value = cloneNavigation(sanitized)
  navigationDraft.value = cloneNavigation(sanitized)
  sectionPageSelections.value = {}
  collapsedSections.value = {}
}

const loadNavigationConfig = async () => {
  navigationLoading.value = true
  navigationError.value = ''
  navigationSuccess.value = ''

  try {
    const config = await fetchHeaderNavigation()
    setNavigationDraft(config)
  } catch (error) {
    console.error('Не удалось загрузить конфигурацию меню:', error)
    navigationError.value = error?.message || 'Не удалось загрузить конфигурацию'
    const defaults = getDefaultNavigationConfig()
    setNavigationDraft(defaults)
  } finally {
    navigationLoading.value = false
  }
}

const resetNavigationDraft = () => {
  navigationError.value = ''
  navigationSuccess.value = ''
  navigationDraft.value = cloneNavigation(navigationOriginal.value)
  sectionPageSelections.value = {}
  collapsedSections.value = {}
}

const applyDefaultNavigation = () => {
  navigationError.value = ''
  navigationSuccess.value = ''
  navigationDraft.value = cloneNavigation(getDefaultNavigationConfig())
  sectionPageSelections.value = {}
  collapsedSections.value = {}
}

const saveNavigationConfig = async () => {
  navigationError.value = ''
  navigationSuccess.value = ''
  navigationSaving.value = true

  try {
    const sanitized = sanitizeNavigationConfig(navigationDraft.value)
    const result = await saveHeaderNavigation(sanitized)
    const savedConfig = sanitizeNavigationConfig(result?.config || sanitized)
    navigationOriginal.value = cloneNavigation(savedConfig)
    navigationDraft.value = cloneNavigation(savedConfig)
    sectionPageSelections.value = {}
    collapsedSections.value = {}
    navigationSuccess.value = result?.persisted
      ? 'Меню сохранено.'
      : 'Меню сохранено локально (ответ сервера отсутствует).'
  } catch (error) {    console.error('Не удалось сохранить меню:', error)
    navigationError.value = error?.message || 'Не удалось сохранить изменения'
  } finally {
    navigationSaving.value = false
  }
}

const addNavigationSection = () => {
  navigationDraft.value.push({
    id: generateSectionId(`section-${navigationDraft.value.length + 1}`),
    label: 'Новый раздел',
    route: '',
    items: []
  })
}

const removeNavigationSection = (index) => {
  if (index < 0 || index >= navigationDraft.value.length) {
    return
  }
  const section = navigationDraft.value[index]
  const key = getSectionKey(section, index)
  navigationDraft.value.splice(index, 1)

  const selections = { ...sectionPageSelections.value }
  delete selections[key]
  sectionPageSelections.value = selections

  const collapsed = { ...collapsedSections.value }
  delete collapsed[key]
  collapsedSections.value = collapsed
}

const moveNavigationSection = (index, direction) => {
  const targetIndex = index + direction
  if (
    targetIndex < 0 ||
    targetIndex >= navigationDraft.value.length ||
    index < 0 ||
    index >= navigationDraft.value.length
  ) {
    return
  }
  const section = navigationDraft.value.splice(index, 1)[0]
  navigationDraft.value.splice(targetIndex, 0, section)
}

const addNavigationItem = (sectionIndex, route = '', text = '') => {
  const section = navigationDraft.value[sectionIndex]
  if (!section) {
    return
  }
  if (!Array.isArray(section.items)) {
    section.items = []
  }
  section.items.push({
    text,
    route: route ? normalizeRoutePath(route) : '',
    subitems: []
  })
}

const removeNavigationItem = (sectionIndex, itemIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  section.items.splice(itemIndex, 1)
}

const moveNavigationItem = (sectionIndex, itemIndex, direction) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }

  const targetIndex = itemIndex + direction
  if (targetIndex < 0 || targetIndex >= section.items.length) {
    return
  }

  const item = section.items.splice(itemIndex, 1)[0]
  section.items.splice(targetIndex, 0, item)
}

const addNavigationSubitem = (sectionIndex, itemIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  const item = section.items[itemIndex]
  if (!item) {
    return
  }
  if (!Array.isArray(item.subitems) || item.subitems.length === 0) {
    item.subitems = []
    item.route = ''
  }
  item.subitems.push({
    text: '',
    route: ''
  })
}

const removeNavigationSubitem = (sectionIndex, itemIndex, subIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  const item = section.items[itemIndex]
  if (!item || !Array.isArray(item.subitems)) {
    return
  }
  item.subitems.splice(subIndex, 1)
  if (item.subitems.length === 0) {
    delete item.subitems
  }
}

const moveNavigationSubitem = (sectionIndex, itemIndex, subIndex, direction) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  const item = section.items[itemIndex]
  if (!item || !Array.isArray(item.subitems)) {
    return
  }
  const targetIndex = subIndex + direction
  if (targetIndex < 0 || targetIndex >= item.subitems.length) {
    return
  }
  const subitem = item.subitems.splice(subIndex, 1)[0]
  item.subitems.splice(targetIndex, 0, subitem)
}

const normalizeSectionRoute = (sectionIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section) {
    return
  }
  section.route = section.route ? normalizeRoutePath(section.route) : ''
}

const normalizeItemRoute = (sectionIndex, itemIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  const item = section.items[itemIndex]
  if (!item) {
    return
  }
  item.route = item.route ? normalizeRoutePath(item.route) : ''
}

const normalizeSubitemRoute = (sectionIndex, itemIndex, subIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section || !Array.isArray(section.items)) {
    return
  }
  const item = section.items[itemIndex]
  if (!item || !Array.isArray(item.subitems)) {
    return
  }
  const subitem = item.subitems[subIndex]
  if (!subitem) {
    return
  }
  subitem.route = subitem.route ? normalizeRoutePath(subitem.route) : ''
}

const addCustomPageToSection = (sectionIndex) => {
  const section = navigationDraft.value[sectionIndex]
  if (!section) {
    return
  }
  const key = getSectionKey(section, sectionIndex)
  const selectedPath = sectionPageSelections.value[key] || ''
  const normalized = normalizeRoutePath(selectedPath)
  if (!normalized) {
    return
  }
  if (!Array.isArray(section.items)) {
    section.items = []
  }
  const exists = section.items.some((item) => item.route === normalized)
  if (exists) {
    sectionPageSelections.value = {
      ...sectionPageSelections.value,
      [key]: ''
    }
    return
  }
  const customPage = createdPages.value.find((item) => item.path === normalized)
  section.items.push({
    text: customPage?.title || '',
    route: normalized,
    subitems: []
  })
  sectionPageSelections.value = {
    ...sectionPageSelections.value,
    [key]: ''
  }
}

const openNewsPage = (item) => {
  if (!item) return
  const editPath = item.page_path || `/news/${item.slug}`
  router.push({ path: editPath, query: { edit: 'true' } })
}

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const [complaintsResponse, feedbackResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/complaints/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      fetch(`${API_BASE_URL}/feedback/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    ])

    if (complaintsResponse.ok) {
      stats.value = await complaintsResponse.json()
    }
    if (feedbackResponse.ok) {
      feedbackStats.value = await feedbackResponse.json()
    }
  } catch (err) {
    console.error('Ошибка загрузки статистики:', err)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Не указана'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return 'Некорректная дата'
  }
  return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU')
}

const goBack = () => {
  router.back()
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('user_role')
  router.push('/login')
}

const refreshData = () => {
  if (activeTab.value === 'complaints') {
    fetchComplaints()
  } else if (activeTab.value === 'feedback') {
    fetchFeedback()
  } else if (activeTab.value === 'news') {
    fetchNews()
  }

  if (activeTab.value === 'complaints' || activeTab.value === 'feedback') {
    fetchStats()
  }
}

// Проверка прав администратора
const checkAdminAccess = () => {
  const userRole = localStorage.getItem('user_role')
  if (userRole !== 'admin') {
    router.push('/profile')
    return false
  }
  return true
}

onMounted(() => {
  if (checkAdminAccess()) {
    fetchComplaints()
    fetchFeedback()
    fetchNews()
    fetchStats()
    loadNavigationConfig()
    window.addEventListener(NAVIGATION_UPDATE_EVENT, handleNavigationBroadcast)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener(NAVIGATION_UPDATE_EVENT, handleNavigationBroadcast)
})
</script>

<template>
  <head>
    <title>Панель администратора</title>
  </head>
  <div class="admin-container">
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="college-name">Верхнепышминский механико-технологический техникум «Юность»</h1>
          <p class="admin-title">Панель администратора</p>
        </div>
        <nav class="nav">
          <button @click="goBack" class="back-button">Назад</button>
          <button @click="logout" class="logout-button">Выйти</button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="admin-card">
        <!-- Вкладки -->
        <div class="tabs">
          <button 
            @click="activeTab = 'complaints'" 
            :class="['tab-button', { 'active': activeTab === 'complaints' }]"
          >
            Книга жалоб
          </button>
          <button 
            @click="activeTab = 'feedback'" 
            :class="['tab-button', { 'active': activeTab === 'feedback' }]"
          >
            Формы обратной связи
          </button>
          <button
            @click="activeTab = 'news'"
            :class="['tab-button', { 'active': activeTab === 'news' }]"
          >
            Новости
          </button>
          <button
            @click="activeTab = 'pages'"
            :class="['tab-button', { 'active': activeTab === 'pages' }]"
          >
            Страницы
          </button>
          <button
            @click="activeTab = 'navigation'"
            :class="['tab-button', { 'active': activeTab === 'navigation' }]"
          >
            Навигация
          </button>
        </div>

        <!-- Статистика -->
        <div v-if="activeTab === 'complaints' || activeTab === 'feedback'" class="stats-section">
          <h2 class="section-title">
            {{ activeTab === 'complaints' ? 'Статистика жалоб' : 'Статистика обратной связи' }}
          </h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">
                {{ activeTab === 'complaints' ? (stats.total_complaints || 0) : (feedbackStats.total_feedback || 0) }}
              </div>
              <div class="stat-label">
                {{ activeTab === 'complaints' ? 'Всего жалоб' : 'Всего форм' }}
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-number">
                {{ activeTab === 'complaints' ? (stats.recent_complaints || 0) : (feedbackStats.recent_feedback || 0) }}
              </div>
              <div class="stat-label">За последние 7 дней</div>
            </div>
          </div>
        </div>

        <!-- Содержимое вкладок -->
        <div class="content-section">
          <!-- Вкладка жалоб -->
          <div v-if="activeTab === 'complaints'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Список жалоб и предложений</h2>
              <button @click="refreshData" class="refresh-button">Обновить</button>
            </div>

            <div v-if="loading" class="loading">Загрузка жалоб...</div>
            
            <div v-else-if="error" class="error-message">
              {{ error }}
              <button @click="fetchComplaints" class="retry-button">Попробовать снова</button>
            </div>

            <div v-else-if="complaints.length === 0" class="no-data">
              Жалобы не найдены
            </div>

            <div v-else class="data-list">
              <div 
                v-for="item in complaints" 
                :key="item.id" 
                class="data-item"
              >
                <div class="data-header">
                  <div class="data-meta">
                    <span class="data-id">#{{ item.id }}</span>
                    <span class="data-date">{{ formatDate(item.created_at) }}</span>
                  </div>
                  <div class="data-ip">
                    IP: {{ item.ip_address }}
                  </div>
                </div>
                
                <div class="data-text">
                  {{ item.complaint_text }}
                </div>
                
                <div class="data-footer">
                  <div class="user-agent">
                    {{ item.user_agent }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'navigation'" class="tab-content navigation-tab">
            <div class="section-header">
              <h2 class="section-title">Меню навигации</h2>
              <div class="section-actions">
                <button
                  type="button"
                  class="refresh-button"
                  @click="loadNavigationConfig"
                  :disabled="navigationLoading"
                >
                  Обновить
                </button>
                <button
                  type="button"
                  class="secondary-button"
                  @click="resetNavigationDraft"
                  :disabled="navigationLoading || navigationSaving || !navigationHasChanges"
                >
                  Сбросить изменения
                </button>
                <button
                  type="button"
                  class="secondary-button"
                  @click="applyDefaultNavigation"
                  :disabled="navigationLoading || navigationSaving"
                >
                  Вернуть по умолчанию
                </button>
              </div>
            </div>

            <div v-if="navigationLoading" class="loading">Загружаем конфигурацию...</div>

            <template v-else>
              <div v-if="navigationError" class="error-message">{{ navigationError }}</div>
              <div v-if="navigationSuccess" class="success-message">{{ navigationSuccess }}</div>

              <datalist :id="routeSuggestionId">
                <option
                  v-for="option in routeSuggestionOptions"
                  :key="option"
                  :value="option"
                />
              </datalist>

              <div class="navigation-toolbar">
                <button
                  type="button"
                  class="submit-button"
                  @click="addNavigationSection"
                  :disabled="navigationSaving"
                >
                  Добавить раздел
                </button>
                <button
                  type="button"
                  class="secondary-button"
                  @click="saveNavigationConfig"
                  :disabled="navigationSaving || navigationDraft.length === 0 || !navigationHasChanges"
                >
                  {{ navigationSaving ? 'Сохраняем...' : 'Сохранить изменения' }}
                </button>
              </div>

              <div v-if="navigationDraft.length === 0" class="navigation-empty">
                Разделов пока нет. Нажмите «Добавить раздел», чтобы начать формирование меню.
              </div>

              <div
                v-for="(section, sectionIndex) in navigationDraft"
                :key="getSectionKey(section, sectionIndex)"
                class="navigation-section-card"
              >
                <div class="navigation-section-header">
                  <input
                    v-model="section.label"
                    type="text"
                    class="navigation-section-title"
                    placeholder="Название раздела"
                  />
                  <div class="navigation-section-controls">
                    <button
                      type="button"
                      class="icon-button"
                      @click="toggleSectionCollapse(getSectionKey(section, sectionIndex))"
                    :title="isSectionCollapsed(getSectionKey(section, sectionIndex)) ? 'Развернуть раздел' : 'Свернуть раздел'"
                    :aria-label="isSectionCollapsed(getSectionKey(section, sectionIndex)) ? 'Развернуть раздел' : 'Свернуть раздел'"
                  >
                    {{ isSectionCollapsed(getSectionKey(section, sectionIndex)) ? '▸' : '▾' }}
                  </button>
                    <button
                      type="button"
                      class="icon-button"
                      @click="moveNavigationSection(sectionIndex, -1)"
                      :disabled="sectionIndex === 0"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      class="icon-button"
                      @click="moveNavigationSection(sectionIndex, 1)"
                      :disabled="sectionIndex === navigationDraft.length - 1"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      class="danger-button"
                      @click="removeNavigationSection(sectionIndex)"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <div class="navigation-route-group">
                  <label>Переход по клику (необязательно)</label>
                  <input
                    v-model="section.route"
                    :list="routeSuggestionId"
                    type="text"
                    placeholder="/path или https://..."
                    @blur="normalizeSectionRoute(sectionIndex)"
                  />
                </div>

                <transition name="fade">
                  <div v-if="!isSectionCollapsed(getSectionKey(section, sectionIndex))">
                    <div class="navigation-items">
                      <div
                        v-for="(item, itemIndex) in section.items"
                        :key="`${getSectionKey(section, sectionIndex)}-${itemIndex}`"
                        class="navigation-item-card"
                      >
                        <div class="navigation-item-header">
                          <input
                            v-model="item.text"
                            type="text"
                            class="navigation-item-title"
                            placeholder="Название пункта"
                          />
                          <div class="navigation-item-actions">
                            <button
                              type="button"
                              class="icon-button"
                              @click="moveNavigationItem(sectionIndex, itemIndex, -1)"
                              :disabled="itemIndex === 0"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              class="icon-button"
                              @click="moveNavigationItem(sectionIndex, itemIndex, 1)"
                              :disabled="itemIndex === section.items.length - 1"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              class="link-button"
                              @click="addNavigationSubitem(sectionIndex, itemIndex)"
                            >
                              Добавить подменю
                            </button>
                            <button
                              type="button"
                              class="danger-button"
                              @click="removeNavigationItem(sectionIndex, itemIndex)"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>

                        <div
                          v-if="!item.subitems || item.subitems.length === 0"
                          class="navigation-route-group"
                        >
                          <label>Ссылка</label>
                          <input
                            v-model="item.route"
                            :list="routeSuggestionId"
                            type="text"
                            placeholder="/path или https://..."
                            @blur="normalizeItemRoute(sectionIndex, itemIndex)"
                          />
                        </div>

                        <div v-else class="navigation-subitems">
                          <div
                            v-for="(subitem, subIndex) in item.subitems"
                            :key="`${getSectionKey(section, sectionIndex)}-${itemIndex}-${subIndex}`"
                            class="navigation-subitem-row"
                          >
                            <input
                              v-model="subitem.text"
                              type="text"
                              placeholder="Название пункта"
                            />
                            <input
                              v-model="subitem.route"
                              :list="routeSuggestionId"
                              type="text"
                              placeholder="/path или https://..."
                              @blur="normalizeSubitemRoute(sectionIndex, itemIndex, subIndex)"
                            />
                            <div class="navigation-subitem-actions">
                              <button
                                type="button"
                                class="icon-button"
                                @click="moveNavigationSubitem(sectionIndex, itemIndex, subIndex, -1)"
                                :disabled="subIndex === 0"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                class="icon-button"
                                @click="moveNavigationSubitem(sectionIndex, itemIndex, subIndex, 1)"
                                :disabled="subIndex === item.subitems.length - 1"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                class="danger-button"
                                @click="removeNavigationSubitem(sectionIndex, itemIndex, subIndex)"
                              >
                                Удалить
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            class="link-button"
                            @click="addNavigationSubitem(sectionIndex, itemIndex)"
                          >
                            Добавить подменю
                          </button>
                        </div>
                      </div>

                      <div class="navigation-item-toolbar">
                        <button
                          type="button"
                          class="link-button"
                          @click="addNavigationItem(sectionIndex)"
                        >
                          Добавить пункт
                        </button>
                        <div v-if="createdPages.length" class="navigation-custom-page">
                          <select
                            v-model="sectionPageSelections[getSectionKey(section, sectionIndex)]"
                            class="select-input"
                          >
                            <option value="">Выберите созданную страницу</option>
                            <option
                              v-for="page in createdPages"
                              :key="page.path"
                              :value="page.path"
                            >
                              {{ page.title ? `${page.title} (${page.path})` : page.path }}
                            </option>
                          </select>
                          <button
                            type="button"
                            class="link-button"
                            @click="addCustomPageToSection(sectionIndex)"
                            :disabled="!sectionPageSelections[getSectionKey(section, sectionIndex)]"
                          >
                            Добавить страницу в пункт
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
          </div>
          <div v-if="activeTab === 'news'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Новости</h2>
              <button @click="refreshData" class="refresh-button">Обновить</button>
            </div>

            <form class="news-form" @submit.prevent="submitNews">
              <div class="form-group">
                <label for="news-title">Заголовок *</label>
                <input
                  id="news-title"
                  v-model="newsForm.title"
                  type="text"
                  placeholder="Введите заголовок новости"
                  required
                />
              </div>

              <div class="form-group">
                <label for="news-content">Текст новости *</label>
                <textarea
                  id="news-content"
                  v-model="newsForm.content"
                  rows="6"
                  placeholder="Введите текст новости"
                  required
                />
              </div>

              <div class="form-group">
                <label for="news-image">Изображение</label>
                <input
                  id="news-image"
                  :key="newsFileInputKey"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                />
                <p class="field-hint">Поддерживаются изображения в формате JPG, PNG или GIF</p>
              </div>

              <div v-if="previewImage" class="image-preview">
                <img :src="previewImage" alt="Предпросмотр изображения" />
              </div>

              <div class="form-actions">
                <button type="submit" class="submit-button" :disabled="newsSubmitting">
                  {{ newsSubmitting ? 'Сохранение...' : 'Добавить новость' }}
                </button>
              </div>
            </form>

            <div v-if="newsLoading" class="loading">Загрузка новостей...</div>

            <div v-else-if="newsError" class="error-message">
              {{ newsError }}
              <button @click="fetchNews" class="retry-button">Попробовать снова</button>
            </div>

            <div v-else-if="news.length === 0" class="no-data">Новости не найдены</div>

            <div v-else class="news-list">
              <article
                v-for="item in news"
                :key="item.id"
                class="news-item"
              >
                <div class="news-header">
                  <h3 class="news-title">{{ item.title }}</h3>
                  <div class="news-meta">{{ formatDate(item.created_at) }}</div>
                </div>

                <div v-if="item.image_url" class="news-image">
                  <img :src="item.image_url" :alt="item.title" />
                </div>

                <p class="news-content">{{ item.content }}</p>
                <div class="news-item-actions">
                  <span v-if="!item.is_ready" class="news-status">Страница ещё не опубликована</span>
                  <button type="button" class="news-edit-button" @click="openNewsPage(item)">Редактировать страницу</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<style scoped>
/* Стили остаются без изменений */
.admin-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: none;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
}

.college-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.admin-title {
  font-size: 0.9rem;
  color: #bdc3c7;
  margin: 0;
}

.nav {
  display: flex;
  gap: 1rem;
}

.back-button, .logout-button {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-button:hover, .logout-button:hover {
  background: white;
  color: #2c3e50;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.admin-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
}

.news-form,
.page-form {
  margin-bottom: 2rem;
  display: grid;
  gap: 1.5rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
}

.form-group input[type='text'],
.form-group textarea,
.form-group input[type='file'] {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d9e0;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input[type='text']:focus,
.form-group textarea:focus,
.form-group input[type='file']:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.15);
}

.field-hint {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

.image-preview {
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.image-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.page-hint {
  margin-top: 1.5rem;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.25rem;
  color: #475569;
  line-height: 1.6;
}

.page-hint p {
  margin: 0;
}

.page-hint p + p {
  margin-top: 0.75rem;
}

.submit-button {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.submit-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  background: #1e8449;
}

.news-list {
  display: grid;
  gap: 1.5rem;
}

.news-item {
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.news-title {
  font-size: 1.25rem;
  margin: 0;
  color: #2c3e50;
}

.news-meta {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.news-image {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.news-image img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.news-content {
  margin: 0;
  color: #2c3e50;
  line-height: 1.6;
  white-space: pre-wrap;
}

.news-item-actions {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.news-status {
  font-size: 0.85rem;
  color: #d97706;
  font-weight: 600;
}

.news-edit-button {
  border: none;
  background: linear-gradient(90deg, #f97316, #fb923c);
  color: #fff;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-edit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.35);
}

.navigation-tab {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.navigation-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.secondary-button {
  border: 1px solid #3498db;
  background: transparent;
  color: #3498db;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-button:hover:not(:disabled) {
  background: rgba(52, 152, 219, 0.12);
}

.secondary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.link-button {
  border: none;
  background: none;
  color: #3498db;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.link-button:hover:not(:disabled) {
  color: #1d6fa5;
}

.link-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.danger-button {
  border: 1px solid #e74c3c;
  background: transparent;
  color: #e74c3c;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.danger-button:hover {
  background: rgba(231, 76, 60, 0.12);
}

.danger-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon-button {
  border: 1px solid #dfe6e9;
  background: #f8f9fa;
  color: #4b5563;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-button:hover:not(:disabled) {
  background: #edf2f7;
}

.navigation-empty {
  padding: 1rem;
  border-radius: 12px;
  background: #f8f9fb;
  color: #6c757d;
  text-align: center;
}

.navigation-section-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #ececec;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
}

.navigation-section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
}

.navigation-section-title {
  flex: 1;
  min-width: 220px;
  border: none;
  border-bottom: 2px solid #f0f2f5;
  padding: 0.4rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  background: transparent;
}

.navigation-section-title:focus {
  outline: none;
  border-bottom-color: #3498db;
}

.navigation-section-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.navigation-route-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.navigation-route-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
}

.navigation-route-group input {
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #dfe6e9;
  font-size: 0.95rem;
}

.navigation-route-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
}

.navigation-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.navigation-item-card {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #edf2f7;
  background: #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.navigation-item-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
}

.navigation-item-title {
  flex: 1;
  min-width: 180px;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.35rem 0;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
}

.navigation-item-title:focus {
  outline: none;
  border-bottom-color: #3498db;
}

.navigation-item-actions {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.navigation-subitems {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: #f8fbff;
  border-radius: 10px;
  border: 1px dashed rgba(52, 152, 219, 0.35);
  padding: 0.75rem;
}

.navigation-subitem-row {
  display: grid;
  grid-template-columns: minmax(120px, 1fr) minmax(120px, 1fr) auto;
  gap: 0.6rem;
  align-items: center;
}

.navigation-subitem-row input {
  padding: 0.45rem 0.65rem;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 0.95rem;
}

.navigation-subitem-row input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.12);
}

.navigation-subitem-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.navigation-subitem-actions .danger-button {
  padding: 0.35rem 0.9rem;
}

.navigation-item-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.navigation-custom-page {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

.select-input {
  min-width: 220px;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #dfe6e9;
  background: #ffffff;
  font-size: 0.95rem;
}

.select-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.tab-button {
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-button.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.tab-button:hover:not(.active) {
  color: #2c3e50;
  background: #f8f9fa;
}

.stats-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #3498db;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.content-section {
  margin-top: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.refresh-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.refresh-button:hover {
  background: #2980b9;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #fcc;
  text-align: center;
}

.success-message {
  background: #ecfdf5;
  color: #047857;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #6ee7b7;
  text-align: center;
}

.retry-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: 500;
}

.retry-button:hover {
  background: #2980b9;
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-style: italic;
  background: #f8f9fa;
  border-radius: 8px;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.data-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  transition: box-shadow 0.3s ease;
}

.data-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.data-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.data-id {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.data-date {
  color: #666;
  font-size: 0.9rem;
}

.data-ip {
  color: #666;
  font-size: 0.9rem;
  font-family: monospace;
}

.feedback-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.feedback-field {
  font-size: 0.9rem;
}

.data-text {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.data-footer {
  border-top: 1px solid #e9ecef;
  padding-top: 0.5rem;
}

.user-agent {
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.copyright {
  font-size: 0.8rem;
  color: #bdc3c7;
  margin: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .college-name {
    font-size: 1rem;
  }

  .main-content {
    padding: 1rem;
  }

  .admin-card {
    padding: 1.5rem;
  }

  .data-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .feedback-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .tabs {
    flex-direction: column;
  }

  .tab-button {
    text-align: left;
    border-bottom: 1px solid #e9ecef;
    border-left: 3px solid transparent;
  }

  .tab-button.active {
    border-left-color: #3498db;
    border-bottom-color: #e9ecef;
  }

  .form-actions {
    justify-content: stretch;
  }

  .submit-button {
    width: 100%;
    text-align: center;
  }

  .navigation-section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .navigation-section-controls {
    justify-content: flex-start;
  }

  .navigation-section-title {
    width: 100%;
  }

  .navigation-item-header {
    flex-direction: column;
    align-items: stretch;
  }

  .navigation-item-actions {
    justify-content: flex-start;
  }

  .navigation-subitem-row {
    grid-template-columns: 1fr;
  }

  .navigation-item-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .navigation-custom-page {
    width: 100%;
  }

  .section-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .select-input {
    width: 100%;
    min-width: 0;
  }

  .navigation-subitem-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .admin-card {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
