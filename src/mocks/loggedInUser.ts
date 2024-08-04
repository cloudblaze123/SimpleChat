import { User } from '@/models/User';
import { users } from './users';


const loggedInUsers = [
    users[0],
    users[1],
];

const currentUser = users[0];

export { loggedInUsers, currentUser };