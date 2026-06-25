import { useContext } from "react";
import CartContext from "../store/CartContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productsArr } from "../data/products";

function Products() {
  const cartCtx = useContext(CartContext);
  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-5" style={{ letterSpacing: "2px" }}>MUSIC</h2>

      <Row className="g-4 justify-content-center">
        {productsArr.map((product, index) => (
          <Col sm={6} md={6} lg={4} xl={3} key={index} className="d-flex justify-content-center">
            <Card className="product-card p-3 border-0 text-center" style={{ width: "17rem" }}>
              <Link to={`/store/${product.id}`} className="text-decoration-none text-dark">
                <Card.Title className="fw-bold fs-5 mb-3 text-truncate product-title-link">{product.title}</Card.Title>
              </Link>
              <div className="overflow-hidden rounded-3 mb-3" style={{ height: "200px" }}>
                <Link to={`/store/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    alt={product.title}
                    className="product-image w-100 h-100"
                    style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  />
                </Link>
              </div>
              <Card.Body className="p-0 mt-2 d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-semibold">${product.price}</span>
                <Button
                  variant="info"
                  onClick={() => cartCtx.addItem(product)}
                >
                  ADD TO CART
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;