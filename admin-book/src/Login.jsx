import { Container, Form, Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();
    let [serverMesssgae, setServerMessage] = useState('');
    let [isSuccess, setIsSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        if(isSuccess) {
            navigate('/*')
        }
        
    }

    function doLogin() {
        let data = {
            email: email,
            password: password
        }
        axios({
            url: apiUrl + '/admin/login',
            method: 'post',
            data: data
        }).then((result) =>{
            //console.log(result);
            if(result.data.success) {
                setServerMessage(result.data.message)
                setIsSuccess(result.data.success);
                setShow(true);
            }
        }).catch((err) => {
            console.log(err);
            setServerMessage(err.response?.data?.message);
            setIsSuccess(false);
             setShow(true);
            // alert("Invalid username & password..");
        })
    }

    return (
        <div className="login-page">
            <Container className="login-box">
                <h3 className="text-center login-title">Admin Login</h3>

                <Form className="login-form">
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="success" type="button" onClick={doLogin} className="login-button">
                        Login
                    </Button>
                </Form>

                 <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSuccess ? "Success" : "Error"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{serverMesssgae}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
            </Container>
        </div>
    );
}

export default Login;
