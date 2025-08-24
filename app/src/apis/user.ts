/**
 * 注册新用户
 * @param {string} name - 用户名
 * @returns {Promise<Response>} - 包含注册结果的响应
 */
async function registerUser(name: string) {
  console.log(`Registering user: ${name}`);
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return response;
}

/**
 * 获取单个用户信息
 * @param {number} id - 用户ID
 * @returns {Promise<Object>} - 包含用户信息的对象
 */
async function getUser(id: number) {
  console.log(`Getting user with id: ${id}`);
  const response = await fetch(`/api/user?id=${id}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user');
  }
  
  return data.user;
}

/**
 * 获取所有用户列表
 * @returns {Promise<Array>} - 用户数组
 */
async function getUsers() {
  console.log('Getting all users');
  const response = await fetch('/api/users');
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get users');
  }
  
  return data.users;
}

export {
  registerUser,
  getUser,
  getUsers
};
