// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'
import Search from '@/views/Search.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'

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
