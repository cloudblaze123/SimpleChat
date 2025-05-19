import { io, Socket } from "socket.io-client";

import { useAuthStore } from "@/stores/auth";
import { initMessageHandlers } from "./message";
import { initContactHandlers } from "./contact";


// 全局 socket 实例
// 首次使用时，需要先调用 initSocket 方法初始化
let socket: Socket;

let isSocketInited = false;

function initSocket(socketUrl: string) {
    // 连接到聊天服务器
    const authStore = useAuthStore();
    if (!authStore.currentUser) {
        console.log('尚未登录，停止初始化socket连接')
        return;
    }
    socket = io(socketUrl, {
        auth:{
            userId: authStore.currentUser.id
        }
    });

    // 监听连接成功事件
    socket.on("connect", () => {
        console.log("已连接到聊天服务器，socket id:", socket.id);
    });


    initMessageHandlers(socket);
    
    initContactHandlers(socket)


    // 监听连接断开事件
    socket.on("disconnect", () => {
        console.log("与聊天服务器断开连接");
    });


    isSocketInited = true
    console.log('socket inited')
}

export { initSocket, isSocketInited, socket };