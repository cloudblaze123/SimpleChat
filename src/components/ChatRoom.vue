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

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useContactsStore } from '@/stores/contacts';
import { useUserStore } from '@/stores/user';
import UserSwitcher from '@/components/UserSwitcher.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import MessageInput from '@/components/MessageInput.vue';
import { uploadFile } from '../utils/fileUpload';

export default {
  components: {
    UserSwitcher,
    MessageDisplay,
    MessageInput
  },
  setup() {
    const router = useRouter();
    const contactsStore = useContactsStore();
    const userStore = useUserStore();
    const contact = ref({ id: null, name: '' });
    const messages = ref([]);

    onMounted(() => {
      const contacts = contactsStore.contacts;
      const foundContact = contacts.find(c => c.id === parseInt(router.currentRoute.value.params.id));
      if (!foundContact) {
        console.error('Invalid contact id:', router.currentRoute.value.params.id);
        return;
      }
      contact.value = foundContact;
    });

    const handleSendMessage = async (newMessage, selectedFile) => {
      if (newMessage.trim() && userStore.currentUser) {
        messages.value.push({ user: userStore.currentUser.email, text: newMessage, type: 'text' });
      }
      if (selectedFile) {
        try {
          const message = await uploadFile(selectedFile, userStore.currentUser.email);
          messages.value.push(message);
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
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
