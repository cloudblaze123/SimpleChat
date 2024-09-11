import { defineStore } from 'pinia';


export const useSessionStore = defineStore('session', {
    state: (): { sessions: string[] } => ({
        sessions: [],
    }),

    actions: {
        addSession(userId: string) {
            if (this.sessions.some(sessionId => sessionId === userId)) {
                console.log("user already exists in sessions", userId);
                return;
            }
            this.sessions.push(userId);
            console.log("addSession", userId);
        },

        removeSession(id: string) {
            const indexToRemove = this.sessions.findIndex(user => userId === id);
            if (indexToRemove === -1) {
                return;
            }
            this.sessions.splice(indexToRemove, 1);
            console.log("removeSession", id);
        },

        putOnTop(userId: string) {
            const index = this.sessions.findIndex(userInSession => userInSession.id === userId);
            // 如果会话存在则先从会话数组中移除
            if (index > -1) {
                this.sessions.splice(index, 1);
            }
            // 添加会话到会话数组顶部
            this.sessions.unshift(userId);
            console.log("put", userId, "on session top");
        }
    }
});
