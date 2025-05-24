import { Socket } from 'socket.io-client';

const peerConnection = new RTCPeerConnection(); // 创建RTCPeerConnection
const room = 'room1'; // 房间名称


let socket: Socket; // socket连接


function initVideoRTCHandlers(socketTmp: Socket) {
    socket = socketTmp;

    // 监听远程音视频流
    peerConnection.ontrack = (event) => {
        console.log('收到远程流');
        // 如果已经有流且流有效，则不再设置新的流
        if (remoteStream && remoteStream.active) {
            return
        }
        remoteStream = event.streams[0];
        videoRTC.emitRemoteStreamReady(remoteStream);
    };

    // 监听ICE候选地址
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('signal', { type: 'candidate', candidate: event.candidate, room });
        }
    };


    peerConnection.onsignalingstatechange = () => {
        console.log('信令状态改变', peerConnection.signalingState);
    };


    peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE连接状态改变', peerConnection.iceConnectionState);
        if (peerConnection.iceConnectionState === 'disconnected') {
            videoRTC.emitRemoteStreamDisconnected();
        }
    };


    // 处理信令消息
    socket.on('signal', async (data) => {
        console.log('收到信令：', data.type);
        if (data.type === 'offer') {
            console.log('收到offer');
            // 如果是offer，设置远程描述并创建answer
            const offer = new RTCSessionDescription(data.offer);
            await peerConnection.setRemoteDescription(offer);
            console.log('设置远程描述');
            const answer = await peerConnection.createAnswer();

            await peerConnection.setLocalDescription(answer);
            socket.emit('signal', { type: 'answer', answer, room });
            console.log('sended answer');

        } else if (data.type === 'answer') {
            console.log('收到answer');
            // 如果是answer，设置远程描述
            console.log('设置远程描述');
            const answer = new RTCSessionDescription(data.answer);
            await peerConnection.setRemoteDescription(answer);

        } else if (data.type === 'candidate') {
            // 如果是ICE candidate，添加到连接中
            console.log('添加ICE候选');
            peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    });
}




// 获取本地音视频流
async function getLocalStream() {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    // 将音视频流添加到RTCPeerConnection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    return localStream;
}













let remoteStream: MediaStream;   // 远程流


class VideoRTC {
    // 远程流就绪时，调用该回调
    onRemoteStreamReady: (stream: MediaStream | null) => void = () => { };
    // 远程流断开连接时，调用该回调
    onRemoteStreamDisconnected: () => void = () => { };

    // 启动RTC
    async start(): Promise<MediaStream> {
        console.log('启动RTC');

        const localStream = await getLocalStream();
        socket.emit('join', room); // 加入房间

        // 发出呼叫
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('signal', { type: 'offer', offer, room });
        console.log('发出呼叫');

        return localStream;
    }

    // 停止RTC
    stop() {
        console.log('停止RTC');
        peerConnection.close();
        socket.emit('leave', room); // 离开房间
    }

    emitRemoteStreamReady(stream: MediaStream) {
        this.onRemoteStreamReady(stream);
    }

    emitRemoteStreamDisconnected() {
        this.onRemoteStreamDisconnected();
    }

}


const videoRTC = new VideoRTC();




export { videoRTC, initVideoRTCHandlers };