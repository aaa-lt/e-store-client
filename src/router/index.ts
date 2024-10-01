import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import NotFound from '@/pages/NotFound.vue'
import { useAuthStore } from '../stores/auth'
import OrdersPage from '@/pages/OrdersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/logout',
      name: 'Logout',
      redirect() {
        const authStore = useAuthStore()
        authStore.logout()

        return { name: 'Login' }
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: OrdersPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.user.token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
