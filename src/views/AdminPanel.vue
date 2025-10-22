<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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

const API_BASE_URL = 'http://localhost:5000/api'

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
  } else {
    fetchNews()
  }
  fetchStats()
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
  }
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
        </div>

        <!-- Статистика -->
        <div v-if="activeTab !== 'news'" class="stats-section">
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

          <!-- Вкладка обратной связи -->
          <div v-if="activeTab === 'feedback'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Формы обратной связи</h2>
              <button @click="refreshData" class="refresh-button">Обновить</button>
            </div>

            <div v-if="feedbackLoading" class="loading">Загрузка форм обратной связи...</div>
            
            <div v-else-if="error" class="error-message">
              {{ error }}
              <button @click="fetchFeedback" class="retry-button">Попробовать снова</button>
            </div>

            <div v-else-if="feedback.length === 0" class="no-data">
              Формы обратной связи не найдены
            </div>

            <div v-else class="data-list">
              <div 
                v-for="item in feedback" 
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

                <div class="feedback-info">
                  <div class="feedback-field">
                    <strong>Имя:</strong> {{ item.name }}
                  </div>
                  <div class="feedback-field">
                    <strong>Email:</strong> {{ item.email }}
                  </div>
                </div>
                
                <div class="data-text">
                  {{ item.message }}
                </div>
                
                <div class="data-footer">
                  <div class="user-agent">
                    {{ item.user_agent }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Вкладка новостей -->
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

.news-form {
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
