import { Col, Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
function CheckOutSingle() {
    let [totalCost, setTotalCost] = useState(0);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [mobileNo, setMobileNo] = useState('');
    let [addressLine1, setAddressLine1] = useState('');
    let [addressLine2, setAddressLine2] = useState('');
    let [city, setCity] = useState('');
    let [state, setState] = useState('');
    let [country, setCountry] = useState('');
    let [zipCode, setZipCode] = useState('');
    let [book, setBook] = useState(null);
    let [mobile, setMobile] = useState(null);
    let [product, setProduct] = useState(null)
    let [showSpinner, setShowSpinner] = useState(false);
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        let name = localStorage.getItem('name');
        let customerEmail = localStorage.getItem('email');
        // book = JSON.parse(localStorage.getItem('book'));
        // mobile = JSON.parse(localStorage.getItem('mobile'));
        // setBook(book)
        // setMobile(mobile);
        const current = localStorage.getItem('currentProduct');
        const productData = current === 'book'
            ? JSON.parse(localStorage.getItem('book'))
            : JSON.parse(localStorage.getItem('mobile'));
        setProduct(productData);
        setFirstName(name);
        setEmail(customerEmail);

    }, []);

    if (!product) {
        return <div>Loading....</div>
    }

    async function goToBuy() {
        if (!mobileNo || !addressLine1 || !addressLine2 || !city || !state || !country || !zipCode) {
            setShow(true)
            return
        }
        let token;
        token = localStorage.getItem('token')
        if (token) {
            let data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                country: country,
                zipCode: zipCode
            }
const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);            let tokenSend = 'Bearer' + ' ' + localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                authorization: tokenSend
            }
            let cart = [];
            cart.push(product);
            let body = {
                products: cart,
                data: data
            }
            axios({
                url: apiUrl + '/checkout',
                method: 'post',
                data: body,
                headers: headers
            }).then((result) => {
                localStorage.setItem("transactionId", result.data.transactionId)
                window.location.href = result.data.data;
                setShowSpinner(true)
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("pls login first")
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <h3 className='mt-3'>Shipping Detail</h3>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" value={firstName} readOnly required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setLastName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="email" placeholder="Enter your name.com" value={email} readOnly required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile No <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="number" placeholder="Enter your name.com" onChange={(e) => setMobileNo(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address Line 1 <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setAddressLine1(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address Line 2 <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setAddressLine2(e.target.value)} required />
                                    </Form.Group>
                                </Col>


                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setCity(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>State <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setState(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setCountry(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Zip Code <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name.com" onChange={(e) => setZipCode(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Form>

                    </Col>

                    <Col>
                        <h3 className='mt-3'>Product Summary</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product name</th>
                                    <th>Final Price</th>
                                </tr>
                            </thead>
                            <tbody>



                                {product && (
                                    <tr>
                                        <td><img src={product.image} alt="" width="40px" height="40px" /></td>
                                        <td>{product.name || product.bookTitle}</td>
                                        <td>{product && product.DiscountDetail.length > 0 ? product.DiscountDetail[0].finalPrice : product.originalPrice}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='text-end'>
                            <Button variant='success' style={{ width: '25%' }} onClick={goToBuy}> Pay</Button>
                        </div>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please fill all required fields before payment!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {showSpinner && <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '32%', right: '70px' }}> <Spinner animation="border" variant="success" /></div>}
            </Container >
        </>
    )
}
export default CheckOutSingle;