// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Chat from '@/views/Chat.vue'
import Settings from '@/views/Settings.vue'

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
