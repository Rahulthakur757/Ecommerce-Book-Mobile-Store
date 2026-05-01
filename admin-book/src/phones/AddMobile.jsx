import { Col, Container, Form, Row, Button,Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMobile() {

    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => {
         console.log("Modal closed. Navigating...");
        setShow(false);
        navigate('/')  
    }

    let [name, setName] = useState('');
    let [shortDescription, setShortDescription] = useState('');
    let [originalPrice, setOriginalPrice] = useState('');
    let [launchDate, setLaunchDate] = useState('');
    let [availability, setAvailability] = useState('');
    let [ram, setRam] = useState('8GB');
    let [storage, setStorage] = useState('64GB');
    let [expandable, setExpandable] = useState(true);
    let [bodyMaterial, setBodyMaterial] = useState('');
    let [width, setWidth] = useState('');
    let [height, setHeight] = useState('');
    let [weight, setWeight] = useState('');
    let [display, setDisplay] = useState('punchhole');
    let [screenSize, setScreenSize] = useState('4.7 inch - 5 inch');
    let [refreshRate, setRefreshRate] = useState(90);
    let [rearCamera, setRearCamera] = useState('13MP');
    let [frontCamera, setFrontCamera] = useState('5MP');
    let [cpuCore, setCpuCore] = useState('QuadCore');
    let [batterySize, setBatterySize] = useState('4000mAh');
    let [chargingType, setChargingType] = useState(false);
    let [connectivity, setConnectivity] = useState('5G');
    let [os, setOs] = useState('Android12');
    let [features, setFeatures] = useState('FingerPrint');
    let [ipRating, setIpRating] = useState('IP64');
    let [file, setFile] = useState();

    function doAddPhone() {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('shortDescription', shortDescription);
        formData.append('originalPrice', originalPrice);
        formData.append('launchDate', launchDate);
        formData.append('availability', availability);
        formData.append('ram', ram);
        formData.append('storage', storage);
        formData.append('expandable', expandable);
        formData.append('bodyMaterial', bodyMaterial);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('display', display);
        formData.append('screenSize', screenSize);
        formData.append('refreshRate', refreshRate);
        formData.append('rearCamera', rearCamera);
        formData.append('frontCamera', frontCamera);
        formData.append('cpuCore', cpuCore);
        formData.append('batterySize', batterySize);
        formData.append('chargingType', chargingType);
        formData.append('connectivity', connectivity);
        formData.append('os', os);
        formData.append('features', features);
        formData.append('ipRating', ipRating);
        formData.append('file', file);
        formData.append('fileName', file.name);

        axios({
            url: apiUrl + '/add/mobile',
            // url: 'http://localhost:3000/add/mobile',
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((result) => {
            console.log("Result ", result)
            if(result.data.success) {
                 setShow(true); 
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
    function goToMobileList() {
        navigate('/');

    }


    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Name</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Mobile Name" onChange={(e) => { setName(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Short Description" onChange={(e) => { setShortDescription(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Orginal Price</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Orginal Price" onChange={(e) => { setOriginalPrice(e.target.value) }} />
                        </Form.Group>
                    </Col>
                     <Col>
                        <Form.Label>Availability</Form.Label>
                        <Form.Select aria-label="Availability" onChange={(e) => { setAvailability(e.target.value) }}>
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
                        <Form.Label>Battery Size (in mAh)</Form.Label>
                        <Form.Select aria-label="Battery Size" onChange={(e) => { setBatterySize(e.target.value) }}>
                            <option >Select Battery Size</option>
                            <option value="4000mAH">4000mAH</option>
                            <option value="4700mAH">4700mAH</option>
                            <option value="5000mAH">5000mAH</option>
                            <option value="5500mAH">5500mAH</option>
                            <option value="6000mAH">6000mAH</option>
                            <option value="6800mAH">6800mAh</option>
                            <option value="7000mAh">7000mAh</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Charging Type</Form.Label>
                        <Form.Select aria-label="Charging Type" onChange={(e) => { setChargingType(e.target.value) }}>
                            <option value={'false'}>Slow</option>
                            <option value={'true'}>Fast</option>
                        </Form.Select>
                    </Col>
                </Row>
                 <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Body Material</Form.Label>
                            <Form.Control type="Text" placeholder="Enter Body Material" onChange={(e) => { setBodyMaterial(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Weight(in Gram)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Weight" onChange={(e) => { setWeight(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Width(in MM)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Width" onChange={(e) => { setWidth(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Height(in MM)</Form.Label>
                            <Form.Control type="Number" placeholder="Enter Height" onChange={(e) => { setHeight(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    
                </Row>
                 <Row>
                    <Col>
                        <Form.Label>Screen Size (in Inch)</Form.Label>
                        <Form.Select aria-label="Screen Size" onChange={(e) => { setScreenSize(e.target.value) }}>
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
                        <Form.Select aria-label="Refresh Rate" onChange={(e) => { setRefreshRate(e.target.value) }}>
                            <option >Select Refresh Rate</option>
                            <option value="90">90 Hz</option>
                            <option value="120">120 Hz</option>
                            <option value="144">144 Hz</option>
                        </Form.Select>
                    </Col>
                </Row>
                 <Row>
                   
                    <Col>
                        <Form.Label>CPU Core</Form.Label>
                        <Form.Select aria-label="CPU" onChange={(e) => { setCpuCore(e.target.value) }}>
                            <option >Select CPU</option>
                            <option value="DualCore">Dual Core</option>
                            <option value="QuadCore">Quad Core</option>
                            <option value="OctaCore">Octa Core</option>
                            <option value="DecaCore">Deca Core</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Operating System </Form.Label>
                        <Form.Select aria-label="os" onChange={(e) => { setOs(e.target.value) }}>
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
                        <Form.Label>Rear Camera (in MP)</Form.Label>
                        <Form.Select aria-label="Rear Camera" onChange={(e) => { setRearCamera(e.target.value) }}>
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
                        <Form.Select aria-label="Front Camera" onChange={(e) => { setFrontCamera(e.target.value) }}>
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
                            <Form.Label>Launch Date</Form.Label>
                            <Form.Control type="Date" placeholder="Enter Launch Date" onChange={(e) => { setLaunchDate(e.target.value) }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Expandable</Form.Label>
                        <Form.Select aria-label="Expandable" onChange={(e) => { setExpandable(e.target.value) }}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Col>
                   
                </Row>
               
                <Row>
                    <Col>
                        <Form.Label>Ram(inGB)</Form.Label>
                        <Form.Select aria-label="Ram" onChange={(e) => { setRam(e.target.value) }}>
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
                        <Form.Select aria-label="Storage" onChange={(e) => { setStorage(e.target.value) }}>
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
                        <Form.Label>Display</Form.Label>
                        <Form.Select aria-label="Display" onChange={(e) => { setDisplay(e.target.value) }}>
                            <option >Select Display</option>
                            <option value="HD">HD</option>
                            <option value="Punchhole">Punch Hole</option>
                            <option value="IPSLCD">IPS LCD</option>
                            <option value="FoldableDisplay">Foldable Display</option>
                            <option value="AMOLED">Amoled</option>
                            <option value="CurvedDisplay">Curved Display</option>
                            <option value="SuperAMOLED">Super Amoled</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Connectivity </Form.Label>
                        <Form.Select aria-label="Connectivity" onChange={(e) => { setConnectivity(e.target.value) }}>
                            <option >Select Connectivity</option>
                            <option value="3G">3G</option>
                            <option value="4G">4G</option>
                            <option value="5G">5G</option>
                            <option value="WirelessCharging">Wireless Charging</option>
                            <option value="NFC">NFC</option>
                            <option value="VoLTE">VoLTE</option>              
                            <option value="USBConnectivity">USB Connectivity</option>
                            <option value="WiFi">WiFi</option>
                        </Form.Select>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Label>Features</Form.Label>
                        <Form.Select aria-label="Features" onChange={(e) => { setFeatures(e.target.value) }}>
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
                        <Form.Select aria-label="IP Rating " onChange={(e) => { setIpRating(e.target.value) }}>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Select Mobile Image</Form.Label>
                            <Form.Control type="file" placeholder="Browse Image " onChange={(e) => { setFile(e.target.files[0]) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" onClick={goToMobileList}>Cancel</Button>
                <Button variant="success ms-2" onClick={doAddPhone}>Add Phone</Button>

            </Form>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mobile has been saved successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default AddMobile;