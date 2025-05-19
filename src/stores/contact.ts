import { defineStore } from 'pinia';

import { useAuthStore } from '@/stores/auth'


import { getContactsOf, addContact, removeContact } from '@/api/contact-web';


export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as string[],
        loading: false as boolean,
    }),


    actions: {
        async fetchContacts() {
            this.loading = true;

            const authStore = useAuthStore()
            const contactIds: string[] = []
            if (authStore.currentUser) {
                const data = await getContactsOf(authStore.currentUser.id)
                contactIds.push(...data)
            }
            this.contacts.length = 0;
            this.contacts.push(...contactIds);

            this.loading = false;
        },


        async addContact(contactId: string) {
            const authStore = useAuthStore()
            if (authStore.currentUser) {
                try {
                    await addContact(authStore.currentUser.id, contactId)
                    console.log("contact added:", contactId);
                } catch (error) {
                    console.error(error);
                }
            }
        },


        async removeContact(contactId: string) {
            const authStore = useAuthStore()
            if (authStore.currentUser) {
                try {
                    await removeContact(authStore.currentUser.id, contactId)
                    console.log("contact removed:", contactId);
                } catch (error) {
                    console.error(error);
                }
            }
        }

    }
});