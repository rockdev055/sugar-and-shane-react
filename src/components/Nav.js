import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from "react-router-bootstrap"

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>PoshBin</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/new-item">
          <Nav.Link>New Item</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/items">
          <Nav.Link>Items</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}
