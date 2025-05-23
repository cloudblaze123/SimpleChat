import { Socket } from 'socket.io-client';

import { useVideoCallStore } from '@/stores/videoCall';


function initVideoCallHandlers(socket:Socket) {
    const videoCallStore = useVideoCallStore();
    
    socket.on('videoCallRequested', (data) => {
        const { senderId, receiverId } = data;
        videoCallStore.hasCallRequest = true;
        videoCallStore.senderId = senderId;
        videoCallStore.receiverId = receiverId;
        console.log(`Received video call request from ${senderId} to ${receiverId}`);
    });
    
    socket.on('videoCallRejected', (data) => {
        const { senderId, receiverId } = data;
        videoCallStore.hasCallRequest = false;
        videoCallStore.senderId = '';
        videoCallStore.receiverId = '';
        console.log(`video call was rejected by ${receiverId}`);
    });
}


export { initVideoCallHandlers }