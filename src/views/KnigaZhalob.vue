<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const complaintText = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const API_BASE_URL = 'http://юность.панксквад.рф/api'

const submitComplaint = async () => {
  if (!complaintText.value.trim()) {
    error.value = 'Пожалуйста, введите текст жалобы'
    return
  }

  if (complaintText.value.length < 10) {
    error.value = 'Текст жалобы должен содержать не менее 10 символов'
    return
  }

  if (complaintText.value.length > 1000) {
    error.value = 'Текст жалобы не должен превышать 1000 символов'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complaint_text: complaintText.value.trim()
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || 'Ошибка при отправке жалобы')
    }

    success.value = 'Жалоба успешно отправлена! Спасибо за ваш отзыв.'
    complaintText.value = ''
    
    // Очищаем сообщение об успехе через 5 секунд
    setTimeout(() => {
      success.value = ''
    }, 5000)
    
  } catch (err) {
    console.error('Ошибка отправки жалобы:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="complaint-container">
    <main class="main-content">
      <div class="complaint-card">
        <div class="complaint-header">
          <h2 class="complaint-title">Книга жалоб и предложений</h2>
          <div class="divider"></div>
          <p class="complaint-subtitle">
            Ваше мнение важно для нас. Оставьте жалобу или предложение, и мы обязательно его рассмотрим.
          </p>
        </div>

        <form @submit.prevent="submitComplaint" class="complaint-form">
          <div class="form-group">
            <label for="complaint-text" class="form-label">
              Текст жалобы или предложения *
            </label>
            <textarea
              id="complaint-text"
              v-model="complaintText"
              class="form-textarea"
              placeholder="Опишите вашу проблему или предложение..."
              rows="8"
              maxlength="1000"
              :disabled="loading"
            ></textarea>
            <div class="char-count">
              {{ complaintText.length }}/1000 символов
            </div>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            {{ success }}
          </div>

          <button 
            type="submit" 
            class="submit-button"
            :disabled="loading || !complaintText.trim()"
          >
            <span v-if="loading">Отправка...</span>
            <span v-else>Отправить жалобу</span>
          </button>
        </form>

        <div class="complaint-info">
          <h3 class="info-title">Как мы обрабатываем жалобы:</h3>
          <ul class="info-list">
            <li>Все жалобы рассматриваются в течение 3 рабочих дней</li>
            <li>Мы сохраняем ваш IP-адрес и данные браузера для анализа</li>
            <li>При необходимости мы можем связаться с вами для уточнения деталей</li>
            <li>Ваши данные защищены и не передаются третьим лицам</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.complaint-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: none;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.complaint-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 700px;
}

.complaint-header {
  text-align: center;
  margin-bottom: 2rem;
}

.complaint-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 1rem auto;
  border-radius: 2px;
}

.complaint-subtitle {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.complaint-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

.char-count {
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #fcc;
  margin-bottom: 1rem;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
  margin-bottom: 1rem;
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.complaint-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.info-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.info-list {
  margin: 0;
  padding-left: 1.5rem;
  color: #555;
  line-height: 1.6;
}

.info-list li {
  margin-bottom: 0.5rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .complaint-card {
    padding: 2rem;
  }

  .complaint-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .complaint-card {
    padding: 1.5rem;
  }

  .complaint-title {
    font-size: 1.3rem;
  }

  .form-textarea {
    padding: 0.75rem;
  }

  .submit-button {
    padding: 0.75rem 1.5rem;
  }
}
</style>