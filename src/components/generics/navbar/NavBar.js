import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">App Exchange</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/home">Inicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/buy">Comprar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/offer">Ofertar</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Opciones
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Perfil
                </DropdownItem>
                <DropdownItem>
                  Configuración
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Desconectarse
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
