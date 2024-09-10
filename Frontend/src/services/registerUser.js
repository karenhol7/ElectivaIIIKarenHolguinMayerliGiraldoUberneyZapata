export const registerUser = async ({ name, email, password, avatar, bio }) => {
  const resp = await fetch("http://localhost:3000/api/user/singUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: name,
      email,
      password,
      avatar,
      bio,
    }),
  });

  return resp;
};
