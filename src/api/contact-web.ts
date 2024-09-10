async function getContactsOf(userId:string):Promise<string[]> {
    const response = await fetch('/api/contacts/' + userId)
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        return data
    }
    return []
}


export { getContactsOf }