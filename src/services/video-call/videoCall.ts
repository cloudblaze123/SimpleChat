import { useAuthStore } from "@/stores/auth";
import { useVideoCallStore } from "@/stores/videoCall";

import { videoRTC } from "./video-rtc";

import { videoCallEventTransceiver } from "./video-call-event-transceiver";


class VideoCallService {

    constructor() {
        // 当收到视频呼叫请求时
        videoCallEventTransceiver.onVideoCallRequested = (senderId: string, receiverId: string) => {
            const videoCallStore = useVideoCallStore();
            videoCallStore.senderId = senderId;
            videoCallStore.receiverId = receiverId;
            videoCallStore.hasCallRequest = true;
        }

        // 当发出的视频呼叫被接受时
        videoCallEventTransceiver.onVideoCallAccepted = (senderId: string, receiverId: string) => {
            this.openRTC();
        }

        // 当发出的视频呼叫被拒绝时
        videoCallEventTransceiver.onVideoCallRejected = (senderId: string, receiverId: string) => {
            const videoCallStore = useVideoCallStore();
            videoCallStore.senderId = '';
            videoCallStore.receiverId = '';
            videoCallStore.hasCallRequest = false;
        }
    }

    // 发起视频呼叫
    requestVideoCall(receiverId: string) {
        const currentUserId = useAuthStore().currentUser?.id;
        if (!currentUserId) {
            throw new Error('User not logged in');
        }
        videoCallEventTransceiver.requestVideoCall(currentUserId, receiverId);
        useVideoCallStore().hasCallRequest = true;
    }

    // 接受视频呼叫
    acceptVideoCall(senderId: string) {
        const currentUserId = useAuthStore().currentUser?.id;
        if (!currentUserId) {
            throw new Error('User not logged in');
        }
        videoCallEventTransceiver.acceptVideoCall(senderId, currentUserId);
        this.openRTC();
    }

    // 拒绝视频呼叫
    rejectVideoCall(senderId: string) {
        const currentUserId = useAuthStore().currentUser?.id;
        if (!currentUserId) {
            throw new Error('User not logged in');
        }
        videoCallEventTransceiver.rejectVideoCall(senderId, currentUserId);
        useVideoCallStore().hasCallRequest = false;
    }


    async openRTC() {
        const videoCallStore = useVideoCallStore();

        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoCallStore.localStream = localStream;

        videoRTC.connect(localStream);
        videoCallStore.openRTC = true;
    }


    closeRTC() {
        const videoCallStore = useVideoCallStore();

        videoCallStore.localStream = null;
        videoCallStore.remoteStream = null;
        videoCallStore.openRTC = false;

        videoCallStore.openRTC = false;
        videoRTC.disconnect();
    }
}


const videoCallService = new VideoCallService();


export { videoCallService };