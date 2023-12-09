import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const { id } = useParams();
    console.log(id);
    return <p> This is Product Detail Page</p>;
};

export default ProductDetailPage;
