export const LogIn = async ({ name, password }) => {
    const resp = await fetch("http://localhost:3000/api/user/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        password,
      }),
    });
  
    return resp;
  };
  