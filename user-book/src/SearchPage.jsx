import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";


const apiUrl = import.meta.env.VITE_API_URL;


function SearchPage() {

    let [books, setBooks] = useState([]);
    let [mobiles, setMobiles] = useState([]);

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();

    let query = searchParams.get('query') || '';


    useEffect(() => {

        axios.get(apiUrl + "/search", {
            params: {
                query: query
            }
        })
        .then((res) => {

            console.log("Search Response:", res.data);

            setBooks(res.data.books || []);
            setMobiles(res.data.mobiles || []);

        })
        .catch((err) => {
            console.log("Search Error:", err);
        });

    }, [query]);



    return (

        <Container fluid>

            {/* <h3 className="mt-3">
                Search Result : "{query}"
            </h3> */}


            {/* Books */}

            {books.length > 0 && (
                <>
                <h4 className="mt-4">
                    📚 Books
                </h4>

                <Row>

                {
                    books.map((book,index)=>(

                        <Col lg={3} md={4} sm={6} key={book._id || index}
                        className="mt-3">

                            <Card
                            style={{
                                height:"490px",
                                cursor:"pointer"
                            }}
                            onClick={()=>{
                                navigate('/book/detail/'+book._id)
                            }}
                            >

                                <Card.Img
                                src={book.image}
                                style={{
                                    height:"250px",
                                    objectFit:"contain"
                                }}
                                className="mt-3"
                                />


                                <Card.Body>

                                    <Card.Title>
                                        {book.bookTitle}
                                    </Card.Title>


                                    <p className="text-muted">
                                        {book.shortDescription}
                                    </p>


                                    <b>
                                        ₹ {book.originalPrice}
                                    </b>


                                </Card.Body>


                            </Card>


                        </Col>

                    ))
                }

                </Row>

                </>
            )}



            {/* Mobiles */}


            {mobiles.length > 0 && (

                <>

                <h4 className="mt-5">
                    📱 Mobiles
                </h4>


                <Row>

                {
                    mobiles.map((phone,index)=>(


                        <Col lg={3} md={4} sm={6}
                        className="mt-3"
                        key={phone._id || index}>


                            <Card

                            style={{
                                height:"490px",
                                cursor:"pointer"
                            }}

                            onClick={()=>{
                                navigate('/mobile/detail/'+phone._id)
                            }}

                            >


                                <Card.Img

                                src={phone.image}

                                style={{
                                    height:"250px",
                                    objectFit:"contain"
                                }}

                                className="mt-3"

                                />


                                <Card.Body>


                                    <Card.Title>
                                        {phone.name}
                                    </Card.Title>


                                    <p className="text-muted">
                                        {phone.shortDescription}
                                    </p>


                                    <b>
                                        ₹ {phone.originalPrice}
                                    </b>


                                </Card.Body>


                            </Card>


                        </Col>


                    ))
                }


                </Row>


                </>

            )}



            {
                books.length === 0 && mobiles.length === 0 && (

                    <div className="text-center mt-5">

                        <h3>
                            🔍 No Result Found
                        </h3>

                        <p>
                            Try another keyword
                        </p>

                    </div>

                )
            }


        </Container>

    );

}


export default SearchPage;