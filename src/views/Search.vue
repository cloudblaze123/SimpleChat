<template>
    <div class="flex flex-col justify-center  dark:text-gray-200">
        <!-- 设置页面的头部 -->
        <CommonHeader title="Search" />

        <!-- 搜索页面的主体 -->
        <div class="flex flex-col items-center w-full h-0 flex-1 p-4 bg-white text-gray-700 text-2xl dark:bg-slate-900 dark:text-gray-200">
            <!-- 搜索栏 -->
            <form @submit.prevent="doSearch" class="flex justify-center items-center w-full mb-6 space-x-2 dark:bg-slate-900 dark:text-gray-200">
                <input v-model="query" class="w-full h-full dark:bg-slate-900 dark:text-gray-200 dark:border-gray-200 border rounded" placeholder="请输入用户ID" />
                <input type="submit" value="搜索" class="p-2 pl-8 pr-8 bg-blue-500 text-white text-nowrap rounded hover:bg-blue-600">
            </form>
            
            <!-- 搜索结果 -->
            <div class="flex flex-col w-full h-0 flex-1 items-center bg-gray-100 dark:bg-slate-800">
                <div v-if="result.length === 0" class="flex justify-center">无结果</div>
                <ul v-else class="w-full h-full items-center overflow-y-auto p-4 space-y-2">
                    <li v-for="user in result" class="w-full">
                        <RouterLink :to="{ name: 'Profile', params: { id: user.id } }">
                            <UserSearchCard :user="user"/>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import CommonHeader from '@/components/CommonHeader.vue';

import UserSearchCard from '@/components/UserSearchCard.vue';


const query = ref('');
const result = ref([]);


import { searchUsers } from '@/api/user-web';
async function doSearch() {
    console.log('search', query.value);
    
    result.value.length = 0;
    const users = await searchUsers(query.value);
    result.value.push(...users);
}
</script>