// 登陆成功，返回用户id
// 登陆失败，返回空字符串
async function login(email: string, password: string): Promise<string> {
    // console.log('login', email, password)
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    if(response.ok){
        const id = await response.text()
        return id
    }
    return ''
}

export { login }