import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "./LogoPreflight.png";
import "./global.css";

const NavBar = () => {
  return (
    <Navbar bg="grey" expand="lg" style={{ backgroundColor: "#e3f2fd" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="My Photo App Logo" style={{ height: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* You can add other left-aligned links here if needed */}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/instructor">
              Instructor
            </Nav.Link>
            <Nav.Link as={Link} to="/creator">
              Creator
            </Nav.Link>
            <Nav.Item>
              <Button
                as={Link}
                to="/upload"
                variant="outline-primary"
                className="btn-lg Button1"
              >
                Start Upload
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
