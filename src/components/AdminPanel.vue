<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const complaints = ref([])
const stats = ref({})
const loading = ref(true)
const error = ref('')

const API_BASE_URL = 'http://localhost:5000'

const fetchComplaints = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/api/complaints`, {
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

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/api/complaints/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      stats.value = await response.json()
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

onMounted(() => {
  fetchComplaints()
  fetchStats()
})
</script>

<template>
  <div class="admin-complaints-container">
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="college-name">Верхнепышминский механико-технологический техникум «Юность»</h1>
          <p class="admin-title">Панель администратора - Книга жалоб</p>
        </div>
        <nav class="nav">
          <button @click="goBack" class="back-button">Назад</button>
          <button @click="logout" class="logout-button">Выйти</button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="admin-card">
        <div class="stats-section">
          <h2 class="section-title">Статистика жалоб</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ stats.total_complaints || 0 }}</div>
              <div class="stat-label">Всего жалоб</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ stats.recent_complaints || 0 }}</div>
              <div class="stat-label">За последние 7 дней</div>
            </div>
          </div>
        </div>

        <div class="complaints-section">
          <div class="section-header">
            <h2 class="section-title">Список жалоб и предложений</h2>
            <button @click="fetchComplaints" class="refresh-button">Обновить</button>
          </div>

          <div v-if="loading" class="loading">Загрузка жалоб...</div>
          
          <div v-else-if="error" class="error-message">
            {{ error }}
            <button @click="fetchComplaints" class="retry-button">Попробовать снова</button>
          </div>

          <div v-else-if="complaints.length === 0" class="no-complaints">
            Жалобы не найдены
          </div>

          <div v-else class="complaints-list">
            <div 
              v-for="complaint in complaints" 
              :key="complaint.id" 
              class="complaint-item"
            >
              <div class="complaint-header">
                <div class="complaint-meta">
                  <span class="complaint-id">#{{ complaint.id }}</span>
                  <span class="complaint-date">{{ formatDate(complaint.created_at) }}</span>
                </div>
                <div class="complaint-ip">
                  IP: {{ complaint.ip_address }}
                </div>
              </div>
              
              <div class="complaint-text">
                {{ complaint.complaint_text }}
              </div>
              
              <div class="complaint-footer">
                <div class="user-agent">
                  {{ complaint.user_agent }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">
          © 2024 Верхнепышминский механико-технологический техникум «Юность» - Административная панель
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.admin-complaints-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
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

.complaints-section {
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

.no-complaints {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-style: italic;
  background: #f8f9fa;
  border-radius: 8px;
}

.complaints-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.complaint-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  transition: box-shadow 0.3s ease;
}

.complaint-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.complaint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.complaint-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.complaint-id {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.complaint-date {
  color: #666;
  font-size: 0.9rem;
}

.complaint-ip {
  color: #666;
  font-size: 0.9rem;
  font-family: monospace;
}

.complaint-text {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.complaint-footer {
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

  .complaint-header {
    flex-direction: column;
    align-items: flex-start;
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