import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const AddedToCartMessageComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>The Product was added to your cart!</Alert.Heading>
      <p>
        <Button variant="success">Go back</Button>{" "}
        <Link to="/cart">
          <Button variant="danger">Go to cart</Button>
        </Link>
      </p>
    </Alert>
  );
}

export default AddedToCartMessageComponent;