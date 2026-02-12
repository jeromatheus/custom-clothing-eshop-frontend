import { type ReactNode } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { cartCount } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-uppercase">

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"></Nav.Link>
              <Nav.Link href="/"></Nav.Link>
              <Nav.Link href="/"></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/carrito" className="position-relative">
                <i className="bi bi-cart-fill text-white fs-5"></i>
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow-1 py-4 bg-light">{children}</main>

      {/* --- FOOTER --- */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;