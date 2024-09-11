import { Message, Content, TextContent, ImageContent, VideoContent } from '@/models/Message';

import { toUTCDateString } from '@/utils/date';


type RawMessage = {
    senderId: string,
    receiverId: string,
    content: Content,
    timestamp: string
}

// 将返回的原始消息数组转换为Message数组
function packRawMessage(rawMessages: RawMessage[]): Message[] {
    const messages: Message[] = []
    for(let rm of rawMessages){
        const type = rm.content.type
        if(type==='text'){
            messages.push(new Message(rm.senderId, rm.receiverId, new TextContent(rm.content.text), rm.timestamp))
        }
        else if(type==='image'){
            messages.push(new Message(rm.senderId, rm.receiverId, new ImageContent(rm.content.url), rm.timestamp))
        }
        else if(type==='video'){
            messages.push(new Message(rm.senderId, rm.receiverId, new VideoContent(rm.content.url), rm.timestamp))
        }
        else{
            console.log('unsupported message type:', type);
        }
    }
    return messages
}

async function getMessages(): Promise<Message[]> {
    const response = await fetch('/api/messages')
    const rawMessages = await response.json()
    return packRawMessage(rawMessages)
}


async function getIncrementalMessages(fromTime: Date): Promise<Message[]>{
    const response = await fetch('/api/messages/' + toUTCDateString(fromTime))
    const rawMessages = await response.json()
    return packRawMessage(rawMessages)
}



async function sendMessage(message: Message): Promise<void> {
    const type = message.content.type
    if (type === 'text') {
        await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: message.senderId,
                receiverId: message.receiverId,
                content: message.content,
                timestamp: toUTCDateString(message.timestamp)
            })
        })
        console.log('text message sent');
        console.log('message UTC timestamp: ' + toUTCDateString(message.timestamp));
    }
    else if(type==='image' || type==='video'){
        await fetch('/api/media-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: message.senderId,
                receiverId: message.receiverId,
                content: message.content,
                timestamp: toUTCDateString(message.timestamp)
            })
        })
        console.log('media message sent');
    }
    else{
        console.log('unsupported message type');
    }
    // 因为目前服务器还无法直接通知客户端
    // 所以只能在发送消息后延时1秒钟，模拟服务器通知客户端有新消息
    // 延时1秒钟，确保服务器已经保存好消息，准备好接受getMessages请求
    setTimeout(() => {
        // console.log('notifying from message-web.ts!!!!!!!!!!!');
        messageNotifier.notify();
    }, 1000);
}


class MessageNotifier{
    callback:Function=()=>{};
    notify(){
        this.callback();
        console.log('messageNotifier notified');
    }
}
const messageNotifier=new MessageNotifier();

export { getMessages, getIncrementalMessages, sendMessage, messageNotifier };