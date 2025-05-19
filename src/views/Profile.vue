<template>
    <div class="flex flex-col justify-center bg-gray-100 dark:bg-slate-900 dark:text-gray-200">
        <!-- 设置页面的头部 -->
        <CommonHeader title="Profile" />

        <!-- Profile页面的主体 -->
        <div class="flex flex-col justify-between items-center h-full w-full p-4 rounded-lg overflow-y-auto">

            <div v-if="!user">
                未知用户
            </div>

            <div v-else class="flex flex-col justify-between items-center h-full w-96">
                <!-- 用户信息 -->
                <div class="flex flex-col w-full">
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
    
                        <p v-if="user.signature" class="text-sm text-gray-600 dark:text-gray-300">
                            {{ user.signature }}
                        </p>
    
                    </div>
                </div>
    
                <!-- 底部操作按钮 -->
                <div class="flex flex-col space-y-2">
                    <button v-if="user.id === authStore.currentUser?.id" class="p-4 bg-blue-700 rounded-md text-white" @click="updateProfile">
                        修改资料
                    </button>
                    <div v-if="isContact" class="flex flex-col items-center space-y-2">
                        <button class="p-4 bg-blue-700 rounded-md text-white" @click="gotoChat">
                            发消息
                        </button>
                        <button class="p-4 bg-blue-700 rounded-md text-white" @click="sendRemoveContact">
                            删除好友
                        </button>
                    </div>
                    <button v-else class="p-4 bg-blue-700 rounded-md text-white" @click="sendAddContact">
                        添加好友
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CommonHeader from '@/components/CommonHeader.vue';

import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user'
import { User } from '@/models/User';

import { useContactStore } from '@/stores/contact';


const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const contactStore = useContactStore();




const id = computed(() => route.params.id as string);
const user = ref<User | null>(null)
updateUser()
watch(id, updateUser)
async function updateUser() {
    if (!id.value) {
        user.value = authStore.currentUser
        return
    }
    user.value = await userStore.getUser(id.value)
}


const isContact = computed(() => {
    if (!authStore.currentUser) {
        return false
    }
    return contactStore.hasContact(id.value)
})



function updateProfile() {
    router.push({ name: 'UpdateProfile', params: { id: id.value } });
}


function gotoChat() {
    router.push({ name: 'ChatTo', params: { id: id.value } });
}




function sendRemoveContact() {
    console.log('removeContact', id.value);
    contactStore.removeContact(id.value)
}


function sendAddContact() {
    console.log('sendAddContact', id.value);
    contactStore.addContact(id.value)
}
</script>