import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from '../../components/CartItemComponent';

const UserCartDetailsPage = () => {
    return (
        <Container fluid>
            <Row class="mt-4">
                <h1>Cart Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: Alison Becker <br />
                            <b>Address</b>: 77 Chandni Chowk, New Delhi<br />
                            <b>Phone</b>: 9905678225 <br />
                        </Col>
                        <Col md={6}>
                            <h2>Payment Method</h2>
                            <Form.Select>
                                <option value="pp">
                                    PayPal
                                </option>
                                <option value="cod">
                                    Cash on Delivery
                                </option>
                            </Form.Select>
                        </Col>
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">
                                    Not deliverd. In order to make order, fill out your profile with correct address, city etc.
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Not paid yet.
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {Array.from({ length: 3 }).map((item, idx) => (
                            <CartItemComponent key={idx} />
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Item price (after tax): <span className="fw-bold">₹1550</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className="fw-bold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className="fw-bold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-danger">
                            Total price: <span className="fw-bold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button size="lg" variant="danger" type="button">
                                    Pay for the order
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

            </Row>
        </Container>
    )
};

export default UserCartDetailsPage;
