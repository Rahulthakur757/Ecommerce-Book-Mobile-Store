import './style.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addBook } from "./features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function BookDetail() {
    const params = useParams();
    const dispatch = useDispatch()
    let [book, setBook] = useState(null);
    let [pinCode, setPinCode] = useState('');
    let [result, setResult] = useState({});
    let [showMessage, setShowMessage] = useState(false);
    let id = params.id
    const [show, setShow] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    let [reviews, setReviews] = useState([])
    const handleClose = () => setShow(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            url: apiUrl + '/user/book/' + id,
            method: 'get'
        }).then((result) => {
            setBook(result.data.data);
            setReviews(result.data.reviews)
        }).catch((err) => {
            // console.log(err)
            alert(err);
        })
    }, [params]);

    if (!book && reviews.length === 0) {
        return <div>Loading........</div>
    }

    function checkPinCode() {
        if (pinCode.length != 6) {
            setShow(true)
            setServerMessage('Please Enter the Correct Pincode')
        } else {
            axios({
                url: apiUrl + '/check/pincode/' + pinCode,
                method: 'get'
            }).then((result) => {
                if (result.data.success) {
                    setResult(result.data.data)
                    setShowMessage(true);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    function doBuy() {
        let token;
        token = localStorage.getItem('token');
        if (token) {
            localStorage.setItem('currentProduct', 'book');
            localStorage.setItem('book', JSON.stringify(book));
            setShow(true)
            setServerMessage('Now you can go payment Page')
            navigate('/checkout/single')
        } else {
            setShow(true)
            setServerMessage('Please login first')
        };
    };

    function addToCart() {
        dispatch(addBook(book));
        setShow(true)
        setServerMessage('Book added in cart successfully.')
    }
    return (

        <Container fluid>
            <Row className="mt-2">

                <Col lg={4}>
                    <img src={book.image} alt="" style={{height:'380px', width:'100%',objectFit:'contain',border:'2px solid #ddd' ,borderRadius:'12px',padding:"10px", background:'#fff',boxShadow: "0px 4px 10px" }} className="book_image" />
                    <button className="mt-2 btn btn-success " style={{ width: "40%" }} onClick={doBuy}>Buy Now</button>
                    <button className="mt-2 ms-3 btn btn-warning " style={{ width: "40%" }} onClick={addToCart}>Add To Card</button>
                </Col>


                <Col lg={8}>
                    <h1 style={{ color: 'gray' }}>{book.bookTitle} <span style={{ fontSize: "18px", color: "gray" }}>({book.binding},{book.author})</span></h1>
                   <div className='d-flex gap-3'> 
                    <div className='mb-2  d-flex justify-content-center ' style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white' }}>{3.4} <i className='bi bi-star-fill'  style={{fontSize:'12px', margin:'5px',}}></i>  </div> 
                    <h5 style={{ color: 'gray' }}>{reviews && reviews.length > 0 && reviews.length + " " + "Review"}</h5>
                    </div>
                    
                    {book && book.DiscountDetail.length === 0 && <span className='' style={{ fontWeight: 'bold' }}>&#x20b9;{book.originalPrice}</span>}

                    {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'fixed' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>&#x20b9;  {book.DiscountDetail[0].discountValue} off</span></div>}
                    {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'percentage' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>{book.DiscountDetail[0].discountValue} % off</span></div>}
                    <h5 style={{ color: 'gray' }}>{book.shortDescription}</h5>
                    <h5 style={{ color: 'gray' }}>{book.longDescription}</h5>
                    <h5 style={{ color: 'gray' }}>Language: {book.language}</h5>
                    <h5 style={{ color: 'gray' }}> Binding: {book.binding}</h5>
                    <h5 style={{ color: 'gray' }}> Publisher: {book.publisher}</h5>
                    <h5 style={{ color: 'gray' }}>Replaceable:{book.isReplaceable ? 'Yes' : 'No'}</h5>
                    <h5 style={{ color: 'gray' }}> Category: {book.genre}</h5>
                    <h5 style={{ color: 'gray' }}> ISBN No: {book.isbn}</h5>
                    <h5 style={{ color: 'gray' }}> Edition: {book.edition}</h5>
                    <h5 style={{ color: 'gray' }}> Pages: {book.pages}</h5>
                    <h5 style={{ color: 'gray' }}> Published: {book.publishYear}</h5>
                    <h5 style={{ color: 'gray' }}> Height: {book.height} cm</h5>
                    <h5 style={{ color: 'gray' }}> Width: {book.width} cm</h5>
                    <h5> Check Avaibility:
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 mt-2 ">
                                    <Form.Control className="w-50 d-inline " style={{ border: '1px solid gray' }} type="text" placeholder="Enter Pincode" onChange={(e) => setPinCode(e.target.value)} />
                                    <Button className=" ms-3" variant="danger" onClick={checkPinCode} >Check</Button>
                                    {/* <p>{showMessage ? result.isAvailable ?  'Yes, Book Available in '+ result.city + " " + result.deliveryTime: 'Book Not Available hare' :''}</p> */}
                                    <p>{showMessage && result.isAvailable && <span className="text-success"> Yes Book Available in  {result.city + " "} {result.deliveryTime}</span>}</p>
                                    <p>{showMessage && !result.isAvailable && <span className="text-danger"> Book not Available hare</span>}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                    </h5>
                    <h5>Ratings & Reviews</h5>
                    {
                        reviews && reviews.length > 0 && reviews.length + " " + "Review"
                    }

                    {
                        reviews.map((review) =>
                            <div className='mt-3' style={{ border: '1px solid lightgray', minHeight: '100px' }}>
                                <div className='mb-2' style={{ margin: '10px', width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}>{review.rating}<i className='bi bi-star-fill'  style={{fontSize:'12px', margin:'5px',}}></i></div>
                                <div style={{ margin: '10px' }}> {review.comment}</div>
                            </div>
                        )
                    }
                </Col>

            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{serverMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}
export default BookDetail;