import { defineStore } from 'pinia';
import { User } from '@/models/User';

import { getUser } from '@/api/user-web';


export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
    }),
    
    actions: {
        async getUser(id: string){
            // 首先查找本地缓存中是否有该用户
            const cachedUser = getCachedUser(id)
            // 如果有，则返回缓存中的用户
            if(cachedUser){
                console.log(`get user:${id} from cache`)
                return cachedUser
            }

            // 如果没有，则从用户接口获取用户信息
            const user = await getUser(id)
            // 获取到用户信息后，将用户信息缓存到本地
            if(user){
                this.users.push(user)
                cacheUser(user)
                console.log(`get user:${id} from api`)
                return user
            }

            // 如果缓存和接口都没有获取到用户信息，则返回null
            console.log(`get user:${id} failed`)
            return null
        }
    }
});


function getCachedUser(id: string): User | null {
    const cachedUser = localStorage.getItem('users')
    if (!cachedUser) {
        localStorage.setItem('users', JSON.stringify([]))
        return null
    }
    const users = JSON.parse(cachedUser) as User[]
    const user = users.find(u => u.id === id)
    return user || null
}

// 因为目前应用规模不大，且尚未需要缓存图片，故使用 localStorage 缓存用户信息。
function cacheUser(user: User) {
    const cachedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const index = cachedUsers.findIndex(u => u.id === user.id)
    // 如果用户不存在，则添加到缓存中
    // 反之，更新缓存中的用户信息
    if (index === -1) {
        cachedUsers.push(user)
    } else {
        cachedUsers[index] = user
    }
    localStorage.setItem('users', JSON.stringify(cachedUsers))
}
