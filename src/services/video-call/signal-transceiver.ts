import { socketService } from "@/services/sockets/socket";




class SignalTransceiver {
    receiverId: string = "";

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
        if (!this.receiverId) {
            throw new Error("SignalTransceiver: Receiver ID is not set");
        }
        console.log("Sending offer");
        const data = {
            type: 'offer',
            offer: offer 
        };
        socketService.emit('signal', this.receiverId, data);
    }
    
    
    sendAnswer(answer: RTCSessionDescriptionInit) {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }
        console.log("Sending answer");
        const data = {
            type: 'answer',
            answer: answer
        };
        socketService.emit('signal', this.receiverId, data);
    }

    
    sendCandidate(candidate: RTCIceCandidate) {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }
        console.log("Sending candidate");
        const data = {
            type: 'candidate',
            candidate: candidate
        };
        socketService.emit('signal', this.receiverId, data);
    }


    initSocket() {
        if (!socketService.isConnected()) {
            throw new Error("SignalTransceiver: Socket is not connected");
        }

        // 处理信令消息
        socketService.on('signal', async (senderId: string, data) => {
            console.log('收到信令：', data.type);

            this.receiverId = senderId;
            console.log('transceiver的信令接收者ID：', this.receiverId);

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