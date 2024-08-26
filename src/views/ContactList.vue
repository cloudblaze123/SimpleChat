<template>
    <div class="flex flex-col bg-white dark:bg-slate-900 dark:text-gray-200 w-full">
        <h1 class="text-2xl font-bold text-center mt-8 mb-6">联系人列表</h1>
        <AddContactForm class="px-8" />
        <ul class="overflow-y-auto">
            <li v-for="contact in contacts" :key="contact.id" class="flex items-center">
                <router-link :to="{ name: 'Profile', params: { id: contact.id } }"
                    class="w-full">
                    <UserCard 
                        :user-id="contact.id" :selected="contact.id === selectedUserId"/>
                </router-link>

            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useContactsStore } from '@/stores/contacts';

import AddContactForm from '@/components/AddContactForm.vue';
import UserCard from '@/components/UserCard.vue';


const route = useRoute();
const contactsStore = useContactsStore();
const contacts = contactsStore.contacts;

const selectedUserId = computed(() => {
    if(!route.params.id){
        return '';
    }
    return route.params.id;
});

</script>
