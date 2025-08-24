import { Router } from 'express';
import { Request, Response } from 'express';




const router = Router();


// 模拟消息列表
const users = [
  {
    id: 1,
    name: "aaa",
  },
  {
    id: 2,
    name: "bbb",
  }
];




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
  console.log(`Received user register: ${name}`);

  const lastId = users[users.length - 1].id;
  users.push({
    id: lastId + 1,
    name: name,
  });

  res.send('User registered');
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
 * @example GET /api/user?id=999
 * {
 *   "user": null
 * }
 */
router.get('/api/user', (req: Request, res: Response) => {
  const { id } = req.query; // 修正：从req.query获取参数而不是req.body
  const user = users.find(user => user.id === parseInt(id as string, 10));
  res.send({ user });
});




/**
 * 获取所有用户列表
 *
 * @description 获取所有用户的列表。
 * @returns {Object} - 包含用户列表的对象
 * @returns {Array} users - 用户数组
 * @example GET /api/users
 * {
 *   "users": [
 *     {
 *       "id": 1,
 *       "name": "张三"
 *     },
 *     {
 *       "id": 2,
 *       "name": "李四"
 *     }
 *   ]
 * }
 */
router.get('/api/users', (req: Request, res: Response) => {
  res.send({ users });
});




export default router;