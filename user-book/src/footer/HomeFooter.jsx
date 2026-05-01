import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import sellImage from '../assets/sell-image.svg';
import advertiseImage from '../assets/advertise-image.svg';
import giftCardImage from '../assets/gift-cards-image.svg';
import helpCenterImage from '../assets/help-centre-image.svg';
import payment1 from '../assets/payment-method1.svg';


function HomeFooter() {
    return (
        <Container fluid className="mt-5 py-4 bg-dark text-light" >
            <Row className=" justify-content-evenly">
                <Col xs={6} md={2} className="mb-3">
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787', marginLeft:'15px'}}>ABOUT</h5>
                    <Nav className="flex-column ">
                        <Nav.Link as={Link} to="/" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Contact Us</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Careers</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Flipkart Stories</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Press</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Corporate Information</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3">
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787', marginLeft:'15px' }}>GROUP COMPANIES</h5>
                    <Nav className="flex-column ">
                        <Nav.Link as={Link} to="/" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400', marginBottom: '-7px' }}>Myntra</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400', marginBottom: '-7px' }}>Cleartrip</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400', marginBottom: '-7px' }}>Shopy</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Amazon</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3">
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787',marginLeft:'15px' }}>HELP</h5>
                    <Nav className="flex-column ">
                        <Nav.Link as={Link} to="/" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Payments</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Shipping</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Cancellation & Returns</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>FAQ</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={12} md={3} className="mb-3">
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787',marginLeft:'15px' }}>CONSUMER POLICY</h5>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" className="text-light py-1">Cancellation & Returns</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Terms Of Use</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Security</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Privacy</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Sitemap</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>Grievance Redressal</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="text-light py-1" style={{ fontSize: '14px', fontWeight: '400' }}>EPR Compliance</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={12} md={3} className="mb-3">
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787',marginLeft:'15px' }}>Mail Us:</h5>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Flipkart Internet Privated Limited</p>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Building Alyssa, Ghaziabad &</p>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Clove Embassy Tech Village,</p>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Outer ring Road, Devarabeesannahalli Village</p>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Delhi, 560103</p>
                    <p className="mb-1" style={{ fontSize: '14px', fontWeight: '400' }}>Delhi, India</p>
                    <h5 style={{ fontSize: '12px', letterSpacing: '0.3px', color: '#878787', marginTop: '20px' }}>Social:</h5>
                    <Nav style={{ letterSpacing: '-15px', fontSize: '20px' }}>
                        <Nav.Link  href="https://www.facebook.com"   className="text-light" ><i className="bi bi-facebook"></i></Nav.Link>
                        <Nav.Link href="https://www.twitter.com"   className="text-light"><i className="bi bi-twitter"></i></Nav.Link>
                        <Nav.Link href="https://www.youtube.com"   className="text-light"><i className="bi bi-youtube"></i></Nav.Link>
                        <Nav.Link href="https://www.instagram.com"  className="text-light"><i className="bi bi-instagram"></i></Nav.Link>
                    </Nav>
                </Col>
            </Row>

            <div className="border-top my-2" style={{ borderColor: "#555", opacity: 0.2 }}></div>

            <Row className=" justify-content-evenly">
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <Image className='' src={sellImage} rounded />
                    <Nav >
                        <Nav.Link as={Link} to="/" className="text-light " style={{ fontSize: '14px', fontWeight: '400' }}>Become a Seller</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <Image className='' src={advertiseImage} rounded />
                    <Nav >
                        <Nav.Link as={Link} to="/" className="text-light " style={{ fontSize: '14px', fontWeight: '400' }}>Advertise</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <Image className='' src={giftCardImage} rounded />
                    <Nav >
                        <Nav.Link as={Link} to="/" className="text-light " style={{ fontSize: '14px', fontWeight: '400' }}>Gift Cards</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <Image className='' src={helpCenterImage} rounded />
                    <Nav >
                        <Nav.Link as={Link} to="/" className="text-light " style={{ fontSize: '14px', fontWeight: '400' }}>Help Center</Nav.Link>
                    </Nav>
                </Col>
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <p className='mt-3'>&copy; 2001-2025 Flipkart.com</p>
                </Col>
                <Col xs={6} md={2} className="mb-3 d-flex align-items-center">
                    <Image style={{ width: "100%", height: "auto",  }} src={payment1}    />
                </Col>

            </Row>
        </Container>
    );
}

export default HomeFooter;

