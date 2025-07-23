import { Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch } from "react-redux";
import { logOutAction } from "../../redux/reducer/loginReducer"

const AdminLinksComponent = () => {
    const dispatch = useDispatch();
    return (
        <Navbar bg="light" variant="light">
            <Nav className="flex-column">
                <LinkContainer to="/admin/orders">
                    <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                    <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                    <Nav.Link>User</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/chats">
                    <Nav.Link>Chats</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/analytics">
                    <Nav.Link>Analytics</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={() => dispatch(logOutAction())}>Logout</Nav.Link>
            </Nav></Navbar>
    )
};

export default AdminLinksComponent;