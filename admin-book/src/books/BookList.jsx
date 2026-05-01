import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function BookList() {
    let navigate = useNavigate()
    let [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    let [isDelete, setIsDelete] = useState(false);
    let [searchByBookName, setsearchByBookName] = useState('')

    let [nop,setNop] = useState(1);
    let [pageNo, setPageNo] = useState(1);
    let [totalBook, setTotalBook] = useState(0)
    let bookperpage = 3;
    
    let items = [];
    for(let i = 1; i<=nop; i++) {
        items.push(
            <Pagination.Item key={i} onClick={()=>setPageNo(i)}>{i}</Pagination.Item>
        )
    }
    const handleClose = () => {
        setShow(false)
        setIsDelete(true)
    }
    useEffect(() => {
        axios({
            // url: 'http://localhost:3000/books',
            url: apiUrl + '/books',
            method: 'get',
            params: {
                bookTitle: searchByBookName,
                pageNo: pageNo,
                limit: 3
            }
        }).then((result) => {
            if (result.data.success) {
                // console.log(result.data.data);
                setBooks(result.data.data);
                setTotalBook(result.data.totalCount)
                setNop(Math.ceil(result.data.totalCount / bookperpage));
            }
        }).catch((err) => {
            console.log(err)
        })

    }, [isDelete, searchByBookName, pageNo]);

    function goToDelete(id) {
        setShowSpinner(true);
        axios({
            // url: 'http://localhost:3000/delete/book/'+id,
            url: apiUrl + '/delete/book/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true)
            }
        }).catch((err) => {
            console.log(err)

        })
    };

    function goToEdit(id) {
        navigate('/edit/book/' + id)
    }

    function goToView(id) {
        navigate('/book/detail/' + id);
    }

    function searchBook(bookname) {
        setsearchByBookName(bookname);
    }

    function goToAddBookPage() {
        navigate('/add/book')
    }
    return (
        <>
         <Form.Control type="text" placeholder="Enter Book Name to Search" onChange={(e) => searchBook(e.target.value) } />
            <button className="btn btn-success ms-2 mt-3 float-end" onClick={goToAddBookPage}>Add Book+</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Image</th>
                        <th>Book Title</th>
                        <th>Author Name</th>
                        <th>Publisher Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book) =>
                            <tr>
                                <td> <img src={book.image} width="40px" height="40px"></img> </td>
                                <td>{book.bookTitle}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.originalPrice} </td>
                                <td>
                                    <i className="bi bi-eye" onClick={() => goToView(book._id)}></i>
                                    <i className="bi bi-pencil ms-3" onClick={() => goToEdit(book._id)}></i>
                                    <i className="bi bi-trash ms-3" onClick={() => goToDelete(book._id)}></i>


                                    {/* <button className="btn btn-success ms-2 " onClick={()=> goToView(book._id)}><FaEye style={{ marginRight: '5px' }} />View</button> */}
                                    {/* <button className="btn btn-primary ms-2" onClick={()=> goToEdit(book._id)}><FaEdit style={{ marginRight: '5px' }}/>Edit</button>
                                <button className="btn btn-danger ms-2" onClick={()=> goToDelete(book._id)}><FaTrash style={{ marginRight: '5px' }} />Delete</button>   */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                { totalBook > bookperpage ? <Pagination>{items}</Pagination> : " " }    
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BookList