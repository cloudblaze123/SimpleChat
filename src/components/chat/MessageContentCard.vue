<template>
    <div class=" bg-gray-200 dark:bg-slate-800 px-3 py-2 rounded-lg break-all max-w-full">
        <div v-if="content.type === 'text'">
            {{ (content as TextContent).text }}
        </div>
        <div v-else-if="content.type === 'image'">
            <img @click="showMediaViewer(content.type, (content as ImageContent).url)" :src="(content as ImageContent).url" class="w-full max-w-xs rounded-lg" />
        </div>
        <div v-else-if="content.type === 'video'">
            <video @click.prevent="showMediaViewer(content.type, (content as VideoContent).url)" :src="(content as VideoContent).url" controls class="w-full max-w-xs rounded-lg" ></video>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Message, Content, TextContent, ImageContent, VideoContent } from '@/models/Message';

const props = defineProps({
    content: {
        type: Content,
        required: true
    }
})

const content = props.content;


import { useCommonStore } from '@/stores/common';
const commonStore = useCommonStore();
function showMediaViewer(type: string, mediaUrl: string){
    commonStore.mediaType = type;
    commonStore.mediaUrl = mediaUrl;
    commonStore.openModal = true;
}
</script>