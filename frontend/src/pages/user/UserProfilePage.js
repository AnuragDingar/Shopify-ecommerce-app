import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom';

const UserProfilePage = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmpassword]")
        if (confirm.value === password.value) {
            confirm.setCustomValidity("")
        }
        else {
            confirm.setCustomValidity("Password do not match");
        }
    }

    //setValidated(true);
    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6} >
                    <h1>User Profile</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="Alison"
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="Becker"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                value="alisonbecker01@gmail.com if you want ti change email, remove account and crate a new one with the new email address."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your street name and house number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your Country"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your Zip Code"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your City"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={""}
                                placeholder="Enter your State"
                            />
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
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                Both password should match.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">

                            Update
                        </Button>
                        <Alert show={true} variant="danger">
                            User with that email already exists!
                        </Alert>
                        <Alert show={true} variant="info">
                            User updated.
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

};

export default UserProfilePage;
