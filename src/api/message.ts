import { Message } from '@/models/Message';
import { messages as messagesMocked } from '@/mocks/messages';


function getMessages(): Message[] {
    return messagesMocked;
}

function sendMessage(message: Message): void {
    messagesMocked.push(message);
    messageNotifier.notify();
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