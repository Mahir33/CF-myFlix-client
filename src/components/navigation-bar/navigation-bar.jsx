import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router";

const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <>
    <Navbar bg="middle" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Flix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr style={{marginTop: "0"}}/>
    </>
  );
};

export default NavigationBar;