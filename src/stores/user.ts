//@ts-nocheck

// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedInUsers: [
      { id: 1, email: 'user1@example.com' },
      { id: 2, email: 'user2@example.com' },
      { id: 3, email: 'user3@example.com' },
    ], // 存储所有已登录的用户
    currentUser: { id: 1, email: 'user1@example.com' }, // 当前使用的用户
  }),
  actions: {
    login(userInfo) {
      // 检查用户是否已经登录
      const existingUser = this.loggedInUsers.find(user => user.id === userInfo.id);
      if (!existingUser) {
        this.loggedInUsers.push(userInfo);
      }
      this.currentUser = userInfo;
    },
    logout() {
      if (this.currentUser) {
        // 从 loggedInUsers 中移除当前用户
        this.loggedInUsers = this.loggedInUsers.filter(user => user.id !== this.currentUser.id);
        // 如果 loggedInUsers 为空，设置 currentUser 为 null
        if (this.loggedInUsers.length === 0) {
          this.currentUser = null;
        } else {
          // 否则，设置 currentUser 为 loggedInUsers 中的第一个用户
          this.currentUser = this.loggedInUsers[0];
        }
      }
    },
    switchUser(userId) {
      const user = this.loggedInUsers.find(user => user.id === userId);
      if (user) {
        this.currentUser = user;
      }
    },
  },
});
