import { User } from '@/models/User';

async function getUsers(): Promise<User[] | []> {
    const response = await fetch('/api/users')
    if (response.ok) {
        const data = await response.json()
        return data
    }
    return []
}

async function getUser(id: string): Promise<User|null> {
    const response = await fetch('/api/user/' + id)
    if (response.ok) {
        const data = await response.json()
        return data
    }
    return null
}

export { getUsers, getUser }