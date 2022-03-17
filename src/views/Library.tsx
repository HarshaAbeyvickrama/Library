import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "../components/Welcome/Welcome";
import BookForm from "../components/Book/BookForm";
import AuthorSection from "../components/Author/AuthorSection";

const Library: React.FC = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs={12} className="px-0">
                    <Welcome/>
                </Col>
                <Col lg={{order: 1, span: 6}} md={{order: 2, span: 12}} xs={{order: 2, span: 12}}
                     className="px-md-5 p-3">
                    <AuthorSection authors={null} handleSetAuthors={()=>{}} />
                </Col>
                <Col lg={{order: 2, span: 6}} md={{order: 1, span: 12}} xs={{order: 1, span: 12}}
                     className="px-md-5 p-3">
                    {/*<BookForm onFormClose={()=>{}} options={[]} />*/}
                </Col>
            </Row>
        </Container>
    )
}
export default Library;
