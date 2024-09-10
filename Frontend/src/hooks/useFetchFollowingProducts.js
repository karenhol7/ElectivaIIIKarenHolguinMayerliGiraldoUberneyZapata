import { useEffect, useState } from 'react';
import { getFollowingsProducts } from '../services/getFollowingsProducts';

export const useFetchFollowingProducts = (token) => {
  const [followerProducts, setFollowerProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowingProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getFollowingsProducts(token);
      setFollowerProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user products:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowingProducts();
  }, [token]);

  return {
    followerProducts,
    isLoading,
  };
};
