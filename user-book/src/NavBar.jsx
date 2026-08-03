import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navbar, Nav, Form, Button, Container, Dropdown, Image, Badge } from 'react-bootstrap';
import Login from './Login';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oders from './assets/orders.svg';
import { useSelector } from 'react-redux';

function NavBar() {
  let navigate = useNavigate();
  let [showLoginModal, setShowLoginModal] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userName, setUserName] = useState('');
  let [searchQuery, setSearchQuery] = useState('');

  const { products } = useSelector((state) => state.cart || { products: [] });

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('name') || 'User');
    }
  }, []);

  function doLogOut() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
}

  return (
    <Container fluid className="p-0">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand
            onClick={() => { setSearchQuery(''); navigate('/'); }}
            style={{ cursor: 'pointer' }}
          >
            RDEC Book Store
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link className='text-white' onClick={() => navigate('/mobile')}>Mobile</Nav.Link>
              <Nav.Link className='text-white' onClick={() => navigate('/book')}>Book</Nav.Link>
            </Nav>

            {/* Cart Icon */}
            <Nav.Link onClick={() => navigate('/cart')} className='text-white me-3' style={{ position: 'relative' }}>
              <i className="bi bi-cart" style={{ fontSize: '1.4rem' }}></i>
              {products && products.length > 0 && (
                <Badge bg="danger" pill style={{ position: 'absolute', top: '-2px', right: '-10px', fontSize: '0.7rem' }}>
                  {products.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Search Form */}
            <Form className="d-flex me-2" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search books or mobiles...."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>

            {/* Login / User Profile Dropdown */}
            {!isLoggedIn ? (
              <Button
                variant="success"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" style={{ backgroundColor: '#f8f9fa' }}>
                  <Dropdown.Item onClick={() => navigate('/orders')}>
                    <Image src={oders} className='me-2' width="18" /> Orders
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

      {showLoginModal && <Login closeModal={() => setShowLoginModal(false)} />}
    </Container>
  );
}

export default NavBar;