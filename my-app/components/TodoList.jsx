import React from 'react'
import { TodoCard } from './TodoCard';
import TodoForm from './TodoForm';

export const TodoList = ({ todos, getDataFromChild, onDelete, onToggleComplete, onEdit }) => {
  console.log("TodoList props", todos);
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm getDataFromChild={getDataFromChild} />
      {todos.map((todo, idx) => (
        <TodoCard
          key={idx}
          todo={todo}
          onDelete={() => onDelete(idx)}
          onToggleComplete={() => onToggleComplete(idx)}
          onEdit={(newText) => onEdit(idx, newText)}
        />
      ))}

    </div>
  )
}
