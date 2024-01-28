import Form from 'react-bootstrap/Form';

function AttributesFilterComponents() {
  return (
    <>
    <Form.Label></Form.Label>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Check this switch"
      /></>
  );
}

export default AttributesFilterComponents;