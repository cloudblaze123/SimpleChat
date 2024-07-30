<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="p-4 bg-white shadow-md">
      <div class="mt-4 text-center">
        <button @click="goBack" class="px-4 py-2 bg-gray-500 text-white">返回联系人列表</button>
      </div>
      <h1 class="text-2xl font-bold mb-4">聊天室 - {{ contact.name }}</h1>
    </div>
    <UserSelector @user-changed="updateUser" />
    <MessageDisplay class="w-full" :messages="messages" />
    <MessageInput @send-message="handleSendMessage" />
  </div>
</template>

<script>
import UserSelector from './UserSelector.vue';
import MessageDisplay from './MessageDisplay.vue';
import MessageInput from './MessageInput.vue';
import { uploadFile } from '../utils/fileUpload';

import { useContactsStore } from '@/stores/contacts';

export default {
  components: {
    UserSelector,
    MessageDisplay,
    MessageInput
  },
  data() {
    return {
      contact: { id: null, name: '' },
      messages: [],
      user: ''
    };
  },
  created() {
    const contactsStore = useContactsStore();
    const contacts=contactsStore.contacts;
    
    const contact = contacts.find(c => c.id === parseInt(this.$route.params.id))
    if (!contact) {
      console.error('Invalid contact id:', this.$route.params.id);
      return
    }
    this.contact = contact;
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
    },
    goBack() {
      this.$router.push({ name: 'ContactList' })
    }
  }
};
</script>
