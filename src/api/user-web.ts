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
        const user = User.loadFromJSON(data)
        return user
    }
    return null
}


async function updateUserProfile(id: string, profileDelta: {}){
    const response = await fetch('/api/user/' + id + '/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'profile': profileDelta
        })
    })
    if (response.ok) {
        return 'Profile updated successfully'
    }
    return 'Error updating profile'
}

export { getUsers, getUser, updateUserProfile }