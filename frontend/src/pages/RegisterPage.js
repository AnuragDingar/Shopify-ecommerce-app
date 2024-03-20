import { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    const onChange = () =>{
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmpassword]")
        if(confirm.value === password.value){
            confirm.setCustomValidity("")
        }
        else{
            confirm.setCustomValidity("Password do not match");
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
                                onChange={onChange} />
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
                                onChange={onChange}/>
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
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Submit
                            </Button>
                            <Alert show={true} variant="danger">
                                User with that email already exists!
                            </Alert>
                            <Alert show={true} variant="info">
                                User created.
                            </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default RegisterPage;
