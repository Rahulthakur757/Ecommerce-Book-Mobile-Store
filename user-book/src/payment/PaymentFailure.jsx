import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PaymentFailure() {
  return (
    <Container className="mt-5 mb-5">
      <Card
        className="shadow-lg p-5 mx-auto text-center"
        style={{ maxWidth: "600px" }}
      >
        <div style={{ fontSize: "80px" }}>❌</div>

        <h2 className="text-danger mt-3">Payment Failed</h2>

        <p className="text-muted">
          Your payment could not be completed.
        </p>

        <Link to="/">
          <Button variant="primary">
            Back to Home
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

export default PaymentFailure;