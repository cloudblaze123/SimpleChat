import { User } from '@/models/User';
import { getUser } from '@/api/user';

class UserService {
    loggedInUsers:User[] = [];
    currentUser:User|null = null;

    isLoggedIn() {
        return this.currentUser!== null;
    }

    isLoggedInUsersEmpty(){
        return this.loggedInUsers.length === 0;
    }

    isUserLoggedIn(userId:string) {
        return this.loggedInUsers.some((user:User) => user.id === userId);
    }

    getLoggedInUserById(userId:string) {
        return this.loggedInUsers.find(user => user.id === userId);
    }

    login(userInfo:{id:string}) {
        // 检查用户是否已经登录
        if (!this.isUserLoggedIn(userInfo.id)) {
            const user = getUser(userInfo.id);
            if (user) {
                this.loggedInUsers.push(user);
            }else {
                console.error(`User with id ${userInfo.id} not found`);
                return;
            }
            this.switchUser(userInfo.id);
        }
        
    }

    logout(userToLogout:User) {
        // 移除登录的用户
        const indexToRemove = this.loggedInUsers.findIndex(user => user.id === userToLogout.id);
        if (indexToRemove === -1) {
            return;
        }
        this.loggedInUsers.splice(indexToRemove, 1);

        // 更新当前的登录用户
        if (this.isLoggedInUsersEmpty()){
            this.currentUser = null;
            return;
        }
        this.switchUser(this.loggedInUsers[0].id);
    }

    switchUser(userId:string) {
        const user = this.getLoggedInUserById(userId);
        if (user) {
            this.currentUser = user;
        }
    }
}

export { UserService };