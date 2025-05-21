import { Socket } from 'socket.io-client';


import { watch } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { User } from "@/models/User";




function initAuthHandlers(socket:Socket) {
    const authStore = useAuthStore();
    
    watch(() => (authStore.currentUser), (newVal: User | null, oldVal: User | null) => {
        const newUserId = newVal? newVal.id : ''
        const oldUserId = oldVal? oldVal.id : ''
        console.log('socket emit switchUser', 'from', oldUserId, 'to', newUserId)
        socket.emit('switchUser', {
            newUserId: newUserId,
            oldUserId: oldUserId
        });
    })
}


export { initAuthHandlers }