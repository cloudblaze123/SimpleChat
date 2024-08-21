import { defineStore } from 'pinia';

import { User } from '@/models/User';

import { users as usersData } from '@/mocks/users';


export const useSessionStore = defineStore('session', {
    state: (): { sessions: User[] } => ({
        sessions: [...usersData],
    }),

    actions: {
        addSession(user: User) {
            if (this.sessions.some(session => session.id === user.id)) {
                console.log("user already exists in sessions", user.id);
                return;
            }
            this.sessions.push(user);
            console.log("addSession", user.id);
        },

        removeSession(id: string) {
            const indexToRemove = this.sessions.findIndex(user => user.id === id);
            if (indexToRemove === -1) {
                return;
            }
            this.sessions.splice(indexToRemove, 1);
            console.log("removeSession", id);
        },

        putOnTop(user: User) {
            const index = this.sessions.findIndex(userInSession => userInSession.id === user.id);
            // 如果会话存在则先从会话数组中移除
            if (index > -1) {
                this.sessions.splice(index, 1);
            }
            // 添加会话到会话数组顶部
            this.sessions.unshift(user);
            console.log("put", user.id, "on session top");
        }
    }
});
