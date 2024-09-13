# 如何利用 vuex 实现在获取新数据的同时自动更新本地储存的数据

> 类似于 PWA 中利用 Service Worker 对请求进行拦截的做法

## 问题复现  

假设应用在运行过程中需要获取一些数据  
在获取完后，还需要将数据保存到本地，以便在断网或者重启应用后也能使用这些数据  

根据上述需求，我们可能会建立如下运行模型：

1. 需要使用数据的模块A
2. 获取数据的api
3. 保存数据的模块B

使用图（'>'表示调用关系）：

|   | 调用关系      | 目的     |
| --| ------------- | ------- |
| 1 | 模块A > api   | 获取数据 | 
| 2 | 模块A > 模块A  | 消费数据 |
| 3 | 模块A > 模块B  | 储存数据 |

## 问题分析

上述模型中，为了保证新数据能同步到本地，模块A 需要：  
1. 获取数据，然后消费
2. 消费完后通过模块B 保存数据（或者先保存再消费）  

可以看出，为了达成上述需求，每个类似于模块A 的数据消费者（模块）在获取并消费完数据后，都需要重复一遍这样数据的储存过程。  
无形中为消费数据添加了额外负担。

进一步观察，我们可以发现，每个消费者消费完数据后储存数据的过程。其实大同小异。那么有没有办法可以减轻这部分工作量呢？

有的。

在 PWA （渐进式 Web 应用） 中，为了能让用户在断网时也能访问应用，会使用一个叫 Service Worker 的技术来拦截页面的fetch请求：  

- 当页面发起fetch请求后，Service Worker 会先检查本地缓存中是否有该请求的响应，  

  -  如果有，则直接返回缓存的响应。  

  -  如果没有，则会向服务器请求数据，并缓存到本地。当缓存完成（或者异步缓存）后，返回数据给调用方。

整个过程中，fetch发起方不需要了解如何缓存数据，只需要简单地发出fetch请求，背后 Service Worker 会自动缓存未缓存过的数据。  

仅凭描述过程，可能只有模糊的感受，下面我们来看看 service worker 拦截并插入缓存过程的实现代码。

> 以下代码出自 Mozilla Developer Network 的 Service Worker 文档关于如何通过 Service Worker 缓存请求、并返回缓存的响应的代码示例（添加了额外的注释）：

```javascript
// 监听 fetch 请求事件。
// 发生 fetch 请求事件时，如果请求的url在 precachedResources 列表（需要缓存的资源列表）中，则使用 cacheFirst 方法拦截请求。
self.addEventListener("fetch", (event) => {
  if (precachedResources.includes(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
  }
});

// 定义 cacheFirst 方法
async function cacheFirst(request) {
  // 首先检查本地缓存中是否有该请求的响应
  const cachedResponse = await caches.match(request);
  // 如果有（缓存命中），则直接返回缓存的响应。
  if (cachedResponse) {
    return cachedResponse;
  }

  // 如果没有（缓存未命中）则向服务器请求数据，并缓存到本地。
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 将服务器响应缓存到本地
      const cache = await caches.open("MyCache_1");
      cache.put(request, networkResponse.clone());
    }
    // 返回响应结果给 fetch发起方。
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}
```

以上便是 PWA 中如何利用 Service Worker 拦截请求以插入缓存过程代码。

<br>

在 vuex 中，也可以有类似的实现

> 以下代码来自 YesPlayMusic 项目（省略了部分代码，并添加了注释）

拦截请求：

```javascript
// from YesPlayMusic\src\store\actions.js

// ...一些导入

// 导入验证用户身份的工具函数
import { isAccountLoggedIn } from '@/utils/auth';

import {
  // ...一些导入
  likedArtists,
} from '@/api/user';

export default {
  // ...一些代码

  // 获取用户 likedArtists 列表的方法
  fetchLikedArtists: ({ commit }) => {
    // 验证用户是否登录，如果未登录则不执行
    if (!isAccountLoggedIn()) return;
    
    // 调用获取 likedArtists 列表的api
    // 获取到数据后，调用 commit 方法，将数据更新到 store 中
    return likedArtists({ limit: 2000 }).then(result => {
      if (result.data) {
        commit('updateLikedXXX', {
          name: 'artists',
          data: result.data,
        });
      }
    });
  },
  
  // ...一些代码
};
```

同步数据到 localStorage：

```javascript
// from YesPlayMusic\src\store\plugins\localStorage.js
// 导出一个用于在 store 数据更新时，将数据同步到 localStorage 的插件
// 相当于前述的 PWA 中， Service Worker 将新数据写入缓存的过程。
export default store => {
  store.subscribe((mutation, state) => {
    // console.log(mutation);
    localStorage.setItem('settings', JSON.stringify(state.settings));
    localStorage.setItem('data', JSON.stringify(state.data));
  });
};
```

通过以上代码，就能用 vuex 实现在获取新数据的同时自动更新本地储存的数据。

> 如果你仔细看，会发现 fetchLikedArtists 方法并没有像 PWA 的 Service Worker 一样，在请求前先查找缓存中的数据  

> 这是因为 localStorage 插件的存在，每次调用 fetchLikedArtists 方法时，vuex 都会将数据同步更新到 artists 属性和 localStorage 中，  
即 vuex 中的 artists 属性始终与 localStorage 中的 artists 数据保持同步，  
即 vuex.artists == localStorage.artists。  

> 所以可以将 vuex.artists 看做是本地缓存在内存中的版本（类似于影子分身）。  
当组件模版中用到 vuex.artists 时，实际上便是在使用和本地缓存一样的数据（直到应用或组件调用 fetchLikedArtists 方法更新 vuex.artists 属性为止，因为 IO 操作需要的时间较长，所以比起vuex.artists 属性，本地缓存会短暂滞后）。