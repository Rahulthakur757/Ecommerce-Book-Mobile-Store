import axios from 'axios';
import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
import { Col, Container, Row, Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Orders() {
    let [myOrders, setMyOrders] = useState([]);
    const [show, setShow] = useState(false);
    const handleCloseView = () => setShow(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    let [showReviewModal, setShowReviewModal] = useState(false);
    let [productsForReview, setProductsForReview] = useState([]);
    let [rating, setRating] = useState(0);
    let [comment, setComment] = useState('');
    let [book, setBook] = useState('');
    const handleClose = () => setShowReviewModal(false);


    useEffect(() => {
        let tokenSend = 'Bearer' + ' ' + localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            authorization: tokenSend
        }
        axios({
            url: apiUrl + '/my/orders',
            method: 'get',
            headers: headers
        }).then((result) => {
            setMyOrders(result.data.data);
        }).catch((err) => {
            alert(err);
            console.log(err);
        })
    }, [])

    function goToView(myOrder) {
        alert('ok')
        setSelectedOrder(myOrder)
        setShow(true)
    }

    function postReview(products) {
        setShowReviewModal(true);
        productsForReview.length = 0;
        for (let i = 0; i < products.length; i++) {
            productsForReview.push({
                _id: products[i]._id,
                bookName: products[i].name || products[i].bookTitle,
            })
        }
        setProductsForReview(productsForReview)
    }

    function submitReview() {
        alert('ok')
        let data = {
            book: book,
            comment: comment,
            rating: rating
        }
        let tokenSend = 'Bearer' + ' ' + localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            authorization: tokenSend
        }

        axios({
            url: apiUrl + '/post/comment',
            method: 'post',
            data: data,
            headers: headers

        }).then((result) => {
            if (result.data.success) {
                alert('comment save ...')
                handleClose();
            }
        }).catch((err) => {
            alert(err)
        })
    }
    return (
        <>
            <Container>
                <Row className='justify-contebt-center' >
                    <Col>

                        <h3 style={{
                            fontWeight: "bold",
                            fontSize: "24px",
                            marginTop: "20px",
                            textAlign: "center",
                            color: "white",
                            background: '#90D7FF',
                            padding: "12px",
                            borderRadius: "10px",
                            boxShadow: '0 4px 10px'

                        }}>
                           🎁 My Orders</h3>

                        <div
                            style={{
                                marginTop: '20px',
                                background: 'white',
                                padding: '15px',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 10px'

                            }}
                        >
                            <table className='table' style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}>
                                <thead >
                                    <tr>
                                        <th>Tranasaction Id</th>
                                        <th>Products</th>
                                        <th>Total Price</th>
                                        <th>Payment By</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrders.map((myOrder) =>
                                            <tr>
                                                <td>{myOrder.transactionId.substring(0, 15) + "..."}</td>
                                                <td>
                                                    {myOrder.products.map((product, index) =>
                                                        <div key={index}>
                                                            {product.bookTitle ? product.bookTitle : product.name}
                                                        </div>
                                                    )}
                                                </td>

                                                <td style={{color:'green'}}> &#x20B9; {myOrder.totalPrice}</td>
                                                <td>{myOrder.paymentgateway}</td>
                                                <td className={myOrder.status === "Pending" ? "text-danger" : myOrder.status === "Completed" ? "text-success" : ""}>{myOrder.status}</td>
                                                <td><i className="bi bi-eye " onClick={() => goToView(myOrder)}></i>
                                                    <i className="bi bi-pencil ms-4 " onClick={() => postReview(myOrder.products)}></i>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>

                <Modal show={showReviewModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post yours Reviews</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Your Product</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => { setBook(e.target.value) }}>
                                    <option value="select">Select Your Product</option>
                                    {
                                        productsForReview.map((product) => (
                                            <option key={product._id} value={product._id}>{product.bookName}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Label>Write Your Reviews</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => { setComment(e.target.value) }}></Form.Control>
                                <Form.Label>Give your Rating(out of 10)</Form.Label>
                                <Form.Control type='Number' placeholder='Enter Rating' min={1} max={5} step="0.1" onChange={(e) => { setRating(e.target.value) }}></Form.Control>
                                <Button className='mt-3' variant='primary' onClick={submitReview}> Post Review</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                </Modal>

                <Modal show={show} onHide={handleCloseView} fullscreen>
                    <Modal.Header
                        style={{
                            justifyContent: 'center',
                            color: 'white',
                            background: '#90D7FF'
                        }}
                    >
                        <Modal.Title style={{ fontWeight: 'bold', fontSize: '22px' }}>🧾 Order Details Summary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#f4f6f9' }}>
                        <Container>
                            {selectedOrder && (
                                <Row>
                                    <Col className='mt-3' md={8} >
                                        <div
                                            style={{
                                                background: 'white',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                boxShadow: '0px 4px 10px'
                                            }}
                                        >
                                            <h4
                                                style={{ color: '#333', marginBottom: '15px' }}> 💳 Transaction Details</h4>
                                            <table className='table table-borderless'>
                                                <tbody>
                                                    <tr>
                                                        <th>Products</th>
                                                        <td>{
                                                            selectedOrder.products.map((product) =>
                                                                product.bookTitle
                                                            )
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tranasction Id</th>
                                                        <td>{selectedOrder.transactionId}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tranasction Date</th>
                                                        <td>{selectedOrder.created_at}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Method</th>
                                                        <td>{selectedOrder.paymentgateway}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total Amount</th>
                                                        <td style={{ fontWeight: 'bold', color: 'green' }}>&#x20B9; {selectedOrder.totalPrice}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td style={{ fontWeight: 'bold', color: selectedOrder.status === 'Completed' ? "green" : "red" }}>{selectedOrder.status}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col className='mt-3' md={4}>
                                        <div
                                            style={{
                                                background: 'white',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                boxShadow: '0px 4px 10px'

                                            }}
                                        >
                                            <h4 style={{ color: '#333', marginBottom: '15px' }}>🚚 Shipping Details</h4>
                                            <table className='table table-borderless'>
                                                <tbody>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <td>{selectedOrder.firstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>LastName</th>
                                                        <td>{selectedOrder.lastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{selectedOrder.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>MobileNo</th>
                                                        <td>{selectedOrder.mobileNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>AddressLine1</th>
                                                        <td>{selectedOrder.addressLine1}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>AddressLine2</th>
                                                        <td>{selectedOrder.addressLine2}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>City</th>
                                                        <td>{selectedOrder.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>State</th>
                                                        <td>{selectedOrder.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Country</th>
                                                        <td>{selectedOrder.country}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>ZipCode</th>
                                                        <td>{selectedOrder.zipCode}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Container>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#eef2f7' }}>
                        <Button variant="secondary" onClick={handleCloseView} >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}
export default Orders;