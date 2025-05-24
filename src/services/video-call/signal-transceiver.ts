import { socketService } from "@/services/sockets/socket";


const room = "room1";


class SignalTransceiver {
    onReceiveAnswer: (answer: RTCSessionDescriptionInit) => void = () => {};
    onReceiveOffer: (offer: RTCSessionDescriptionInit) => void = () => {};
    onReceiveCandidate: (candidate: RTCIceCandidate) => void = () => {};


    constructor() {
        console.log("SignalTransceiver created");
        socketService.onConnected(() => {
            console.log("Socket connected");
            this.initSocket();
        });
    }


    sendOffer(offer: RTCSessionDescriptionInit) {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }
        console.log("Sending offer");
        socketService.emit('join', room); // 加入房间
        socketService.emit('signal', { type: 'offer', offer, room });
    }


    sendAnswer(answer: RTCSessionDescriptionInit) {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }
        console.log("Sending answer");
        socketService.emit('signal', { type: 'answer', answer, room });
    }

    
    sendCandidate(candidate: RTCIceCandidate) {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }
        console.log("Sending candidate");
        socketService.emit('signal', { type: 'candidate', candidate, room });
    }


    initSocket() {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }

        // 处理信令消息
        socketService.on('signal', async (data) => {
            console.log('收到信令：', data.type);

            if (data.type === 'offer') {
                console.log('收到offer');
                const offer = new RTCSessionDescription(data.offer);
                this.onReceiveOffer(offer);

            } else if (data.type === 'answer') {
                console.log('收到answer');
                const answer = new RTCSessionDescription(data.answer);
                this.onReceiveAnswer(answer);

            } else if (data.type === 'candidate') {
                console.log('收到ICE候选');
                const candidate = new RTCIceCandidate(data.candidate);
                this.onReceiveCandidate(candidate);
            }
        });
    }
}


const signalTransceiver = new SignalTransceiver();


export { signalTransceiver };