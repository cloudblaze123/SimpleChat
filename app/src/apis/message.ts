import type { MessageData } from '@/data/message';


function sendMessage(message: MessageData) {
  console.log(`Sending message from ${message.senderId} to ${message.receiverId}`);
  const response = fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  return response;
}


async function protectedSendMessage(message: MessageData) {
  console.log(`Sending message by protected api from ${message.senderId}`);
  const response = await fetch('/api/protected/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  console.log('Message sent successfully');

  return response;
}




async function getMessages(): Promise<MessageData[]> {
  console.log('Getting messages');
  const response = await fetch('/api/messages');
  const data = await response.json();
  return data.messages as MessageData[];
}


export {
  sendMessage,
  getMessages,
  protectedSendMessage,
};
