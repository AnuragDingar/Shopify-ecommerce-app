import { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6} >
                    <h1>Login</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                name="doNotLogout"
                                type="checkbox"
                                label="Do not logout"
                            />
                        </Form.Group>
                        <Row className="pb-2">
                            <Col>
                                Don't you have an account?
                                <Link to={"/register"}>Register </Link>
                            </Col>
                        </Row>
                        <Button variant type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Login
                        </Button>
                        <Alert show={true} variant="danger">
                            Wrong Credentials!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default LoginPage;
