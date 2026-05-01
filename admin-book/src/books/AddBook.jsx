import { Container, Row, Col, Form, Button, Modal, Spinner } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_API_URL;

function AddBook() {

    let naviagate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        naviagate('/')
    }
    function goToListPage() {
        naviagate('/')
    }

    let [showSpinner, setShowSpinner] = useState(false);
    let [buttonDisable, setButtonDisable] = useState(false);

    let [bookTitle, setBookTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [shortDescription, setShortDescription] = useState('');
    let [longDescription, setLongDescription] = useState('');
    let [language, setLanguage] = useState('Hindi');
    let [binding, setBinding] = useState('PaperBinding');
    let [publisher, setPublisher] = useState('');
    let [isReplaceable, setIsReplaceable] = useState(true);
    let [quantity, setQuantity] = useState(0);
    let [originalPrice, setOriginalPrice] = useState(0);
    let [genre, setGenre] = useState('Academic');
    let [isbn, setIsbn] = useState('');
    let [edition, setEdition] = useState('');
    let [isUsed, setIsUsed] = useState(false);
    let [pages, setPages] = useState(0);
    let [publishYear, setPublishYear] = useState(2000);
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0);
    let [file, setFile] = useState();

    function doAddBook() {

        if (!file) {
            alert("Please select an image");
            return;
        }
        setButtonDisable(true);
        setShowSpinner(true);

        let formData = new FormData()
        formData.append('bookTitle', bookTitle)
        formData.append('author', author)
        formData.append('shortDescription', shortDescription)
        formData.append('longDescription', longDescription)
        formData.append('language', language)
        formData.append('binding', binding)
        formData.append('publisher', publisher)
        formData.append('isReplaceable', isReplaceable)
        formData.append('quantity', quantity)
        formData.append('originalPrice', originalPrice)
        formData.append('genre', genre)
        formData.append('isbn', isbn)
        formData.append('edition', edition)
        formData.append('isUsed', isUsed)
        formData.append('pages', pages)
        formData.append('publishYear', publishYear)
        formData.append('width', width)
        formData.append('height', height)
        formData.append('image', file);

        axios({
            // url: 'http://localhost:3000/add/book',
            url: apiUrl + '/add/book',
            method: 'post',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((result) => {
            console.log("Result", result);
            if (result.data.success) {
                setButtonDisable(false);
                setShowSpinner(false);
                setShow(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Book Title" onChange={(e) => { setBookTitle(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Author Name" onChange={(e) => { setAuthor(e.target.value) }} />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text" name="shortDescription" placeholder="Enter Short Description" onChange={(e) => { setShortDescription(e.target.value) }} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" onChange={(e) => { setLongDescription(e.target.value) }}>
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setLanguage(e.target.value) }}>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Punjabi">Punjabi</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Select Book Binding</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setBinding(e.target.value) }}>
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
                            <Form.Control type="text" placeholder="Enter Publisher" onChange={(e) => { setPublisher(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Replaceable</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setIsReplaceable(e.target.value) }}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="Numbert" placeholder="Enter Quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="Numbert" placeholder="Enter Price in (Rs)" onChange={(e) => { setOriginalPrice(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Genre(Category)</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setGenre(e.target.value) }}>
                            <option value="Academic">Academic</option>
                            <option value="Banking">Banking</option>
                            <option value="Engineering">Engineering</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>ISBN NO</Form.Label>
                            <Form.Control type="text" placeholder="Enter ISBN " onChange={(e) => { setIsbn(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control type="text" placeholder="Enter Edition " onChange={(e) => { setEdition(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Is Used</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => { setIsUsed(e.target.value) }}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pages(In Numers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Number of Pages " onChange={(e) => { setPages(e.target.value) }} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Published Year(In Numers)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Published Year " onChange={(e) => { setPublishYear(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Height(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Height " onChange={(e) => { setHeight(e.target.value) }} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Width(In Cm)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Width " onChange={(e) => { setWidth(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Book Image</Form.Label>
                            <Form.Control type="file" placeholder="Browse Image " onChange={(e) => { setFile(e.target.files[0]) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" onClick={goToListPage}>Cancel</Button>
                <Button className="ms-3" variant="success" disabled={buttonDisable} onClick={doAddBook}>Add Book</Button>
                <input type="reset" className="btn btn-danger ms-2" value="Reset" />
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been saved successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {showSpinner && <Spinner animation="border" />}
        </Container>
    )
}
export default AddBook