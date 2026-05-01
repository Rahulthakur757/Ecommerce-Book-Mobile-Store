import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Row, Col, Form, Button, Modal,  } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios"
import { useNavigate } from "react-router-dom";

function BookEdit() {

    let navigate = useNavigate();
    let params = useParams()
    let [book, setBook] = useState({})
    const [show, setShow] = useState(false);
    //let [showSpinner, setShowSpinner] = useState(false)
    // let [buttonDisabled, setButtonDisabled] = useState(false)

    const handleClose = () => {
        setShow(false)
        navigate('/')
    };

    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setBook((prev) => {
            return{
                ...prev, [name]: value
            }
        }) 
    };

    function doEditBook(id) {
        axios({
            url: apiUrl + '/edit/book/' + id,
            method: 'put',
            data: book
        }).then((result)=>{
            if(result.data.success) {
                setShow(true)
            }
        }).catch(() => {

        })
    };

    useEffect(() => {
        // http://localhost:3000/book/788899q.....
        axios({
            url: apiUrl + '/book/' + params.id,
            method: 'get'
        }).then((result) => {
            setBook(result.data.data)
        }).catch((err) => {

        })
    }, [params]);

    function goToListPage() {
        navigate('/books')
    }

    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Book Title" onChange={handleChange} name="bookTitle" value={book.bookTitle} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Author Name" onChange={handleChange} name="author" value={book.author} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Short Description" onChange={handleChange} name="shortDescription" value={book.shortDescription} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChange} name="longDescription" value={book.longDescription} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="language" value={book.language}>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Punjabi">Punjabi</option>
                        </Form.Select>

                    </Col>
                    <Col>
                        <Form.Label>Select Book Binding</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="binding" value={book.binding}>
                            <option value="PaperBinding">Paper Binding</option>
                            <option value="HardCover">HardCover</option>
                            <option value="Spiral">Spiral</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Publisher" onChange={handleChange} name="publisher" value={book.publisher} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Replaceable</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="isReplaceable" value={book.isReplaceable}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>

                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Quantity" onChange={handleChange} name="quantity" value={book.quantity} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Price in(Rs)" onChange={handleChange} name="originalPrice" value={book.originalPrice} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Genre(Category)</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="genre" value={book.genre}>
                            <option value="Academic">Academic</option>
                            <option value="Banking">Banking</option>
                            <option value="Engineering">Engineering</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>ISBN No</Form.Label>
                            <Form.Control type="Text" placeholder="Enter ISBN" onChange={handleChange} name="isbn" value={book.isbn} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Edition" onChange={handleChange} name="edition" value={book.edition} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Used</Form.Label>
                        <Form.Select aria-label="Language" onChange={handleChange} name="isUsed" value={book.isUsed}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pages(In Numbers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Number of Pages" onChange={handleChange} name="pages" value={book.pages} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Published Year(In Numbers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Published Year" onChange={handleChange} name="publishYear" value={book.publishYear} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Height(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Height" onChange={handleChange} name="height" value={book.height} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Width(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Width" onChange={handleChange} name="width" value={book.width} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src={book.image} width="300" height="300"></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Book Image</Form.Label>
                            <Form.Control type="file" placeholder="Browse Image" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" onClick={goToListPage}>Cancel</Button>
                <Button className="ms-3" variant="success" disabled={false} onClick={()=> doEditBook(book._id)}>Edit Book</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been Updated successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default BookEdit