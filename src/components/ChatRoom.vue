<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="p-4 bg-white shadow-md">
      <h1 class="text-2xl font-bold">聊天室</h1>
    </div>
    <UserSelector @user-changed="updateUser" />
    <MessageDisplay :messages="messages" />
    <MessageInput @send-message="handleSendMessage" />
  </div>
</template>

<script>
import UserSelector from './UserSelector.vue';
import MessageDisplay from './MessageDisplay.vue';
import MessageInput from './MessageInput.vue';
import { uploadFile } from '../utils/fileUpload';

export default {
  components: {
    UserSelector,
    MessageDisplay,
    MessageInput
  },
  data() {
    return {
      messages: [],
      user: ''
    };
  },
  methods: {
    updateUser(newUser) {
      this.user = newUser;
    },
    async handleSendMessage(newMessage, selectedFile) {
      if (newMessage.trim()) {
        this.messages.push({ user: this.user, text: newMessage, type: 'text' });
      }
      if (selectedFile) {
        try {
          const message = await uploadFile(selectedFile, this.user);
          this.messages.push(message);
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
    }
  }
};
</script>
