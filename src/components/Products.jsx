import { Container, Row, Col, Card, Button } from "react-bootstrap";

const productsArr = [
  {
    title: "Album 1",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Album 2",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Album 3",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Album 4",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

function Products() {
  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-5" style={{ letterSpacing: "2px" }}>MUSIC</h2>

      <Row className="g-4 justify-content-center">
        {productsArr.map((product, index) => (
          <Col sm={6} md={6} lg={4} xl={3} key={index} className="d-flex justify-content-center">
            <Card className="product-card p-3 border-0 text-center" style={{ width: "17rem" }}>
              <Card.Title className="fw-bold fs-5 mb-3 text-truncate">{product.title}</Card.Title>
              <div className="overflow-hidden rounded-3 mb-3" style={{ height: "200px" }}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-image w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Card.Body className="p-0 mt-2 d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-semibold">${product.price}</span>
                <Button 
                  variant="info" 
                  className="fw-bold text-white px-3 py-2" 
                  style={{ backgroundColor: "#56ccf2", border: "none" }}
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