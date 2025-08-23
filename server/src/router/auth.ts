import { Router } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';




const router = Router();


router.post('/api/login', (req: Request, res: Response) => {
  if(process.env.JWT_SECRET === undefined){
    console.error('JWT_SECRET is not defined in .env file');
    res.status(500).json({ error: 'Internal Server Error' });
    return
  }

  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { 
    expiresIn: '10s', // 设置过期时间为10秒
    algorithm: 'HS256'  // 指定安全算法
  });

  res.json({ token });
});




export default router;