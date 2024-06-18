import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminEditUserPage = () => {

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
        <Row className="justify-content-md-center mt-5">
            <Col md={1}>
                <Link to="/admin/users" className="btn btn-info my-3">Go back</Link>
            </Col>
            <Col md={6}>
                <h1>Edit user</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName" required type="text" defaultValue="John" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" required type="text" defaultValue="Cena" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" required type="email" defaultValue="someone@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check name="isAdmin" type="checkbox" label="Is Admin" />
                        <Form.Control name="count" required type="number" defaultValue="2" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>

            </Col>
        </Row>
    )

};

export default AdminEditUserPage;
