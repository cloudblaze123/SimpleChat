import { defineStore } from 'pinia';

import { getUsers } from '@/api/user';
import { User } from '@/models/User';



export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: getUsers() as User[]
    }),
    actions: {
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
