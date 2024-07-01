import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from '../../../components/CartItemComponent';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const OrderDetailsPageComponent = ({ fetchOrders, markAsDelivered }) => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [isPaid, setIsPaid] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [buttonDisabled, setButttonDisabled] = useState(false);
    const [orderButtonMessage, setOrderButtonMessage] = useState("Mark as delivered");
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const abctrl = new AbortController();
        fetchOrders(id)
            .then((order) => {
                setUserInfo(order.user);
                setPaymentMethod(order.paymentMethod);
                order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
                order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false);
                setCartSubtotal(order.orderTotal.cartSubtotal);
                if (order.isDelivered) {
                    setOrderButtonMessage("Order is finished");
                    setButttonDisabled(true);
                }
                setCartItems(order.cartItems);
            })
            .catch((err) =>
                console.log(err));
        return () => abctrl.abort();
    }, [id, isDelivered])

    return (
        <Container fluid>
            <Row class="mt-4">
                <h1>Order Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: {userInfo.name ? userInfo.name : ""} <br />
                            <b>Address</b>: {userInfo.address} {userInfo.city} {userInfo.state} {userInfo.zipCode}<br />
                            <b>Phone</b>: {userInfo.phoneNumber} <br />
                        </Col>
                        <Col md={6}>
                            <h2>Payment Method</h2>
                            <Form.Select value={paymentMethod} disabled={true}>
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
                                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                                    {isDelivered ? <> Delivered at {isDelivered}</> : <>Not delivered</>}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                                    {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent key={idx} item={item} orderCreated={true} />
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
                            Total price: <span className="fw-bold">{cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button size="lg"
                                    onClick={() => {
                                        markAsDelivered(id)
                                            .then((res) => {
                                                if (res) {
                                                    setIsDelivered(true);
                                                }
                                            })
                                            .catch(er => console.log(er))
                                    }}
                                    disabled={buttonDisabled} variant="danger" type="button">
                                    {orderButtonMessage}
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

            </Row>
        </Container>
    )
};

export default OrderDetailsPageComponent;
