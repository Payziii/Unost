<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-section">
            <h1 class="technical-college-name">Верхнепышминский механико-технологический техникум «Юность»</h1>
            <div class="divider"></div>
            <h2 class="login-title">Вход в личный кабинет</h2>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              v-model="email" 
              required 
              placeholder="Введите ваш email"
              class="form-input"
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
            >
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span class="checkmark"></span>
              Запомнить меня
            </label>
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>

          <button type="submit" class="login-button">
            <span class="button-text">Войти</span>
            <div class="button-loader" v-if="loading"></div>
          </button>
        </form>

        <div class="login-footer">
          <p class="support-text">
            Возникли проблемы со входом? 
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
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      
      try {
        // Здесь будет логика авторизации
        console.log('Данные для входа:', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        })
        
        // Имитация загрузки
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // После успешного входа перенаправляем пользователя
        // this.$router.push('/dashboard')
        
      } catch (error) {
        console.error('Ошибка входа:', error)
      } finally {
        this.loading = false
      }
    }
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
  max-width: 420px;
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
}

.login-button:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.login-button:active {
  transform: translateY(0);
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
    max-width: 380px;
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
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px 10px;
  }
  
  .login-background {
    max-width: 340px;
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
}
</style>