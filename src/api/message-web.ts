import { Message, TextContent, ImageContent, VideoContent } from '@/models/Message';


async function getMessages(): Promise<Message[]> {
    const response = await fetch('/api/messages')
    const rawMessages = await response.json()
    const messages: Message[] = []
    for(let rm of rawMessages){
        const type = rm.content.type
        if(type==='text'){
            messages.push(new Message(rm.sender, rm.receiver, new TextContent(rm.content.text), rm.date))
        }
        else if(type==='image'){
            messages.push(new Message(rm.sender, rm.receiver, new ImageContent(rm.content.url), rm.date))
        }
        else if(type==='video'){
            messages.push(new Message(rm.sender, rm.receiver, new VideoContent(rm.content.url), rm.date))
        }
        else{
            console.log('unsupported message type:', type);
        }
    }
    return messages
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
                sender: message.sender,
                receiver: message.receiver,
                content: message.content,
                date: message.timestamp
            })
        })
        console.log('text message sent');
    }
    else if(type==='image' || type==='video'){
        await fetch('/api/media-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: message.sender,
                receiver: message.receiver,
                content: message.content,
                date: message.timestamp
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

export { getMessages, sendMessage, messageNotifier };