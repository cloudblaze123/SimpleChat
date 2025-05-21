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
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();
const selectedUserId = ref(authStore.currentUser.id);
watch(() => authStore.currentUser, () => {
    if (authStore.currentUser) {
        selectedUserId.value = authStore.currentUser.id;
    }
});


function switchUser(){
    authStore.switchUser(selectedUserId.value);
};

</script>
  