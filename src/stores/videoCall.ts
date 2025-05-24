import { defineStore } from 'pinia';





export const useVideoCallStore = defineStore('video-call', {
    state: () => ({
        openModal: false,
        hasCallRequest: false,
        senderId: '',
        receiverId: '',

        openRTC: false,
    }),
    actions: {
        
    }
});
