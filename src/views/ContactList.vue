<template>
    <div class="flex flex-col bg-white dark:bg-slate-900 dark:text-gray-200 w-full">
        <!-- 页面头部 -->
        <div class="mt-8 mb-6 pl-10 pr-10">
            <div class="relative flex justify-center items-center">
                <h1 class="flex justify-center items-center text-2xl font-bold">联系人列表</h1>
                <router-link :to="{ name: 'Search' }"
                    class="absolute flex justify-center items-center right-0">
                    <Icon size="28">
                        <Search />
                    </Icon>
                </router-link>
            </div>
        </div>
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

import UserCard from '@/components/UserCard.vue';

import { Icon } from "@vicons/utils";
import { Search } from "@vicons/tabler";

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
