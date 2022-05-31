import React from "react";
import {SocialIcon} from "react-social-icons";
import {Col, Container, Row} from "react-bootstrap";
import ServiceItem from "./ServiceItem";
import aboutImage from '../../assets/img/about.svg';

const About: React.FC = () => {
    return (
        <Container className="wrapper py-5 h-100 ps-0" fluid={true}>
            <Col className="py-5">
                <Row>
                    <Col lg={10} xs={8}>
                        <p className="mx-5 mb-2 ps-0 px-lg-1 w-auto">Web Developer</p>
                        <h2 className="mx-5 px-1">Harsha Abeyvickrama</h2>
                    </Col>
                    <Col lg={2} xs={4}>
                        <p className="hidden">.</p>
                        <SocialIcon url="https://github.com/HarshaAbeyvickrama"
                                    className="social-icon ms-2" bgColor="white"/>
                        <SocialIcon network="linkedin" url="https://www.linkedin.com/in/harshaabeyvickrama/"
                                    className="social-icon ms-2"/>
                        <SocialIcon url="https://api.whatsapp.com/send?phone=94711425085"
                                    className="social-icon ms-2"/>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col lg={6} xs={12}>
                        <h5 className="title-h5 mx-5">A Professional Web developer</h5>
                        <h2 className="mx-5 my-4">What I do</h2>
                        <ServiceItem text="Professional Web Designing"/>
                        <ServiceItem text="UI/UX Development"/>
                        <ServiceItem text="Wordpress Development"/>
                        <ServiceItem text="SEO"/>
                        <ServiceItem text="Software Development"/>
                        <ServiceItem text="B2B / B2C Software"/>
                    </Col>
                    <Col lg={6} xs={12}>
                        <h2 className="mx-5 my-4">Get in touch</h2>
                        <ServiceItem text="Tel : +94 71 1425 085"/>
                        <ServiceItem text="Location : No 8 , Malabe , Sri Lanka "/>
                        <img src={aboutImage} width={400} className="ms-5 mt-4"/>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
}

export default About;
