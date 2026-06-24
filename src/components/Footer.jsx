import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer py-4 mt-5">
      <Container className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h1 className="footer-title m-0 text-white">The Generics</h1>
        <div className="footer-icons">
          <ul className="d-flex list-unstyled m-0 gap-4">
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://prasadyash2411.github.io/ecom-website/img/6260efc8fc9a9002669d2f4ad9956cc0.jpg"
                  alt="YouTube"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </a>
            </li>
            <li>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://prasadyash2411.github.io/ecom-website/img/Spotify%20Logo.png"
                  alt="Spotify"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://prasadyash2411.github.io/ecom-website/img/Facebook%20Logo.png"
                  alt="Facebook"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
