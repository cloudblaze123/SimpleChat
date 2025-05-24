<template>
    <div class="bg-white dark:bg-slate-900 dark:text-gray-200 shadow-md">
        <form @submit.prevent="toSendMessage" class="flex flex-col relative">
            <!-- 工具栏 -->
            <div class="flex items-center space-x-2">
                <button type="button" @click="requestVideoCall" class="btn btn-outline">视频通话</button>

                <!-- 文件上传 -->
                <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
                <button type="button" @click="triggerFileInput" class="btn btn-outline">+上传文件</button>
                <div class="flex items-center">
                    <span v-if="selectedFile" class="ml-4">{{ selectedFile.name }}</span>
                </div>
            </div>

            <!-- 输入框 -->
            <div class="flex mb-1 space-x-1">
                <textarea v-model="newMessage" placeholder="输入消息..." rows="1"
                    class="flex-1 px-4 py-2 h-32 dark:bg-slate-900 dark:border-gray-200 border rounded-md"></textarea>
                <div class="flex justify-end items-end">
                    <button type="submit" class="btn btn-primary">发送</button>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
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

import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message';



const emit = defineEmits(['send-message']);


const authStore = useAuthStore();
const userStore = useUserStore();
const messageStore = useMessageStore();

const router = useRouter();
const id = computed(() => {
    const id = router.currentRoute.value.params.id as string
    return id ? id : '-1'
})
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

async function handleToSendMessage(newMessage: string, selectedFile) {
    const message = await prepareMessage(newMessage, selectedFile)
    emit('send-message', message);
    console.log('send message:', message);
    await messageStore.sendMessage(message);
};

async function prepareMessage(newMessage: string, selectedFile): Promise<Message> {
    let content = await prepareContent(newMessage, selectedFile)
    const to = await userStore.getUser(id.value)
    // console.log('currentUser', authStore.currentUser)
    return new Message(authStore.currentUser.id, to.id, content, null)
}

async function prepareContent(newMessage: string, selectedFile): Promise<Content> {
    let content: Content = null;
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
                // TODO: handle unsupported file type
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
    }

    return content;
}




import { videoCallService } from '@/services/video-call/videoCall';
async function requestVideoCall() {
    videoCallService.requestVideoCall(id.value);
}

</script>
  