import { Link } from "react-router-dom";
import "./ProductGridItem.css";

export const ProductGridItem = ({ name, description, image, tags, _id }) => {
  return (
    <div className="product-grid-item">
      <div>
        <img src={image}/>
      </div>
      <Link className="product-link" to={`/product-detail/${_id}`}>
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{description}</p>
          <div className="product-tags">
            {tags.map((tag, index) => (
              <span className="product-tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
