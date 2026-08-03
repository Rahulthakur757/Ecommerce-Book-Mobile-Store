// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useSearchParams } from 'react-router-dom'; // 1. useSearchParams import kiya
// import { Col, Card, Container, Row } from 'react-bootstrap';

// const apiUrl = import.meta.env.VITE_API_URL;

// function MobileCard() {
//     let navigate = useNavigate();
//     let [phones, setPhones] = useState([]);

//     // 2. URL se ?search= parameter get karein
//     let [searchParams] = useSearchParams();
//     let searchQuery = searchParams.get('search') || '';

//     useEffect(() => {
//         // 3. API par search term bhej rahe hain
//         axios({
//             url: apiUrl + '/mobiles/user/home',
//             method: 'get',
//             params: {
//                 limit: 20,
//                 search: searchQuery // Backend ko search parameter pass kar rahe hain
//             }
//         }).then((result) => {
//             if (result.data && result.data.data) {
//                 setPhones(result.data.data);
//             }
//         }).catch((err) => {
//             console.log("Mobile fetch error:", err);
//         });
//     }, [searchQuery]); // 4. Search change hone par auto update hoga

//     function goToMobileDetailPage(id) {
//         navigate('/mobile/detail/' + id);
//     }

//     return (
//         <Container fluid className="mt-3">
          
//             <Row>
//                 {phones.length > 0 ? (
//                     phones.map((phone, index) => (
//                         <Col key={phone._id || index} className='mt-3' lg={3}>
//                             <Card 
//                                 style={{ width: '100%', height: '490px', cursor: 'pointer' }} 
//                                 onClick={() => goToMobileDetailPage(phone._id)}
//                                 className="book_image shadow-sm" 
//                             >
//                                 <Card.Img 
//                                     className='mx-auto mt-4 image-hover book_image' 
//                                     variant="top" 
//                                     src={phone.image} 
//                                     style={{ width: '200px', height: '250px', objectFit: 'contain' }} 
//                                 />
//                                 <Card.Body>
//                                     <Card.Title className="text-truncate">{phone.name}</Card.Title>
//                                     <div>
//                                         <p className="text-muted text-truncate mb-2">{phone.shortDescription}</p>
//                                         <div className='my-2 d-flex align-items-center gap-1' style={{ width: 'fit-content', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', padding: '2px 8px' }}>
//                                             <span>4.1</span>
//                                             <i className="bi bi-star-fill" style={{ fontSize: '10px' }}></i>
//                                         </div>
//                                         <span style={{ fontWeight: 'bold' }}>&#x20b9; {phone.originalPrice}</span>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))
//                 ) : (
//                     <Col className="text-center my-5">
//                         <h5>No Mobiles found matching "{searchQuery}"</h5>
//                     </Col>
//                 )}
//             </Row>
//         </Container>
//     );
// }

// export default MobileCard;
















import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Container, Row } from 'react-bootstrap';

const apiUrl = import.meta.env.VITE_API_URL;

function MobileCard() {
    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        axios({
            url: apiUrl + '/mobiles/user/home',
            method: 'get',
            params: {
                limit: 20
            }
        })
            .then((result) => {
                if (result.data.success) {
                    setPhones(result.data.data);
                }
            })
            .catch((err) => {
                console.log("Mobile Fetch Error:", err);
            });
    }, []);

    function goToMobileDetailPage(id) {
        navigate('/mobile/detail/' + id);
    }

    return (
        <Container fluid className="mt-3">
            <Row>
                {phones.length > 0 ? (
                    phones.map((phone) => (
                        <Col
                            key={phone._id}
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            className="mt-3"
                        >
                            <Card
                                className="book_image shadow-sm"
                                style={{
                                    width: "100%",
                                    height: "490px",
                                    cursor: "pointer"
                                }}
                                onClick={() => goToMobileDetailPage(phone._id)}
                            >
                                <Card.Img
                                    className="mx-auto mt-4"
                                    src={phone.image}
                                    style={{
                                        width: "200px",
                                        height: "250px",
                                        objectFit: "contain"
                                    }}
                                />

                                <Card.Body>
                                    <Card.Title className="text-truncate">
                                        {phone.name}
                                    </Card.Title>

                                    <p className="text-muted text-truncate mb-2">
                                        {phone.shortDescription}
                                    </p>

                                    <div
                                        className="d-flex align-items-center gap-1 mb-2"
                                        style={{
                                            width: "fit-content",
                                            backgroundColor: "seagreen",
                                            color: "white",
                                            padding: "3px 8px",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        <span>4.1</span>
                                        <i
                                            className="bi bi-star-fill"
                                            style={{ fontSize: "10px" }}
                                        ></i>
                                    </div>

                                    <span className="fw-bold">
                                        ₹ {phone.originalPrice}
                                    </span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <h4>No Mobiles Available</h4>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default MobileCard;