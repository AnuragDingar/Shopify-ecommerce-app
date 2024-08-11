import { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterPageComponent = ({ registerUserApiRequest, dispatch, loginUser }) => {
    const [validated, setValidated] = useState(false);
    const [registerUserResponseState, setRegisterUserResponseState] = useState({
        success: "", error: "", loading: false
    });
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const email = form.email.value;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        console.log("form", form)
        if (event.currentTarget.checkValidity() === true && email && password && name && lastName && form.password.value === form.confirmpassword.value) {
            setRegisterUserResponseState({ loading: true });
            registerUserApiRequest(name, lastName, email, password)
                .then((res) => {
                    console.log("res", res);
                    setRegisterUserResponseState({ success: res.success, loading: false });
                    dispatch(loginUser(res.userCreated));
                })
                .catch((er) => {
                    console.log({ error: er.response.data.message ? er.response.data.message : er.response.data.error });
                    setRegisterUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data.error });
                });
        }
        setValidated(true);
    }

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirmPassword = document.querySelector("input[name=confirmpassword]")
        if (confirmPassword.value === password.value) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
    }

    //setValidated(true);
    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6} >
                    <h1>Register</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a vaild email address.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                minLength={6}
                                onChange={onChange}
                                isInvalid={!passwordMatch} />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                                required
                                name="confirmpassword"
                                minLength={6}
                                onChange={onChange}
                                isInvalid={!passwordMatch} />
                            <Form.Control.Feedback type="invalid">
                                Both password should match.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="pb-2">
                            <Col>
                                Do you have a account already?
                                <Link to={"/login"}>Login</Link>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button type="submit">
                            {registerUserResponseState && registerUserResponseState.loading &&
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                            Submit
                        </Button>
                        <Alert show={registerUserResponseState && registerUserResponseState.error === "user exists"} variant="danger">
                            User with that email already exists!
                        </Alert>
                        <Alert show={registerUserResponseState && registerUserResponseState.error === "User created"} variant="info">
                            User created.
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default RegisterPageComponent;
