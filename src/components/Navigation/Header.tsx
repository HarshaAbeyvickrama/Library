import React from "react";
import {Container, Nav, Navbar, NavbarBrand , NavLink} from "react-bootstrap";

const Header : React.FC = () => {
    return(
        <Navbar bg="light" variant="light" className="px-0 mx-0 py-3 justify-content-center fw-bold" sticky="top">
            <Container className="px-5" fluid={true}>
                <NavbarBrand href="/" className="fs-2">Library App</NavbarBrand>
                <Nav className="">
                    <NavLink href="/" className="me-4">Home</NavLink>
                    <NavLink href="/about" className="">About</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;
