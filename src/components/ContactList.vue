<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">联系人列表</h1>
      <ul>
        <li v-for="contact in contacts" :key="contact.id" class="mb-4">
          <router-link :to="{ name: 'ChatRoomTo', params: { id: contact.id }}" class="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition duration-300 ease-in-out">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ contact.name[0] }}
            </div>
            <div>
              <div class="text-lg font-semibold">{{ contact.name }}</div>
              <div class="text-sm text-gray-500">点击开始聊天</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useContactsStore } from '@/stores/contacts';

export default {
  setup() {
    const contactsStore = useContactsStore();
    return {
      contacts: contactsStore.contacts
    };
  }
};
</script>
