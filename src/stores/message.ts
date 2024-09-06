import { defineStore } from 'pinia';

import { Message } from '@/models/Message';

import { getMessages, sendMessage } from '@/api/message-web';

export const useMessageStore = defineStore('message', {
    state: () => ({
        // !!! 修改 messages 时，不要直接 store.messages = [一个数组]，会导致响应丢失（尚未弄清原因）
        // 为了保证响应式，请使用下面的 updateMessages 方法更新 messages !!!
        messages: [] as Message[],
    }),
    actions: {
        addMessage(message: Message) {
            this.messages.push(message);
        },
        updateMessages(messages: Message[]) {
            this.messages.length=0;
            this.messages.push(...messages);
        },


        async getMessages() {
            const messages = await getMessages();
            this.updateMessages(messages);
            return messages;
        },

        async sendMessage(message: Message) {
            await sendMessage(message)
        }

    }
});
