<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = ref({
  full_name: '',
  email: '',
  phone: '',
  birth_date: '',
  group: ''
})
const loading = ref(true)
const error = ref('')

const API_BASE_URL = 'http://localhost:5000'

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log('Token:', token) // Для отладки
    
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/api/students/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Добавляем Content-Type, если ожидается JSON
      }
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        // Токен невалиден или просрочен
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_role')
        router.push('/login')
        return // Важно вернуть, чтобы остановить дальнейшее выполнение
      } else if (response.status === 404) {
        throw new Error('Профиль не найден')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Неизвестная ошибка сервера' }))
        throw new Error(errorData.error || `Ошибка сервера: ${response.status}`)
      }
    }

    profile.value = await response.json()

  } catch (err) {
    console.error('Ошибка загрузки профиля:', err)
    
    if (err.message === 'Профиль не найден') {
      error.value = 'Профиль не найден'
    } else if (err.message.startsWith('Ошибка сервера')) {
      error.value = err.message
    } else {
      error.value = 'Не удалось загрузить данные профиля. Пожалуйста, проверьте ваше интернет-соединение.'
    }
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Не указана'
  const date = new Date(dateString)
  // Проверяем, является ли дата валидной
  if (isNaN(date.getTime())) {
    return 'Некорректная дата'
  }
  return date.toLocaleDateString('ru-RU')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('user_role')
  router.push('/login')
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="profile-container">
    <!-- Хедер -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="college-name">Верхнепышминский механико-технологический техникум «Юность»</h1>
        </div>
        <nav class="nav">
          <button @click="logout" class="logout-button">Выйти</button>
        </nav>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main-content">
      <div class="profile-card">
        <div class="profile-header">
          <h2 class="profile-title">Личный кабинет студента</h2>
          <div class="divider"></div>
        </div>

        <div v-if="loading" class="loading">Загрузка данных...</div>
        
        <div v-else-if="error" class="error-message">
          {{ error }}
          <button @click="fetchProfile" class="retry-button">Попробовать снова</button>
        </div>

        <div v-else class="profile-info">
          <div class="info-section">
            <h3 class="section-title">Основная информация</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">ФИО:</span>
                <span class="info-value">{{ profile.full_name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ profile.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Телефон:</span>
                <span class="info-value">{{ profile.phone || 'Не указан' }}</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3 class="section-title">Учебная информация</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Группа:</span>
                <span class="info-value">{{ profile.group || 'Не указана' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Дата рождения:</span>
                <span class="info-value">{{ formatDate(profile.birth_date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Футер -->
    <footer class="footer">
      <div class="footer-content">
        <p class="support-text">
          Возникли проблемы? 
          <a href="mailto:bolastovo77@mail.ru" class="support-link">Обратитесь в поддержку</a>
        </p>
        <p class="contact-info">
          Телефон: +7 (34368) 5-44-86
        </p>
        <p class="copyright">
          © 2024 Верхнепышминский механико-технологический техникум «Юность»
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

/* Хедер */
.header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.college-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.nav {
  display: flex;
  gap: 1rem;
}

.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #c0392b;
}

/* Основной контент */
.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.divider {
  width: 60px;
  height: 3px;
  background: #3498db;
  margin: 0 auto;
  border-radius: 2px;
}

/* Состояния загрузки и ошибки */
.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
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
  margin-top: 0.5rem;
  font-weight: 500;
}

.retry-button:hover {
  background: #2980b9;
}

/* Информация профиля */
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #2c3e50;
  min-width: 120px;
}

.info-value {
  color: #555;
  text-align: right;
  flex: 1;
}

/* Футер */
.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.support-text {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.support-link {
  color: #3498db;
  text-decoration: none;
}

.support-link:hover {
  text-decoration: underline;
}

.contact-info {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
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

  .profile-card {
    padding: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .info-value {
    text-align: left;
  }

  .footer-content {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 1rem;
  }

  .info-section {
    padding: 1rem;
  }

  .profile-title {
    font-size: 1.3rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>
