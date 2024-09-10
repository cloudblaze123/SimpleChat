# SimpleChat
> 一个简单的聊天室应用 <br>
> 此为 SimpleChat 的前端项目，后端项目为 [SimpleChat-server](https://github.com/cloudblaze123/SimpleChat-server)

## 快速开始

1. 克隆仓库：
   
   `git clone https://github.com/cloudblaze123/SimpleChat.git`

2. 安装依赖：

    ```sh
    npm install
    ```

3. 运行项目：
    > 运行前请确保已经启动了 SimpleChat-server 项目 <br>
    > 并确保两者 api 版本兼容

    ```sh
    npm run dev
    ```

## 补充：api版本的定义

1. api版本由大版本号和小版本号构成，形如 vX.Y，X为大版本号，Y为小版本号。

2. 当 api 有破坏性变化时，比如修改接口参数、返回值等导致前端必须修改才能维持原样功能时，大版本号会逐一增加，如v1.0、v2.0等；

3. 当 api 为非破坏性变化时，比如添加新的接口，调整接口背后的实现等不影响原有接口定义的变化时，小版本号会逐一增加，如v0.1、v0.2等。

4. 简单来说，运行项目需要：
    ||SimpleChat|SimpleChat-server|
    |-|-|-|
    |大版本号|等于|等于|
    |小版本号|小于等于server|大于等于SimpleChat|

    例如，假设项目依赖的 SimpleChat-server 版本为 v1.2，则 SimpleChat-server 项目的 api 版本需为 v1.2、v1.3 ...

5. 为方便查看当前项目依赖的 api 版本，根目录下会有一个以 api 版本命名的文件，之后每次 api 版本更新时，记得同时修改该文件的 api 版本。