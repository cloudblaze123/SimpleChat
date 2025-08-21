<template>
    <!-- <button @click="videoCallStore.openModal = true" class="btn">VideoCall</button> -->
    <dialog :open="videoCallStore.openModal" @cancel="videoCallStore.openModal = false" @close="videoCallStore.openModal = false" class="modal">
        <div class="modal-box flex flex-col max-w-full h-dvh overflow-hidden">
            <h3 class="text-lg font-bold">VideoCall</h3>
            

            <!-- Content -->
            <div class="relative flex flex-col flex-1 h-0 justify-center items-center">
                <!-- 视频 -->
                <div class="relative flex flex-col flex-1 h-0 w-full lg:flex-row lg:h-full">
                    <div class="relative flex-1 h-0lg:w-1/2 lg:h-full ">
                        <div class="absolute top-0 left-0">remote</div>
                        <video ref="remoteVideo" autoplay class="w-full h-full"></video>
                    </div>
                    <div class="absolute top-0 right-0 w-1/2 h-1/2 overflow-hidden">
                        <div class="absolute top-0 left-0">local</div>
                        <video ref="localVideo" autoplay muted class="w-full h-full"></video>
                    </div>
                </div>


                <!-- 控件 -->
                <div class="absolute bottom-4">
                    <button v-if="videoCallStore.openRTC" @click="endVideoCall" class="btn btn-ghost bg-red-500 hover:bg-red-600 text-white">End Call</button>
                    <div v-else-if="receiverId === currentUserId" class="flex">
                        <button @click="acceptVideoCall" class="btn btn-ghost bg-green-500 hover:bg-green-600 text-white">Accept Call</button>
                        <button @click="rejectVideoCall" class="btn btn-ghost bg-red-500 hover:bg-red-600 text-white">Reject Call</button>
                    </div>
                    <div v-else class="text-lg">waiting for other user to accept call...</div>
                </div>
            </div>
            

            <p class="py-4">Press ESC key or click the button below to close</p>
            <button @click="videoCallStore.openModal = false" class="btn">Close</button>
        </div>
    </dialog>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useVideoCallStore } from '@/stores/video-call';
const videoCallStore = useVideoCallStore();


const senderId = computed(() => videoCallStore.senderId);
const receiverId = computed(() => videoCallStore.receiverId);


import { useAuthStore } from '@/stores/auth';
const currentUserId = computed(() => useAuthStore().currentUser?.id);





import { videoCallService } from '@/services/video-call/video-call-service';
function rejectVideoCall() {
    videoCallService.rejectVideoCall(senderId.value);
}
function acceptVideoCall() {
    videoCallService.acceptVideoCall(senderId.value);
}

function endVideoCall() {
    const peerId = senderId.value === currentUserId.value ? receiverId.value : senderId.value;
    videoCallService.endVideoCall(peerId);
}





import { videoRTC } from '@/services/video-call/video-rtc';

const localVideo = ref(null);
const remoteVideo = ref(null);


watch(() => videoCallStore.openRTC, async (newValue) => {
    if(newValue){
        const localStream = videoCallStore.localStream;
        localVideo.value.srcObject = localStream;
    }else{
        localVideo.value.srcObject = null;
        remoteVideo.value.srcObject = null;
    }
})

videoRTC.onRemoteStreamReady = (stream) => {
    console.log('onRemoteStreamReady');
    remoteVideo.value.srcObject = stream;
}
videoRTC.onRemoteStreamDisconnected = () => {
    remoteVideo.value.srcObject = null;
}
</script>


<!-- <style>
video {
    background-color: rgb(78, 255, 131);
}
</style> -->