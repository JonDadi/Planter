import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const PlantNavBar = () => (
  <Navbar expand="lg" className="navbar-dark bg-dark">
    <LinkContainer to="/">
      <Navbar.Brand href="/">Plöntusíðan</Navbar.Brand>
    </LinkContainer>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <LinkContainer to="/locations">
        <Nav.Link>Staðir</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/plants">
        <Nav.Link>Plöntur</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/plants/createEdit">
        <Nav.Link>Ný planta</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/produce">
        <Nav.Link>Uppskerur</Nav.Link>
      </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default PlantNavBar;