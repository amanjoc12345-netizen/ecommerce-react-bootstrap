import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge, ProgressBar } from "react-bootstrap";
import CartContext from "../store/CartContext";
import { productsArr } from "../data/products";

// Star rating SVG component
const RatingStars = ({ rating }) => {
  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#ffc107" : "#e4e5e9"}
          stroke={star <= rating ? "#ffc107" : "#b0b3b8"}
          strokeWidth="1.5"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z" />
        </svg>
      ))}
    </div>
  );
};

function ProductDetails() {
  const { productId } = useParams();
  const cartCtx = useContext(CartContext);

  // Find product by id
  const product = productsArr.find((p) => p.id === productId);

  // State for active image
  const [selectedImage, setSelectedImage] = useState(product?.imageUrl || "");

  // Reset selected image when productId changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
    }
  }, [productId, product]);

  // Image zoom state and handlers
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <Container className="my-5 py-5 text-center">
        <h3 className="mb-4 text-danger">Product Not Found</h3>
        <p className="text-muted">The product you are looking for does not exist or has been removed.</p>
        <Link to="/store">
          <Button variant="info" className="text-white fw-bold px-4 rounded-pill">
            Back to Store
          </Button>
        </Link>
      </Container>
    );
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)",
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  // Review calculations
  const reviews = product.reviews || [];
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  // Star counts for progress bars
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });

  // Unique avatar color based on user name
  const getAvatarColor = (name) => {
    const colors = ["#ff6b6b", "#4dabf7", "#51cf66", "#fcc419", "#ff922b", "#cc5de8", "#845ef7"];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  return (
    <Container className="my-5 py-3">
      {/* Breadcrumb / Back Button */}
      <div className="mb-4">
        <Link to="/store" className="text-decoration-none text-info fw-semibold d-inline-flex align-items-center gap-1 back-link">
          <span>&larr;</span> Back to Store
        </Link>
      </div>

      <Row className="g-5">
        {/* Left Side: Images */}
        <Col lg={6}>
          <div
            className="main-image-zoom-container overflow-hidden rounded-4 border bg-white cursor-zoom-in"
            style={{ height: "420px", position: "relative" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage}
              alt={product.title}
              className="w-100 h-100"
              style={{
                objectFit: "contain",
                transition: isZoomed ? "none" : "transform 0.3s ease, transform-origin 0.3s ease",
                ...zoomStyle,
              }}
            />
          </div>

          {/* Thumbnail images */}
          <Row className="g-3 mt-1">
            {product.images.map((imgUrl, idx) => (
              <Col xs={3} key={idx}>
                <div
                  className={`thumbnail-wrapper rounded-3 overflow-hidden border ${
                    selectedImage === imgUrl ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ height: "80px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <img
                    src={imgUrl}
                    alt={`thumbnail-${idx}`}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Right Side: Product Information */}
        <Col lg={6} className="d-flex flex-column justify-content-between">
          <div>
            <Badge bg="secondary" className="mb-2 text-uppercase letter-spacing-1">
              Music Album
            </Badge>
            <h1 className="fw-bold display-5 mb-2">{product.title}</h1>

            {/* Quick rating view */}
            {totalReviews > 0 && (
              <div className="d-flex align-items-center gap-2 mb-3">
                <RatingStars rating={Math.round(parseFloat(averageRating))} />
                <span className="fw-semibold mt-1">{averageRating} out of 5</span>
                <span className="text-muted mt-1">({totalReviews} reviews)</span>
              </div>
            )}

            {/* Price tag */}
            <div className="price-tag fs-2 fw-bold text-info mb-4">
              ${product.price}
            </div>

            <hr className="my-4" />

            {/* Description */}
            <h5 className="fw-bold mb-3">Description</h5>
            <p className="text-secondary lh-lg mb-4" style={{ fontSize: "1.05rem" }}>
              {product.description}
            </p>
          </div>

          <div>
            <Button
              variant="info"
              size="lg"
              className="text-white fw-bold px-5 py-3 w-100 w-sm-auto rounded-pill shadow-sm add-to-cart-btn"
              onClick={() => cartCtx.addItem(product)}
            >
              ADD TO CART
            </Button>
          </div>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5 pt-5">
        <Col lg={12}>
          <h3 className="fw-bold mb-4">Customer Reviews</h3>
        </Col>

        {/* Review Aggregate Summary */}
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm p-4 text-center bg-white rounded-4">
            <h1 className="display-3 fw-bold text-warning mb-0">{averageRating}</h1>
            <div className="d-flex justify-content-center my-2">
              <RatingStars rating={Math.round(parseFloat(averageRating))} />
            </div>
            <p className="text-muted mb-4">{totalReviews} customer reviews</p>

            {/* Distribution bars */}
            <div className="w-100 text-start">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <Row key={stars} className="align-items-center g-2 mb-2">
                    <Col xs={2} className="text-muted small fw-semibold">
                      {stars} star
                    </Col>
                    <Col xs={7}>
                      <ProgressBar
                        now={percentage}
                        variant="warning"
                        style={{ height: "8px" }}
                        className="rounded-pill bg-light"
                      />
                    </Col>
                    <Col xs={3} className="text-muted small text-end fw-semibold">
                      {Math.round(percentage)}%
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Card>
        </Col>

        {/* Review Comments list */}
        <Col md={8}>
          {reviews.length === 0 ? (
            <Card className="border-0 shadow-sm p-5 text-center text-muted bg-white rounded-4">
              <p className="fs-5 mb-0">No reviews yet for this album.</p>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-3">
              {reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm p-4 bg-white rounded-4 review-card">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor: getAvatarColor(review.user),
                        }}
                      >
                        {review.user.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">{review.user}</h6>
                        <span className="text-muted small">{review.date}</span>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-3 mb-0 text-secondary lh-base">
                    {review.comment}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
