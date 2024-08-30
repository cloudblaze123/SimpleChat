<template>
    <div class="flex flex-col justify-center bg-gray-100 dark:bg-slate-900 dark:text-gray-200">
        <!-- 设置页面的头部 -->
        <div class="flex justify-between items-center p-4 bg-white dark:bg-slate-900">
            <div class="relative w-full flex justify-center items-center">
                <!-- 返回按钮 -->
                <button 
                    class="absolute left-0 top-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-400 ease-in-out lg:hidden"
                    @click="goBack">
                    <Icon size="32">
                        <ChevronLeft />
                    </Icon>
                </button>
                <h1 class="text-2xl text-center">
                    这是 {{ user ? user.name:'未知用户' }} 的Profile页面
                </h1>
            </div>
        </div>

        <!-- Profile页面的主体 -->
        <div class="flex flex-col items-center h-full w-full rounded-lg overflow-y-auto">
            <div class="flex flex-col items-center p-4">
                <!-- 用户头像 -->
                <div class="flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full overflow-hidden w-32 h-32">
                    {{ user ? user.name[0] : '' }}
                </div>
                <!-- 用户信息 -->
                <div class="flex flex-col items-center mt-4 space-y-2">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ user ? user.name : '未知用户' }}</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? user.email : '未知邮箱' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? (user.signature ? user.signature : '未填写签名') : '未知签名' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? (user.gender ? user.gender : '未填写性别') : '未知性别' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? (user.age ? user.age : '未填写年龄') : '未知年龄' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? (user.birthday ? user.birthday : '未填写生日') : '未知生日' }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ user ? (user.location ? user.location : '未填写地区') : '未知地区' }}</p>
                    
                </div>
            </div>
            <button class="p-4 bg-blue-700 rounded-md text-white"
                @click="gotoChat"
                v-if="id">
                发消息
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";

import { User } from "@/models/User";
import { useAuthStore } from '@/stores/auth';
import { getUser } from "@/api/user";


const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();


const id = computed(() => route.params.id);
const user = computed(():User => {
    if(id.value){
        return getUser(id.value as string);
    }else{
        return authStore.currentUser;
    }
})


function goBack() {
    router.push({ name: 'Home' });
}

function gotoChat(){
    router.push({ name: 'ChatTo', params: { id: id.value } });
}
</script>