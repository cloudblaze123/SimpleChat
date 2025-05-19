// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'
import Search from '@/views/Search.vue'
import Profile from '@/views/Profile.vue'
import UpdateProfile from '@/views/UpdateProfile.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'Chat/:id',
                name: 'ChatTo',
                component: Chat
            },
            {
                path: 'Search',
                name: 'Search',
                component: Search
            },
            {
                path: 'Profile',
                name: 'OwnProfile',
                component: Profile
            },
            {
                path: 'Profile/:id',
                name: 'Profile',
                component: Profile
            },
            {
                path: 'UpdateProfile/:id',
                name: 'UpdateProfile',
                component: UpdateProfile
            },
            {
                path: 'Settings',
                name: 'Settings',
                component: Settings
            },
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


import { useAuthStore } from '@/stores/auth'
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.name === 'Login' || to.name === 'Register') {
        next()
        return
    }

    // 如果未登录则跳转至登录页面
    if (!authStore.currentUser) {
        console.log('尚未登录，跳转至登录页面')
        next({ name: 'Login' })
        return
    }

    next()
})


export default router
