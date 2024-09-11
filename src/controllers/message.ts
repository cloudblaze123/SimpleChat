import { Message } from '@/models/Message'
import { useMessageStore } from '@/stores/message'




async function exportMessagesToJson(): Promise<void> {
    // 获取本地中存储的消息
    const messageStore = useMessageStore()
    const messages = messageStore.messages

    // 将数据转换为 JSON 字符串
    const jsonData = JSON.stringify(messages, null, 2)

    // 创建一个 Blob 对象，类型是 application/json
    const blob = new Blob([jsonData], { type: 'application/json' })

    // 创建一个 URL 对象
    const url = URL.createObjectURL(blob)

    // 创建一个虚拟的 a 标签用于下载
    const link = document.createElement('a')
    link.href = url
    link.download = '消息备份-'+new Date().toLocaleString()+'.json' 
    link.click()

    // 释放 URL 对象
    // 确保浏览器不保留无用的内存
    URL.revokeObjectURL(url)

}


function importMessagesFromJson(json: string): void {
    const messageStore = useMessageStore()

    const messages: Message[] = JSON.parse(json)
    
    messageStore.updateMessages(messages)
    // console.log(json)
}


export { exportMessagesToJson, importMessagesFromJson }