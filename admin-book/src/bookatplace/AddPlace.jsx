import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";


function AddPlace() {
    const navigate = useNavigate();
    let [inputValue, setInputValue] = useState('');
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);

    let [pinCode, setPinCode] = useState('');
    let [city, setCity] = useState('');
    let [isAvailable, setIsAvailable] = useState(false);
    let [deliveryTime, setDeliveryTime] = useState('');
    let [deliveryCharges, setDeliveryCharges] = useState(0);
    let [showModal, setShowModal] = useState(false);
    let [serverMessage, setServerMessage] = useState('');
    const handleClose = () => {
        setShowModal(false)
        navigate('/places')
    }


    function handleInputChange(input) {
        setInputValue(input);
    }

    function handleChange(selected) {
        setSelectedOption(selected);
    }

    function doAddPlace() {
        let data = {
            book: selectedOption.value,
            pinCode: pinCode,
            city: city,
            isAvailable: isAvailable,
            deliveryTime: deliveryTime,
            deliveryCharges: deliveryCharges,

        }

        axios({
            url: apiUrl + '/add/place',
            method: 'post',
            data: data
        }).then((result) => {
            if (result.data.success) {
                setServerMessage(result.data.message);
                setShowModal(true);
            }

        }).catch((error) => {
            setServerMessage(error.response.data.message);
            setShowModal(true);
        })
    }

    useEffect(() => {
        axios({
            url: apiUrl + '/books/for/discount',
            method: 'get',
            params: {
                bookTitle: inputValue
            }
        }).then((result) => {
            setOptions(result.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    function goToBookPlaceList() {
        navigate('/places')
    }
    return (
        <Container fluid>
            <h4>Add Place for Book Delivery</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Select the Book to add the Place</Form.Label>
                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={handleChange}
                        isSearchable={true}
                        placeholder="Search for select a book..."
                        onInputChange={handleInputChange}
                    >
                    </Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pin Code </Form.Label>
                            <Form.Control type="Text" placeholder="Enter Pincode" onChange={(e) => { setPinCode(e.target.value) }} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select City </Form.Label>
                            <Form.Control type="text" placeholder="Enter City" onChange={(e) => { setCity(e.target.value) }} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>

                    <Col>
                        <Form.Label>Check Available</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setIsAvailable(e.target.value) }}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </Form.Select>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Time </Form.Label>
                            <Form.Control type="text" onChange={(e) => { setDeliveryTime(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Charges </Form.Label>
                            <Form.Control type="Number" onChange={(e) => { setDeliveryCharges(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="danger" className="me-3" onClick={goToBookPlaceList}>Cancel</Button>
                <Button variant='success' onClick={doAddPlace}>Add Place</Button>

            </Form>

            <Modal show={showModal} onHide={handleClose}>
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
export default AddPlace;