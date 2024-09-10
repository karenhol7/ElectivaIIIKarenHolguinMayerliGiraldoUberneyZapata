import { Link, useParams } from "react-router-dom";
import { NavbarComponent } from "../../../components/navbar/NavbarComponent";
import { useFetchProductsDetails } from "../../../hooks/useFetchProductsDetails";
import { Star } from "../../../components/star-rating/StarRating";
import "./ProductDetail.css";
import { useAuth } from "../../../components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { createComment } from "../../../services/createComent";

export const ProductDetail = () => {
  const { id } = useParams();
  const { product, isLoading } = useFetchProductsDetails(id);
  const { detailProduct, commentsProduct } = product || {};

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentList, setCommentList] = useState(commentsProduct || []);
  const auth = useAuth();
  const user = auth.getUserInfo();

  useEffect(() => {
    if (commentsProduct) {
      setCommentList(commentsProduct);
    }
  }, [commentsProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.getUserInfo();
      const resp = await createComment(auth.getToken(), {
        productId: id,
        userId: user._id,
        comment,
        rate: rating,
      });

      console.log(resp);

      if (resp.ok) {
        setComment("");
        setRating(0);
        setCommentList([
          ...commentList,
          {
            content: comment,
            userId: { userName: user.userName },
            rate: rating,
          },
        ]);
        console.log(commentList);
      } else {
        console.error("Error al enviar el comentario");
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} filled />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" filled={false} />);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} filled={false} />);
    }

    return stars;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NavbarComponent>
      <div className="container">
        <div className="product-detail-container">
          <div className="product-info-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src={detailProduct?.image}
                alt={detailProduct?.name}
              />
            </div>
            <div className="product-info">
              <h1 className="product-name-detail">{detailProduct?.name}</h1>
              <p className="product-description-detail">
                {detailProduct?.description}
              </p>
              <p className="product-description-detail">
                {commentList?.length} Reviews
              </p>
              <div className="product-rating">
                <span>Rating: </span>
                {renderStars(detailProduct?.rate)}
              </div>
              <a
                href={detailProduct?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View Product
              </a>
            </div>
          </div>
          <div className="comments-container">
            <h2 className="comments-title">Customer Reviews</h2>
            <div className="comments-list">
              {commentList?.map((comment, index) => (
                <div className="comment" key={index}>
                  <Link
                    to={`/profile/${comment.userId._id}`}
                    state={{ user: comment.userId }}
                  >
                    By: {comment.userId.userName}
                  </Link>
                  <p className="comment-content">{comment.content}</p>
                  <p className="comment-rate">Rating: {comment.rate}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="add-comment-container">
            <h2 className="add-comment-title">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="add-comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment"
                className="comment-textarea"
                required
              />
              <div className="rating-input">
                <label>Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </NavbarComponent>
  );
};
