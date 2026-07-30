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
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <h5 className="mt-3">Verifying Payment...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow p-4 text-center">

        <div style={{ fontSize: "70px" }}>✅</div>

        <h2 className="text-success">Payment Successful</h2>

        <p>Your order has been placed successfully.</p>

        {transaction && (
          <>
            <hr />

            <h5>Transaction ID</h5>
            <p style={{ wordBreak: "break-all" }}>
              {transaction.transactionId}
            </p>

            <h5>Status</h5>
            <p className="text-success fw-bold">
              {transaction.status}
            </p>

            <h5>Order Date</h5>
            <p>
              {new Date(transaction.created_at).toLocaleString()}
            </p>

            <h5>Total Amount</h5>
            <p>
              ₹ {transaction.totalPrice}
            </p>
          </>
        )}

        <div className="mt-4">
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

export default PaymentSuccess;