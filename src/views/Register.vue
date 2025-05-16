<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-800 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                    Register
                </h1>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="register">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="name" class="">昵称</label>
                        <input id="name" v-model="name" name="name" type="text" autocomplete="name" required
                            class="appearance-none relative w-full px-3 py-2 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="昵称">
                    </div>
                    <div>
                        <label for="email" class="">邮箱</label>
                        <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none relative w-full px-3 py-2 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="邮箱">
                    </div>
                    <div>
                        <label for="password" class="">密码</label>
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none relative w-full px-3 py-2 dark:bg-slate-700 border border-gray-300 dark:border-gray-600  placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="密码">
                    </div>
                </div>

                <div>
                    <input type="submit" value="注册" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                </div>
            </form>
            <div v-if="error" class="text-center text-red-500">
                注册失败，请检查用户名或邮箱是否已被注册
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { registerUser } from '@/api/user-web';
import { User } from '@/models/User';


const name = ref('');
const email= ref('');
const password= ref('');

const error = ref(false);

const router= useRouter();


async function register() {
    console.log('注册');

    const userData = new User()
    userData.name = name.value;
    userData.email = email.value;

    const ok = await registerUser(userData);

    if (ok) {
        console.log('注册成功');
        router.push({ name: 'Login' });
    } else {
        console.log('注册失败');
        error.value = true;
    }
}
</script>
