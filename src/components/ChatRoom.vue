<template>
    <div class="flex flex-col h-screen bg-gray-100">
        <ChatRoomHeader />
        <UserSwitcher />
        <MessageDisplay class="w-full" :messages="messages" />
        <MessageInput @send-message="handleSendMessage" />
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import ChatRoomHeader from '@/components/ChatRoomHeader.vue';
import UserSwitcher from '@/components/UserSwitcher.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import MessageInput from '@/components/MessageInput.vue';
import { uploadFile } from '../utils/fileUpload';

import { Message, Content, TextContent, ImageContent, VideoContent } from '@/models/Message';

import { getMessages } from '@/api/message';

import { getUser } from '@/api/user';


const router = useRouter();
const userStore = useUserStore();
const messages: Ref<Message[]> = ref([]);

onMounted(() => {
    messages.value = getMessages();
});

async function handleSendMessage(newMessage, selectedFile){
    let content: Content;
    if (newMessage.trim() && userStore.currentUser) {
        content = new TextContent(newMessage);
    }
    if (selectedFile) {
        try {
            const fileInfo = await uploadFile(selectedFile, userStore.currentUser.email);
            if (fileInfo.type === 'image') {
                content = new ImageContent(fileInfo.url);
            } else if (fileInfo.type === 'video') {
                content = new VideoContent(fileInfo.url);
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
    }
    const message: Message = new Message(userStore.currentUser, userStore.currentUser, content, new Date());
    messages.value.push(message);
};


</script>
