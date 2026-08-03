import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap';
import ImageSlider from './ImageSlider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileCard from './phone/MobileCard';

const apiUrl = import.meta.env.VITE_API_URL;

function HomeCard() {
    let [books, setBooks] = useState([]);
    let navigate = useNavigate();

    let [searchParams] = useSearchParams();
    let searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        axios({
            url: apiUrl + '/books/user/home',
            method: 'get',
            params: {
                limit: 20,
                search: searchQuery
            }
        }).then((result) => {
            if (result.data && result.data.success) {
                setBooks(result.data.data);
            }
        }).catch((err) => {
            console.error("Fetch books error:", err);
        });
    }, [searchQuery]);

    function goToBookDetailPage(id) {
        navigate('/book/detail/' + id);
    }

    return (
        <Container fluid>
            {!searchQuery && (
                <Row>
                    <Col><ImageSlider /></Col>
                </Row>
            )}

            

            <Row>
                {searchQuery === "not_found_keyword" ? (

                    <Col className="text-center py-5">
    <i
        className="bi bi-search"
        style={{ fontSize: "70px", color: "#6c757d" }}
    ></i>

    <h2 className="mt-3">No Results Found</h2>

    <p className="text-muted">
        We couldn't find any matching books.
    </p>
</Col>

                ) : books.length > 0 ? (

                    books.map((book, index) => (
                        <Col key={book._id || index} className='mt-3' lg={3}>
                            <Card
                                style={{ width: '100%', height: '490px', cursor: 'pointer' }}
                                onClick={() => goToBookDetailPage(book._id)}
                                className="book_image shadow-sm"
                            >
                                <Card.Img
                                    className='mx-auto mt-3'
                                    src={book.image}
                                    style={{ width: '200px', height: '250px', objectFit: 'contain' }}
                                />

                                <Card.Body>
                                    <Card.Title className='text-truncate'>
                                        {book.bookTitle}
                                    </Card.Title>

                                    <span
                                        className='pb-2 text-truncate'
                                        style={{ color: 'gray', display: 'block' }}
                                    >
                                        {book.shortDescription}
                                    </span>

                                    <div
                                        className='mb-2 d-flex align-items-center gap-1'
                                        style={{
                                            width: 'fit-content',
                                            backgroundColor: 'seaGreen',
                                            borderRadius: '5px',
                                            color: 'white',
                                            padding: '2px 8px'
                                        }}
                                    >
                                        <span>4.2</span>
                                        <i className="bi bi-star-fill" style={{ fontSize: '10px' }}></i>
                                    </div>

                                    {book.DiscountDetail && book.DiscountDetail.length === 0 && (
                                        <span style={{ fontWeight: 'bold' }}>
                                            ₹{book.originalPrice}
                                        </span>
                                    )}

                                    {book.DiscountDetail && book.DiscountDetail.length > 0 && (
                                        <div>
                                            <span>₹ {book.DiscountDetail[0].finalPrice}</span>
                                            <span className='ms-2'>
                                                <s>₹{book.originalPrice}</s>
                                            </span>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))

                ) : (

                    <Col className="text-center my-5 py-5">
                        <i
                            className="bi bi-exclamation-circle text-warning"
                            style={{ fontSize: '3.5rem' }}
                        ></i>

                        <h4 className="mt-3 text-secondary">
                            No products found matching "{searchQuery}"
                        </h4>

                        <p className="text-muted">
                            Please check spelling or try searching for another term.
                        </p>
                    </Col>

                )}
            </Row>

            {!searchQuery && (
                <Row className="mt-4"><MobileCard /></Row>
            )}
        </Container>
    );
}

export default HomeCard;