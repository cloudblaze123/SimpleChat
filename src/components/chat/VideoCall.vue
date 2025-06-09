<template>
    <!-- <button @click="videoCallStore.openModal = true" class="btn">VideoCall</button> -->
    <dialog :open="videoCallStore.openModal" @cancel="videoCallStore.openModal = false" @close="videoCallStore.openModal = false" class="modal">
        <div class="modal-box flex flex-col max-w-full h-dvh overflow-hidden">
            <h3 class="text-lg font-bold">VideoCall</h3>
            

            <!-- Content -->
            <div class="flex flex-col flex-1 justify-center items-center">
                <div class="flex flex-col lg:flex-row">
                    <div class="lg:w-1/2 m-4">
                        remote
                        <video ref="remoteVideo" autoplay></video>
                    </div>
                    <div class="lg:w-1/2 m-4">
                        local
                        <video ref="localVideo" autoplay muted></video>
                    </div>
                </div>

                <button v-if="videoCallStore.openRTC" @click="endVideoCall" class="btn bg-red-500 text-white">End Call</button>
                <div v-else-if="receiverId === currentUserId" class="flex">
                    <button @click="acceptVideoCall" class="btn w-24 h-16 bg-green-500 text-white">Accept Call</button>
                    <button @click="rejectVideoCall" class="btn w-24 h-16 bg-red-500 text-white">Reject Call</button>
                </div>
                <div v-else class="text-lg">waiting for other user to accept call...</div>
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
    videoCallService.endVideoCall(senderId.value);
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