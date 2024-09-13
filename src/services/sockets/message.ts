import { Socket } from 'socket.io-client';

import { useMessageStore } from '@/stores/message';




function initMessageHandlers(socket:Socket) {
    const messageStore = useMessageStore();

    socket.on('messageAdded', (data) => {
        console.log('messageAdded, start to increment messages');
        messageStore.getIncrementalMessages();
    }); 
}




export { initMessageHandlers };