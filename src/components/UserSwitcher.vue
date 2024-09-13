<template>
    <div class="flex items-center ">
        <label for="user-switcher" class="block text-lg font-semibold text-nowrap mr-2">切换用户:</label>
        <select v-model="selectedUserId" @change="switchUser" id="user-switcher" class="w-full p-2 border rounded bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
            <option v-for="user in authStore.loggedInUsers" :key="user.id" :value="user.id">
                {{ user.email }}
            </option>
        </select>
    </div>
</template>
  
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

import { switchUser as toSwitchUser } from '@/controllers/auth';

const authStore = useAuthStore();
const selectedUserId:Ref<string> = ref(authStore.currentUser ? authStore.currentUser.id : '');

function switchUser(){
    toSwitchUser(selectedUserId.value);
};

</script>
  