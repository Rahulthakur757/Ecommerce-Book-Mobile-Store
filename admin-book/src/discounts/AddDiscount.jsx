import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function AddDiscount() {
    const navigate = useNavigate();
    let [inputValue, setInputValue] = useState('');
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);

    let [discountName, setDiscountName] = useState('');
    let [discountType, setDiscountType] = useState('fixed');
    let [discountValue, setDiscountValue] = useState(0);
    let [validFrom, setValidFrom] = useState('');
    let [validTo, setValidTo] = useState('');
    let [showModal, setShowModal] = useState(false);
    let [serverMessage, setServerMessage] = useState('');
    const handleClose = () => {
        setShowModal(false)
        navigate('/discounts')
    }


    function handleInputChange(input) {
        setInputValue(input);
    }

    function handleChange(selected) {
        setSelectedOption(selected);
    }

    function doAddDiscount() {
        let data = {
            book: selectedOption.value,
            discountName: discountName,
            discountValue: discountValue,
            discountType: discountType,
            validFrom: validFrom,
            validTo: validTo
        }

        axios({
            url: apiUrl + '/add/discount',
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


    return (
        <Container>
            <h4>Add Discount</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Select the Book to apply the discount</Form.Label>
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
                            <Form.Label>Discount Name </Form.Label>
                            <Form.Control type="Text" placeholder="Enter Discount Name" onChange={(e) => { setDiscountName(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Select Discount Type</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setDiscountType(e.target.value) }}>
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Discount Value </Form.Label>
                            <Form.Control type="Number" placeholder="Enter Discount Value" onChange={(e) => { setDiscountValue(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Valid From </Form.Label>
                            <Form.Control type="date" onChange={(e) => { setValidFrom(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Valid To </Form.Label>
                            <Form.Control type="date" onChange={(e) => { setValidTo(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>


                <Button variant='success' onClick={doAddDiscount}>Add Discount</Button>

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
export default AddDiscount;