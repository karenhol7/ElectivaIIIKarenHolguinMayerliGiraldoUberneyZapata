export const createComment = async(token,{
    productId, 
    userId, 
    comment, 
    rate
}) => {
    const resp = await fetch("http://localhost:3000/api/comment/createComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${token}`
    },
    body: JSON.stringify({
        productId, 
        userId, 
        comment, 
        rate
    }),
  });

  return resp;
}