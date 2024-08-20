<template>
    <div class="flex flex-col justify-center bg-gray-200 p-4">
        <button @click="goBack" class="px-4 py-2 bg-gray-500 text-white">返回</button>
        <div class="flex justify-center items-center h-full w-full bg-white rounded-lg ">
            <h1 class="text-2xl text-center">
                这是设置页面
            </h1>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();


function goBack() {
    router.push({ name: 'Home' });
}
</script>