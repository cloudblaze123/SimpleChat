<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-800 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                    登录
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">邮箱地址</label>
                        <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="邮箱地址">
                    </div>
                    <div>
                        <label for="password" class="sr-only">密码</label>
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 dark:bg-slate-700 border border-gray-300 dark:border-gray-600  placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="密码">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                            记住我
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                            忘记密码?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        登录
                    </button>
                </div>

                <div class="mt-4 text-center">
                    <button @click="skipLogin" class="text-sm text-indigo-600 hover:text-indigo-500">
                        跳过登录
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';


const email= ref('');
const password= ref('');
const userStore= useUserStore();
const router= useRouter();


async function login() {
    // 这里可以添加登录逻辑
    // 假设登录成功，保存用户信息并跳转到联系人页面
    
    console.log('登录中', email.value, password.value);
    const id = await userStore.loginWithEmail(email.value, password.value);
    if (id === '') {
        console.log('登录失败');
        return;
    }

    router.push({ name: 'Home' });
}

function skipLogin() {
    // 直接跳转到首页
    router.push({ name: 'Home' });
}
</script>
