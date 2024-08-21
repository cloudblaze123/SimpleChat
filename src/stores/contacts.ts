import { defineStore } from 'pinia';

import { ContactsService } from '@/services/contacts';
import { User } from '@/models/User';


const contactService = new ContactsService();

export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: contactService.getContacts()
    }),
    actions: {
        addContact(contact: User) {
            contactService.addContact(contact);
        },
        removeContact(contactId: string) {
            contactService.removeContact(contactId);
        }
    }
});
