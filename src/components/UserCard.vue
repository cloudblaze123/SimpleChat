<template>
    <div class="flex items-center w-full space-x-4 px-8 py-4 hover:bg-gray-200 dark:hover:bg-slate-800 transition duration-300 ease-in-out"
        :class="{ 'bg-gray-200 dark:bg-slate-800': selected}">

        <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {{ user.name[0] }}
        </div>
        <div class="flex flex-col w-0 flex-1">
            <div class="text-2xl font-semibold">{{ user.name }}</div>
            <div class="text-nowrap overflow-hidden text-sm text-ellipsis text-gray-500 ">{{ user.signature }}</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

const props = defineProps({
    userId:{
        type: String,
        required: true
    },
    selected:{
        type: Boolean,
        required: false
    },
});

const user = ref({
    name: "unknown",
    signature: "unknown"
})

const selected = computed(() => {
    if(props.selected){
        return props.selected;
    }
    return false;
});

userStore.getUser(props.userId)
    .then((userData) => {
        if(userData){
            user.value = userData
        }
    })
</script>