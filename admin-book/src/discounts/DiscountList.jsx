import { useNavigate } from "react-router-dom";
import { Button, Pagination,  Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css'

function DiscountList() {

    const navigate = useNavigate();
    let [discounts, setDiscounts] = useState([]);
    let [isDelete, setIsDelete] = useState(false);
    
    let [nop, setNop] = useState(1);
    let [pageNo, setPageNo] = useState(1);
    let [totalDiscount, setTotalDiscount] = useState(0);
     const [show, setShow] = useState(false);
    let discountPerPage = 3;
    let items = [];

    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }

    const handleClose = () => {
        setShow(false)
        setIsDelete(true)
    }

    function goToAddDiscountPage() {
        navigate('/add/discount');
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/discounts',
            method: 'get',
            params: {
                pageNo: pageNo,
                limit: 3
            }
        }).then((result) => {
            setDiscounts(result.data.data)
            setTotalDiscount(result.data.totalCount)
            setNop(Math.ceil(result.data.totalCount / discountPerPage))
        }).catch((err) => {
            console.log(err);
        })

    }, [isDelete,pageNo]);

    function goToEdit(id) {
        navigate('/edit/discount/' + id);
    }

    function goToDelete(id) {
        axios({
            url: apiUrl + '/delete/discount/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true);
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <>
            <button className="btn btn-success ms-2 mt-3 float-end" onClick={goToAddDiscountPage}>Add Discount+</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Discount Name</th>
                        <th>Applied On</th>
                        <th>Author Name</th>
                        <th>Orginal Price</th>
                        <th>Discount Type</th>
                        <th>Discount Value</th>
                        <th>Final Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    { 
                        discounts.map(discount =>
                            <tr>
                                <td>{discount.discountName}</td>
                                <td>{discount.book.bookTitle}</td>
                                <td>{discount.book.author}</td>
                                <td>{discount.book.originalPrice}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                <td>{discount.book.originalPrice - discount.discountValue}</td>
                                <td>
                                    <i className="bi bi-pencil" onClick={() => goToEdit(discount._id)}></i>
                                    <i className="bi bi-trash ms-3" onClick={() => goToDelete(discount._id)}></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                {totalDiscount > discountPerPage ? <Pagination>{items}</Pagination> : ''}

            </div>

            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Discount has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DiscountList;