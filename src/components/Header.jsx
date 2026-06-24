import { useContext } from "react";
import CartContext from "../store/CartContext";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";

function Header({ handleShow }) {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 sticky-top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-5 custom-nav">
              <Nav.Link className="text-white">
                HOME
              </Nav.Link>

              <Nav.Link className="text-white fw-bold" active>
                STORE
              </Nav.Link>

              <Nav.Link className="text-white">
                ABOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Button
            variant="outline-info"
            className="cart-btn d-flex align-items-center"
            onClick={handleShow}
          >
            Cart
            <Badge bg="info" className="text-dark ms-2 fw-bold">
              {cartCount}
            </Badge>
          </Button>
        </Container>
      </Navbar>

      <div className="brand-banner">
        <h1 className="brand-title">The Generics</h1>
      </div>
    </>
  );
}

export default Header;