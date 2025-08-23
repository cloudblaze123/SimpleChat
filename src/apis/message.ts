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


export {
  sendMessage,
};