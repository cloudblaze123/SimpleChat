<template>
    <button @click="videoCallStore.openModal = true" class="btn">VideoCall</button>
    <dialog :open="videoCallStore.openModal" @cancel="videoCallStore.openModal = false" @close="videoCallStore.openModal = false" class="modal">
        <div class="modal-box flex flex-col max-w-full h-dvh overflow-hidden">
            <h3 class="text-lg font-bold">VideoCall</h3>
            
            <div class="flex flex-col flex-1 justify-center items-center">
                Content
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
import { useVideoCallStore } from '@/stores/videoCall';
const videoCallStore = useVideoCallStore();
</script>