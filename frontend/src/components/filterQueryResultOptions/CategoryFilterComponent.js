import Form from 'react-bootstrap/Form';

function CategoryFilterComponent() {
  return (
    <>
      <span className='fw-bold'>Category</span>
      <Form>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="mb-3">
            <Form.Check // prettier-ignore
              type="checkbox"
              id={`check-api2-${idx}`}
            >
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label style={{ cursor: "pointer" }}>Category -{idx}</Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form></>
  );
}

export default CategoryFilterComponent;