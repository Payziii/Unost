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

// Новые переменные для портфолио
const portfolioFiles = ref([])
const selectedFile = ref(null)
const uploadError = ref('')
const uploadSuccess = ref('')
const loadingPortfolio = ref(false)

const API_BASE_URL = 'http://localhost:5000'

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`${API_BASE_URL}/api/students/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 422) {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_role')
        router.push('/login')
        return
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

// Функции для портфолио
const fetchPortfolioFiles = async () => {
  try {
    loadingPortfolio.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/api/students/portfolio`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      portfolioFiles.value = await response.json()
    } else if (response.status !== 404) {
      throw new Error('Ошибка загрузки списка файлов')
    }
  } catch (err) {
    console.error('Ошибка загрузки портфолио:', err)
  } finally {
    loadingPortfolio.value = false
  }
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
  uploadError.value = ''
  uploadSuccess.value = ''
}

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadError.value = 'Пожалуйста, выберите файл'
    return
  }

  if (selectedFile.value.size > 10 * 1024 * 1024) {
    uploadError.value = 'Файл слишком большой. Максимальный размер: 10 МБ.'
    return
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowedTypes.includes(selectedFile.value.type)) {
    uploadError.value = 'Недопустимый тип файла. Разрешенные: PDF, JPEG, PNG, DOC, DOCX.'
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/api/students/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Ошибка загрузки файла')
    }

    uploadSuccess.value = 'Файл успешно загружен!'
    selectedFile.value = null
    document.getElementById('file-input').value = ''
    fetchPortfolioFiles()
  } catch (err) {
    console.error('Ошибка загрузки файла:', err)
    uploadError.value = err.message
  }
}

const deleteFile = async (fileId) => {
  if (!confirm('Вы уверены, что хотите удалить этот файл?')) {
    return
  }

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/api/students/portfolio/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Ошибка при удалении файла')
    }

    portfolioFiles.value = portfolioFiles.value.filter(file => file.id !== fileId)
  } catch (err) {
    console.error('Ошибка удаления файла:', err)
    alert('Не удалось удалить файл')
  }
}

const downloadFile = (fileId, fileName) => {
  const token = localStorage.getItem('token')
  const downloadUrl = `${API_BASE_URL}/api/students/portfolio/${fileId}/download`
  
  // Создаем скрытую ссылку для скачивания
  const link = document.createElement('a')
  link.href = downloadUrl
  link.setAttribute('download', fileName)
  
  // Добавляем заголовок авторизации через fetch
  fetch(downloadUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob)
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  })
  .catch(err => {
    console.error('Ошибка скачивания:', err)
    alert('Ошибка при скачивании файла')
  })
}

const formatDate = (dateString) => {
  if (!dateString) return 'Не указана'
  const date = new Date(dateString)
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
  fetchPortfolioFiles()
})
</script>

<template>
  <div class="profile-container">
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

      <!-- Карточка портфолио -->
      <div class="profile-card">
        <div class="profile-header">
          <h2 class="profile-title">Мое портфолио</h2>
          <div class="divider"></div>
        </div>

        <div class="upload-section">
          <h3 class="section-title">Загрузить новый файл</h3>
          <div class="upload-form">
            <input 
              type="file" 
              id="file-input"
              @change="handleFileSelect" 
              class="file-input"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            >
            <button @click="uploadFile" class="upload-button">
              Загрузить
            </button>
          </div>
          <div v-if="uploadError" class="error-message">{{ uploadError }}</div>
          <div v-if="uploadSuccess" class="success-message">{{ uploadSuccess }}</div>
          <p class="file-hint">
            Максимальный размер файла: 10 МБ. Разрешенные форматы: PDF, JPG, PNG, DOC, DOCX
          </p>
        </div>

        <div class="files-section">
          <h3 class="section-title">Мои файлы</h3>
          <div v-if="loadingPortfolio" class="loading">Загрузка списка файлов...</div>
          <div v-else-if="portfolioFiles.length === 0" class="no-files">
            Файлы не загружены
          </div>
          <div v-else class="files-list">
            <div 
              v-for="file in portfolioFiles" 
              :key="file.id" 
              class="file-item"
            >
              <div class="file-info">
                <span class="file-name">{{ file.filename }}</span>
                <span class="file-size">{{ (file.size / 1024 / 1024).toFixed(2) }} МБ</span>
                <span class="file-date">{{ formatDate(file.uploaded_at) }}</span>
              </div>
              <div class="file-actions">
                <button 
                  @click="downloadFile(file.id, file.filename)" 
                  class="download-button"
                >
                  Скачать
                </button>
                <button 
                  @click="deleteFile(file.id)" 
                  class="delete-button"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
/* Все стили остаются такими же как в предыдущем коде */
.profile-container {
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

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
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

/* Стили для портфолио */
.upload-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.upload-form {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.file-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.upload-button {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.upload-button:hover {
  background: #219a52;
}

.file-hint {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.files-section {
  margin-top: 2rem;
}

.no-files {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  transition: box-shadow 0.3s ease;
}

.file-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: #2c3e50;
}

.file-size, .file-date {
  font-size: 0.9rem;
  color: #666;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.download-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.download-button:hover {
  background: #2980b9;
}

.delete-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.delete-button:hover {
  background: #c0392b;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
  margin-bottom: 1rem;
}

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

  .upload-form {
    flex-direction: column;
    align-items: stretch;
  }

  .file-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .file-actions {
    align-self: stretch;
    justify-content: space-between;
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