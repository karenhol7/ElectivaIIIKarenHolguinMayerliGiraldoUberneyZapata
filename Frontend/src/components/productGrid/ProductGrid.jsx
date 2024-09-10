import { ProductGridItem } from '../productGridItem/ProductGridItem';
import './ProductGrid.css';

export const ProductGrid = ({ products, isLoading }) => {
  return (
    <div className="product-grid">
      <div className="product-grid-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : products?.length === 0 ? (
          <p>Products not Found</p>
        ) : (
          products?.map((product) => (
            <ProductGridItem key={product._id} {...product} />
          ))
        )}
      </div>
    </div>
  );
};
