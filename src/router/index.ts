// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/views/Home.vue'
import Chat from '@/components/Chat.vue'
import ContactList from '@/components/ContactList.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'Chat/:id',
                name: 'ChatTo',
                component: Chat
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
