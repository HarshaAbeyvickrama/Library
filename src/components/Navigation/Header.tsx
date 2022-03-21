import React from "react";
import {Container, Nav, Navbar, NavbarBrand , NavLink} from "react-bootstrap";

const Header : React.FC = () => {
    return(
        <Navbar bg="dark" variant="dark" className="px-0 mx-0 py-3 justify-content-center" sticky="top">
            <Container className="px-5" fluid={true}>
                <NavbarBrand href="/" className="">Library App</NavbarBrand>
                <Nav className="">
                    <NavLink href="/" className="me-4">Home</NavLink>
                    <NavLink href="/about" className="me-4">About</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
