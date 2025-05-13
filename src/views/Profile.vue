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
                    Profile页面
                </h1>
            </div>
        </div>

        <!-- Profile页面的主体 -->
        <div class="flex flex-col justify-between items-center h-full w-full p-4 rounded-lg overflow-y-auto">

            <div v-if="!user">
                未知用户
            </div>
            <!-- 用户信息 -->
            <div v-else class="flex flex-col">
                <!-- 头部信息 -->
                <div class="flex items-center space-x-2">
                    <!-- 用户头像 -->
                    <div
                        class="flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full overflow-hidden w-24 h-24">
                        {{ user.name[0] }}
                    </div>

                    <!-- 用户名称 -->
                    <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {{ user.name }}
                    </h2>
                </div>

                <div class="flex flex-col mt-4 space-y-2">
                    <!-- 基本信息 -->
                    <div class="flex items-center space-x-2">
                        <p v-if="user.gender" class="text-sm text-gray-600 dark:text-gray-300">
                            {{ user.gender }}
                        </p>

                        <p v-if="user.age" class="text-sm text-gray-600 dark:text-gray-300">
                            {{ `${user.age}岁` }}
                        </p>

                        <p v-if="user.birthday" class="text-sm text-gray-600 dark:text-gray-300">
                            {{ user.birthday }}
                        </p>

                        <p v-if="user.location" class="text-sm text-gray-600 dark:text-gray-300">
                            {{ user.location }}
                        </p>

                    </div>

                    <p v-if="user.email" class="text-sm text-gray-600 dark:text-gray-300">
                        {{ user.email }}
                    </p>

                    <p v-if="user.signature" class="max-w-96 text-sm text-gray-600 dark:text-gray-300">
                        {{ user.signature }}
                    </p>

                </div>
            </div>

            <button class="p-4 bg-blue-700 rounded-md text-white" @click="gotoChat" v-if="id">
                发消息
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";

import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user'


const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();


const id = computed(() => route.params.id as string);
const user = ref(null)
updateUser()
watch(id, updateUser)
async function updateUser() {
    if (!id.value) {
        user.value = authStore.currentUser
        return
    }
    user.value = await userStore.getUser(id.value)
}


function goBack() {
    router.push({ name: 'Home' });
}

function gotoChat() {
    router.push({ name: 'ChatTo', params: { id: id.value } });
}
</script>