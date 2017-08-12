import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" className="kiosk-logo">
              kiosk
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight onSelect={this.handleSelect}>
            <NavDropdown
              eventKey="1"
              title={this.props.account}
              id="nav-dropdown"
            >
              <MenuItem href="/products">Products</MenuItem>
              <MenuItem href="/orders">Orders</MenuItem>
              <MenuItem>Balance: {this.props.balance}</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;