import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function TodoForm({ getDataFromChild }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      getDataFromChild(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <input value={input} onChange={e => setInput(e.target.value)} />
        </Col>
        <Col>
          <Button type="submit" variant="primary">Add</Button>
        </Col>
      </Row>
    </form>
  )
}
