<template>
    <div class="flex flex-col justify-center  dark:text-gray-200">
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
                    这是 搜索 页面
                </h1>
            </div>
        </div>

        <!-- 搜索页面的主体 -->
        <div class="flex flex-col items-center w-full h-0 flex-1 p-4 bg-white text-gray-700 text-2xl dark:bg-slate-900 dark:text-gray-200">
            <!-- 搜索栏 -->
            <div class="flex justify-center items-center w-full mb-6 space-x-2 dark:bg-slate-900 dark:text-gray-200">
                <input v-model="query" class="w-full h-full dark:bg-slate-900 dark:text-gray-200 dark:border-gray-200 border rounded" placeholder="请输入用户ID" />
                <button @click="doSearch" class="p-2 pl-8 pr-8 bg-blue-500 text-white text-nowrap rounded hover:bg-blue-600">搜索</button>
            </div>
            
            <!-- 搜索结果 -->
            <div class="flex flex-col w-full h-0 flex-1 items-center bg-gray-100 dark:bg-slate-800">
                <div v-if="result.length === 0" class="flex justify-center">搜索结果</div>
                <ul v-else class="w-full h-full items-center overflow-y-auto">
                    <li v-for="item in result" class="w-full h-12 bg-white dark:bg-slate-900 rounded-md flex justify-center items-center">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";


const route = useRoute();
const router = useRouter();
const query = ref('');

const result = ref([]);
result.value.push(...['用户123', '用户456', '用户789', '用户101112', '用户131415', '用户161718', '用户192021']);
watch(route, () => {
    result.value.push(...['用户123', '用户456', '用户789', '用户101112']);
});

function goBack() {
    router.push({ name: 'Home' });
}

function doSearch() {
    console.log('search', query.value);
    router.push({ name: 'Search',  query: { id: query.value }});
}
</script>