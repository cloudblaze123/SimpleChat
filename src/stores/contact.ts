import { defineStore } from 'pinia';

import { useAuthStore } from '@/stores/auth'

import { Contact } from '@/models/Contact';
import { getContactsOf, addContact, removeContact } from '@/api/contact-web';


export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as Contact[],
        groups: [] as string[],
        loading: false as boolean,
    }),


    actions: {
        async fetchContacts() {
            this.loading = true;

            const authStore = useAuthStore()
            const contacts: Contact[] = []
            const groups: string[] = []
            if (authStore.currentUser) {
                const data = await getContactsOf(authStore.currentUser.id)
                contacts.push(...data)
                for (const contact of data) {
                    if (!groups.includes(contact.group)) {
                        groups.push(contact.group)
                    }
                }
            }
            this.contacts = contacts;

            this.groups = groups;

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
        },

        hasContact(contactId: string) {
            return this.contacts.some(contact => contact.id === contactId);
        }
    }
});