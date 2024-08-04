import { Message, TextContent, ImageContent, VideoContent } from '@/models/Message';
import image1 from '@/mocks/assets/images/01.png';
import image2 from '@/mocks/assets/images/02.png';
import video1 from '@/mocks/assets/videos/01.mp4';


export const messages: Message[] = [
    new Message('1', '2', new TextContent('你好，我是1，下面是我的图片'), new Date()),
    new Message('1', '2', new ImageContent(image1), new Date()),
    new Message('1', '2', new TextContent('很高兴认识你'), new Date()),
    new Message('2', '1', new TextContent('你好，我是2，很高兴认识你'), new Date()),
    
    new Message('3', '1', new TextContent('你好，我是3，下面是我的视频'), new Date()),
    new Message('3', '1', new VideoContent(video1), new Date())
]