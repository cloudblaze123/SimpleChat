import { User } from '@/models/User';
import { users as usersData } from '@/mocks/users';
import { delay } from '@/mocks/util/common';

// 模拟从服务器获取用户数据时的网络延迟
function getUsers(): Promise<User[]> {
    return delay(usersData, 2000) as Promise<User[]>;
}


export {
    getUsers,
};