export const getProductsByUser = async (userId, token) => {
    const url = `http://localhost:3000/api/product/searchProduct/${userId}`;
    
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
        throw new Error('Failed to fetch user products');
      }
      const { products } = await resp.json();
      return products;
    } catch (error) {
      console.error('Error fetching user products:', error);
      throw error;
    }
  };
  