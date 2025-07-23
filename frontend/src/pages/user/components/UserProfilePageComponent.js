import { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom';

const UserProfilePageComponent = ({ updateUserApiRequest, fetchUser, userInfo }) => {

    const [validated, setValidated] = useState(false);
    const [updateUserResponseState, setUpdateUserResponseState] = useState({
        success: "", error: "", loading: false
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser(userInfo._id)
            .then((data) => {
                console.log("data:fetchUser", data);
                setUser(data)
            })
            .catch((er) => {
                console.log("error:fetchUser", er);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const country = form.country.value;
        const zipCode = form.zipCode.value;
        const city = form.city.value;
        const state = form.state.value;
        const password = form.password.value;
        if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
            updateUserApiRequest(name, lastName, phoneNumber, address, country, zipCode, city, state, password)
                .then(data => {
                    setUpdateUserResponseState({ success: data.success, error: "" });
                })
                .catch((er) => {
                    setUpdateUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data });
                })
        }
        setValidated(true);
    }

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirmPassword = document.querySelector("input[name=confirmPassword]")
        if (confirmPassword.value === password.value) {
            //confirm.setCustomValidity("");
            setPasswordMatch(true);
        }
        else {
            //confirm.setCustomValidity("Password do not match");
            setPasswordMatch(false);
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
                                defaultValue={user.name}
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.lastName}
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                value={user.email + " If you want to change email, remove account and crate a new one with the new email address."}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.phoneNumber}
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.address}
                                placeholder="Enter your street name and house number"
                                name="address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.country}
                                placeholder="Enter your Country"
                                name="country"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.zipCode}
                                placeholder="Enter your Zip Code"
                                name="zipCode"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.city}
                                placeholder="Enter your City"
                                name="city"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={user.state}
                                placeholder="Enter your State"
                                name="state"
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
                                name="confirmPassword"
                                minLength={6}
                                onChange={onChange}
                                isInvalid={!passwordMatch} />
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
                        <Alert show={updateUserResponseState && updateUserResponseState.error !== ""} variant="danger">
                            Something went wrong!!
                        </Alert>
                        <Alert show={updateUserResponseState && updateUserResponseState.success === "user updated"} variant="info">
                            User updated.
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

};

export default UserProfilePageComponent;
