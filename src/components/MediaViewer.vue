<template>
    <button class="btn" @click="commonStore.openModal = true">open modal</button>
    <dialog :open="commonStore.openModal" @cancel="commonStore.openModal = false" @close="commonStore.openModal = false" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">MediaViewer</h3>
            
            <div v-if="commonStore.openModal">
                <div v-if="commonStore.mediaType === 'image'">
                    <img :src="mediaUrl">
                </div>
                <div v-else-if="commonStore.mediaType === 'video'">
                    <video :src="mediaUrl" controls autoplay></video>
                </div>
                <div v-else>
                    <p>Unsupported media type</p>
                </div>
            </div>
            
            <p class="py-4">Press ESC key or click the button below to close</p>
            <button @click="commonStore.openModal = false" class="btn">Close</button>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();

const mediaUrl = computed(() => commonStore.mediaUrl);
</script>