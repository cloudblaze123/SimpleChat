<template>
    <div class="flex items-center ">
        <label for="user-switcher" class="block text-lg font-semibold text-nowrap mr-2">切换用户:</label>
        <select v-model="selectedUser" @change="switchUser" id="user-switcher" class="w-full p-2 border rounded bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
            <option v-for="user in userStore.loggedInUsers" :key="user.id" :value="user.id">
                {{ user.email }}
            </option>
        </select>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const selectedUser = ref(userStore.currentUser ? userStore.currentUser.id : null);

function switchUser(){
    userStore.switchUser(selectedUser.value);
};

</script>
  