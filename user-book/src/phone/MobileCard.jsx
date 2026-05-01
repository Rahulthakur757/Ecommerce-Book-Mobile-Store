const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Button,Container,Row } from 'react-bootstrap'


function MobileCard() {
    let navigate = useNavigate();
    let [phones, setPhones] = useState([]);
    useEffect(() => {
        axios({
            url: apiUrl + '/mobiles/user/home',
            method: 'get',
            params: {
                limit: 20
            }
        }).then((result) => {
            setPhones(result.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function goToMobileDetailPage(id) {
        navigate('/mobile/detail/' + id);
    }

    return (
        <>
        <Container fluid>
            <Row>
                 {
            phones.map((phone, index) =>
                <Col key={index} className='mt-3'lg={3}>
                    <Card style={{ width: '100%', height:'490px', border: ''}} onClick={() => goToMobileDetailPage(phone._id)}className="book_image" >
                        <Card.Img className='mx-5 mt-4 image-hover book_image' variant="top" src={phone.image} style={{width:'250px', height:'300px'}} />
                        <Card.Body>
                            <Card.Title>{phone.name}</Card.Title>
                            <div>
                                {phone.shortDescription}
                                <div className='my-2' style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '10px' }}>{3.4+index}</div>
                                <span className='' style={{ fontWeight: 'bold' }}>&#x20b9; {phone.originalPrice}</span>
                                
                            </div>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
            </Row>
        </Container>
        
        
        </>
       

    );
}
export default MobileCard;