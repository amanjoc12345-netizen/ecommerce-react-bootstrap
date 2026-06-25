import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/CartContext";

function Header({ handleShow }) {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 sticky-top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-5 custom-nav">
              <Nav.Link as={NavLink} to="/" end className="text-white">
                HOME
              </Nav.Link>

              <Nav.Link as={NavLink} to="/store" className="text-white">
                STORE
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" className="text-white">
                ABOUT
              </Nav.Link>

              <Nav.Link as={NavLink} to="/movies" className="text-white">
                MOVIES
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

      <div className="brand-banner d-flex flex-column align-items-center">
        <h1 className="brand-title">The Generics</h1>
        {isHomePage && (
          <>
            <button className="latest-album">Get our Latest Album</button>
            <button className="play-btn">►</button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;