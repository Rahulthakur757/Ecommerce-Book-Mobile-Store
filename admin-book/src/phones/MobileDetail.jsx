import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";

function MobileDetail() {
    const params = useParams();
    let [mobiles, setMobiles] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        axios({
            url: apiUrl + '/mobile/' + params.id,
            method: 'get',
        }).then((result) => {
            setMobiles(result.data.data);
        }).catch((err) => {
            alert('Something wrong');
        });
    }, [params]);

    if (!mobiles) {
        return <div>Dive is loading....</div>
    }

    function goToListPage() {
        navigate('/mobiles')
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

                >📲 Mobiles Details</h3>
                <Row>

                    <Col lg={4} className="d-flex flex-column align-items-center">
                        <div style={{
                            width: "100%", background: "#fff", borderRadius: "15px", padding: "15px", boxShadow: "0px 5px 15px"
                        }}>
                            <img src={mobiles.image} alt="" style={{ height: '380px', width: '100%', objectFit: 'contain' }} />
                        </div>
                    </Col>

                    <Col lg={8} className="mt-3 px-5">
                        <h3 className="fw-bold ms-5">{mobiles.name}</h3>



                        {/* <div className="d-flex align-items-center ms-5">
                    <h4 className="me-3 fw-bold text-success">&#x20b9;{mobiles.originalPrice}</h4>
                    <h6 className="text-decoration-line-through me-3">&#x20b9;{(mobiles.originalPrice*1.2).toFixed(0)}</h6>
                    <Badge className="bg-warning text-dark">10% OFF</Badge>
                </div> */}
                        <div className="mb-2 mt-3 ms-5" style={{ width: '50px', backgroundColor: 'seaGreen', borderRadius: '5px', color: 'white', paddingLeft: '2px' }}>{3.4} <i className='bi bi-star-fill' style={{ fontSize: '12px', margin: '5px', }}></i></div>

                        {mobiles && mobiles.DiscountDetail.length === 0 && <span className='ms-5' style={{ fontWeight: 'bold' }}>&#x20b9;{mobiles.originalPrice}</span>}
                        {mobiles && mobiles.DiscountDetail.length > 0 && mobiles.DiscountDetail[0].discountType === 'fixed' && <div><span>&#x20b9; {mobiles.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{mobiles.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>&#x20b9;  {mobiles.DiscountDetail[0].discountValue} off</span></div>}
                        {mobiles && mobiles.DiscountDetail.length > 0 && mobiles.DiscountDetail[0].discountType === 'percentage' && <div><span>&#x20b9; {mobiles.DiscountDetail[0].finalPrice}</span><span className='ms-2'><s>&#x20b9;{mobiles.originalPrice}</s></span> <span className='ms-2 bg-warning px-2'>{mobiles.DiscountDetail[0].discountValue} % off</span></div>}






                        <p>
                            <strong className="me-2 ms-5">Short Description:</strong>{mobiles.shortDescription}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Availability:</strong>{mobiles.availability}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Launch Date:</strong>{mobiles.launchDate}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Storage:</strong>{mobiles.ram}{" | "}{mobiles.storage}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Expandable:</strong>{mobiles.expandable ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Body Material:</strong>{mobiles.bodyMaterial}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Width:</strong>{mobiles.width} mm
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Height:</strong>{mobiles.height} mm
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Weight:</strong>{mobiles.weight} g
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Display:</strong>{mobiles.display}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Screen Size:</strong>{mobiles.screenSize}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Refresh Rate:</strong>{mobiles.refreshRate} hz
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Camera:</strong>{mobiles.rearCamera}{" | "}{mobiles.frontCamera}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Battery:</strong>{mobiles.batterySize}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Charging Type:</strong>{mobiles.chargingType}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Operating System:</strong>{mobiles.os}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">CPU Core:</strong>{mobiles.cpuCore}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Connectivity:</strong>{mobiles.connectivity}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">Features:</strong>{mobiles.features}
                        </p>
                        <p>
                            <strong className="me-2  ms-5">IP Rating:</strong>{mobiles.ipRating}
                        </p>
                    </Col>
                    <Button variant='success' className="mt-2" onClick={goToListPage}>Back</Button>
                </Row>
            </Container>
        </>
    )
}

export default MobileDetail;