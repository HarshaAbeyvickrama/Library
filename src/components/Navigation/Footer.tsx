import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

const Footer : React.FC = () => {
    return(
        <Navbar bg="light" variant="light" className="px-0 mx-0 py-3 justify-content-center shadow ">
            <Container className="px-5 d-flex justify-content-end" fluid={true}>
                <Nav className="">
                    <div className="text-dark">Made with ❤️ by VH</div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Footer;
