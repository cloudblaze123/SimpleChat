<template>
    <CommonHeader :title="contactName" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { useUserStore } from '@/stores/user'

import CommonHeader from '@/components/CommonHeader.vue';


const props = defineProps({
    contactId: {
        type: String,
        required: true
    }
});


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


</script>