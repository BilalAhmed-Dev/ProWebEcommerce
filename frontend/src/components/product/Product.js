import { Link } from "react-router-dom";
import classes from "../Home.module.css";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3 `}>
      <div className={`card p-3 rounded ${classes.shadow} ${classes.card}`}>
        {product.images ? (
          <img
            alt="img of memory card"
            className="card-img-top mx-auto"
            src={product.images[0].url}
          />
        ) : (
          <h1>Did not implement image upload yet.</h1>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">( {product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link
            to={`/products/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
