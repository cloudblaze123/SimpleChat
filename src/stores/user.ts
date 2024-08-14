//@ts-nocheck

// src/stores/user.js
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { UserService } from '@/services/user';

const userService = reactive(new UserService());

import { loggedInUsers, currentUser } from '@/mocks/loggedInUser';

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedInUsers: [],
        currentUser: null,
    }),
    
    actions: {
        initialize() {
            this.loggedInUsers.push(...loggedInUsers);
            this.switchUser(currentUser.id);
        },
        
        isUserLoggedIn(userId:string) {
            return this.loggedInUsers.some((user:User) => user.id === userId);
        },

        login(user: User) {
            this.loggedInUsers.push(user);
            console.log(this.loggedInUsers);
            this.switchUser(user.id);
        },

        logout(userToLogout: User) {
            // 移除登录的用户
            const indexToRemove = this.loggedInUsers.findIndex(user => user.id === userToLogout.id);
            if (indexToRemove === -1) {
                return;
            }
            this.loggedInUsers.splice(indexToRemove, 1);

            // 更新当前的登录用户
            if (this.loggedInUsers.length === 0) {
                this.currentUser = null;
                return;
            }
            this.switchUser(this.loggedInUsers[0].id);
        },

        switchUser(userId) {
            const user = this.loggedInUsers.find(user => user.id === userId);
            if (user) {
                this.currentUser = user;
            }else{
                console.error(`User with id ${userId} not found`);
            }
        },
    },
});
