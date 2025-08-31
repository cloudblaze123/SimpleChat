import { Router } from 'express';
import { Request, Response } from 'express';
import userStore from '@/store/userStore';

const router = Router();

/**
 * 注册新用户
 *
 * @description 通过提供用户名来注册一个新用户。接口将生成一个新的用户ID，并将用户信息存储在系统中。
 * @bodyParam {string} name - 用户名 (必填)
 * @example POST /api/user
 * {
 *   "name": "张三"
 * }
 * @returns {string} 'User registered' - 用户注册成功
 */
router.post('/api/user', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    userStore.addUser(name);
    res.send('User registered');
  } catch (error) {
    res.status(500).send('Failed to register user');
  }
});

/**
 * 获取单个用户信息
 *
 * @description 根据提供的用户ID获取用户信息。
 * @queryParam {number} id - 用户ID (必填)
 * @returns {Object} - 包含用户信息的对象
 * @returns {Object} user - 用户对象
 * @example GET /api/user?id=1
 * {
 *   "user": {
 *     "id": 1,
 *     "name": "张三"
 *   }
 * }
 * @returns {Object} - 如果未找到用户，则返回null
 */
router.get('/api/user', (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('ID is required');
  }

  const user = userStore.getUser(parseInt(id as string, 10));
  res.send({ user });
});

/**
 * 获取所有用户列表
 *
 * @description 获取所有用户的列表。
 * @returns {Object} - 包含用户列表的对象
 * @returns {Array} users - 用户数组
 */
router.get('/api/users', (req: Request, res: Response) => {
  const users = userStore.getUsers();
  res.send({ users });
});

export default router;
