import { socketService } from '@/services/sockets/socket';


class VideoCallEventTransceiver {
    onVideoCallRequested: (senderId: string) => void = () => {};
    onVideoCallAccepted: (senderId: string) => void = () => {};
    onVideoCallRejected: (senderId: string) => void = () => {};


    constructor() {
        socketService.onConnected(() => {
            this.initSocketHandlers();
        });
    }

    initSocketHandlers() {
        // 收到通话请求
        socketService.on('videoCallRequested', (senderId: string) => {
            this.onVideoCallRequested(senderId);
            console.log(`Received video call request from ${senderId}`);
        });
    
        // 收到通话接受
        socketService.on('videoCallAccepted', (senderId: string) => {
            this.onVideoCallAccepted(senderId);
            console.log(`video call was accepted by ${senderId}`);
        });
    
        // 收到通话拒绝
        socketService.on('videoCallRejected', (senderId: string) => {
            this.onVideoCallRejected(senderId);
            console.log(`video call was rejected by ${senderId}`);
        });
        
    }


    requestVideoCall(receiverId: string) {
        socketService.emit('videoCallRequested', receiverId)
        console.log('requested video call to', receiverId);
    }

    rejectVideoCall(receiverId: string) {
        socketService.emit('videoCallRejected', receiverId)
        console.log('rejected video call from', receiverId);
    }

    acceptVideoCall(receiverId: string) {
        socketService.emit('videoCallAccepted', receiverId)
        console.log('accepted video call from', receiverId);
    }
}




const videoCallEventTransceiver = new VideoCallEventTransceiver();


export { videoCallEventTransceiver }