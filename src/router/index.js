import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactsView from '../views/ContactsView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import KnigaZhalob from '@/views/KnigaZhalob.vue'
import AdminPanel from '@/views/AdminPanel.vue'

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
      path: '/applicants/reyting_abiturientov',
      name: 'rating',
      component: () => import('../views/applicants/RatingView.vue')
    },
    {
      path: '/applicants/professionalitet',
      name: 'professionalitet',
      component: () => import('../views/applicants/ProfessionalitetView.vue')
    },
    {
      path: '/applicants/kadetskaya_shkola-internat',
      name: 'kadeti',
      component: () => import('../views/applicants/KadetiView.vue')
    },
    {
      path: '/students/raspisanie_zanyatiy',
      name: 'rasp',
      component: () => import('../views/students/RaspView.vue')
    },
    {
      path: '/students/uchebnye_plany',
      name: 'uchebplan',
      component: () => import('../views/students/UchebplanView.vue')
    },
    {
      path: '/students/graphici',
      name: 'graphici',
      component: () => import('../views/students/GraphiciView.vue')
    },
    {
      path: '/students/promezhut',
      name: 'promezhut',
      component: () => import('../views/students/promezhutView.vue')
    },
    {
      path: '/students/gia',
      name: 'gia',
      component: () => import('../views/students/GiaView.vue')
    },
    {
      path: '/students/konkursi',
      name: 'konkursi',
      component: () => import('../views/students/KonkursiView.vue')
    },
    {
      path: '/students/credit',
      name: 'credit',
      component: () => import('../views/students/CreditView.vue')
    },
    {
      path: '/students/library',
      name: 'library',
      component: () => import('../views/students/LibraryView.vue')
    },
    {
      path: '/students/links',
      name: 'links',
      component: () => import('../views/students/LinksView.vue')
    },
    {
      path: '/students/pedagog',
      name: 'pedagog',
      component: () => import('../views/students/PedagogView.vue')
    },
    {
      path: '/structure/avtoshkola',
      name: 'avtoshkola',
      component: () => import('../views/struktura/AutoshkolaView.vue')
    },
    {
      path: '/structure/simvolika',
      name: 'AboutUs',
      component: () => import('../views/struktura/AboutUs.vue')
    },
        {
      path: '/info/maininfo',
      name: 'maininfo',
      component: () => import('../views/info/MainView.vue')
    },
    {
      path: '/info/structure',
      name: 'structure',
      component: () => import('../views/info/StructureView.vue')
    },
        {
      path: '/info/rukovodstvo',
      name: 'rukovodstvo',
      component: () => import('../views/info/RukovodstvoView.vue')
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
    meta: { requiresAuth: true, requiresAdmin: true }
    }
  ],
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('user_role')
  
  // Если маршрут требует аутентификации и у пользователя нет токена
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // Если маршрут требует прав администратора, а пользователь не админ
  else if (to.meta.requiresAdmin && userRole !== 'admin') {
    next('/profile')
  }
  // Если пользователь уже авторизован и пытается зайти на страницу логина
  else if (to.name === 'login' && token) {
    // Автоматический редирект для админа
    if (userRole === 'admin') {
      next('/admin/kniga-zhalob')
    } else {
      next('/profile')
    }
  }
  // Если администратор пытается зайти на страницу профиля студента
  else if (to.name === 'profile' && userRole === 'admin') {
    next('/admin/kniga-zhalob')
  }
  // Во всех остальных случаях разрешаем переход
  else {
    next()
  }
})

export default router