import { Button, Col, Row, Table } from "react-bootstrap";
//import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";

const AdminProductsPage = () => {

    const deleteHandler = () => {
        if (window.confirm("Are you sure?")) alert("Product deleted!")
    }
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>
                    Product List
                    <LinkContainer to="/admin/create-new-product">
                        <Button variant="primary" size="lg">
                            Create new
                        </Button>
                    </LinkContainer>

                </h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    {[{ name: "Parasonic", price: "₹15000", category: "TV" }, { name: "Lenovo", price: "₹65000", category: "Laptops" }, { name: "GTA 5", price: "₹5000", category: "Games" }].map((item, idx) => (
                        <tbody>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <LinkContainer to="/admin/edit-product">
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>)
                    )}
                </Table>
            </Col>
        </Row>
    )

};

export default AdminProductsPage;
