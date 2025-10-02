import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или невалиден
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => 
    api.post('/api/login', { email, password }),

  register: (userData) => 
    api.post('/api/register', userData),

  getProfile: () => 
    api.get('/api/students/profile'),
};

export const studentAPI = {
  getStudents: () => 
    api.get('/api/students'),

  getStudent: (id) => 
    api.get(`/api/students/${id}`),
};

export default api;