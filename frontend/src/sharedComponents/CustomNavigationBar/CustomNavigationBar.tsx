// NavigationBar.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavigationBar = () => {
    return (
        <>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="/home">LT-AI</Navbar.Brand>
            <Nav className="me-auto">
              <NavDropdown title="Services" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/Cover-Letter">AI Cover Letter Generator</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
}

export default CustomNavigationBar