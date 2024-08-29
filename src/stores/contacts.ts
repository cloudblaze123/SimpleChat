import { defineStore } from 'pinia';

// import { getUsers } from '@/api/user-with-delay';
import { getUsers } from '@/api/user-web';
import { User } from '@/models/User';



export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: [] as User[],
        loading: false as boolean,
    }),
    actions: {
        async fetchContacts() {
            this.loading = true;
            const contacts = await getUsers();
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
