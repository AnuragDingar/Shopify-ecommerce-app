import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";
import { Row, Container } from 'react-bootstrap';
import UserChatComponent from "../components/user/UserChatComponent";

const HomePage = () => {

    const categories = [
        "Tablets",
        "Monitors",
        "Games",
        "Printer",
        "Books",
        "Laptop",
        "Mobiles",
        "FMCG"
    ]
    return (
        <>
            <ProductCarouselComponent />
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5" >
                    {
                        categories.map((category, idx) => <CategoryCardComponent key={idx} category={category} idx={idx} />)
                    }
                </Row>
            </Container>
            <UserChatComponent/>

        </>
    );
};

export default HomePage;
