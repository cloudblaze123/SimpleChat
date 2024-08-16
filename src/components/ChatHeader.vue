<template>
    <div class="p-4 bg-white shadow-md">
        <div class="text-center flex items-center">
            <button @click="goBack" class="px-4 py-2 bg-gray-500 text-white">返回</button>
            <h1 class="text-2xl font-bold m-auto text-center">聊天室 - {{ contactName }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUser } from '@/api/user';
import { onMounted } from 'vue';

const router = useRouter();

const contactName = ref('')
onMounted(() => {
    if (!router.currentRoute.value.params.id) {
        contactName.value = '未知用户';
        return
    }
    const id = router.currentRoute.value.params.id as string;
    // console.log(id);
    // console.log(getUser(id));
    contactName.value = getUser(id).name;
});

function goBack(){
    router.push({ name: 'Home' });
};
</script>