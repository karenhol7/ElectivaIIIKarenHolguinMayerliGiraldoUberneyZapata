export const getFollowingsProducts = async (token) => {
  const url = `http://localhost:3000/api/product/followers/products`;
  console.log(token)

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
  };

  try {
    const resp = await fetch(url, requestOptions);
    if (!resp.ok) {
      throw new Error('Failed to fetch products');
    }
    const followerProducts = await resp.json();
    console.log(followerProducts);
    return followerProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
