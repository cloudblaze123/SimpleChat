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
                    UpdateProfile页面
                </h1>
            </div>
        </div>

        <!-- Profile页面的主体 -->
        <div class="flex flex-col justify-between items-center h-0 flex-1 w-full p-4 rounded-lg overflow-y-auto">

            <div v-if="!user">
                未知用户
            </div>
            <div v-else class="flex flex-col justify-between items-center h-full w-96">
                <!-- 用户信息 -->
                <form class="flex flex-col w-full h-0 flex-1 overflow-auto">
                    <!-- 头部信息 -->
                    <div class="flex justify-center items-center">
                        <!-- 用户头像 -->
                        <div
                            class="flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full overflow-hidden w-24 h-24">
                            {{ user.name[0] }}
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4 ">
                        <!-- 用户名称 -->
                        <label class="text-lg font-bold text-gray-900 dark:text-gray-100">用户名</label>
                        <input type="text" v-model="user.name"
                            class="text-lg font-bold text-gray-900 dark:text-gray-100 bg-transparent" />


                        <!-- 用户性别 -->
                        <label for="gender" class="text-lg font-bold text-gray-900 dark:text-gray-100">性别</label>
                        <input type="text" v-model="user.gender"
                            class="text-sm text-gray-600 dark:text-gray-300 bg-transparent" />


                        <!-- 用户年龄 -->
                        <label for="age" class="text-lg font-bold text-gray-900 dark:text-gray-100">年龄</label>
                        <input type="text" v-model="user.age"
                            class="text-sm text-gray-600 dark:text-gray-300 bg-transparent" />


                        <!-- 用户生日 -->
                        <label for="birthday" class="text-lg font-bold text-gray-900 dark:text-gray-100">生日</label>
                        <input type="text" v-model="user.birthday"
                            class="text-sm text-gray-600 dark:text-gray-300 bg-transparent" />


                        <!-- 用户地区 -->
                        <label for="location" class="text-lg font-bold text-gray-900 dark:text-gray-100">地区</label>
                        <input type="text" v-model="user.location"
                            class="text-sm text-gray-600 dark:text-gray-300 bg-transparent" />


                        <!-- 用户邮箱 -->
                        <label for="email" class="text-lg font-bold text-gray-900 dark:text-gray-100">邮箱</label>
                        <input type="text" v-model="user.email"
                            class="text-sm text-gray-600 dark:text-gray-300 bg-transparent" />


                        <!-- 用户签名 -->
                        <label for="signature" class="text-lg font-bold text-gray-900 dark:text-gray-100">签名</label>
                        <input type="text" v-model="user.signature"
                            class="max-w-96 text-sm text-gray-600 dark:text-gray-300 bg-transparent" />
                    </div>
                </form>

                <div class="flex flex-col space-y-2">
                    <button class="p-4 bg-blue-700 rounded-md text-white" @click="updateProfile">
                        确认修改
                    </button>
                </div>
            </div>
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

import { User } from '@/models/User';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();


const id = computed(() => route.params.id as string);
const user = ref(null)
getProfile()
watch(id, getProfile)
async function getProfile() {
    let targetUser: User | null = null
    if (!id.value) {
        targetUser = authStore.currentUser
    } else {
        targetUser = await userStore.getUser(id.value)
    }
    user.value = new User(
        targetUser.id,
        targetUser.name,
        targetUser.email,
        targetUser.signature,
        targetUser.gender,
        targetUser.age,
        targetUser.birthday,
        targetUser.location,
    )
}


function goBack() {
    router.go(-1);
}


async function updateProfile() {
    const newProfile = {
        name: user.value.name,
        email: user.value.email,
        signature: user.value.signature,
        gender: user.value.gender,
        age: user.value.age,
        birthday: user.value.birthday,
        location: user.value.location,
    }

    userStore.updateUserProfile(user.value.id, newProfile)
    router.go(-1);
}

</script>