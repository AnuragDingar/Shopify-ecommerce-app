import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

const CartItemComponent = () => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin="anonymous" src="/images/games-category.png" fluid />
                    </Col>
                    <Col md={2}>
                        Logotech series <br /> Gaming mouse
                    </Col>
                    <Col md={2}>
                        <b>₹450</b>
                    </Col>
                    <Col md={3}>
                        <Form.Select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
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