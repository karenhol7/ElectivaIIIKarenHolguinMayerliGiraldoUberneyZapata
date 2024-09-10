import {useEffect, useState} from 'react'
import {getProductDetails} from '../services/getProducts'
import { useAuth } from '../components/auth/AuthProvider';

export const useFetchProductsDetails = (idProduct) => {
    const[product, setProduct] = useState([]);
    const[isLoading, setIsLoading] = useState(true); 
    const auth = useAuth();

    const getAllProducts = async () => {
        const token = auth.getToken();
        const product = await getProductDetails(idProduct,token);
        setProduct(product);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllProducts()
    }, []);

    return {
        product,
        isLoading
    }
}