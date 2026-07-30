function PaymentFailure() {
    return(
        <>
        <h1>payment failure page</h1>
        </>
    )
}
export default PaymentFailure;import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PaymentFailure() {
  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow p-5 text-center">

        <div style={{ fontSize: "70px" }}>
          ❌
        </div>

        <h2 className="text-danger mt-3">
          Payment Failed
        </h2>

        <p className="mt-3">
          Your payment could not be completed.
        </p>

        <p>
          Don't worry, no amount has been charged.
        </p>

        <div className="mt-4">

          <Link to="/cart">
            <Button variant="warning" className="me-3">
              Try Again
            </Button>
          </Link>

          <Link to="/">
            <Button variant="success">
              Continue Shopping
            </Button>
          </Link>

        </div>

      </Card>
    </Container>
  );
}

export default PaymentFailure;