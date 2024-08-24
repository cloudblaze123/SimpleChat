<template>
    
    <div class="flex flex-wrap h-24 items-center justify-between
              bg-white p-4 overflow-y-scroll">
        <div class="flex flex-wrap items-center space-x-2 space-y-2">
            <!-- 显示当前登录用户的信息 -->
            <span class="text-lg font-semibold">当前用户: </span>
            <span v-if="userStore.currentUser" class="text-lg">{{ userStore.currentUser.email }}</span>
            
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
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import UserSwitcher from '@/components/UserSwitcher.vue';

const userStore = useUserStore();
const router = useRouter();


function logout() {
    userStore.logout(userStore.currentUser);
    // 假设登出后跳转到登录页面
    router.push({ name: 'Login' });
};

function goToLoginPage() {
    router.push({ name: 'Login' });
};

</script>