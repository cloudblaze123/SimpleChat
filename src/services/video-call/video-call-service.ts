import { useAuthStore } from "@/stores/auth";
import { useVideoCallStore } from "@/stores/video-call";

import { videoRTC } from "./video-rtc";

import { videoCallEventTransceiver } from "./video-call-event-transceiver";


class VideoCallService {

    constructor() {
        // 当收到视频呼叫请求时
        videoCallEventTransceiver.onVideoCallRequested = (senderId: string) => {
            const videoCallStore = useVideoCallStore();
            const currentUser = useAuthStore().currentUser;
            videoCallStore.senderId = senderId;
            videoCallStore.receiverId = currentUser ? currentUser.id : '';
            videoCallStore.hasCallRequest = true;
            videoCallStore.openModal = true;
        }

        // 当发出的视频呼叫被接受时
        videoCallEventTransceiver.onVideoCallAccepted = (senderId: string) => {
            this.openRTC(senderId, 'connect');
        }

        // 当发出的视频呼叫被拒绝时
        videoCallEventTransceiver.onVideoCallRejected = (senderId: string) => {
            const videoCallStore = useVideoCallStore();
            videoCallStore.senderId = '';
            videoCallStore.receiverId = '';
            videoCallStore.hasCallRequest = false;
            videoCallStore.openModal = false;
        }

        // 当视频被对方结束时
        videoCallEventTransceiver.onVideoCallEnded = (senderId: string) => {
            this.closeRTC();
            useVideoCallStore().openModal = false;
        }
    }

    // 发起视频呼叫
    requestVideoCall(receiverId: string) {
        videoCallEventTransceiver.requestVideoCall(receiverId);

        const videoCallStore = useVideoCallStore();
        const currentUser = useAuthStore().currentUser;
        videoCallStore.senderId = currentUser ? currentUser.id : '';
        videoCallStore.receiverId = receiverId;
        videoCallStore.hasCallRequest = true;
        videoCallStore.openModal = true;
    }

    // 接受视频呼叫
    acceptVideoCall(receiverId: string) {
        videoCallEventTransceiver.acceptVideoCall(receiverId);
        this.openRTC(receiverId, 'listen');
    }

    // 拒绝视频呼叫
    rejectVideoCall(receiverId: string) {
        videoCallEventTransceiver.rejectVideoCall(receiverId);
        useVideoCallStore().hasCallRequest = false;
        useVideoCallStore().openModal = false;
    }

    // 挂断视频
    endVideoCall(receiverId: string) {
        this.closeRTC();
        videoCallEventTransceiver.endVideoCall(receiverId);
        useVideoCallStore().hasCallRequest = false;
        useVideoCallStore().openModal = false;
    }


    async openRTC(receiverId: string, type: 'connect' | 'listen') {
        const videoCallStore = useVideoCallStore();

        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoCallStore.localStream = localStream;

        if (type === 'connect') {
            videoRTC.connect(localStream, receiverId);
        } else {
            videoRTC.listen(localStream);
        }
        videoCallStore.openRTC = true;
    }


    closeRTC() {
        const videoCallStore = useVideoCallStore();

        videoCallStore.localStream?.getTracks().forEach(track => track.stop());

        videoCallStore.hasCallRequest = false;
        videoCallStore.openRTC = false;
        videoCallStore.senderId = '';
        videoCallStore.receiverId = '';
        videoCallStore.localStream = null;
        videoCallStore.remoteStream = null;

        videoRTC.disconnect();
    }
}


const videoCallService = new VideoCallService();


export { videoCallService };