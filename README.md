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

1. api版本由主版本号和次版本号构成，形如 vX.Y，X为主版本号，Y为次版本号。

2. 当 api 有破坏性变化时，比如修改接口参数、返回值等导致前端必须修改才能维持原样功能时，主版本号会逐一增加，如v1.0、v2.0。

3. 当 api 为非破坏性变化时，比如添加新的接口，调整接口背后的实现等不影响原有接口定义的变化时，次版本号会逐一增加，如v0.1、v0.2。

4. 运行项目需要：

    |SimpleChat|  |SimpleChat-server|
    |---|---|---|
    |主版本号X| == |主版本号X|
    |次版本号Y| <= |次版本号Y|

    示例如下

    |SimpleChat|SimpleChat-server|能否运行|
    |---|---|---|
    |v1.2|v1.2、v1.3|能|
    |v1.2|v1.0、v1.1|不能|
    |v1.2|v2.2、v2.3|不能|

5. 为方便查看当前项目依赖的 api 版本，根目录下会有一个以 api 版本命名的文件，每次更新 api 版本时，记得重命名该文件。