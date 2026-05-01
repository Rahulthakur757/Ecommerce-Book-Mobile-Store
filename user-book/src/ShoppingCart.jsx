import { useEffect, useState } from "react";
import { Button, Container, Row, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "./features/cart/cartSlice";
import { useNavigate } from "react-router-dom";


function ShoppingCart() {
    let dispatch = useDispatch();
    const { products } = useSelector((state) => state.cart)
    let [totalCost, setTotalCost] = useState(0);
    let [showCart, setShowCart] = useState(false);
    let navigate = useNavigate();
    const [show, setShow] = useState("");
    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        let price = 0;
        setTotalCost(0);
        totalCost = 0;
        if (products.length > 0) {
            setShowCart(true);
        }
        for (let i = 0; i < products.length; i++) {
            let Price = products[i].DiscountDetail.length > 0 ? products[i].DiscountDetail[0].finalPrice : products[i].originalPrice
            totalCost = totalCost + Price
            setTotalCost(totalCost)
        }

    }, [])

    function goToDelete(id) {
        dispatch(deleteBook(id));
    }
    function goToCheckoutPage() {
        let token;
        token = localStorage.getItem('token')
        if (token) {
            navigate('/checkout')
        } else {
            // alert('pls login first')
            setShow(true)
        }

    }
    return (
        <>
            <Container>
                <Row>
                    <h3>Shopping Cart</h3>
                    {
                        showCart &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product name</th>
                                    <th>Original Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) =>
                                        <tr>
                                            <td> <img src={product.image} width="40px" height="40px"></img> </td>
                                            <td>{product.bookTitle}
                                                {product.name}
                                            </td>
                                            <td>{product.originalPrice}</td>
                                            <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].discountValue : 0}</td>
                                            <td>{product.DiscountDetail.length > 0 ? product.DiscountDetail[0].finalPrice : product.originalPrice}</td>
                                            <td><i className="bi bi-trash ms-3 text-danger" onClick={() => goToDelete(product._id)}></i></td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total Cost</td>
                                    <td>{totalCost.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>


                    }
                    <div className="text-end">
                        {showCart && <Button style={{ width: '20%' }} onClick={goToCheckoutPage}>Proceed to Check out</Button>}
                    </div>
                    {
                        !showCart &&
                        <h3 className="text-danger">NO data to display</h3>
                    }
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please Login First!</Modal.Body>
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
export default ShoppingCart;