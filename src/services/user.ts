import { User } from '@/models/User';
import { getUser, getUserByEmail } from '@/api/user';

class UserService {
    loggedInUsers:User[] = [];
    currentUser:User|null = null;

    getLoggedInUserById(userId:string) {
        return this.loggedInUsers.find(user => user.id === userId);
    }

    login(id:string) {
        return getUser(id);
    }

    loginWithEmail(email:string) {
        const user = getUserByEmail(email);
        if (user) {
            return this.login(user.id);
        }else {
            console.error(`User with email ${email} not found`);
            return null;
        }
    }

}

export { UserService };