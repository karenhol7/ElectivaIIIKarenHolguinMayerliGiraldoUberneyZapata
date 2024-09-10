import { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';

export const useFetchProducts = () => {
  const { products, isLoading, fetchProducts } = useProductContext();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
  };
};
