<template>
    <div class="flex flex-col bg-white dark:bg-slate-900 dark:text-gray-200 w-full">
        <!-- 页面头部 -->
        <div class="mt-8 mb-6 pl-10 pr-10">
            <div class="relative flex justify-center items-center">
                <h1 class="flex justify-center items-center text-2xl font-bold">联系人列表</h1>
                <router-link :to="{ name: 'Search' }" class="absolute flex justify-center items-center right-0">
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
            <!-- 联系人分组列表 -->
            <div v-else class="overflow-y-auto">
                <!-- 分组列表 -->
                <ul v-for="group in groups" class="collapse collapse-arrow bg-slate-900 transition-none">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">{{ group ? group : '未分组' }}</div>
                    <div class="collapse-content">
                        <!-- 分组中的联系人列表 -->
                        <ul>
                            <li v-for="contact in contacts.filter(contact => contact.group === group)" :key="contact.id" class="flex items-center">
                                <router-link :to="{ name: 'Profile', params: { id: contact.id } }" class="w-full">
                                    <UserCard :user-id="contact.id" :selected="contact.id === selectedUserId" />
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useContactStore } from '@/stores/contact';
import { useUserStore } from '@/stores/user'

import UserCard from '@/components/UserCard.vue';

import { Icon } from "@vicons/utils";
import { Search, Loader } from "@vicons/tabler";

import { Contact } from '@/models/Contact';




const route = useRoute()

const authStore = useAuthStore()
const contactStore = useContactStore()

const contacts: Ref<Contact[]> = ref([])
const groups: Ref<string[]> = ref([])

const loading = ref<boolean>(false)


watch(() => authStore.currentUser, loadContacts)
watch(contactStore.contacts, () => {
    contacts.value.length = 0
    contacts.value.push(...contactStore.contacts)
    groups.value.length = 0
    groups.value.push(...contactStore.groups)
})


loadContacts()


async function loadContacts() {
    loading.value = true

    await contactStore.fetchContacts()
    
    contacts.value.length = 0
    contacts.value.push(...contactStore.contacts)

    groups.value.length = 0
    groups.value.push(...contactStore.groups)

    console.log(contacts.value)

    loading.value = false
}

const selectedUserId = computed(() => {
    if (!route.params.id) {
        return '';
    }
    return route.params.id;
});

</script>
