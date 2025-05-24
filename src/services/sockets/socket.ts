import { io, Socket } from "socket.io-client";

import { useAuthStore } from "@/stores/auth";

import { initMessageHandlers } from "./message";
import { initContactHandlers } from "./contact";
import { initVideoCallHandlers } from "./videoCall";
import { initVideoRTCHandlers } from "../video-call/videoRTC";


class SocketService {
    socket: Socket | null = null;
    

    connect(socketUrl: string = window.location.origin) {
        const currentUser = useAuthStore().currentUser;
        if (!currentUser) {
            console.log('尚未登录，停止连接 socket 服务器')
            return;
        }

        console.log('开始连接 socket 服务器')
        // 连接聊天服务器
        this.socket = io(socketUrl, {
            auth:{
                userId: currentUser.id
            }
        });
    

        this._initHandlers();
    }


    private _initHandlers() {
        // 监听连接成功事件
        this.socket!.on("connect", () => {
            console.log("已连接到聊天服务器，socket id:", this.socket!.id);
        });
    
        // 监听连接断开事件
        this.socket!.on("disconnect", () => {
            console.log("与聊天服务器断开连接");
        });
        
    
        initMessageHandlers(this.socket!);
        
        initContactHandlers(this.socket!);

        initVideoCallHandlers(this.socket!);

        initVideoRTCHandlers(this.socket!);
    }

    
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }


    isConnected() {
        return this.socket && this.socket.connected;
    }


    emit(event: string, data: any = {}) {
        if (this.socket) {
            if(data){
                this.socket.emit(event, data);
            }else{
                this.socket.emit(event);
            }
        }
    }
}


const socketService = new SocketService();


export { socketService };