import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import HomeCard from "./HomeCard";
import ImageSlider from "./ImageSlider";
import MobileCard from "./phone/MobileCard";
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeFooter from "./footer/HomeFooter";

function App() {
  return (

    <Container fluid>
      <Row>
        <Col><NavBar></NavBar></Col>
      </Row>

      <Row>
        <Col> <ImageSlider></ImageSlider></Col>
      </Row>

      <Row>
        <HomeCard></HomeCard>
      </Row>
      <Row>
        <MobileCard></MobileCard>
      </Row>
      <HomeFooter></HomeFooter>
       
    </Container>

  )
}
export default App;