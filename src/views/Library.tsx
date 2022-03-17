import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "../components/Welcome/Welcome";
import AuthorSection from "../components/Author/AuthorSection";
import BookSection from "../components/Book/BookSection";
import {IAuthor} from "../types/IAuthor";

const Library: React.FC = () => {
    //Author list
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    //Handle set authors function
    const handleOnSetAuthors = (newAuthors :IAuthor[]) => {
        setAuthors(newAuthors);
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col xs={12} className="px-0">
                    <Welcome/>
                </Col>
                <Col lg={{order: 1, span: 6}} md={{order: 2, span: 12}} xs={{order: 2, span: 12}}
                     className="px-md-5 p-3">
                    <BookSection/>
                </Col>
                <Col lg={{order: 2, span: 6}} md={{order: 1, span: 12}} xs={{order: 1, span: 12}}
                     className="px-md-5 p-3">
                    <AuthorSection authors={authors} onSetAuthors={handleOnSetAuthors}/>
                </Col>
            </Row>
        </Container>
    )
}
export default Library;
