import { useAuthStore } from '@/stores/auth';
import { socket } from '@/services/sockets/socket';




function switchUser(userId: string){
    const authStore = useAuthStore();

    const oldUserId = authStore.currentUser? authStore.currentUser.id : '';
    socket.emit('switchUser', {
        oldUserId: oldUserId,
        newUserId: userId
    });

    authStore.switchUser(userId);
};




export { switchUser };