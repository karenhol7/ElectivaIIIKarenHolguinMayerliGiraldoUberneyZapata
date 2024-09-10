import { useFetchFollowingProducts } from '../../hooks/useFetchFollowingProducts';
import { useAuth } from "../../components/auth/AuthProvider";
import { NavbarComponent } from '../../components/navbar/NavbarComponent';
import { ProductGrid } from '../../components/productGrid/ProductGrid';
import './Network.css'; // Asegúrate de agregar estilos CSS

export const NetworkComponent = () => {
  const auth = useAuth();
  const { followerProducts, isLoading } = useFetchFollowingProducts(auth.getToken());

  // Aplanar la estructura de los productos
  const flattenedProducts = followerProducts.reduce((acc, follower) => {
    const userProducts = follower.user.products.map(product => ({
      ...product,
      userName: follower.user.name,
    }));
    return [...acc, ...userProducts];
  }, []);

  return (
    <NavbarComponent>
      <div className="container">
        <h3 className="product-grid-title">Products from Followings</h3>
        {followerProducts.map(follower => (
          <div key={follower.user.id} className="follower-section">
            <h4>{follower.user.name}</h4>
            <ProductGrid products={follower.user.products} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </NavbarComponent>
  );
};
