const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap'
import ImageSlider from './ImageSlider';
import { useNavigate } from 'react-router-dom';
import MobileCard from './phone/MobileCard'

function HomeCard() {
    let [books, setBooks] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            url: apiUrl + '/books/user/home',
            method: 'get',
            params: {
                limit: 20
            }
        }).then((result) => {
            setBooks(result.data.data)

        }).catch((err) => {

        })
    }, []);

    function goToBookDetailPage(id) {
        navigate('/book/detail/' + id);
    }


    return (
        <Container fluid>
            <Row>
                <Col><ImageSlider></ImageSlider>  </Col>

            </Row>

            <Row>
                {books.map((book, index) =>
                    <Col key={index} className='mt-3' lg={3}>
                        <Card style={{ width: '100%', height: '490px', border: '' }} onClick={() => goToBookDetailPage(book._id)} className="book_image" >
                            <Card.Img className='mx-5 mt-4 book_image' src={book.image} style={{ width: '250px', height: '300px' }} ></Card.Img>
                            <Card.Body >
                                <Card.Title className=''>{book.bookTitle}</Card.Title>
                                <div>
                                    <span className='pb-2' style={{ color: 'gray', display: 'block' }}>{book.shortDescription}</span>
                                    <div className='mb-2' style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}>{3.4 + index}</div>
                                    {book.DiscountDetail.length === 0 && <span className='' style={{ fontWeight: 'bold' }}>&#x20b9;{book.originalPrice}</span>}
                                    {book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'fixed' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>&#x20b9;  {book.DiscountDetail[0].discountValue} off</span></div>}
                                    {book.DiscountDetail.length > 0 && book.DiscountDetail[0].discountType === 'percentage' && <div><span>&#x20b9; {book.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{book.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>{book.DiscountDetail[0].discountValue} % off</span></div>}

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

            <Row><MobileCard></MobileCard></Row>
            

        </Container>


    )
}
export default HomeCard;