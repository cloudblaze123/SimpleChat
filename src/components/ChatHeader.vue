<template>
    <div class="p-4 bg-white shadow-md">
        <div class="text-center flex items-center">
            <button @click="goBack" class="px-4 py-2 bg-gray-500 text-white">返回</button>
            <h1 class="text-2xl font-bold m-auto text-center">聊天室 - {{ contactName }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
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