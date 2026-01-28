import { Button } from 'bootstrap';
import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const TodoCard = (props) => {
  console.log("props", props);
  return (
    <div>
    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>{props.name}</ListGroup.Item>
        <button onClick={props.onDelete}>Delete</button>
        <button>Edit</button>
      </ListGroup>
    </Card>
    </div>
  )
}
