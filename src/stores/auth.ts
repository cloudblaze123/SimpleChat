import { defineStore } from 'pinia';
import { User } from '@/models/User';

import { login } from '@/api/auth';
import { getUser } from '@/api/user-web';
import { loggedInUsers, currentUser } from '@/mocks/loggedInUser';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedInUsers: [] as User[],
        currentUser: null as User | null,
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

        async loginWithEmail(email: string, password: string){
            const id = await login(email, password)
            console.log('logined id:', id)
            if (id === '') {
                return ''
            }
            // 如果已经登陆，则直接切换到该用户
            if (this.isUserLoggedIn(id)){
                this.switchUser(id)
                return id
            }
            const user = await getUser(id);
            this.login(user);
            return id
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

        switchUser(userId: string) {
            const user = this.loggedInUsers.find(user => user.id === userId);
            if (user) {
                this.currentUser = user;
            }else{
                console.error(`User with id ${userId} not found`);
            }
        },
    },
});
