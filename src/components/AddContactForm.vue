<template>
    <div class="mb-4">
      <input v-model="newContactName" class="w-full p-2 border rounded" placeholder="添加新联系人" />
      <button @click="addContact" class="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">添加</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useContactsStore } from '@/stores/contacts';
  
  export default {
    name: 'AddContactForm',
    setup() {
      const contactsStore = useContactsStore();
      const newContactName = ref('');
  
      const addContact = () => {
        if (newContactName.value.trim()) {
          contactsStore.addContact({ id: Date.now(), name: newContactName.value });
          newContactName.value = '';
        }
      };
  
      return {
        newContactName,
        addContact,
      };
    }
  };
  </script>
  