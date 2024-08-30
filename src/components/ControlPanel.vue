<template>
    
    <div class="flex flex-wrap h-24 items-center justify-between
              p-4 overflow-y-auto bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
        <div class="flex flex-wrap items-center space-x-2 space-y-2">
            <!-- 显示当前登录用户的信息 -->
            <span class="text-lg font-semibold">当前用户: </span>
            <span v-if="authStore.currentUser" class="text-lg">{{ authStore.currentUser.email }}</span>
            
            <!-- 显示登出和登陆按钮 -->
            <div class="flex items-center space-x-2">
                <button @click="logout" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">登出</button>
                <button @click="goToLoginPage" class="p-2 bg-green-500 text-white rounded hover:bg-green-600">登录新账号</button>
            </div>
        </div>

        <!-- 显示切换用户组件 -->
        <UserSwitcher />
    </div>
    
</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import UserSwitcher from '@/components/UserSwitcher.vue';


const authStore = useAuthStore();
const router = useRouter();


function logout() {
    authStore.logout(authStore.currentUser);
    // 假设登出后跳转到登录页面
    router.push({ name: 'Login' });
};

function goToLoginPage() {
    router.push({ name: 'Login' });
};

</script>