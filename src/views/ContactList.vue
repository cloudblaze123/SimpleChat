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
        <!-- 页面内容 -->
        <div class="flex flex-col w-full h-0 flex-1">
            <div v-if="loading" class="flex justify-center items-center w-full h-full">
                <Icon size="36" class="animate-spin">
                    <Loader />
                </Icon>
            </div>
            <ul v-else class="overflow-y-auto">
                <li v-for="contact in contacts" :key="contact.id" class="flex items-center">
                    <router-link :to="{ name: 'Profile', params: { id: contact.id } }"
                        class="w-full">
                        <UserCard 
                            :user-id="contact.id" :selected="contact.id === selectedUserId"/>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useContactsStore } from '@/stores/contacts';
import { useUserStore } from '@/stores/user'

import UserCard from '@/components/UserCard.vue';

import { Icon } from "@vicons/utils";
import { Search, Loader } from "@vicons/tabler";

import { User } from '@/models/User'



const route = useRoute()

const authStore = useAuthStore()
const contactsStore = useContactsStore()

const userStore = useUserStore()

const contacts:Ref<User[]> = ref([])

const loading:Ref<boolean> = ref(true)


watch(() => authStore.currentUser, loadContacts)


loadContacts()


async function loadContacts() {
    loading.value = true

    await contactsStore.fetchContacts()
    const contactIds = contactsStore.contacts

    contacts.value.length = 0
    for(const id of contactIds){
        contacts.value.push(await userStore.getUser(id))
    }

    loading.value = false
}

const selectedUserId = computed(() => {
    if(!route.params.id){
        return '';
    }
    return route.params.id;
});

</script>
