import { User } from '@/models/User';

async function getUsers(): Promise<User[] | []> {
    const response = await fetch('/api/users')
    if (response.ok) {
        const data = await response.json()
        return data
    }
    return []
}

export { getUsers }