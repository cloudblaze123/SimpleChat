# SimpleChat

## 快速开始

1. 克隆仓库：
   
   `git clone https://github.com/cloudblaze123/SimpleChat.git`

2. 进入项目目录：
   
   `cd SimpleChat`

3. 进入安装依赖：
   
   ```shell
   cd app
   npm install

   cd ../server
   npm install
   ```

4. 设置 server 子项目的环境变量：

   复制 `.env.example` 文件为 `.env` 文件：

   ```shell
   # ​Linux/macOS
   cp .example.env .env

   # Windows
   copy .env.example .env
   ```

   编辑 `.env` 文件，设置其中的环境变量

5. 运行项目：

   ```shell
   # 启动两个终端运行以下脚本
   # 每个终端运行一行
   npm run dev --prefix=app
   npm run dev --prefix=server
   ```

