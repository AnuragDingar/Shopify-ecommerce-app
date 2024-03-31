import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminOrdersPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Orders</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Payment Method</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                        <tbody>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Mark Wood</td>
                                <td>2024-03-17</td>
                                <td>₹500</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>PayPal</td>
                                <td>
                                    <Link to="/user/order-details">Go to order</Link>
                                </td>
                            </tr>
                        </tbody>)
                    )}
                </Table>
            </Col>
        </Row>
    )

};

export default AdminOrdersPage;
