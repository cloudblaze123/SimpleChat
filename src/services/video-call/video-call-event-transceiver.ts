import { socketService } from '@/services/sockets/socket';


class VideoCallEventTransceiver {
    onVideoCallRequested: (senderId: string, receiverId: string) => void = () => {};
    onVideoCallAccepted: (senderId: string, receiverId: string) => void = () => {};
    onVideoCallRejected: (senderId: string, receiverId: string) => void = () => {};


    constructor() {
        socketService.onConnected(() => {
            this.initSocketHandlers();
        });
    }

    initSocketHandlers() {
        // 收到通话请求
        socketService.on('videoCallRequested', (data) => {
            const { senderId, receiverId } = data;
            this.onVideoCallRequested(senderId, receiverId);
            console.log(`Received video call request from ${senderId} to ${receiverId}`);
        });
    
        // 收到通话接受
        socketService.on('videoCallAccepted', (data) => {
            const { senderId, receiverId } = data;
            this.onVideoCallAccepted(senderId, receiverId);
            console.log(`video call was accepted by ${receiverId}`);
        });
    
        // 收到通话拒绝
        socketService.on('videoCallRejected', (data) => {
            const { senderId, receiverId } = data;
            this.onVideoCallRejected(senderId, receiverId);
            console.log(`video call was rejected by ${receiverId}`);
        });
        
    }


    requestVideoCall(senderId: string, receiverId: string) {
        const data = { 
            senderId: senderId,
            receiverId: receiverId
        }
        socketService.emit('videoCallRequested', data)
        console.log('requested video call to', receiverId);
    }

    rejectVideoCall(senderId: string, receiverId: string) {
        const data = {
            senderId: senderId,
            receiverId: receiverId
        }
        socketService.emit('videoCallRejected', data)
        console.log('rejected video call from', senderId);
    }

    acceptVideoCall(senderId: string, receiverId: string) {
        const data = {
            senderId: senderId,
            receiverId: receiverId
        }
        socketService.emit('videoCallAccepted', data)
        console.log('accepted video call from', senderId);
    }
}




const videoCallEventTransceiver = new VideoCallEventTransceiver();


export { videoCallEventTransceiver }