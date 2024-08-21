<template>
    <div class="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 class="text-2xl font-bold text-center mb-6">联系人列表</h1>
        <AddContactForm />
        <ul class="overflow-y-auto">
            <li v-for="contact in contacts" :key="contact.id" class="mb-4 flex items-center justify-between">
                <router-link :to="{ name: 'ChatTo', params: { id: contact.id } }"
                    class="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition duration-300 ease-in-out">
                    <div
                        class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {{ contact.name[0] }}
                    </div>
                    <div>
                        <div class="text-lg font-semibold">{{ contact.name }}</div>
                        <div class="text-sm text-gray-500">点击开始聊天</div>
                    </div>
                </router-link>
                <button @click="removeContact(contact.id)"
                    class="p-2 bg-red-500 text-white rounded hover:bg-red-600">移除</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useContactsStore } from '@/stores/contacts';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

import AddContactForm from '@/components/AddContactForm.vue';


const contactsStore = useContactsStore();
const userStore = useUserStore();
const contacts = contactsStore.contacts;

const router = useRouter();


function removeContact(id) {
    contactsStore.removeContact(id);
};



</script>
