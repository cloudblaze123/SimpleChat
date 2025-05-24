import { useAuthStore } from "@/stores/auth";
import { useVideoCallStore } from "@/stores/videoCall";

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
        }

        // 当发出的视频呼叫被接受时
        videoCallEventTransceiver.onVideoCallAccepted = (senderId: string) => {
            this.openRTC();
        }

        // 当发出的视频呼叫被拒绝时
        videoCallEventTransceiver.onVideoCallRejected = (senderId: string) => {
            const videoCallStore = useVideoCallStore();
            videoCallStore.senderId = '';
            videoCallStore.receiverId = '';
            videoCallStore.hasCallRequest = false;
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
    }

    // 接受视频呼叫
    acceptVideoCall(receiverId: string) {
        videoCallEventTransceiver.acceptVideoCall(receiverId);
        this.openRTC();
    }

    // 拒绝视频呼叫
    rejectVideoCall(receiverId: string) {
        videoCallEventTransceiver.rejectVideoCall(receiverId);
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