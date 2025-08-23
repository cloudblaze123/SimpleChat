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
};