<template>
    <div class="p-4 bg-white dark:bg-slate-900 dark:text-gray-200 shadow-md">
        <form @submit.prevent="toSendMessage" class="flex flex-col ">
            <div class="flex mb-4 space-x-1">
                <input v-model="newMessage" class="flex-1 px-4 py-2 dark:bg-slate-900 dark:border-gray-200 border rounded-md " placeholder="输入消息..." />
                <div class="flex items-center">
                    <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
                    <button type="button" @click="triggerFileInput"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md">上传文件</button>
                    </div>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md ">发送</button>
                </div>
                <div class="flex items-center">
                    <span v-if="selectedFile" class="ml-4">{{ selectedFile.name }}</span>
                </div>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


import { uploadFile } from '@/utils/fileUpload';
import { 
    Message,
    Content,
    TextContent,
    ImageContent,
    VideoContent
} from '@/models/Message';

import { getUser } from '@/api/user';
import { sendMessage } from '@/api/message';


const emit = defineEmits(['send-message']);


const authStore = useAuthStore();

const router = useRouter(); 
const newMessage = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);


function toSendMessage() {
    handleToSendMessage(newMessage.value, selectedFile.value)
        .then(() => {
            console.log('Message sent successfully');
        });
    newMessage.value = '';
    selectedFile.value = null;
};

function triggerFileInput() {
    fileInput.value.click();
};

function handleFileChange(event) {
    selectedFile.value = event.target.files[0];
}

async function handleToSendMessage(newMessage, selectedFile){
    let content: Content;
    if (newMessage.trim() && authStore.currentUser) {
        content = new TextContent(newMessage);
    }
    if (selectedFile) {
        try {
            const fileInfo = await uploadFile(selectedFile, authStore.currentUser.email);
            if (fileInfo.type === 'image') {
                content = new ImageContent(fileInfo.url);
            } else if (fileInfo.type === 'video') {
                content = new VideoContent(fileInfo.url);
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
    }
    const id = router.currentRoute.value.params.id as string;
    const to = getUser(id);
    const message: Message = new Message(authStore.currentUser, to, content, new Date());
    emit('send-message', message);
    console.log(message);
    sendMessage(message);
};

</script>
  