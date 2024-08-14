import { User } from '@/models/User';
import { users as usersData } from '@/mocks/users';

function getUsers(): User[] {
    return usersData;
}

function getUser(id: string): User | undefined {
    return usersData.find(user => user.id === id);
}

function getUserByEmail(email: string){
    return usersData.find(user => user.email === email);
}

export {
    getUsers,
    getUser,
    getUserByEmail
};