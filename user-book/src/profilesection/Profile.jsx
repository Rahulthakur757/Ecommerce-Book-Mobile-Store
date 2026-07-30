import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

function Profile() {

    const [userName, setUserName] = useState("");

    useEffect(() => {

        const name = localStorage.getItem("name");

        if(name){
            setUserName(name);
        }

    }, []);


    return (
        <Container>

            <Row className="mt-5">

                <Col>

                    <div className="d-flex align-items-center gap-3">

                        <h1 className="text-success">
                            Welcome
                        </h1>

                        <h1>
                            {userName}
                        </h1>

                    </div>

                </Col>

            </Row>

        </Container>
    );
}

export default Profile;