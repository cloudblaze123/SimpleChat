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
            <h1 class="text-2xl font-bold m-auto text-center">{{ contactName }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";

import { useUserStore } from '@/stores/user'



const props = defineProps({
    contactId: {
        type: String,
        required: true
    }
});


const router = useRouter();
const userStore = useUserStore();

const contactName = ref('unknown')
watch(()=> props.contactId, (newVal, oldVal) => {
    if(newVal!== oldVal){
        updateContactName()
    }
})
function updateContactName(){
    userStore.getUser(props.contactId)
        .then(res=>{
            if(res){
                contactName.value = res.name
            }
        })
}
updateContactName()


function goBack(){
    router.push({ name: 'Home' });
};
</script>