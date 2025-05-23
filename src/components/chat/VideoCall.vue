<template>
    <button @click="videoCallStore.openModal = true" class="btn">VideoCall</button>
    <dialog :open="videoCallStore.openModal" @cancel="videoCallStore.openModal = false" @close="videoCallStore.openModal = false" class="modal">
        <div class="modal-box flex flex-col max-w-full h-dvh overflow-hidden">
            <h3 class="text-lg font-bold">VideoCall</h3>
            
            <div class="flex flex-col flex-1 justify-center items-center">
                <button @click="rejectVideoCall" class="btn w-24 h-16 bg-red-500 text-white">Request Call</button>
            </div>
            
            <p class="py-4">Press ESC key or click the button below to close</p>
            <button @click="videoCallStore.openModal = false" class="btn">Close</button>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>


<script setup lang="ts">
import { computed, watch } from 'vue';
import { useVideoCallStore } from '@/stores/videoCall';
const videoCallStore = useVideoCallStore();

watch(() => videoCallStore.hasCallRequest, (newValue) => {
    if(videoCallStore.hasCallRequest){
        videoCallStore.openModal = true;
    }else{
        videoCallStore.openModal = false;
    }
})


const senderId = computed(() => videoCallStore.senderId);
const receiverId = computed(() => videoCallStore.receiverId);


import { videoCallService } from '@/services/videoCall';
function rejectVideoCall() {
    videoCallService.rejectVideoCall(senderId.value);
    videoCallStore.hasCallRequest = false;
}
</script>