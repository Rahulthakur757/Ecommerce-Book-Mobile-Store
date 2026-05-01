import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";






function BookDetail() {
    const params = useParams();
    let [book, setBook] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            url: apiUrl + '/book/' + params.id,
            method: 'get'
        }).then((result) => {
            setBook(result.data.data);
        }).catch((err) => {
            alert("somethings went wrong");
        })
    }, [params]);

    function goToListPage() {
        navigate('/books')
    }

    if (!book) {
        return <div>Dive is loading....</div>
    }

    return (
        <>
            <Container className=" mt-2 ms-3 p-4 shadow-lg rounded-3 ">
                <h3
                    className="mb-5 text-center"
                    style={{
                        fontWeight: "800",
                        letterSpacing: "1px",
                        color: "#333",
                        background: '#90D7FF',
                        padding: "10px",
                        borderRadius: "12px",
                        color: "white"
                    }}
                >
                    📘 Books Details
                </h3>
                <Row>

                    <Col lg={4} className="d-flex flex-column align-items-center" >


                        <div style={{
                            width: "100%", background: "#fff", borderRadius: "15px", padding: "15px", boxShadow: "0px 5px 15px"
                        }}>
                            <img src={book.image} alt="" style={{ height: '380px', width: '100%', objectFit: 'contain' }} />
                        </div>
                    </Col>

                    <Col lg={8} >
                        <h3 className="fw-bold">{book.bookTitle}</h3>
                        <h6>
                            by: <span>{book.author}</span>

                        </h6>
                        <Badge className="bg-success">{book.language}</Badge>

                        {/* <div className="d-flex align-items-center mt-3 ">
                    <h4 className=" text-success fw-bold me-2">&#x20b9;{book.originalPrice}</h4>
                    <h6 className=" text-decoration-line-through me-2">&#x20b9;{(book.originalPrice*1.1).toFixed(0)}</h6>
                    <Badge className="bg-warning text-dark">10% OFF</Badge>
                </div> */}


                        <div className='mb-2 mt-2' style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '2px' }}>{3.4} <i className='bi bi-star-fill' style={{ fontSize: '12px', margin: '5px', }}></i> </div>

                        {book && book.DiscountDetail.length === 0 && <span className='' style={{ fontWeight: 'bold' }}>&#x20b9;{book.originalPrice}</span>}
                        {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'fixed' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>&#x20b9;  {book.DiscountDetail[0].discountValue} off</span></div>}
                        {book && book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'percentage' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>{book.DiscountDetail[0].discountValue} % off</span></div>}

                        <p className="">
                            <strong className="me-2">Availability:</strong>{" "}
                            <span>In stock</span>
                        </p>
                        <p className="">
                            <strong className="me-2">Publisher:</strong>{book.publisher}
                        </p>
                        <p className="">
                            <strong className="me-2">Edition:</strong>{book.edition}{" | "}
                            <strong className="me-2">Year:</strong>{book.publishYear}
                        </p>
                        <p className="">
                            <strong className="me-2">binding:</strong>{book.binding}
                        </p>
                        <p className="">
                            <strong className="me-2">Short Description:</strong>{book.shortDescription}
                        </p>
                        <p className="">
                            <strong className="me-2">ISBN:</strong>{book.isbn}
                        </p>
                        <p className="">
                            <strong className="me-2">IsUsed:</strong>{book.isUsed ? "Yes" : "No"}
                        </p>
                        <p className="">
                            <strong className="me-2">IsReplacable:</strong>{book.isReplaceable ? "Yes" : "No"}
                        </p>
                        <p className="">
                            <strong className="me-2">Genre:</strong>{book.genre}
                        </p>
                        <p className="">
                            <strong className="me-2">Height:</strong>{book.height} mm
                        </p>
                        <p className="">
                            <strong className="me-2">Width:</strong>{book.width} mm
                        </p>
                        <p className="">
                            <strong className="me-2">Pages:</strong>{book.pages}
                        </p>
                        <p className="">
                            <strong className="me-2">Long Description:</strong>{book.longDescription}
                        </p>

                    </Col>

                    <Button variant='success' className="mt-2" onClick={goToListPage}>Back</Button>
                </Row>
            </Container>

        </>
    )
}
export default BookDetail;

