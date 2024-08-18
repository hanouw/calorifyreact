import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image"
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";


function Footer() {
    return(
        <footer>
            <Container fluid>
                <Row className="bg-primary text-white p4">
                    <Col className="mx-5">
                        <Stack>
                            <Image
                                src="/logo192.png"
                                alt="Company Logo"
                                rounded
                                width={100}
                                height={100}
                            />
                            <h2>Calorify</h2>
                            <p>영양성분을 핸드폰으로</p>
                        </Stack>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            여기도 한번 둘러보세요!
                            <NavLink href="/" className="text-white">Home</NavLink>
                            <NavLink href="/main" className="text-white">Service</NavLink>
                            <NavLink href="#" className="text-white">About</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contact us!</h4>
                        <p>seokhyunmoon@yonsei.ac.kr</p>
                        <p>Phone: </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;