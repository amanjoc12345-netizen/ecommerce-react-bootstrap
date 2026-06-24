import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar bg="black" variant="dark" >
        <Container className="justify-content-center">
          <Nav className = "gap-5 fs-5 fw-bold" >
            <Nav.Link href="#" className="text-white">HOME</Nav.Link>
            <Nav.Link href="#"className="text-white">STORE</Nav.Link>
            <Nav.Link href="#"className="text-white">ABOUT</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        style={{
          backgroundColor: "grey",
          color: "white",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <h1 style={{ fontSize: "70px" }}>The Generics</h1>
      </div>
    </>
  );
}

export default Header;