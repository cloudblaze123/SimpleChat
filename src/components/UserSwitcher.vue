<template>
    <div class="mb-4">
      <label for="user-switcher" class="block text-lg font-semibold mb-2">切换用户:</label>
      <select v-model="selectedUser" @change="switchUser" id="user-switcher" class="w-full p-2 border rounded">
        <option v-for="user in userStore.loggedInUsers" :key="user.id" :value="user.id">
          {{ user.email }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const selectedUser = ref(userStore.currentUser ? userStore.currentUser.id : null);
  
      const switchUser = () => {
        userStore.switchUser(selectedUser.value);
      };
  
      return {
        userStore,
        selectedUser,
        switchUser,
      };
    },
  };
  </script>
  