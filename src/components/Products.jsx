import { Container, Row, Col, Card, Button } from "react-bootstrap";

const productsArr = [

{

title: 'Album 1',

price: 100,

imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',

},

{

title: 'Album 2',

price: 50,

imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',

},

{

title: 'Album 3',

price: 70,

imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',

},

{

title: 'Album 4',

price: 100,

imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',

}

]
function Products() {
  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold mb-5">MUSIC</h2>

      <Row>
        {productsArr.map((product, index) => (
          <Col md={6} key={index} className="mb-5 text-center">
            <h4>{product.title}</h4>

            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: "250px", height: "250px" }}
            />

            <div className="mt-3 d-flex justify-content-around">
              <h5>${product.price}</h5>

              <Button variant="info">
                ADD TO CART
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;