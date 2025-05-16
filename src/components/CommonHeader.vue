<template>
    <div class="p-4 bg-white dark:bg-slate-900 dark:text-gray-200">
        <div class="relative text-center flex items-center">
            <!-- 返回按钮 -->
            <button 
                class="absolute top-0 left-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-400 ease-in-out lg:hidden"
                @click="goBack">
                <Icon size="32">
                    <ChevronLeft />
                </Icon>
            </button>
            <h1 class="text-2xl font-bold m-auto text-center">
                {{ props.title }}
            </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";


const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});


const router = useRouter();


function goBack(){
    router.go(-1);
};
</script>