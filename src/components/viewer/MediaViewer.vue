<template>
    <dialog :open="commonStore.openModal" @cancel="commonStore.openModal = false" @close="commonStore.openModal = false" class="modal">
        <div class="modal-box max-w-full">
            <h3 class="text-lg font-bold">MediaViewer</h3>
            
            <div class="flex justify-center items-center max-h-full">
                <ImageViewer v-if="commonStore.mediaType === 'image' && commonStore.mediaUrl" :src="mediaUrl" />

                <video v-else-if="commonStore.mediaType === 'video' && commonStore.mediaUrl" :src="mediaUrl" controls autoplay></video>

                <p v-else>Unsupported media type</p>
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

import ImageViewer from '@/components/viewer/ImageViewer.vue';


const commonStore = useCommonStore();

const mediaUrl = computed(() => commonStore.mediaUrl);
</script>