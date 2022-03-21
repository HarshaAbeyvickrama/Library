import React from "react";
import {Container, Nav, Navbar, NavbarBrand , NavLink} from "react-bootstrap";

const Navigation : React.FC = () => {
    return(
        <Navbar bg="dark" variant="dark" className="px-0 mx-0 py-3 justify-content-center" sticky="top">
            <Container className="mx-0 px-0">
                <NavbarBrand href="/" className="">Library App</NavbarBrand>
                <Nav className="">
                    <NavLink href="/" >Home</NavLink>
                    <NavLink href="/about" >About</NavLink>
                    <NavLink href="/contact" >Contact</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;
