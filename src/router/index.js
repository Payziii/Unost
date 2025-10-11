import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactsView from '../views/ContactsView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import KnigaZhalob from '@/components/KnigaZhalob.vue'
import AdminPanel from '@/components/AdminPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/kontakty',
      name: 'contacts',
      component: ContactsView,
    },
    {
    path: '/login',
    name: 'login',
    component: LoginView
    },
    {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
    },
    {
      path: '/applicants/priem',
      name: 'priem',
      component: () => import('../views/applicants/PriemView.vue')
    },
    {
    path: '/kniga-zhalob',
    name: 'kniga-zhalob',
    component: KnigaZhalob
    },
    {
    path: '/admin/kniga-zhalob',
    name: 'admin-kniga-zhalob',
    component: AdminPanel,
    meta: { requiresAuth: true }
    }
  ],
})

// ДОБАВЬТЕ ЭТОТ КОД - защита маршрутов
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // Если маршрут требует аутентификации и у пользователя нет токена
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // Если пользователь уже авторизован и пытается зайти на страницу логина
  else if (to.name === 'login' && token) {
    next('/profile')
  }
  // Во всех остальных случаях разрешаем переход
  else {
    next()
  }
})

export default router
