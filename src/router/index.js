
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RecuperarPasswordView from '../views/RecuperarPasswordView.vue'
import ActualizarPasswordView from '../views/ActualizarPasswordView.vue'
import FincasView from '../views/FincasView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/recuperar-password',
            component: RecuperarPasswordView
        },
        {
            path: '/actualizar-password',
            component: ActualizarPasswordView
        },
        {
            path: '/fincas',
            component: FincasView,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
            return '/login'
        }
    }
})

export default router
