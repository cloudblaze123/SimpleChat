import { defineStore } from 'pinia';

import { Message } from '@/models/Message';

import { getMessages, getIncrementalMessages, sendMessage } from '@/api/message-web';

export const useMessageStore = defineStore('message', {
    state: () => ({
        // !!! 修改 messages 时，不要直接 store.messages = [一个数组]，会导致响应丢失（尚未弄清原因）
        // 为了保证响应式，请使用下面的 updateMessages 方法更新 messages !!!
        messages: [] as Message[],
        lastUpdateTimestamp: new Date(),
    }),
    actions: {
        addMessage(message: Message) {
            this.messages.push(message);
        },
        updateMessages(messages: Message[]) {
            this.messages.length=0;
            this.messages.push(...messages);
            this.lastUpdateTimestamp = new Date();
        },
        updateIncrementalMessages(messages: Message[]) {
            this.messages.push(...messages);
            this.lastUpdateTimestamp = new Date();
        },

        // 获取全部消息
        async getMessages() {
            const messages = await getMessages();
            console.log('getMessages', messages);
            this.updateMessages(messages);
            return messages;
        },
        // 获取增量消息，即自上次更新消息以来新增的消息
        // 相比 getMessages 方法需要获取所有消息
        // 获取增量消息方法传输的数据量通常更小
        async getIncrementalMessages() {
            const messages = await getIncrementalMessages(this.lastUpdateTimestamp);
            console.log('getIncrementalMessages', messages);
            this.updateIncrementalMessages(messages);
            return messages;
        },


        async sendMessage(message: Message) {
            await sendMessage(message)
        },


        importMessages(messages: Message[]) {
            this.updateMessages(messages)
        }
    }
});
