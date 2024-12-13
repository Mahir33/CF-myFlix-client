import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router";

const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {user && (
              <>
                <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                <Nav.Link as={Link} to="/users">Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={onLoggedOut}>Log Out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;