<template>
    <div class="flex items-center w-full space-x-4 px-8 py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition duration-300 ease-in-out">

        <div v-if="!user">未知用户</div>
        <div v-else class="flex items-center w-full space-x-2">
            <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {{ user.name[0] }}
            </div>
            <div class="flex flex-col w-0 flex-1">
                <div class="text-2xl font-semibold">{{ user.name }}</div>
                <div class="text-nowrap overflow-hidden text-sm text-ellipsis text-gray-500 ">{{ user.signature }}</div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { User } from '@/models/User';


const props = defineProps({
    user: {
        type: User
    }
});


const user = ref<User>(null)


onMounted(() => {
    user.value = props.user
})
</script>