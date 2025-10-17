import { createRouter, createWebHistory } from 'vue-router'
import { routeConfig, routeMeta, routeSettings } from './route-config.js'

const pages = import.meta.glob('@/views/**/*.vue')

function generateRoutes() {
  const routes = []

  Object.entries(routeConfig).forEach(([path, componentName]) => {
    const componentPath = findComponentPath(componentName, path)
    
    if (componentPath) {
      routes.push({
        path,
        name: generateRouteName(path),
        component: pages[componentPath],
        meta: routeMeta[path] || {}
      })
    } else {
      console.warn(`Компонент ${componentName} не найден для пути ${path}`)
    }
  })
  
  return routes
}

function findComponentPath(componentName, routePath) {
  const possiblePaths = [
    `../views/${componentName}.vue`,
    `../views/${componentName}.vue`.replace('View', ''),
    ...Object.keys(pages).filter(key => 
      key.includes(componentName) || 
      key.includes(componentName.replace('View', ''))
    )
  ]
  
  const routeFolder = Object.entries(routeSettings.folders).find(([key]) => 
    routePath.startsWith(`/${key}`)
  )
  
  if (routeFolder) {
    const [, folder] = routeFolder
    possiblePaths.unshift(`../views/${folder}/${componentName}.vue`)
  }
  
  return possiblePaths.find(path => path in pages)
}

function generateRouteName(path) {
  if (path === '/') return 'home'
  
  return path
    .slice(1)
    .replace(/\//g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: generateRoutes()
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('user_role')
  
  // Если маршрут требует аутентификации и у пользователя нет токена
  if (to.meta.requiresAuth && !token) {
    next('/login')
    return
  } 
  
  // Если маршрут требует прав администратора, а пользователь не админ
  if (to.meta.requiresAdmin && userRole !== 'admin') {
    // Если студент пытается зайти в админ-панель, перенаправляем в профиль
    next('/profile')
    return
  }
  
  // Если пользователь уже авторизован и пытается зайти на страницу логина
  if (to.name === 'login' && token) {
    // Автоматический редирект для админа
    if (userRole === 'admin') {
      next('/admin/kniga-zhalob')
    } else {
      next('/profile')
    }
    return
  }
  
  // Если администратор пытается зайти на страницу профиля студента
  if (to.name === 'profile' && userRole === 'admin') {
    next('/admin/kniga-zhalob')
    return
  }
  
  // Во всех остальных случаях разрешаем переход
  next()
})

export default router