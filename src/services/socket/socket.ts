import { io, Socket } from "socket.io-client";


class SocketService {
    socket: Socket | null = null;


    connect(socketUrl: string = window.location.origin) {
        console.log('开始连接 socket 服务器')
        // 连接聊天服务器
        this.socket = io(socketUrl);
        
        this._initHandlers();
    }
    
    
    private _initHandlers() {
        // 监听连接成功事件
        this.socket!.on("connect", () => {
            console.log("已连接到 socket 服务器，socket id:", this.socket!.id);
        });

        // 监听连接断开事件
        this.socket!.on("disconnect", () => {
            console.log("与 socket 服务器断开连接");
        });
    }


    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

}


// 全局单例
const socketService = new SocketService();


export { socketService };