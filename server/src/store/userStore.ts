interface User {
  id: number;
  name: string;
  contacts: number[];
  contactRequests: {
    incoming: Array<{ fromUserId: number, status: 'pending' | 'accepted' | 'rejected' }>;
    outgoing: Array<{ toUserId: number, status: 'pending' | 'accepted' | 'rejected' }>;
  };
}


const users: User[] = [
  {
    id: 1,
    name: "aaa",
    contacts: [],
    contactRequests: {
      incoming: [],
      outgoing: []
    }
  },
  {
    id: 2,
    name: "bbb",
    contacts: [],
    contactRequests: {
      incoming: [],
      outgoing: []
    }
  }
];


class UserStore {
  private users: User[] = users;

  private static instance: UserStore;


  private constructor() { }


  public static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }


  // 获取所有用户
  public getUsers(): User[] {
    return this.users;
  }


  // 获取单个用户
  public getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }


  // 添加新用户
  public addUser(name: string): User {
    const newUser: User = {
      id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
      name,
      contacts: [],
      contactRequests: {
        incoming: [],
        outgoing: []
      }
    };
    this.users.push(newUser);
    return newUser;
  }


  // 发送联系人请求
  public sendContactRequest(fromUserId: number, toUserId: number): boolean {
    const fromUser = this.getUser(fromUserId);
    const toUser = this.getUser(toUserId);

    if (!fromUser || !toUser) return false;

    // 检查是否已经是联系人
    if (fromUser.contacts.includes(toUserId)) {
      return false;
    }

    // 检查是否已有待处理的请求
    const existingRequest = fromUser.contactRequests.outgoing.find(r => r.toUserId === toUserId);
    if (existingRequest) {
      return false;
    }

    // 添加联系人请求
    fromUser.contactRequests.outgoing.push({ toUserId, status: 'pending' });
    toUser.contactRequests.incoming.push({ fromUserId, status: 'pending' });
    return true;
  }


  // 响应联系人请求
  public respondContactRequest(fromUserId: number, toUserId: number, action: 'accept' | 'reject'): boolean {
    const fromUser = this.getUser(fromUserId);
    const toUser = this.getUser(toUserId);

    if (!fromUser || !toUser) return false;

    // 查找待处理的请求
    const incomingRequestIndex = toUser.contactRequests.incoming.findIndex(
      r => r.fromUserId === fromUserId && r.status === 'pending'
    );

    if (incomingRequestIndex === -1) return false;

    // 更新请求状态
    let status: 'accepted' | 'rejected';
    if (action === 'accept') {
      status = 'accepted';
    } else {
      status = 'rejected';
    }
    toUser.contactRequests.incoming[incomingRequestIndex].status = status;

    // 更新发送方的请求状态
    const outgoingRequestIndex = fromUser.contactRequests.outgoing.findIndex(
      r => r.toUserId === toUserId && r.status === 'pending'
    );
    fromUser.contactRequests.outgoing[outgoingRequestIndex].status = status;

    // 如果接受请求，添加为联系人
    if (action === 'accept') {
      fromUser.contacts.push(toUserId);
      toUser.contacts.push(fromUserId);
    } else if (action === 'reject') {
      // 如果拒绝请求，移除请求
      fromUser.contactRequests.outgoing.splice(outgoingRequestIndex, 1);
      toUser.contactRequests.incoming.splice(incomingRequestIndex, 1);
    }
    return true;
  }


  // 获取联系人列表
  public getContacts(userId: number): User[] {
    const user = this.getUser(userId);
    if (!user) return [];
    return user.contacts.map(contactId => this.getUser(contactId)).filter(Boolean) as User[];
  }


  // 获取待处理的联系人请求
  public getPendingContactRequests(userId: number): Array<{ fromUserId: number, fromUserName: string }> {
    const user = this.getUser(userId);
    if (!user) return [];
    return user.contactRequests.incoming
      .filter(r => r.status === 'pending')
      .map(r => {
        const fromUser = this.getUser(r.fromUserId);
        return {
          fromUserId: r.fromUserId,
          fromUserName: fromUser?.name || ''
        };
      });
  }
}


export default UserStore.getInstance();
