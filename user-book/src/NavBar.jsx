import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navbar, Nav, Form, Button, Container, Dropdown, Image, Badge } from 'react-bootstrap';
import Login from './Login';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import profile from './assets/profile.svg'
import oders from './assets/orders.svg'
import rahul from './assets/rahul.jpg'
import { useSelector } from 'react-redux';




function NavBar() {
  let navigate = useNavigate()
  let [showLoginModal, setShowLoginModal] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userName, setUserName] = useState('');
  const { products } = useSelector((state) => state.cart)
  useEffect(() => {
    let token;
    token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
      setUserName(localStorage.getItem('name'))

    }
  }, []);

  function doLogOut() {
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    setIsLoggedIn(false)
    navigate('/')
  }


  function search() {
    alert("Serach button")
  }


  function searchProduct () {
    alert("serch box")
  }
  return (
    <Container fluid>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">RDEC Book Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className='text-white' onClick={() => navigate('/mobile')}>Mobile</Nav.Link>
              <Nav.Link className='text-white' onClick={() => navigate('/book')}>Book</Nav.Link>
            </Nav>


            <Nav.Link onClick={() => navigate('/cart')} className='text-white'style={{position: 'relative'}}>
              <i className="bi bi-cart " style={{fontSize:'1.3rem',marginRight:'25px'}}></i>
              { products.length>0  &&
              <Badge bg="danger" pill style={{position: 'absolute', top: '0',right: '-8px', fontSize:'0.7rem',marginRight:'25px'}}> {products.length}</Badge>}
            </Nav.Link>


            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => searchProduct(e.target.value)}
              />
              <Button variant="outline-success" onClick={search}>Search</Button>
            </Form>
          
            {
              !isLoggedIn && (
                <Button className='ms-2' variant="success" onClick={() => setShowLoginModal(true)}>
                  <Image src={profile} roundedCircle className='me-2' /> Login
                </Button>
              )
            }

            {isLoggedIn && (
              <Dropdown className='ms-2'>
                <Dropdown.Toggle variant="dark">
                  <Image src={rahul} roundedCircle className='me-2' style={{objectFit: 'cover', height:'35px', width:'35px'}}/> {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ backgroundColor: '#f8f9fa' }}>
                  <Dropdown.Item href="/profile">
                    <Image src={profile} className='me-2' />Manage Profile
                  </Dropdown.Item>

                  <Dropdown.Item href="/orders">
                    <Image src={oders} className='me-2' />Orders
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={doLogOut}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLoginModal && <Login></Login>}
    </Container>
  );
}

export default NavBar;