function sendMessage(message: string) {
  console.log(`Sending message: ${message}`);
  const response = fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  return response;
}


async function protectedSendMessage(message: string) {
  console.log(`Sending message by protected api`);
  const response = await fetch('/api/protected/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  console.log('Message sent successfully');

  return response;
}




async function getMessages() {
  console.log('Getting messages');
  const response = await fetch('/api/messages');
  const data = await response.json();
  const messages = data.messages;
  return messages;
}


export {
  sendMessage,
  getMessages,
  protectedSendMessage,
};