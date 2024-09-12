<template>
    <div class=" bg-gray-200 dark:bg-slate-800 px-3 py-2 rounded-lg break-all max-w-full">
        <div v-if="content.type === 'text'">
            {{ (content as TextContent).text }}
        </div>
        <div v-else-if="content.type === 'image'">
            <img :src="(content as ImageContent).url" class="max-w-xs rounded-lg" />
        </div>
        <div v-else-if="content.type === 'video'">
            <video :src="(content as VideoContent).url" controls class="max-w-xs rounded-lg" />
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

</script>