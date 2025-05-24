import { signalTransceiver } from "./signal-transceiver";


class VideoRTC {
    private localStream: MediaStream | null = null;
    remoteStream: MediaStream | null = null;
    peerConnection: RTCPeerConnection | null = null;


    onRemoteStreamReady: (stream: MediaStream) => void = () => {};
    onRemoteStreamDisconnected: () => void = () => {};


    constructor() {
        this.initSignalHandler();
    }


    // 启动RTC
    async connect(localStream: MediaStream, receiverId: string) {
        this.localStream = localStream;

        this.initPeerConnection();
        

        signalTransceiver.receiverId = receiverId;
        console.log('signalTransceiver.receiverId', signalTransceiver.receiverId)
        
        // 发出呼叫
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        signalTransceiver.sendOffer(offer);

    }


    async listen(localStream: MediaStream) {
        this.localStream = localStream;

        this.initPeerConnection();
    }


    initPeerConnection() {
        this.peerConnection = new RTCPeerConnection();

        // 将音视频流添加到RTCPeerConnection
        this.localStream.getTracks().forEach((track) => {
            this.peerConnection.addTrack(track, this.localStream!);
        });

        // 监听远程音视频流
        this.peerConnection.ontrack = (event) => {
            console.log('收到远程流');
            // 如果已经有流且流有效，则不再设置新的流
            if (this.remoteStream && this.remoteStream.active) {
                return
            }
            this.remoteStream = event.streams[0];
            this.onRemoteStreamReady(this.remoteStream);
        };

        // 监听ICE候选地址
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                signalTransceiver.sendCandidate(event.candidate);
            }
        };


        this.peerConnection.onsignalingstatechange = () => {
            console.log('信令状态改变', this.peerConnection.signalingState);
        };


        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('ICE连接状态改变', this.peerConnection.iceConnectionState);
            if (this.peerConnection.iceConnectionState === 'disconnected') {
                this.onRemoteStreamDisconnected();
            }
        };
    }


    initSignalHandler() {
        signalTransceiver.onReceiveOffer = async (offer: RTCSessionDescriptionInit) => {
            // 设置远程描述并创建 answer
            this.peerConnection.setRemoteDescription(offer);
            const answer = await this.peerConnection.createAnswer();
            this.peerConnection.setLocalDescription(answer);
            signalTransceiver.sendAnswer(answer);
        };

        signalTransceiver.onReceiveAnswer = (answer: RTCSessionDescriptionInit) => {
            // 设置远程描述
            this.peerConnection.setRemoteDescription(answer);
        };

        signalTransceiver.onReceiveCandidate = (candidate: RTCIceCandidate) => {
            // 添加 ICE candidate 到连接中
            this.peerConnection.addIceCandidate(candidate);
        };
    }


    // 停止RTC
    disconnect() {
        console.log('停止RTC');
        if(this.peerConnection){
            this.peerConnection.close();
        }
    }
}




const videoRTC = new VideoRTC();


export { videoRTC }