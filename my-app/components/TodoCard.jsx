import { Button } from 'bootstrap';
import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const TodoCard = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== "") {
      onEdit(editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div>
      <Card style={{ width: '18rem', marginBottom: '10px' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggleComplete}
                style={{ cursor: 'pointer' }}
              />
              {isEditing ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                  autoFocus
                />
              ) : (
                <span style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : '#000'
                }}>
                  {todo.text}
                </span>
              )}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={handleEdit} style={{ flex: 1 }}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
              {isEditing && (
                <button onClick={handleCancel} style={{ flex: 1 }}>Cancel</button>
              )}
              {!isEditing && (
                <button onClick={onDelete} style={{ flex: 1 }}>Delete</button>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}
