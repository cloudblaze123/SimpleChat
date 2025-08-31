import { Router } from 'express';
import { Request, Response } from 'express';
import userStore from '@/store/userStore';

const router = Router();

/**
 * 发送联系人请求
 * 
 * @description 从一个用户向另一个用户发送联系人请求
 * @bodyParam {number} fromUserId - 发送请求的用户ID
 * @bodyParam {number} toUserId - 接收请求的用户ID
 * @example POST /api/contacts/request
 * {
 *   "fromUserId": 1,
 *   "toUserId": 2
 * }
 * @returns {string} 'Contact request sent' - 请求发送成功
 */
router.post('/api/contacts/request', (req: Request, res: Response) => {
  const { fromUserId, toUserId } = req.body;
  
  if (!fromUserId || !toUserId) {
    return res.status(400).send('fromUserId and toUserId are required');
  }

  const success = userStore.sendContactRequest(fromUserId, toUserId);
  if (!success) {
    return res.status(400).send('Failed to send contact request');
  }

  res.send('Contact request sent');
});

/**
 * 响应联系人请求
 * 
 * @description 接受或拒绝联系人请求
 * @bodyParam {number} fromUserId - 发送请求的用户ID
 * @bodyParam {number} toUserId - 接收请求的用户ID
 * @bodyParam {string} action - 'accept' 或 'reject'
 * @example POST /api/contacts/response
 * {
 *   "fromUserId": 1,
 *   "toUserId": 2,
 *   "action": "accept"
 * }
 * @returns {string} 'Contact request accepted' 或 'Contact request rejected'
 */
router.post('/api/contacts/response', (req: Request, res: Response) => {
  const { fromUserId, toUserId, action } = req.body;
  
  if (!fromUserId || !toUserId || !action) {
    return res.status(400).send('fromUserId, toUserId and action are required');
  }

  if (action !== 'accept' && action !== 'reject') {
    return res.status(400).send('action must be "accept" or "reject"');
  }

  const success = userStore.respondContactRequest(fromUserId, toUserId, action);
  if (!success) {
    return res.status(400).send('Failed to respond to contact request');
  }

  res.send(`Contact request ${action}ed`);
});

/**
 * 获取联系人列表
 * 
 * @description 获取指定用户的联系人列表
 * @queryParam {number} userId - 用户ID
 * @example GET /api/contacts?userId=1
 * @returns {Array} - 联系人用户对象数组
 */
router.get('/api/contacts', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send('userId is required');
  }

  const contacts = userStore.getContacts(parseInt(userId as string, 10));
  res.send(contacts);
});

/**
 * 获取待处理的联系人请求
 * 
 * @description 获取指定用户的待处理联系人请求
 * @queryParam {number} userId - 用户ID
 * @example GET /api/contacts/requests?userId=1
 * @returns {Array} - 待处理的联系人请求数组
 */
router.get('/api/contacts/requests', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send('userId is required');
  }

  const requests = userStore.getPendingContactRequests(parseInt(userId as string, 10));
  res.send(requests);
});

export default router;
