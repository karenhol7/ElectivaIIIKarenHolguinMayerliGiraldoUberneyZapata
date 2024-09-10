import { useEffect, useState } from 'react';
import { getProductsByUser } from '../services/getProductsByUser';

export const useFetchUserProducts = (userId, token) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProductsByUser(userId, token);
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user products:', error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProducts();
    }
  }, [userId]);

  return {
    products,
    isLoading,
  };
};
