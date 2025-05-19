import { Contact } from '@/models/Contact'


async function getContactsOf(userId:string):Promise<Contact[]> {
    const response = await fetch('/api/contacts/' + userId)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        return data
    }
    return []
}


async function addContact(fromUserId:string, toUserId:string) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromUserId,
            toUserId
        })
    })
    if (!response.ok) {
        throw new Error('Failed to add contact')
    }
}


async function removeContact(fromUserId:string, toUserId:string) {
    const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromUserId,
            toUserId
        })
    })
    if (!response.ok) {
        throw new Error('Failed to remove contact')
    }
}


export { getContactsOf, addContact, removeContact }