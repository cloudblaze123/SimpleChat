import { login as loginApi } from "@/apis/auth";


async function login() {
  const token = await loginApi()
  localStorage.setItem("token", token)
}


export {
  login
}