import { Col, Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
function CheckOut() {
    const { products } = useSelector((state) => state.cart);
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

    const [show, setShow] = useState(false);
    let [showSpinner, setShowSpinner] = useState(false);
    function handleClose() {
        setShow(false)
    }


    useEffect(() => {
        let name = localStorage.getItem('name');
        let customerEmail = localStorage.getItem('email');
        setFirstName(name);
        setEmail(customerEmail);
        let price = 0;
        totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            let Price = products[i].DiscountDetail.length > 0 ? products[i].DiscountDetail[0].finalPrice : products[i].originalPrice
            totalCost = totalCost + Price
        }
        setTotalCost(totalCost)
    }, []);

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
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); let tokenSend = 'Bearer' + ' ' + localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                authorization: tokenSend
            }
            let cart = [];
            for (let i = 0; i < products.length; i++) {
                cart.push(products[i]);
            }
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
                                        <Form.Label>First Name <span className='text-danger fs-5'>*</span></Form.Label >
                                        <Form.Control type="text" placeholder="Enter your First Name" value={firstName} readOnly required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="email" placeholder="Enter your Email" value={email} readOnly required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile No <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="number" placeholder="Enter your mobile No" onChange={(e) => setMobileNo(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address Line 1 <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Address Line 1" onChange={(e) => setAddressLine1(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address Line 2 <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Address Line 2" onChange={(e) => setAddressLine2(e.target.value)} required />
                                    </Form.Group>
                                </Col>


                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your City" onChange={(e) => setCity(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>State <span className='text-danger fs-5'>*</span> </Form.Label>
                                        <Form.Control type="text" placeholder="Enter your State" onChange={(e) => setState(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Country" onChange={(e) => setCountry(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Zip Code <span className='text-danger fs-5'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter your Zip Code" onChange={(e) => setZipCode(e.target.value)} required />
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
                                {
                                    products.map((product) =>
                                        <tr>
                                            <td> <img src={product.image} width="40px" height="40px"></img> </td>
                                            <td>{product.bookTitle}
                                                {product.name}
                                            </td>
                                            <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].finalPrice : product.originalPrice}</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td></td>
                                    <td>Total Cost</td>
                                    <td>{totalCost.toFixed(2)}</td>
                                </tr>
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
                {showSpinner && <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '35%', right: '70px' }}> <Spinner animation="border" variant="success" /></div>}
            </Container >
        </>
    )
}
export default CheckOut;