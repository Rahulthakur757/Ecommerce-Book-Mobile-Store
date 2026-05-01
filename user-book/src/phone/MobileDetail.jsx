import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { addMobile } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MobileDetail() {
    let navigate = useNavigate();
    const params = useParams();
    let dispatch = useDispatch();
    let [mobile, setMobile] = useState(null);
    let [pincode, setPinCode] = useState('');
    let [result, setResult] = useState({});
    let [reviews, setReviews] = useState([])
    let [showMessage, setShowMessage] = useState(false);
    let id = params.id;

    const [show, setShow] = useState(false);
    const [serverMessage, setServerMessage] = useState("");

    const handleClose = () => setShow(false);

    useEffect(() => {
        axios({
            url: apiUrl + '/user/mobile/' + id,
            method: 'get',
        }).then((result) => {
            setMobile(result.data.data);
            setReviews(result.data.reviews)
        }).catch((err) => {
            // console.log(err)
            alert(err);
        })
    }, [params])


    if (!mobile&& reviews.length === 0) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }


    function checkPinCode() {
        if (pincode.length != 6) {
            setShow(true)
            setServerMessage('Please Enter the Correct Pincode')
        } else {
            axios({
                url: apiUrl + '/check/pincode/' + pincode,
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
            localStorage.setItem('currentProduct', 'mobile');
            localStorage.setItem('mobile',JSON.stringify(mobile));
            setShow(true)
            setServerMessage('Now you can go payment Page')
            navigate('/checkout/single')
        } else {
            setShow(true)
            setServerMessage('Please login first')
        };
    };

    function addToCart() {
        dispatch(addMobile(mobile));
        setShow(true)
        setServerMessage('Mobile added in cart successfully.')
    }
    return (
        <>
            <Container fluid>
                <Row className="mt-2">


                    <Col lg={4}>
                        <img src={mobile.image} alt="" style={{height:'380px', width:'100%',objectFit:'contain',border:'2px solid #ddd' ,borderRadius:'12px',padding:"10px", background:'#fff',boxShadow: "0px 4px 10px" }} className="book_image" />
                        <button className="mt-2 btn btn-success" style={{width:'40%'}} onClick={doBuy}>Buy Now</button>
                        <button className="mt-2 ms-3 btn btn-warning " style={{width:'40%'}}  onClick={addToCart}>Add To Card</button>
                    </Col>


                    <Col lg={8}>
                        <h1 style={{ color: 'gray' }}>{mobile.name}</h1>
                       <div className='d-flex gap-3'>
                        <div className='mb-2  d-flex justify-content-center' style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white' }}>{3.4} <i className='bi bi-star-fill'  style={{fontSize:'12px', margin:'5px',}}></i> </div>
                        <h5 style={{ color: 'gray' }}>{reviews && reviews.length > 0 && reviews.length + " " + "Review"}</h5>
                        </div>

                        {mobile && mobile.DiscountDetail.length === 0 && <span className='' style={{ fontWeight: 'bold' }}>&#x20b9;{mobile.originalPrice}</span>}

                        {mobile && mobile.DiscountDetail.length > 0 && mobile.DiscountDetail[0].discountType === 'fixed' && 
                        <div><span>&#x20b9; {mobile.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{mobile.originalPrice}</s></span>
                         <span className='ms-2 bg-warning px-2'>&#x20b9;  {mobile.DiscountDetail[0].discountValue} off</span></div>}

                        {mobile && mobile.DiscountDetail.length > 0 && mobile.DiscountDetail[0].discountType === 'percentage' && 
                        <div><span>&#x20b9; {mobile.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{mobile.originalPrice}</s></span>
                         <span className='ms-2 bg-warning px-2'>{mobile.DiscountDetail[0].discountValue} % off</span></div>}

                        <h5 style={{ color: 'gray' }}>{mobile.shortDescription}</h5>
                        {/* <h5 style={{ color: 'gray' }}>Replaceable:{mobile.isReplaceable ? 'Yes' : 'No'}</h5> */}
                        <h5 style={{ color: 'gray' }}> LaunchDate: {mobile.launchDate}</h5>
                        <h5 style={{ color: 'gray' }}> Storage: {mobile.ram}{" | "}{mobile.storage}</h5>
                        <h5 style={{ color: 'gray' }}> Expandable: {mobile.expandable ? 'Yes' : 'No'}</h5>
                        <h5 style={{ color: 'gray' }}> BodyMaterial: {mobile.bodyMaterial}</h5>
                        <h5 style={{ color: 'gray' }}> Width: {mobile.width} mm</h5>
                        <h5 style={{ color: 'gray' }}> Height: {mobile.height} mm </h5>
                        <h5 style={{ color: 'gray' }}> Weight: {mobile.weight} g</h5>
                        <h5 style={{ color: 'gray' }}> Display: {mobile.display}</h5>
                        <h5 style={{ color: 'gray' }}> ScreenSize: {mobile.screenSize}</h5>
                        <h5 style={{ color: 'gray' }}> Camera: {mobile.rearCamera}{" | "}{mobile.frontCamera}</h5>
                        <h5 style={{ color: 'gray' }}> Battery: {mobile.batterySize}</h5>
                        <h5 style={{ color: 'gray' }}> Fast Charging: {mobile.chargingType ? 'Yes' : 'No'}</h5>
                        <h5 style={{ color: 'gray' }}> Operating System: {mobile.os}</h5>
                        <h5 style={{ color: 'gray' }}> Core: {mobile.cpuCore}</h5>
                        <h5 style={{ color: 'gray' }}> Connectivity: {mobile.connectivity} </h5>
                        <h5 style={{ color: 'gray' }}> IPRating: {mobile.ipRating}</h5>
                        <h5> Check Avaibility:
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3 mt-2 ">
                                        <Form.Control className="w-50 d-inline " style={{ border: '1px solid gray' }} type="text" placeholder="Enter Pincode" onChange={(e) => setPinCode(e.target.value)} />
                                        <Button className=" ms-3" variant="danger" onClick={checkPinCode} >Check</Button>
                                        {/* <p>{showMessage ? result.isAvailable ?  'Yes, Book Available in '+ result.city + " " + result.deliveryTime: 'Book Not Available hare' :''}</p> */}
                                        <p>{showMessage && result.isAvailable && <span className="text-success"> Yes mobile Available in  {result.city + " "} {result.deliveryTime}</span>}</p>
                                        <p>{showMessage && !result.isAvailable && <span className="text-danger"> mobile not Available hare</span>}</p>
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
        </>
    )

}
export default MobileDetail;