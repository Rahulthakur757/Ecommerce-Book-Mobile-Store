const apiUrl = import.meta.env.VITE_API_URL;
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Container,Row, Col, Form,Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function EditPlaceForBook() {
    let [place, setPlace] = useState({});
    let params = useParams();
    let navigate = useNavigate();
    let [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false);
        navigate('/places')
    }

    useEffect(()=>{
        axios({
            url: apiUrl + '/place/' + params.id,
            method: 'get'
        }).then((result) => {
            setPlace(result.data.data)
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    function handleChange (e) {
        let name = e.target.name
        let value = e.target.value
        setPlace((prev) => {
            return{
                ...prev, [name]: value
            }
        })
    }

    function toEditPlace (id) {
        axios({
            url: apiUrl + '/edit/place/' + id,
            method: 'put',
            data:place
        }).then((result) => {
            if(result.data.success) {
                 setShow(true)
            }
           
        }).catch((err) => {
            console.log(err);
        })

    }

    function goToBookPlaceList() {
        navigate('/places')
    }
    return(
        <>
         <Container fluid>
            <h4>Edit Place Of Book Delivery</h4>
            <Form>
                <Form.Group className="mb-3">
                            <Form.Label>Book Title </Form.Label>
                            <Form.Control type="Text" placeholder="Enter Book Title" onChange={handleChange} name="book" value={place.book?.bookTitle || ""}/>
                        </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pin Code </Form.Label>
                            <Form.Control type="Text" placeholder="Enter Pincode" onChange={handleChange} name="pinCode" value={place.pinCode} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select City </Form.Label>
                            <Form.Control type="text" placeholder="Enter City" onChange={handleChange} name="city" value={place.city} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>

                    <Col>
                        <Form.Label>Check Available</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="isAvailable" value={place.isAvailable}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Time </Form.Label>
                            <Form.Control type="text" onChange={handleChange} name="deliveryTime" value={place.deliveryTime} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Charges </Form.Label>
                            <Form.Control type="Number" onChange={handleChange} name="deliveryCharges" value={place.deliveryCharges} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="danger" className="me-3" onClick={goToBookPlaceList}>Cancel</Button>
                <Button variant='success' onClick={()=> toEditPlace(place._id)} >Edit Place</Button>

            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book Place has been Updated successfully...</Modal.Body>
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
export default EditPlaceForBook;