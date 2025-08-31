/**
 * 发送联系人请求
 * @param {number} fromUserId - 发送请求的用户ID
 * @param {number} toUserId - 接收请求的用户ID
 * @returns {Promise<string>} - 成功消息
 */
async function sendContactRequest(fromUserId: number, toUserId: number): Promise<string> {
  console.log(`Sending contact request from ${fromUserId} to ${toUserId}`);
  const response = await fetch('/api/contacts/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromUserId, toUserId }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to send contact request');
  }
  
  return response.text();
}

/**
 * 响应联系人请求
 * @param {number} fromUserId - 发送请求的用户ID
 * @param {number} toUserId - 接收请求的用户ID
 * @param {'accept' | 'reject'} action - 接受或拒绝请求
 * @returns {Promise<string>} - 成功消息
 */
async function respondContactRequest(
  fromUserId: number, 
  toUserId: number, 
  action: 'accept' | 'reject'
): Promise<string> {
  console.log(`Responding to contact request from ${fromUserId} to ${toUserId} with ${action}`);
  const response = await fetch('/api/contacts/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromUserId, toUserId, action }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to respond to contact request');
  }
  
  return response.text();
}

/**
 * 获取联系人列表
 * @param {number} userId - 用户ID
 * @returns {Promise<Array>} - 联系人列表
 */
async function getContacts(userId: number): Promise<Array<{id: number, name: string}>> {
  console.log(`Getting contacts for user ${userId}`);
  const response = await fetch(`/api/contacts?userId=${userId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get contacts');
  }
  
  return response.json();
}

/**
 * 获取待处理的联系人请求
 * @param {number} userId - 用户ID
 * @returns {Promise<Array>} - 待处理的联系人请求列表
 */
async function getContactRequests(userId: number): Promise<Array<{fromUserId: number, fromUserName: string}>> {
  console.log(`Getting contact requests for user ${userId}`);
  const response = await fetch(`/api/contacts/requests?userId=${userId}`);
  
  console.log(response.status)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get contact requests');
  }
  
  return response.json();
}

export {
  sendContactRequest,
  respondContactRequest,
  getContacts,
  getContactRequests
};
