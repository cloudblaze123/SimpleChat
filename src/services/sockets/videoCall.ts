import { Socket } from 'socket.io-client';

import { useVideoCallStore } from '@/stores/videoCall';


function initVideoCallHandlers(socket:Socket) {
    const videoCallStore = useVideoCallStore();
    
    // 收到通话请求
    socket.on('videoCallRequested', (data) => {
        const { senderId, receiverId } = data;
        videoCallStore.hasCallRequest = true;
        videoCallStore.senderId = senderId;
        videoCallStore.receiverId = receiverId;
        console.log(`Received video call request from ${senderId} to ${receiverId}`);
    });

    // 收到通话接受
    socket.on('videoCallAccepted', (data) => {
        const { senderId, receiverId } = data;
        videoCallStore.hasCallRequest = true;
        videoCallStore.senderId = senderId;
        videoCallStore.receiverId = receiverId;
        videoCallStore.openRTC = true;
        console.log(`video call was accepted by ${receiverId}`);
    });

    // 收到通话拒绝
    socket.on('videoCallRejected', (data) => {
        const { senderId, receiverId } = data;
        videoCallStore.hasCallRequest = false;
        videoCallStore.senderId = '';
        videoCallStore.receiverId = '';
        console.log(`video call was rejected by ${receiverId}`);
    });
    
}


export { initVideoCallHandlers }