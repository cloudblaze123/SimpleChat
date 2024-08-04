import { Message, TextContent, ImageContent, VideoContent } from '@/models/Message';
import { users } from './users';
import image1 from '@/mocks/assets/images/01.png';
import image2 from '@/mocks/assets/images/02.png';
import video1 from '@/mocks/assets/videos/01.mp4';


export const messages: Message[] = [
    new Message(users[0], users[1], new TextContent('你好，我是1，下面是我的图片'), new Date()),
    new Message(users[0], users[1], new ImageContent(image1), new Date()),
    new Message(users[0], users[1], new TextContent('很高兴认识你'), new Date()),
    new Message(users[1], users[0], new TextContent('你好，我是2，很高兴认识你'), new Date()),
    
    new Message(users[2], users[0], new TextContent('你好，我是3，下面是我的视频'), new Date()),
    new Message(users[2], users[0], new VideoContent(video1), new Date())
]