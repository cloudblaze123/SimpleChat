import { defineStore } from 'pinia';

import { useAuthStore } from '@/stores/auth'


import { getContactsOf } from '@/api/contact-web'


export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as string[],
        loading: false as boolean,
    }),
    actions: {
        async fetchContacts() {
            this.loading = true;
            
            const authStore = useAuthStore()
            let contactIds: string[] = []
            if(authStore.currentUser){
                const data = await getContactsOf(authStore.currentUser.id)
                contactIds.push(...data)
            }
            this.contacts.length=0;
            this.contacts.push(...contactIds);
            
            this.loading = false;
        },
        addContact(contactId: string) {
            this.contacts.push(contactId);
            console.log("addContact", contactId);
        },
        removeContact(contactId: string) {
            const indexToRemove = this.contacts.findIndex(_contactId => _contactId === contactId);
            if (indexToRemove === -1) {
                return;
            }
            this.contacts.splice(indexToRemove, 1);
            console.log("removeContact", contactId);
        }
    }
});
