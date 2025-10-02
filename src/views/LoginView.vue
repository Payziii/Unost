<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-section">
            <h1 class="technical-college-name">Верхнепышминский механико-технологический техникум «Юность»</h1>
            <div class="divider"></div>
            <h2 class="login-title">{{ isRegister ? 'Регистрация' : 'Вход в личный кабинет' }}</h2>
          </div>
        </div>

        <!-- Переключение между входом и регистрацией -->
        <div class="tabs">
          <button 
            @click="isRegister = false" 
            :class="['tab-button', { 'active': !isRegister }]"
          >
            Вход
          </button>
          <button 
            @click="isRegister = true" 
            :class="['tab-button', { 'active': isRegister }]"
          >
            Регистрация
          </button>
        </div>

        <!-- Сообщения об ошибках -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Форма входа -->
        <form v-if="!isRegister" @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              v-model="email" 
              required 
              placeholder="Введите ваш email"
              class="form-input"
              :disabled="loading"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Пароль</label>
            <input 
              type="password" 
              v-model="password" 
              required 
              placeholder="Введите ваш пароль"
              class="form-input"
              :disabled="loading"
            >
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" :disabled="loading">
              <span class="checkmark"></span>
              Запомнить меня
            </label>
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>

          <button type="submit" class="login-button" :disabled="loading">
            <span class="button-text">{{ loading ? 'Вход...' : 'Войти' }}</span>
            <div class="button-loader" v-if="loading"></div>
          </button>
        </form>

        <!-- Форма регистрации -->
        <form v-else @submit.prevent="handleRegistration" class="login-form">
          <!-- Шаг 1: Основные данные -->
          <div v-if="registerStep === 1">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                type="email" 
                v-model="registerEmail" 
                required 
                placeholder="Введите ваш email"
                class="form-input"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Пароль</label>
              <input 
                type="password" 
                v-model="registerPassword" 
                required 
                placeholder="Придумайте пароль"
                class="form-input"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Подтвердите пароль</label>
              <input 
                type="password" 
                v-model="confirmPassword" 
                required 
                placeholder="Повторите пароль"
                class="form-input"
                :disabled="loading"
              >
            </div>

            <button type="submit" class="login-button" :disabled="loading">
              <span class="button-text">{{ loading ? 'Проверка...' : 'Продолжить' }}</span>
              <div class="button-loader" v-if="loading"></div>
            </button>
          </div>

          <!-- Шаг 2: Дополнительные данные -->
          <div v-else>
            <div class="form-group">
              <label class="form-label">ФИО</label>
              <input 
                type="text" 
                v-model="fullName" 
                required 
                placeholder="Введите ваше полное имя"
                class="form-input"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Номер телефона</label>
              <input 
                type="tel" 
                v-model="phone" 
                required 
                placeholder="+7 (XXX) XXX-XX-XX"
                class="form-input"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Дата рождения</label>
              <input 
                type="date" 
                v-model="birthDate" 
                required 
                class="form-input"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Группа</label>
              <select v-model="selectedGroup" required class="form-input" :disabled="loading">
                <option value="" disabled selected>Выберите вашу группу</option>
                <optgroup label="Первый курс">
                  <option v-for="group in firstYearGroups" :key="group" :value="group">{{ group }}</option>
                </optgroup>
                <optgroup label="Второй курс">
                  <option v-for="group in secondYearGroups" :key="group" :value="group">{{ group }}</option>
                </optgroup>
                <optgroup label="Третий курс">
                  <option v-for="group in thirdYearGroups" :key="group" :value="group">{{ group }}</option>
                </optgroup>
                <optgroup label="Четвертый курс">
                  <option v-for="group in fourthYearGroups" :key="group" :value="group">{{ group }}</option>
                </optgroup>
              </select>
            </div>

            <div class="form-actions">
              <button type="button" @click="registerStep = 1" class="back-button" :disabled="loading">
                Назад
              </button>
              <button type="submit" class="login-button" :disabled="loading">
                <span class="button-text">{{ loading ? 'Регистрация...' : 'Завершить регистрацию' }}</span>
                <div class="button-loader" v-if="loading"></div>
              </button>
            </div>
          </div>
        </form>

        <div class="login-footer">
          <p class="support-text">
            Возникли проблемы? 
            <a href="mailto:bolastovo77@mail.ru" class="support-link">Обратитесь в поддержку</a>
          </p>
          <p class="contact-info">
            Телефон: +7 (34368) 5-44-86
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Настройка базового URL для API
const API_BASE_URL = 'http://localhost:5000';

