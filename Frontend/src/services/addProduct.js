export const addProduct = async (token,{
  userId,
  name,
  description,
  category,
  url,
  image,
  tags,
}) => {
  const resp = await fetch("http://localhost:3000/api/product/saveProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${token}`
    },
    body: JSON.stringify({
      userId,
      name,
      description,
      category,
      url,
      image,
      tags,
    }),
  });

  return resp;
};
