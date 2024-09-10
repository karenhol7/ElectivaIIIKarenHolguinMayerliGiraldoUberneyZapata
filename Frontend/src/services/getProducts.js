export const getProducts = async (token, criteria = {}) => {
    const queryString = new URLSearchParams(criteria).toString();
    const url = `http://localhost:3000/api/product/searchProduct?${queryString}`;
    
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
      const { products } = await resp.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; 
    }
  };
  
  export const getProductDetails = async (idProduct, token) => {
    const url = `http://localhost:3000/api/product/productDetails/${idProduct}`;
    
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
        throw new Error('Failed to fetch product details');
      }
      const { product } = await resp.json();
      return product;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error; 
    }
  };
  