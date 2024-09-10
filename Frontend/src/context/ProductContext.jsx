import React, { createContext, useContext, useState, useCallback } from 'react';
import { getProducts } from '../services/getProducts';
import { useAuth } from '../components/auth/AuthProvider';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  const fetchProducts = useCallback(async (criteria = {}) => {
    setIsLoading(true);
    const token = auth.getToken();
    const products = await getProducts(token, criteria);
    setProducts(products);
    setIsLoading(false);
  }, [auth]);

  return (
    <ProductContext.Provider value={{ products, isLoading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
