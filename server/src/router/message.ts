import { Router } from 'express';
import { Request, Response } from 'express';




const router = Router();


// 模拟消息列表
const messages = [
    'first message, for testing',
];



// 消息api
// 接收文本消息
router.post('/api/message', (req: Request, res: Response) => {
    const { message } = req.body;
    console.log(`Received message: ${message}`);
    messages.push(message);
    res.send('Message received');
});


// 验证身份后才会接收文本消息，目前用作测试
router.post('/api/protected/message', (req: Request, res: Response) => {
    const { message } = req.body;
    console.log(`Received message: ${message}`);
    messages.push(message);
    res.send('Message received');
});




// 返回消息列表
router.get('/api/messages', (req: Request, res: Response) => {
    res.send({
        messages: messages,
    });
});







export default router;