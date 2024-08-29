import { defineStore } from 'pinia';

import { getUsers as getUsersWithDelay } from '@/api/user-with-delay';
import { getUsers as getUsersWeb } from '@/api/user-web';
import { User } from '@/models/User';

const getUsers = import.meta.env.VITE_USE_MOCK? getUsersWithDelay : getUsersWeb;
console.log("useMock:", import.meta.env.VITE_USE_MOCK);

export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as User[],
        loading: false as boolean,
    }),
    actions: {
        async fetchContacts() {
            this.loading = true;
            const contacts = await getUsers();
            this.contacts.length=0;
            this.contacts.push(...contacts);
            this.loading = false;
        },
        addContact(contact: User) {
            this.contacts.push(contact);
            console.log("addContact", contact);
        },
        removeContact(contactId: string) {
            const indexToRemove = this.contacts.findIndex(contact => contact.id === contactId);
            if (indexToRemove === -1) {
                return;
            }
            this.contacts.splice(indexToRemove, 1);
            console.log("removeContact", contactId);
        }
    }
});
