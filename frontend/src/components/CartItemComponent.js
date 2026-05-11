import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

const CartItemComponent = ({ item, orderCreated = false }) => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin="anonymous" src={item && item.image ? (item.image.path ?? null) : "/images/games-category.png"} fluid />
                    </Col>
                    <Col md={2}>
                        {item && item.name ? item.name : ""}
                    </Col>
                    <Col md={2}>
                        <b>₹{item && item.price ? item.price : ""} </b>
                    </Col>
                    <Col md={3}>
                        <Form.Select disabled={orderCreated} value={item && item.quantity ? item.quantity : ""}>
                            {item && item.count && [...Array(item.count).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Button type="button"
                            variant="secondary" onClick={() =>
                                window.confirm("Are you sure?")}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
            <br />
        </>
    )
}

export default CartItemComponent;

/*crossOrigin="anonymous" not needed now ,but needed in horeku when images are
fetched from external service.*/