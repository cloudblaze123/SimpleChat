import { Router } from 'express';
import { Request, Response } from 'express';
import { MessageData } from '@/data/message';




const router = Router();


// 模拟消息列表
const messages: MessageData[] = [];




// 消息api
// 接收消息对象
router.post('/api/message', (req: Request, res: Response) => {
  const message: MessageData = req.body;
  console.log(`Received message from ${message.senderId} to ${message.receiverId}`);
  messages.push(message);
  res.send('Message received');
});


// 验证身份后才会接收消息
router.post('/api/protected/message', (req: Request, res: Response) => {
  const message: MessageData = req.body;
  console.log(`Received protected message from ${message.senderId}`);
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