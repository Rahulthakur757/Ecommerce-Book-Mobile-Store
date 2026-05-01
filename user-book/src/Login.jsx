import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useState, } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
function Login() {
    let navigate = useNavigate();
    let [show, setShow] = useState(true);
    let [login, setLogin] = useState(true);
    let [signup, setSignup] = useState(false);
    let [title, setTitle] = useState('Login');
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [signUpEmail, setSignUpEmail] = useState('')
    let [signUpPassword, setSignUpPassword] = useState('')
    let [showOtpContent, setShowOtpContent] = useState(false);

    let [loginEmail, setLoginEmail] = useState('')
    let [loginPassword, setLoginPassword] = useState('')

    let [otpSend, setOtpSend] = useState(0);
    let [otpEntered, setOtpEntered] = useState(0)
    let [showSuccessOtpMessage, setShowSuccessOtpMessage] = useState(false);
    let [showFailureOtpMessage, setShowFailureOtpMessage] = useState(false);

    let [disbledSignUpButton, setDisbledSignUpButton] = useState(true);
    let [disbledLoginButton, setDisbledLoginButton] = useState(false);
    let [disbledOtpVerifyButton, setDisbledOtpVerifyButton] = useState(false)
    let [disbledSendOtpButton, setDisbledSendOtpButton] = useState(false)
    let [showSpinner, setShowSpinner] = useState(false);
    let [serverMesssage, setServerMessage] = useState('');
    let [isSuccess, setIsSuccess] = useState(false);
    let [messageModal, setMessageModal] = useState(false);

    function handleClose() {
        setShow(false);
    }
    function handleMessageClose() {
        setMessageModal(false);
    //      if (isSuccess) {
    //     window.location.reload();
    // }
    }
    function showSignupModal() {
        setLogin(false);
        setSignup(true);
        setTitle('Sign Up')
    }
    function showLoginModal() {
        setLogin(true);
        setSignup(false);
        setTitle('Login')
    }

    function doSignUp() {
        setShowSpinner(true);

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: signUpEmail,
            password: signUpPassword
        }
        axios({
            url: apiUrl + '/add/user',
            method: 'post',
            data: data
        }).then((result) => {
            if (result.data.success) {
                setServerMessage(result.data.message)
                setIsSuccess(result.data.success);
                setShow(true);
                setMessageModal(true)

                // setShowSpinner(false);
            }
            showLoginModal()
        }).catch((err) => {
            alert(err)
            setServerMessage(err.response?.data?.message);
            setIsSuccess(false);
            setMessageModal(true)
        }).finally(() => {
            setShowSpinner(false);
        });
    }

    function sendOtp() {
        setShowSpinner(true);
        setDisbledSendOtpButton(true)
        let data = {
            email: signUpEmail
        }
        axios({
            url: apiUrl + '/send/otp/for/signup',
            method: 'post',
            data: data
        }).then((result) => {
            if (result.data.success) {
                setShowOtpContent(true);
                setOtpSend(result.data.data);
                setServerMessage(result.data.message)
                setIsSuccess(result.data.success);
                setShow(true);
                setMessageModal(true)

                // setShowSpinner(false);
                // setDisbledSendOtpButton(false)
            }

        }).catch((err) => {
            console.log(err);
            setServerMessage(err.response?.data?.message);
            setIsSuccess(false);
            setMessageModal(true)
        }).finally(() => {
            setShowSpinner(false)
            setDisbledSendOtpButton(false)
        })
    }

    function verifyOtp() {
        setShowSpinner(true);
        setDisbledOtpVerifyButton(true)
        if (parseInt(otpSend) === parseInt(otpEntered)) {
            setShowSuccessOtpMessage(true)
            setShowOtpContent(false)
            setDisbledSignUpButton(false)
        } else {
            setShowFailureOtpMessage(true)
        }

        setShowSpinner(false);
        setDisbledOtpVerifyButton(false)
    }

    function doLogin() {
        setShowSpinner(true);
        setDisbledLoginButton(true);
        let data = {
            email: loginEmail,
            password: loginPassword
        }
        axios({
            url: apiUrl + '/user/login',
            method: 'post',
            data: data
        }).then((result) => {
            if (result.data.success) {
                localStorage.setItem('name', result.data.data.name);
                localStorage.setItem('email', result.data.data.email);
                localStorage.setItem('token', result.data.data.token)
                setShow(false);
                setServerMessage(result.data.message)
                setIsSuccess(result.data.success);
                setMessageModal(true);
                window.location.reload();
                // setShowSpinner(false);
                // setDisbledLoginButton(false)
            }
        }).catch((err) => {
            console.log(err);
            setDisbledLoginButton(false)
            setServerMessage(err.response?.data?.message);
            setIsSuccess(false);
            setMessageModal(true)
        }).finally(() => {
            setShowSpinner(false);
        })
    }
    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {login &&
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Type Email here' onChange={(e) => setLoginEmail(e.target.value)}></Form.Control>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Type Password here' onChange={(e) => setLoginPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' variant='success' disabled={disbledLoginButton} onClick={doLogin}>Login</Button>
                            <p>Do you have account? <span style={{ cursor: 'pointer' }} className='text-danger' onClick={showSignupModal}>Sign up</span></p>
                        </Form>
                    }
                    {
                        signup &&
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' placeholder='Type First Name here' onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type='Text' placeholder='Type Last Name here' onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Type Email here' onChange={(e) => setSignUpEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' variant='success' disabled={disbledSendOtpButton} onClick={sendOtp}>Verify Email</Button>
                            {
                                showOtpContent &&
                                <Form.Group>
                                    <p className='text-success'>OTP has been sent on above entered email</p>
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control type='Text' placeholder='Type OTP here' onChange={(e) => setOtpEntered(e.target.value)}></Form.Control>
                                    <Button className='mt-2' variant='warning' disabled={disbledOtpVerifyButton} onClick={verifyOtp}>Verify OTP</Button>
                                </Form.Group>
                            }
                            {showSuccessOtpMessage && <span className='text-success'>Email Verified Successfully.</span>}
                            {showFailureOtpMessage && <span className='text-danger'>Incorrect OTP</span>}
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Type Password here' onChange={(e) => setSignUpPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' variant='success' onClick={doSignUp} disabled={disbledSignUpButton}>SignUp</Button>
                            <p>Do you have an all ready account? <span style={{ cursor: 'pointer' }} className='text-danger' onClick={showLoginModal}>Login</span></p>
                        </Form>

                    }

                </Modal.Body>
                {showSpinner && <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: '30%', left: '50%', color: 'blue' }}><Spinner animation="border" /></div>}
            </Modal>
            <Modal show={messageModal} onHide={handleMessageClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSuccess ? "Success" : "Error"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{serverMesssage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleMessageClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default Login;