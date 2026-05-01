import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate, useParams } from "react-router-dom";

function DiscountEdit() {
    const navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [discount, setDiscount] = useState({});
    let params = useParams();
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);

    function handleChange(selected) {
        setSelectedOption(selected);
    };

    const handleClose = () => {
        setShow(false)
        navigate('/discounts')
    }

    useEffect(() => {
        axios({
            url: apiUrl + '/discount/' + params.id,
            method: 'get'
        }).then((result) => {
            setDiscount(result.data.data)
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setDiscount((prev) => {
            return {
                ...prev, [name]: value
            };
        });
    };
    function doUpdateDiscount(id) {
        axios({
            url: apiUrl + '/edit/discount/' + id,
            method: 'put',
            data: discount
        }).then((result) => {
            if (result.data.success) {
                setShow(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <>
            <Container>
                <h4>Edit Discount</h4>
                <Form>
                    <Form.Group>
                        <Form.Label>Select the Book to apply the discount</Form.Label>
                        <Select
                            options={options}
                            value={discount.book}
                            onChange={handleChange}
                        >
                        </Select>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Discount Name </Form.Label>
                                <Form.Control type="Text" placeholder="Enter Discount Name" onChange={handleChange} name="discountName" value={discount.discountName} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>Select Discount Type</Form.Label>
                            <Form.Select aria-label="Language" onChange={handleChange} name="discountType" value={discount.discountType}>
                                <option value="fixed">Fixed</option>
                                <option value="percentage">Percentage</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Discount Value </Form.Label>
                                <Form.Control type="Number" placeholder="Enter Discount Value" onChange={handleChange} name="discountValue" value={discount.discountValue} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Valid From </Form.Label>
                                <Form.Control type="date" onChange={handleChange} name="validFrom" value={discount.validFrom ? new Date(discount.validFrom).toISOString().split('T')[0] : ''} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Valid To </Form.Label>
                                <Form.Control type="date" onChange={handleChange} name="validTo" value={discount.validTo ? new Date(discount.validTo).toISOString().split('T')[0] : ''} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant='success' onClick={() => doUpdateDiscount(discount._id)}>Update Discount</Button>
                </Form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Discount has been Updated successfully...</Modal.Body>
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
export default DiscountEdit;