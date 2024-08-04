<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="p-4 bg-white shadow-md">
      <div class="mt-4 text-center">
        <button @click="goBack" class="px-4 py-2 bg-gray-500 text-white">返回联系人列表</button>
      </div>
      <h1 class="text-2xl font-bold mb-4">聊天室 - {{ contact.name }}</h1>
      <UserSwitcher />
    </div>
    <MessageDisplay class="w-full" :messages="messages" />
    <MessageInput @send-message="handleSendMessage" />
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import UserSwitcher from '@/components/UserSwitcher.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import MessageInput from '@/components/MessageInput.vue';
import { uploadFile } from '../utils/fileUpload';

import { Message, Content, TextContent, ImageContent, VideoContent } from '@/models/Message';

import { getMessages } from '@/api/message';

import { getUser } from '@/api/user';

export default {
  components: {
    UserSwitcher,
    MessageDisplay,
    MessageInput
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const contact = ref({ id: null, name: '' });
    const messages: Ref<Message[]> = ref([]);

    onMounted(() => {
      contact.value.id=(router.currentRoute.value.params.id);
      contact.value.name=getUser(contact.value.id).name;

      messages.value = getMessages();
    });

    const handleSendMessage = async (newMessage, selectedFile) => {
      let content:Content;
      if (newMessage.trim() && userStore.currentUser) {
        content = new TextContent(newMessage);
      }
      if (selectedFile) {
        try {
          const fileInfo = await uploadFile(selectedFile, userStore.currentUser.email);
          if(fileInfo.type==='image'){
            content = new ImageContent(fileInfo.url);
          }else if(fileInfo.type==='video'){
            content = new VideoContent(fileInfo.url);
          }
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
      const message: Message = new Message(userStore.currentUser.email, '', content, new Date());
      messages.value.push(message);
    };

    const goBack = () => {
      router.push({ name: 'ContactList' });
    };

    return {
      contact,
      messages,
      handleSendMessage,
      goBack,
    };
  }
};
</script>
