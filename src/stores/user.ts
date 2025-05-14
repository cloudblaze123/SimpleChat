import { defineStore } from 'pinia';
import { User } from '@/models/User';

import { getUser, updateUserProfile } from '@/api/user-web';


export const useUserStore = defineStore('user', {
    state: () => ({
        users: {} as Record<string, User>,
    }),

    actions: {
        async getUser(id: string): Promise<User | null> {
            // 查找内存中是否有该用户
            if (id in this.users) {
                console.log(`get user:${id} from memory`)
                return this.users[id]
            }

            // 如果内存中没有该用户，则尝试从本地缓存中获取
            // 如果本地缓存有，则加载到内存中并返回
            const cachedUser = getCachedUser(id)
            if (cachedUser) {
                console.log(`get user:${id} from cache`)
                this.users[id] = cachedUser
                return this.users[id]
            }

            const user = await this._fetchUser(id)
            if (user) {
                return user
            }

            // 如果内存、缓存和接口都没有获取到用户信息，则返回null
            console.log(`get user:${id} failed`)
            return null
        },


        // 内部方法，外部不可调用
        async _fetchUser(id: string): Promise<User | null> {
            const user = await getUser(id)
            if (!user) {
                console.log(`get user:${id} from api failed`)
                return null
            }

            // 获取到用户信息后，将用户信息缓存到本地
            if (id in this.users) {
                // 如果用户已经存在，则更新用户信息
                this.users[id].loadFromUser(user)
                updateCachedUser(this.users[id])
            } else {
                // 如果不存在则添加到缓存中
                this.users[id] = user
                cacheUser(user)
            }

            console.log(`get user:${id} from api`)
            return user
        },


        removeUser(id: string) {
            delete this.users[id]
            removeCachedUser(id)
        },


        async _updateUser(id: string) {
            const user = await this._fetchUser(id)
            if (!user) {
                console.log(`update user:${id} failed`)
                return
            }
            this.users[id].loadFromUser(user)
            updateCachedUser(this.users[id])
        },


        async updateUserProfile(id: string, profileDelta: {}) {
            await updateUserProfile(id, profileDelta)
            await this._updateUser(id)
        },
    }
});


function getCachedUser(id: string): User | null {
    const cachedUser = localStorage.getItem('users')
    if (!cachedUser) {
        localStorage.setItem('users', JSON.stringify({}))
        return null
    }
    const usersJson = JSON.parse(cachedUser) as Record<string, User>
    let user = null
    if(id in usersJson){
        user = User.loadFromJSON(usersJson[id])
    }
    return user
}


function removeCachedUser(id: string) {
    const cachedUsers = JSON.parse(localStorage.getItem('users') || '{}') as Record<string, User>
    delete cachedUsers[id]
    localStorage.setItem('users', JSON.stringify(cachedUsers))
}


function updateCachedUser(user: User) {
    removeCachedUser(user.id)
    cacheUser(user)
}


// 因为目前应用规模不大，且尚未需要缓存图片，故使用 localStorage 缓存用户信息。
function cacheUser(user: User) {
    const cachedUsers = JSON.parse(localStorage.getItem('users') || '{}') as Record<string, User>
    // 如果用户不存在，则添加到缓存中
    // 反之，更新缓存中的用户信息
    cachedUsers[user.id] = user
    localStorage.setItem('users', JSON.stringify(cachedUsers))
}
