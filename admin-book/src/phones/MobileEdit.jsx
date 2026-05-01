import { Container, Row, Col, Form, Button, Modal} from "react-bootstrap";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function MobileEdit(){

    let params = useParams();
    let [mobile, setMobile] = useState({});
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false);
        navigate('/')
    }

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setMobile((prev)=>{
            return{
                ...prev, [name]: value
            }
        })
    }

    useEffect(()=>{
        axios({
            url: apiUrl + '/mobile/' + params.id,
            method: 'get'
        }).then((result)=>{
            setMobile(result.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[params])

    function doEditMobile(id){
        axios({
            url: apiUrl + '/edit/mobile/' + id ,
            method: 'put',
            data: mobile
        }).then((result)=>{
            if(result.data.success) {
                setShow(true)
            }
        }).catch((err)=>{
            console.log('Error are comming from',err);
        });
    };
    function goToMobileList() {
        navigate('/mobiles');
    }



    return(
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Mobile Name" onChange={handleChange} name="name" value={mobile.name}/>
                        </Form.Group>
                    </Col>
                   
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Short Description" onChange={handleChange} name="shortDescription" value={mobile.shortDescription} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Orginal Price</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Orginal Price" onChange={handleChange} name="originalPrice" value={mobile.originalPrice} />
                        </Form.Group>
                    </Col>
                   <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Launch Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Launch Date" onChange={handleChange} name="launchDate" value={mobile.launchDate ? new Date(mobile.launchDate).toISOString().split('T')[0] : ''}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Ram(inGB)</Form.Label>
                        <Form.Select aria-label="Ram" onChange={handleChange} name="ram" value={mobile.ram}>
                            <option >Select Ram</option>
                            <option value="3GB">3GB</option>
                            <option value="4GB">4GB</option>
                            <option value="6GB">6GB</option>
                            <option value="8GB">8GB</option>
                            <option value="12GB">12GB</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Storage(inGB)</Form.Label>
                        <Form.Select aria-label="Storage" onChange={handleChange} name="storage" value={mobile.storage}>
                            <option >Select Internal Storage</option>
                            <option value="32GB">32GB</option>
                            <option value="64GB">64GB</option>
                            <option value="128GB">128GB</option>
                            <option value="256GB">256GB</option>
                            <option value="512GB">512GB</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Expandable</Form.Label>
                        <Form.Select aria-label="Expandable" onChange={handleChange} name="expandable" value={mobile.expandable}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Availability</Form.Label>
                        <Form.Select aria-label="Availability" onChange={handleChange} name="availability" value={mobile.availability}>
                            <option >Check Availability</option>
                            <option value="InStock">In Stock</option>
                            <option value="OutofStock">Out of Stock</option>
                            <option value="PreOrder">Pre-Order</option>
                            <option value="Upcoming">Upcoming</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Body Material</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Body Material" onChange={handleChange} name="bodyMaterial" value={mobile.bodyMaterial} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Weight(in Gram)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Weight" onChange={handleChange} name="weight" value={mobile.weight}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Width(in MM)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Width" onChange={handleChange} name="width" value={mobile.width}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Display</Form.Label>
                        <Form.Select aria-label="Display" onChange={handleChange} name="display" value={mobile.display}>
                            <option >Select Display</option>
                            <option value="HD">HD</option>
                            <option value="Punchhole">Punch Hole</option>
                            <option value="IPSLCD">IPS LCD</option>
                            <option value="AMOLED">Amoled</option>
                            <option value="FoldableDisplay">Foldable Display</option>
                            <option value="CurvedDisplay">Curved Display</option>
                            <option value="SuperAMOLED">Super Amoled</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Screen Size (in Inch)</Form.Label>
                        <Form.Select aria-label="Screen Size" onChange={handleChange} name="screenSize" value={mobile.screenSize}>
                            <option >Select Screen Size</option>
                            <option value="4 inch - 4.7 inch">4 inch - 4.7 inch</option>
                            <option value="4.7 inch - 5 inch">4.7 inch - 5 inch</option>
                            <option value="5 inch - 5.5 inch">5 inch - 5.5 inch</option>
                            <option value="5.5 inch - 6 inch">5.5 inch - 6 inch</option>
                            <option value="6 inch - 6.5 inch">6 inch - 6.5 inch</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Refresh Rate (in Hz) </Form.Label>
                        <Form.Select aria-label="Refresh Rate" onChange={handleChange} name="refreshRate" value={mobile.refreshRate}>
                            <option >Select Refresh Rate</option>
                            <option value="90">90 Hz</option>
                            <option value="120">120 Hz</option>
                            <option value="144">144 Hz</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Rear Camera (in MP)</Form.Label>
                        <Form.Select aria-label="Rear Camera" onChange={handleChange} name="rearCamera" value={mobile.rearCamera}>
                            <option >Select Rear Camera</option>
                            <option value="13MP">13MP</option>
                            <option value="16MP">16MP</option>
                            <option value="32MP">32MP</option>
                            <option value="48MP">48MP</option>
                            <option value="64MP">64MP</option>
                            <option value="108MP">108MP</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Front Camera (in MP) </Form.Label>
                        <Form.Select aria-label="Front Camera" onChange={handleChange} name="frontCamera" value={mobile.frontCamera}>
                            <option >Select Front Camera</option>
                            <option value="5MP">5MP</option>
                            <option value="13MP">13MP</option>
                            <option value="16MP">16MP</option>
                            <option value="32MP">32MP</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Height(in MM)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Height" onChange={handleChange} name="height" value={mobile.height}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Operating System</Form.Label>
                        <Form.Select aria-label="os" onChange={handleChange}name="os" value={mobile.os}>
                            <option >Select Version</option>
                            <option value="Android12">Android 12</option>
                            <option value="Android13">Android 13</option>
                            <option value="Android14">Android 14</option>
                            <option value="Android15">Android 15</option>
                            <option value="iOS">Apple iOS</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>CPU Core</Form.Label>
                        <Form.Select aria-label="CPU Core" onChange={handleChange} name="cpuCore" value={mobile.cpuCore}>
                            <option >Select CPU</option>
                            <option value="DualCore">Dual Core</option>
                            <option value="QuadCore">Quad Core</option>
                            <option value="OctaCore">Octa Core</option>
                            <option value="DecaCore">Deca Core</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Connectivity </Form.Label>
                        <Form.Select aria-label="Connectivity" onChange={handleChange} name="connectivity" value={mobile.connectivity}>
                            <option >Select Connectivity</option>
                            <option value="3G">3G</option>
                            <option value="4G">4G</option>
                            <option value="5G">5G</option>
                            <option value="WirelessCharging">Wireless Charging</option>
                            <option value="NFC">NFC</option>
                            <option value="VoLTE">VoLTE</option>
                            <option value="WiFi">WiFi</option>
                             <option value="USBConnectivity">USB Connectivity</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Battery Size (in mAh)</Form.Label>
                        <Form.Select aria-label="Battery Size" onChange={handleChange}name="batterySize" value={mobile.batterySize}>
                            <option >Select Battery Size</option>
                            <option value="4000mAH">4000mAH</option>
                            <option value="4700mAH">4700mAH</option>
                            <option value="5000mAH">5000mAH</option>
                            <option value="5500mAH">5500mAH</option>
                            <option value="6000mAH">6000mAH</option>
                            <option value="6700mAh">6700mAh</option>
                            <option value="7000mAh">7000mAh</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Charging Type</Form.Label>
                        <Form.Select aria-label="Charging Type" onChange={handleChange} name="chargingType" value={mobile.chargingType}>
                            <option value={true}>Slow</option>
                            <option value={false}>Fast</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Features</Form.Label>
                        <Form.Select aria-label="Features" onChange={handleChange} name="features" value={mobile.features}>
                            <option >Select Features</option>
                            <option value="FaceUnlock">FaceUnlock</option>
                            <option value="FingerPrint">FingerPrint</option>
                            <option value="GPS">GPS</option>
                            <option value="WaterProof">WaterProof</option>
                            <option value="UFS4Storage">UFS4Storage</option>
                            <option value="FMRadio">FMRadio</option>
                            <option value="IndisplayFingerprint">In-display Fingerprint</option>
                            <option value="MemoryCardSupport">Memory CardSupport</option>
                            <option value="MusicPlayer">Music Player</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>IP Rating </Form.Label>
                        <Form.Select aria-label="IP Rating " onChange={handleChange} name="ipRating" value={mobile.ipRating}>
                            <option >Select IP Rating</option>
                            <option value="IP55">IP55</option>
                            <option value="IP56">IP56</option>
                            <option value="IP64">IP64</option>
                            <option value="IP66">IP66</option>
                            <option value="IP67">IP67</option>
                            <option value="IP68">IP68</option>
                            <option value="IP69">IP69</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src={mobile.image} width="300" height="300"></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Mobile Image</Form.Label>
                            <Form.Control type="file" placeholder="Browse Image " onChange={(e) => { setFile(e.target.files[0]) }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="danger" onClick={goToMobileList}>Cancel</Button>
                <Button variant="success ms-2" onClick={()=>{doEditMobile(mobile._id)}}>Save Edit</Button>

            </Form>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mobile has been Updated successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default MobileEdit;