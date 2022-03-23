import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

const Footer : React.FC = () => {
    return(
        <Navbar bg="dark" variant="dark" className="px-0 mx-0 py-3 justify-content-center">
            <Container className="mx-0 px-0 d-flex justify-content-end">
                <Nav className="">
                    <div className="text-light">Made with ❤️ by VH</div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Footer;
