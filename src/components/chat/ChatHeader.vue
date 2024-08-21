<template>
    <div class="p-4 bg-white">
        <div class="relative text-center flex items-center">
            <!-- 返回按钮 -->
            <button 
                class="absolute top-0 left-0 text-gray-400 hover:text-gray-600 transition-all duration-400 ease-in-out lg:hidden"
                @click="goBack">
                <Icon size="32">
                    <ChevronLeft />
                </Icon>
            </button>
            <h1 class="text-2xl font-bold m-auto text-center">{{ contactName }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";

import { getUser } from '@/api/user';


const props = defineProps({
    contactId: {
        type: String,
        required: true
    }
});


const router = useRouter();

const contactName = computed(() => {
    return getUser(props.contactId).name;
});


function goBack(){
    router.push({ name: 'Home' });
};
</script>