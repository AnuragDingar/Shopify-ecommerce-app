import { Alert, Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
import { Rating } from 'react-simple-star-rating';
import { useEffect } from "react";
import ImageZoom from "js-image-zoom";

const ProductDetailPage = () => {
    var options = {
        scale: 2,
        offset: { vertical:0, horizontal: 0},
    }
    useEffect(() => {
        new ImageZoom(document.getElementById("first"), options);
        new ImageZoom(document.getElementById("second"), options);
        new ImageZoom(document.getElementById("third"), options);
        new ImageZoom(document.getElementById("fourth"), options);
    })
    // container to make evry thing center of page
    return (
        <Container>
            <AddedToCartMessageComponent />
            <Row className="mt-5">
                <Col style= {{ zIndex: 1}} md={4}>
                    <div id="first">
                        <Image fluid src="images/games-category.png" />
                    </div>
                    <br />
                    <div id="second">
                        <Image fluid src="images/monitors-category.png" />
                    </div>
                    <br />
                    <div id="third">
                        <Image fluid src="images/tablets-category.png" />
                    </div>
                    <br />
                    <div id="fourth">
                        <Image fluid src="images/games-category.png" />
                    </div>
                    <br />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h1>Product Name</h1></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating readonly size={20}
                                        initialValue={4} />
                                </ListGroup.Item>
                                <ListGroup.Item>Price: <span className="fw-bold">₹3500</span></ListGroup.Item>
                                <ListGroup.Item>Very Good product. Best seller in this category.</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>Status: in stock</ListGroup.Item>
                                <ListGroup.Item>Price: <span className="fw-bold">₹3500</span></ListGroup.Item>
                                <ListGroup.Item>
                                    Quantity:
                                    <Form.Select size="lg"
                                        aria-label="Default select example">
                                        <option>1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                    </Form.Select>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="danger">Add to cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-5">
                            <h5>REVIEWS</h5>
                            <ListGroup variant="flush">
                                {Array.from({ length: 10 }).map((item, idx) => (
                                    <ListGroup.Item key={idx}>
                                        Anurag Dingar <br />
                                        <Rating readonly size={20}
                                            initialValue={4} />
                                        <br />
                                        {`Review ${idx}`}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    send review form.
                    <Alert variant="danger">Login first to write a review</Alert>
                    <Form>
                        <Form.Group className="mb-3"
                            controlId="exampleForm.ControlInput">
                            <Form.Label>Write Review</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Select aria-label="Default Select Example">
                            <option>Open this select menu</option>
                            <option value="5">5 (very good)</option>
                            <option value="4">4 (good)</option>
                            <option value="3">3 (avg)</option>
                            <option value="2">2 (bad)</option>
                            <option value="1">1 (awful)</option>
                        </Form.Select>
                        <Button className="mb-3 mt-3" variant="primary">Submit</Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailPage;
