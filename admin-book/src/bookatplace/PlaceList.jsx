import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { Modal, Button, Pagination } from "react-bootstrap";

function PlaceList() {
    let navigate = useNavigate();
    let [places, setPlaces] = useState([]);
    let [show, setShow] = useState(false);
    let [isDelete, setIsDelete] = useState(false);

    let [nop, setNOP] = useState(1);
    let [pageNo, setPageNo] = useState(1);
    let [totalPlace, setTotalPlace] = useState(0);
    let placeperpage = 5;
    let items = [];

    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }

    function goToAddPlacePage() {
        navigate('/add/place');
    }

    const handleClose = () => {
        setShow(false)
        setIsDelete(true)
        navigate('/places')
    }
    useEffect(() => {
        axios({
            url: apiUrl + '/places/for/book/delivery',
            method: 'get',
            params: {
                pageNo: pageNo,
                limit: 5
            }
        }).then((res) => {
            setPlaces(res.data.data);
            setTotalPlace(result.data.totalCount)
            setNOP(Math.ceil(result.data.totalCount / placeperpage))
        }).catch((err) => {
            console.log(err);
        })
    }, [isDelete,pageNo])

    function goToEdit(id) {
        navigate('/edit/place/' + id);
    };

    function goToDelete(id) {
        axios({
            url: apiUrl + '/delete/place/' + id,
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
            <button className="btn btn-success ms-2 mt-3 float-end" onClick={goToAddPlacePage}>Add Place for Book Delivery+</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Pin Code</th>
                        <th>City</th>
                        <th>Is Available</th>
                        <th>Delivery Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {

                        places.map(place =>
                            <tr>

                                <td>{place.book.bookTitle}</td>
                                <td>{place.pinCode}</td>
                                <td>{place.city}</td>
                                <td>{place.isAvailable ? 'Yes' : 'No'}</td>
                                <td>{place.deliveryTime}</td>
                                <td>
                                    <i className="bi bi-pencil" onClick={() => goToEdit(place._id)}></i>
                                    <i className="bi bi-trash ms-3" onClick={() => goToDelete(place._id)}></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                {totalPlace > placeperpage ? <Pagination>{items}</Pagination> : " "}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book Place has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default PlaceList;