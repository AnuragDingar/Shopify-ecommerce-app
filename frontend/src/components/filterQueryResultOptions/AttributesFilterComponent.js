import Form from 'react-bootstrap/Form';

const  AttributesFilterComponents = () =>{
  return (
    <>
      {[{ Color: ["red", "blue", "green"] }, { Ram: ["1 TB", "2 TB"] }].map(
        (item, idx) => (
          <div key={idx} className='md-3'>
            <Form.Label><b>{Object.keys(item)}</b></Form.Label>
            {item[Object.keys(item)].map((i,idx) => (
            <Form.Check // prettier-ignore
              type="checkbox"
              key={idx}
              id="default-checkbox"
              label={i}
            />))}</div>
        )
      )}</>
  );
}

export default AttributesFilterComponents;