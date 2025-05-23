import { useAuthStore } from "@/stores/auth";

import { socketService } from '@/services/sockets/socket';


class VideoCallService {
    requestVideoCall(receiverId: string) {
        const currentUserId = useAuthStore().currentUser?.id;
        if (!currentUserId) {
            console.error('User not logged in');
            return;
        }
        const data = { 
            senderId: currentUserId,
            receiverId: receiverId
        }
        socketService.emit('videoCallRequested', data)
        console.log('requested video call to', receiverId);
    }

    rejectVideoCall(senderId: string) {
        const currentUserId = useAuthStore().currentUser?.id;
        if (!currentUserId) {
            console.error('User not logged in');
            return;
        }
        const data = {
            senderId: senderId,
            receiverId: currentUserId
        }
        socketService.emit('videoCallRejected', data)
        console.log('rejected video call from', senderId);
    }
}


const videoCallService = new VideoCallService();


export { videoCallService };