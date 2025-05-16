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


async function searchUsers(keyword: string): Promise<User[]|null> {
    const response = await fetch('/api/search/user' + `?keyword=${keyword}`)
    if (response.ok) {
        const data = await response.json()
        const users = data.map((item: any) => User.loadFromJSON(item))
        return users
    }
    return []
}




async function registerUser(user: User): Promise<boolean> {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        return true
    }
    return false
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


export {
    getUsers,
    getUser,
    searchUsers,
    registerUser,
    updateUserProfile
}