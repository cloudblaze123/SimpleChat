<template>
    <div class="flex flex-col bg-white shadow-lg rounded-lg w-full">
        <h1 class="text-2xl font-bold text-center mt-8 mb-6">联系人列表</h1>
        <AddContactForm class="px-8" />
        <ul class="overflow-y-auto">
            <li v-for="contact in contacts" :key="contact.id" class="flex items-center">
                <router-link :to="{ name: 'ChatTo', params: { id: contact.id } }"
                    class="flex items-center w-full hover:bg-gray-200 px-8 py-4  transition duration-300 ease-in-out"
                    :class="{ 'bg-gray-200': contact.id === selectedUserId }">
                    <div class="flex space-x-4 items-center">
                        <div
                            class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {{ contact.name[0] }}
                        </div>
                        <div>
                            <div class="text-2xl font-semibold">{{ contact.name }}</div>
                            <div class="text-sm text-gray-500">点击开始聊天</div>
                        </div>
                    </div>

                    <!-- 弹簧 -->
                    <div class="grow"></div>

                    <button @click="removeContact(contact.id)"
                        class="p-2 bg-red-500 text-lg font-bold text-white rounded hover:bg-red-600">移除</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useContactsStore } from '@/stores/contacts';
import { useUserStore } from '@/stores/user';

import AddContactForm from '@/components/AddContactForm.vue';


const route = useRoute();
const contactsStore = useContactsStore();
const userStore = useUserStore();
const contacts = contactsStore.contacts;

const selectedUserId = computed(() => {
    if(!route.params.id){
        return '';
    }
    return route.params.id;
});

function removeContact(id) {
    contactsStore.removeContact(id);
};



</script>
