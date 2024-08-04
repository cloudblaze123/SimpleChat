//@ts-nocheck

// src/stores/user.js
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { UserService } from '@/services/user';

const userService = reactive(new UserService());

import { loggedInUsers, currentUser } from '@/mocks/loggedInUser';

export const useUserStore = defineStore('user', {
  getters: {
    loggedInUsers: ()=>userService.loggedInUsers, // 存储所有已登录的用户
    currentUser: ()=>userService.currentUser, // 当前使用的用户
  },
  actions: {
    initialize(){
      for (let user of loggedInUsers) {
        userService.login({id: user.id});
      }
      userService.switchUser(currentUser);
    },
    login(userInfo) {
      userService.login(userInfo);
    },
    logout() {
      userService.logout(this.currentUser);
    },
    switchUser(userId) {
      userService.switchUser(userId);
    },
  },
});
