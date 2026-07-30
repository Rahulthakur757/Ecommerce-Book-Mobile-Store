import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const transactionId = localStorage.getItem("transactionId");

    if (!transactionId) {
      setLoading(false);
      return;
    }

    axios
      .put(`${apiUrl}/update/transaction/${transactionId}`)
      .then((result) => {
        if (result.data.success) {
          setTransaction(result.data.data);

          // Remove transaction id after successful update
          localStorage.removeItem("transactionId");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <h4 className="mt-3">Verifying Payment...</h4>
        </div>
      </Container>
    );
  }

  // If transaction not found
  if (!transaction) {
    return (
      <Container className="mt-5 text-center">
        <Card className="shadow p-5">
          <div style={{ fontSize: "70px" }}>❌</div>

          <h2 className="text-danger">Payment Information Not Found</h2>

          <p>
            We couldn't find your transaction details.
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

  return (
    
    <Container className="mt-5 mb-5">

      <Card
        className="shadow-lg p-5 mx-auto"
        style={{ maxWidth: "700px", borderRadius: "15px" }}
      >
        <div className="text-center">

          <div style={{ fontSize: "80px" }}>✅</div>

          <h2 className="text-success fw-bold mt-3">
            Payment Successful
          </h2>

          <p className="text-muted">
            Thank you! Your order has been placed successfully.
          </p>

          <hr />

          <table className="table table-bordered mt-4">
            <tbody>

              <tr>
                <th width="35%">Transaction ID</th>
                <td style={{ wordBreak: "break-all" }}>
                  {transaction.transactionId}
                </td>
              </tr>

              <tr>
                <th>Status</th>
                <td className="text-success fw-bold">
                  {transaction.status}
                </td>
              </tr>

              <tr>
                <th>Order Date</th>
                <td>
                  {new Date(transaction.created_at).toLocaleString("en-IN")}
                </td>
              </tr>

              <tr>
                <th>Total Amount</th>
                <td className="fw-bold">
                  ₹ {transaction.totalPrice}
                </td>
              </tr>

            </tbody>
          </table>

          <div className="d-flex justify-content-center gap-3 mt-4">

            <Link to="/">
              <Button variant="success">
                Continue Shopping
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant="outline-primary">
                View Orders
              </Button>
            </Link>

          </div>

        </div>
      </Card>
    </Container>
  );
}

export default PaymentSuccess;