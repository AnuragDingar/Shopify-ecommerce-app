import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import SortOptionsComponent from "../components/SortOptionsComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import PaginationComponent from "../components/PaginationComponent";

const ProductistPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{<SortOptionsComponent />}</ListGroup.Item>
                        <ListGroup.Item>{<PriceFilterComponent />}</ListGroup.Item>
                        <ListGroup.Item><RatingFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><CategoryFilterComponent /></ListGroup.Item>
                        <ListGroup.Item><AttributesFilterComponent /></ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="primary">Filter</Button>
                            <Button variant="danger">Reset filters</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <ProductForListComponent
                            key={idx}
                            images={["games", "monitors", "tablets", "games", "monitors"]}
                            idx={idx} />
                    ))}

                    {<PaginationComponent />}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductistPage;
