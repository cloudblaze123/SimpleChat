// 模拟延时的 fetch 请求
function delay(data:object, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}

export { delay };