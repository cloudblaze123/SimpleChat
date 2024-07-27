// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ChatRoom from '../components/ChatRoom.vue'
import ContactList from '../components/ContactList.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/ChatRoom',
    name: 'ChatRoom',
    component: ChatRoom
  },
  {
    path: '/ContactList',
    name: 'ContactList',
    component: ContactList
  },
  {
    path: '/ChatRoom/:id',
    name: 'ChatRoomTo',
    component: ChatRoom
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
