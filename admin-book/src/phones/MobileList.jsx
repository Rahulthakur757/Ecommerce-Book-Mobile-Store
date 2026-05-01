
import { useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



function MobileList() {

    let navigate = useNavigate();
    let [mobiles, setMobiles] = useState([]);
    let [isDelete, setIsDelete] = useState(false);
    const [show, setShow] = useState(false);
    let [searchByPhoneName, setSearchByPhoneNmae] = useState('');
    
    let [nop, setNOP] = useState(1);
    let [pageNo, setPageNo] = useState(1);
    let [totalPhone, setTotalPhone] = useState(0);
    let phoneperpage = 5;
    let items = [];

    for (let i = 1; i <= nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={() => setPageNo(i)}>{i}</Pagination.Item>
        )
    }


    const handleClose = () => {
        setShow(false);
        setIsDelete(true);
        navigate('/');

    }

    useEffect(() => {
        axios({
            url: apiUrl + '/Mobiles',
            method: 'get',
            params: {
                name: searchByPhoneName,
                pageNo: pageNo,
                limit: 5
            }
        }).then((result) => {
            if (result.data.success) {
                setMobiles(result.data.data);
                setTotalPhone(result.data.totalCount)
                setNOP(Math.ceil(result.data.totalCount / phoneperpage))
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [isDelete, searchByPhoneName, pageNo])

    function goToAddMobilePage() {
        navigate('/add/mobile');
    }

    function goToDelete(id) {
        axios({
            url: apiUrl + '/delete/mobile/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true);
            }

        }).catch((err) => {
            console.log('Check erroe', err);

        })
    };

    function goToView(id) {
        navigate('/mobile/detail/' + id) // yanha se (MobileDetail.jsx) page ka path(route) define hua h
    }
    function goToEdit(id) {
        navigate('/edit/mobile/' + id)// yah path doosare page par jane ka
    }

    function searchPhone(phonename) {
        setSearchByPhoneNmae(phonename);

    }
    return (
        <>
            <Form.Control type="text" placeholder="Enter Mobile Name to Search" onChange={(e) => searchPhone(e.target.value)} />

            <button className=" btn btn-primary ms-2 mt-2 float-end" onClick={goToAddMobilePage}>Add Mobile+</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mobile Image</th>
                        <th>Mobile Name</th>
                        <th> Price</th>
                        <th>Storage</th>
                        <th>Camera</th>
                        <th>Availability</th>
                        <th>Short Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mobiles.map((mobile) =>
                            <tr>
                                <td><img src={mobile.image} alt="" height={50} width={50} /></td>
                                <td>{mobile.name}</td>
                                <td>{mobile.originalPrice}</td>
                                <td>{mobile.ram}/{mobile.storage}</td>
                                <td>{mobile.frontCamera}/{mobile.rearCamera}</td>
                                <td>{mobile.availability}</td>
                                <td>{mobile.os}/{mobile.cpuCore}</td>
                                <td>
                                    <i className="bi bi-eye" onClick={() => goToView(mobile._id)}></i>
                                    <i className="bi bi-pencil ms-3" onClick={() => goToEdit(mobile._id)}></i>
                                    <i className="bi bi-trash ms-3" onClick={() => goToDelete(mobile._id)}></i>
                                    {/* <button className="btn btn-primary" onClick={()=> goToView(mobile._id)}> <FaEye style={{ marginRight: '5px' }}  /> </button>
                                <button className="btn btn-success ms-2" onClick={()=> goToEdit(mobile._id)}> <FaEdit style={{ marginRight: '5px' }}/></button>
                                <button className="btn btn-danger ms-2" onClick={()=> goToDelete(mobile._id)}> <FaTrash style={{ marginRight: '5px' }} /></button> */}
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                {totalPhone > phoneperpage ? <Pagination>{items}</Pagination> : " "}
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mobile has been Deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default MobileList;
