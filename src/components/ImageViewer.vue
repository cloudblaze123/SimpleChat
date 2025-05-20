<template>
    <button class="btn" @click="commonStore.openModal = true">open modal</button>
    <dialog :open="commonStore.openModal" @cancel="commonStore.openModal = false;console.log('cancel')" @close="commonStore.openModal = false" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">ImageViewer</h3>
            
            <div v-if="imageUrl">
                <img :src="imageUrl">
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

const imageUrl = computed(() => commonStore.mediaUrl);
</script>