export default {
  name: 'LoginView',
  data() {
    return {
      // Данные для входа
      email: '',
      password: '',
      rememberMe: false,
      
      // Данные для регистрации
      isRegister: false,
      registerStep: 1,
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      birthDate: '',
      selectedGroup: '',
      
      // Общие данные
      loading: false,
      errorMessage: '',
      
      // Списки групп
      firstYearGroups: [
        'ТМ-1417', 'МЦМ-Пф-102', 'ТИК-112', 'ИСП-1308', 'СП-Пф-1603', 
        'ТЭиРП-1901', 'ТАКХС-Пф-1202', 'ИСП-1309п', 'ТОиРА-1701п', 
        'ПКД-1808п', 'ТМ-1418п', 'СП-Пф-1604п'
      ],
      secondYearGroups: [
        'ТЭО-Пф-2501', 'МЦМ-Пф-201', 'СП-Пф-2601', 'ТАКХС-Пф-2201', 
        'ТОРД-2706', 'ТМ-2415', 'ПКД-2806/07п', 'СП-Пф-2602п', 
        'ТОРД-2707п', 'ТМ-2416п', 'ИСП-2306п', 'ИСП-2307п'
      ],
      thirdYearGroups: [
        'ТАКХС-3202', 'СП-3611', 'ТМ-3413', 'МЦМ-308', 'ИСП-3304', 
        'ОСА-391', 'ТИК-311', 'ИСП-3305п', 'ТОРД-3705п', 'ПКД-3805п', 
        'СП-3612п', 'ТМ-3414п'
      ],
      fourthYearGroups: [
        'ТАКХС-4201', 'ТЭО-4510', 'СП-469', 'ТОРД-4703', 'ТМ-4412', 
        'МЦМ-407', 'ПКД-4803', 'ИСП-4303п', 'ТОРД-4704п', 'СП-4610п', 
        'ПКД-4804п'
      ]
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      
      try {
        console.log('=== ОТЛАДКА ВХОДА ===');
        console.log('Отправка запроса на вход...');
        
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
          email: this.email,
          password: this.password
        });

        console.log('✅ Ответ от сервера:', response.data);
        
        // Сохраняем токен
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_role', response.data.role);

        console.log('🔐 Токен сохранен в localStorage:', token);
        console.log('👤 User ID:', response.data.user_id);
        
        // Проверим токен сразу через check-token endpoint
        console.log('🔄 Проверка токена через /api/check-token...');
        try {
          const checkResponse = await axios.get(`${API_BASE_URL}/api/check-token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('✅ Токен проверен успешно:', checkResponse.data);
        } catch (tokenError) {
          console.error('❌ Ошибка проверки токена:', tokenError.response?.data);
          console.error('Статус ошибки:', tokenError.response?.status);
        }
        
        console.log('🔄 Перенаправление на /profile...');
        this.$router.push('/profile');
        
      } catch (error) {
        console.error('❌ Полная ошибка входа:', error);
        console.error('Данные ошибки:', error.response?.data);
        this.handleApiError(error, 'Ошибка входа');
      } finally {
        this.loading = false;
      }
    },

    async handleRegistration() {
      if (this.registerStep === 1) {
        // Проверка паролей
        if (this.registerPassword !== this.confirmPassword) {
          this.errorMessage = 'Пароли не совпадают';
          return;
        }
        
        if (this.registerPassword.length < 6) {
          this.errorMessage = 'Пароль должен содержать минимум 6 символов';
          return;
        }
        
        // Переходим ко второму шагу
        this.registerStep = 2;
        this.errorMessage = '';
        return;
      }
      
      // Шаг 2: Завершение регистрации
      this.loading = true;
      this.errorMessage = '';
      
      try {
        const registrationData = {
          email: this.registerEmail,
          password: this.registerPassword,
          full_name: this.fullName,
          phone: this.phone,
          birth_date: this.birthDate,
          group: this.selectedGroup
        };

        const response = await axios.post(`${API_BASE_URL}/api/register`, registrationData);

        // Сохраняем токен
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('user_role', response.data.user.role);

        console.log('Успешная регистрация:', response.data);
        
        // Перенаправляем на главную страницу
        this.$router.push('/profile');
        
      } catch (error) {
        this.handleApiError(error, 'Ошибка регистрации');
      } finally {
        this.loading = false;
      }
    },

    // В методах handleLogin и handleRegistration добавьте более детальную обработку ошибок:

    handleApiError(error, defaultMessage) {
      if (error.response && error.response.data && error.response.data.error) {
        this.errorMessage = error.response.data.error;
      } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        this.errorMessage = 'Ошибка подключения к серверу. Проверьте, запущен ли бэкенд.';
      } else {
        this.errorMessage = defaultMessage + ': ' + (error.message || 'Неизвестная ошибка');
      }
      console.error('API Error:', error.response?.data || error);
    },

    loadRememberedEmail() {
      const rememberedEmail = localStorage.getItem('remembered_email');
      if (rememberedEmail) {
        this.email = rememberedEmail;
        this.rememberMe = true;
      }
    }
  },
  watch: {
    isRegister(newVal) {
      if (newVal) {
        // Сброс данных регистрации при переключении на вкладку
        this.registerStep = 1;
        this.registerEmail = '';
        this.registerPassword = '';
        this.confirmPassword = '';
        this.fullName = '';
        this.phone = '';
        this.birthDate = '';
        this.selectedGroup = '';
        this.errorMessage = '';
      } else {
        this.errorMessage = '';
      }
    }
  },
  mounted() {
    this.loadRememberedEmail();
    
    // Проверяем подключение к бэкенду
    axios.get(`${API_BASE_URL}/`)
      .then(response => {
        console.log('Бэкенд подключен:', response.data);
      })
      .catch(error => {
        console.warn('Бэкенд недоступен:', error.message);
      });
  }
}
</script>

<style scoped>
.login-container {
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: auto;
}

.login-background {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-2px);
}

.login-header {
  background: #2c3e50;
  color: white;
  padding: 30px 25px 20px;
  text-align: center;
}

.technical-college-name {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 12px;
}

.divider {
  width: 50px;
  height: 2px;
  background: #3498db;
  margin: 0 auto 15px;
  border-radius: 2px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e8ed;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #657786;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tab-button.active {
  color: #3498db;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #3498db;
  border-radius: 3px 3px 0 0;
}

.tab-button:hover:not(.active) {
  background: #edf2f7;
  color: #2c3e50;
}

.tab-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 20px;
  margin: 15px 30px 0;
  border-radius: 6px;
  border: 1px solid #fcc;
  font-size: 0.9rem;
  text-align: center;
}

.login-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-input::placeholder {
  color: #aab8c2;
}

.form-input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.7;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 12px auto;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #2c3e50;
  font-size: 0.9rem;
}

.remember-me input {
  margin-right: 6px;
}

.remember-me:has(input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  background: #3498db;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 0;
}

.login-button:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.button-loader {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.back-button {
  flex: 1;
  background: #95a5a6;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover:not(:disabled) {
  background: #7f8c8d;
  transform: translateY(-1px);
}

.back-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.form-actions .login-button {
  flex: 2;
  margin-bottom: 0;
}

.login-footer {
  padding: 20px 30px;
  background: #f8f9fa;
  text-align: center;
  border-top: 1px solid #e1e8ed;
}

.support-text {
  margin-bottom: 8px;
  color: #657786;
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
  color: #657786;
  font-size: 0.85rem;
  margin: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .login-container {
    padding: 30px 15px;
  }
  
  .login-background {
    max-width: 400px;
  }
  
  .login-form {
    padding: 25px 20px;
  }
  
  .technical-college-name {
    font-size: 1rem;
  }
  
  .login-title {
    font-size: 1.3rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .error-message {
    margin: 15px 20px 0;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px 10px;
  }
  
  .login-background {
    max-width: 350px;
  }
  
  .login-form {
    padding: 20px 15px;
  }
  
  .login-header {
    padding: 25px 20px 15px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .technical-college-name {
    font-size: 0.95rem;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .tab-button {
    padding: 12px;
  }
  
  .error-message {
    margin: 15px 15px 0;
    font-size: 0.85rem;
  }
}
</style>