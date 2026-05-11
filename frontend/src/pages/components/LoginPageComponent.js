import { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const LoginPageComponent = ({ loginUserApiRequest, reduxDispatch, setReduxUserState }) => {
    const [validated, setValidated] = useState(false);
    const [loginUserResponseState, setLoginUserResponseState] = useState({
        success: "", error: "", loading: false
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const email = form.email.value;
        const password = form.password.value;
        const doNotLogout = form.doNotLogout.checked;
        if (event.currentTarget.checkValidity() === true && email && password) {
            setLoginUserResponseState({ loading: true });
            loginUserApiRequest(email, password, doNotLogout)
                .then((res) => {
                    console.log("res", res);
                    setLoginUserResponseState({ success: res.success, loading: false, error: "" });

                    if (res.userLoggedIn) {
                        reduxDispatch(setReduxUserState(res.userLoggedIn));
                    }

                    if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) {
                        navigate("/user", { replace: true });
                        //window.location.href = '/user';
                    }
                    else {
                        console.log("/admin/ordersres");
                        navigate("/admin/orders", { replace: true });
                        //window.location.href = '/admin/orders';
                    }
                })
                .catch((er) => setLoginUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }));
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
                        <Button variant="primary" type="submit">
                            {loginUserResponseState && loginUserResponseState.loading === true ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : ("")}

                            Login
                        </Button>
                        <Alert show={loginUserResponseState && loginUserResponseState.error === "wrong credentials"} variant="danger">
                            Wrong Credentials!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default LoginPageComponent;
