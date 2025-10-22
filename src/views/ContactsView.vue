<script setup>
import { ref } from 'vue';

const showFeedback = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

const API_BASE_URL = 'http://localhost:5000/api';

async function submitFeedback() {
  if (!name.value || !email.value || !message.value) {
    error.value = 'Все поля обязательны для заполнения';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при отправке формы');
    }

    const data = await response.json();
    success.value = 'Форма успешно отправлена!';
    
    // Очищаем форму через секунду
    setTimeout(() => {
      closeFeedback();
    }, 2000);
    
  } catch (err) {
    error.value = err.message || 'Произошла ошибка при отправке формы';
    console.error('Feedback error:', err);
  } finally {
    loading.value = false;
  }
}

function openFeedback() {
  showFeedback.value = true;
  error.value = '';
  success.value = '';
}

function closeFeedback() {
  showFeedback.value = false;
  name.value = '';
  email.value = '';
  message.value = '';
  error.value = '';
  success.value = '';
  loading.value = false;
}
</script>

<template>
  <head>
    <title>Контакты</title>
  </head>
  <div class="main">
    <div class="isp3304">
      <h1>
        Государственное автономное профессиональное образовательное учреждение Свердловской области «Верхнепышминский механико-технологический техникум «Юность»
      </h1>
      <div class="map-container">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A1f4fa582c6cdaeb78b1c03ef2acfcb40c705125817b2754188f8758ddfbf892e&amp;source=constructor"
          width="674"
          height="493"
          frameborder="0"
        ></iframe>
      </div>
      <p>
        624096, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, 53<br>
        Тел/факс: +7 (34368) 5-44-86<br>
        E-mail: lobastov07@mail.ru<br>
        Адреса сайта: вп-юность.рф<br>
        <br>
        Директор: Лобастов Виталий Геннадьевич
      </p>
      <!-- Кнопка обратной связи -->
      <button @click="openFeedback" class="feedback-button">
        Обратная связь
      </button>
    </div>

    <!-- Модальное окно формы обратной связи -->
    <div v-if="showFeedback" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeFeedback" class="close-button">&times;</button>
        <h2>Форма обратной связи</h2>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="success" class="success-message">
          {{ success }}
        </div>
        
        <form @submit.prevent="submitFeedback" class="feedback-form">
          <input 
            v-model="name" 
            type="text" 
            placeholder="Ваше имя" 
            required 
            :disabled="loading"
            class="form-input"
          />
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            required 
            :disabled="loading"
            class="form-input"
          />
          <textarea 
            v-model="message" 
            placeholder="Текст обращения" 
            required 
            rows="4" 
            :disabled="loading"
            class="form-textarea"
          ></textarea>
          <button 
            type="submit" 
            :disabled="loading"
            class="submit-button"
          >
            <span v-if="!loading">Отправить</span>
            <span v-else>Отправка...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.isp3304 {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  gap: 24px;
}

@media (max-width: 768px) {
  .isp3304 {
    width: 100%;
  }
}

.isp3304 h1 {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #222;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
}

.map-container iframe {
  border: none;
  width: 100%;
  max-width: 674px;
  height: 400px;
  min-height: 300px;
  background: #eaeaea;
}

.isp3304 p {
  text-align: center;
  font-size: 1.05rem;
  color: #444;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
}

.feedback-button {
  margin-top: 32px;
  padding: 12px 32px;
  border-radius: 8px;
  background: #2d72d9;
  color: #fff;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  align-self: center;
  transition: background 0.3s ease;
}

.feedback-button:hover {
  background: #1a5bb8;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  width: 400px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  position: relative;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

.modal-content h2 {
  margin-bottom: 18px;
  text-align: center;
  color: #2c3e50;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #fcc;
  margin-bottom: 16px;
  text-align: center;
}

.success-message {
  background: #efe;
  color: #363;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #cfc;
  margin-bottom: 16px;
  text-align: center;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-input, .form-textarea {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #2d72d9;
}

.form-input:disabled, .form-textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-button {
  padding: 12px 0;
  border-radius: 6px;
  background: #2d72d9;
  color: #fff;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background: #1a5bb8;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Адаптивность */
@media (max-width: 480px) {
  .modal-content {
    padding: 24px 16px;
    min-width: 280px;
  }
  
  .isp3304 {
    padding: 24px 16px 16px 16px;
  }
  
  .isp3304 h1 {
    font-size: 1.1rem;
  }
}
</style>