import { Button, Col, Row, Table } from "react-bootstrap";
//import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../../redux/reducer/loginReducer"

const ProductPageComonent = ({ fetchProducts, deleteProduct }) => {

    const [products, setProducts] = useState([]);
    const [productDeleted, setProductDeleted] = useState(false);
    const dispatch = useDispatch();

    const deleteHandler = async (productId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteProduct(productId);
            if (data.message === 'product removed') {
                setProductDeleted(true);
            }
        }
    }

    useEffect(() => {
        const abctrl = new AbortController();
        fetchProducts(abctrl).then(res => setProducts(res))
            .catch((err) => {
                dispatch(logOutAction());
                console.log(err)
            }
            );
        return () => abctrl.abort();
    }, [productDeleted])

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
                    {products.map((item, idx) => (
                        <tbody key={item._id}>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/edit-product/${item._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item._id)}>
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

export default ProductPageComonent;
