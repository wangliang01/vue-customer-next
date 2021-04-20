import { createRouter, createWebHistory } from 'vue-router'
// import { capitalize } from 'lodash'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search')
  }
]

// const routeContext = require.context('@/views', true, /index.vue/)

// routeContext.keys().forEach(routePath => {
//   const path = routePath.match(/\/.*\//)  ? routePath.match(/\/.*\//)[0].slice(0, -1) : ''
//   if (path) {
//     const route = {
//       path,
//       component: () => import(`@/views${path}`),
//       name: capitalize(path.replace('/', ''))
//     }
//     routes.push(route)
//   }
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
