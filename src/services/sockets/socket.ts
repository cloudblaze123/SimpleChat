import { io, Socket } from "socket.io-client";

import { useAuthStore } from "@/stores/auth";
import { initMessageHandlers } from "./message";


// 全局 socket 实例
// 首次使用时，需要先调用 initSocket 方法初始化
let socket: Socket;

function initSocket(socketUrl: string) {
    // 连接到聊天服务器
    // console.log(window.location.origin)
    const authStore = useAuthStore();
    if (!authStore.currentUser) {
        throw new Error("请先登录");
    }
    const currentUserId = authStore.currentUser.id;
    socket = io(socketUrl, {
        auth:{
            userId:currentUserId
        }
    });

    // 监听连接成功事件
    socket.on("connect", () => {
        console.log("已连接到聊天服务器，socket id:", socket.id);
    });


    initMessageHandlers(socket);
    

    // 监听连接断开事件
    socket.on("disconnect", () => {
        console.log("与聊天服务器断开连接");
    });


    console.log('hihiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
}

export { initSocket, socket };