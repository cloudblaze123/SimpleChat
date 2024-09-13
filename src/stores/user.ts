import { defineStore } from 'pinia';
import { User } from '@/models/User';

import { getUser } from '@/api/user-web';


export const useUserStore = defineStore('user', {
    state: () => ({
        users: {} as Record<string, User>,
    }),
    
    actions: {
        async getUser(id: string){
            // 首先查找本地缓存中是否有该用户
            const cachedUser = getCachedUser(id)
            // 如果有，则返回缓存中的用户
            if(cachedUser){
                // console.log(`get user:${id} from cache`)
                return cachedUser
            }

            // 如果没有，则从用户接口获取用户信息
            const user = await getUser(id)
            // 获取到用户信息后，将用户信息缓存到本地
            if(user){
                this.users[id] = (user)
                cacheUser(user)
                console.log(`get user:${id} from api`)
                return user
            }

            // 如果缓存和接口都没有获取到用户信息，则返回null
            console.log(`get user:${id} failed`)
            return null
        },

        updateUser(user: User) {
            const id = user.id
            // 如果要更新的用户信息不在缓存中，则将该用户信息添加到缓存中
            // 如果在缓存中，则更新缓存中的用户信息
            this.users[id] = (user)
            cacheUser(user)
        },

        removeUser(id: string) {
            delete this.users[id]
            removeCachedUser(id)
        },
    }
});


function getCachedUser(id: string): User | null {
    const cachedUser = localStorage.getItem('users')
    if (!cachedUser) {
        localStorage.setItem('users', JSON.stringify({}))
        return null
    }
    const users = JSON.parse(cachedUser) as Record<string, User>
    const user = users[id]
    return user || null
}

function removeCachedUser(id: string) {
    const cachedUsers = JSON.parse(localStorage.getItem('users') || '{}') as Record<string, User>
    delete cachedUsers[id]
    localStorage.setItem('users', JSON.stringify(cachedUsers))
}

// 因为目前应用规模不大，且尚未需要缓存图片，故使用 localStorage 缓存用户信息。
function cacheUser(user: User) {
    const cachedUsers = JSON.parse(localStorage.getItem('users') || '{}') as Record<string, User>
    // 如果用户不存在，则添加到缓存中
    // 反之，更新缓存中的用户信息
    cachedUsers[user.id] = user
    localStorage.setItem('users', JSON.stringify(cachedUsers))
}
