import { Form, Container, Row, Col, Button, Dropdown, Image } from "react-bootstrap";
import rahul from '../assets/rahul.jpg'
import { useState, useEffect } from "react";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

function Profile() {
    let [userName, setUserName] = useState('')
    let [file, setFile] = useState();
    useEffect(() => {
        const name = localStorage.getItem("name")
        if (name) {
            setUserName(name);
        }

    }, [])
    function submitUserDetail() {
        alert('ok')
        let formData = new FormData();
        formData.append('file', file)
        formData.append('fileName', file.name)
        axios({
            //    url: apiUrl+'/add/profile/image',
            // url: 'http://localhost:3000/add/profile/image',
            url: apiUrl + '/add/profile/image',
            method: 'post',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((result) => {

        }).catch((err) => {

        })
    }
    return (
        <>
            <Container>
                <Row className="mt-3">
                    <Col className=" me-5">
                        <div style={{ display: "flex", marginTop: '50px' }}>
                            <h1 className="text-success me-5">Welcome </h1>
                            <h1>{userName}</h1>
                        </div>
                        <div><Image src={rahul} className='me-2' style={{ height: '100px', width: '100px' }} /></div>
                    </Col>

                    <Col >
                        <Row>
                            <Col><Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name" />
                            </Form.Group></Col>
                            <Col><Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name" />
                            </Form.Group></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Gender</Form.Label>
                                    <div className="d-flex gap-3">
                                        <Form.Check type="radio" name="gender" label="Male" />
                                        <Form.Check inline type="radio" name="gender" label="Female" />
                                    </div>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone No</Form.Label>
                                    <Form.Control type="number" placeholder="Enter your phone no" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select your profile picture</Form.Label>
                                    <Form.Control type="file" placeholder="Browse Image" onChange={(e) => { setFile(e.target.files[0]) }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="success" onClick={submitUserDetail}>Submit</Button>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default Profile;