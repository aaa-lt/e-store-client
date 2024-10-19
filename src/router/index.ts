import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import NotFound from '@/pages/NotFound.vue'
import { useAuthStore } from '../stores/auth'
import OrdersPage from '@/pages/OrdersPage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import OAuthCallback from '@/pages/OAuthCallback.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

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
    },
    {
      path: '/orders/:id',
      name: 'Order',
      component: OrderPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/oauth/callback',
      name: 'OAuthCallback',
      component: OAuthCallback,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        const code = to.query.code

        if (code) {
          authStore
            .handleOAuthCallback(code as string)
            .then(() => next('/'))
            .catch(() => next('/login'))
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
