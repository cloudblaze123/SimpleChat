async function login(){
  console.log("login");

  const response = await fetch("/api/login", {
    method: "POST",
  });
  const data = await response.json();
  const token = data.token;

  if (!token) {
    console.error("Failed to login");
  } else {
    console.log("Login successful");
  }
  
  return token;
}


export {
  login
}