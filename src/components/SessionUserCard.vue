<template>
    <router-link :to="{ name: 'ChatTo', params: { id: user.id } }"
        class="flex items-center w-full hover:bg-gray-200 dark:hover:bg-slate-800 px-8 py-4  transition duration-300 ease-in-out"
        :class="{ 'bg-gray-200 dark:bg-slate-800': selected }">
        <div class="flex space-x-4 items-center">
            <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {{ user.name[0] }}
            </div>
            <div>
                <div class="text-2xl font-semibold">{{ user.name }}</div>
                <div class="text-sm text-gray-500">点击开始聊天</div>
            </div>
        </div>
    </router-link>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';

import { useUserStore } from '@/stores/user'

const props = defineProps({
    sessionId: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        required: false
    },
});


const userStore = useUserStore();

const user = ref({
    name: "unknown",
    id: "-1"
})

const selected = computed(() => {
    if (props.selected) {
        return props.selected;
    }
    return false;
});


userStore.getUser(props.sessionId)
    .then(res => {
        if (res) {
            user.value = res;
        }
    })

</script>