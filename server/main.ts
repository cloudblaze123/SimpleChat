// 使用 dotenv 加载环境变量到 process.env 中
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';



const app = express();
const port = 3000;




// 配置中间件
import { Request, Response, NextFunction } from 'express';


// 中间件：打印访客信息
const logUrlAccessInfoMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const { method, url } = req;
    console.log(`Request received: Method=${method}, URL=${url}`);
    next(); // 继续处理请求
}
app.use(logUrlAccessInfoMiddleware);


// 解析 JSON
app.use(express.json({ limit: '10mb' }));


// 身份验证
import { expressjwt } from 'express-jwt';
let secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('SECRET_KEY is not defined in .env file');
}
app.use('/api/protected/message', expressjwt({
    secret,
    algorithms: ['HS256'],
}))




// 异常处理中间件
// import { }
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ code: 401, message: 'Token无效或过期' });
    }
    next(err);
  });



// 配置路由

// 用来测试的路由
app.get('/api/hello', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// 身份验证路由
import authRouter from "@/router/auth";
app.use('/', authRouter);


// 消息路由
import messageRouter from "@/router/message";
app.use('/', messageRouter);




// 配置 socket 服务
import { createServer } from "http";
const httpServer = createServer(app);

import { initSocket } from "@/socket";
initSocket(httpServer)




httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
