import { Socket } from 'socket.io-client';

import { useContactStore } from "@/stores/contact";




function initContactHandlers(socket:Socket) {
    const contactStore = useContactStore();
    socket.on("contactUpdated", () => {
        console.log("服务器联系人列表更新")
        contactStore.fetchContacts();
    })
}




export { initContactHandlers };