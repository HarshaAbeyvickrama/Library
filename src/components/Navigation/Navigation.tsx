import React from "react";
import {Container, Nav, Navbar, NavbarBrand , NavLink} from "react-bootstrap";

const Navigation : React.FC = () => {
    return(
        <Navbar bg="dark" variant="dark" className="px-0 mx-0 py-3" sticky="top">
            <Container className="mx-0 px-md-5 px-3 w-100">
                <NavbarBrand href="/">Library App</NavbarBrand>
                <Nav className=" ">
                    <NavLink href="/" >Home</NavLink>
                    <NavLink href="/about" >About</NavLink>
                    <NavLink href="/contact" >Contact</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;
