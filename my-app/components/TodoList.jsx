import React from 'react'
import { TodoCard } from './TodoCard';
import TodoForm from './TodoForm';

export const TodoList = ({todos, getDataFromChild, onDelete}) => {
    console.log("TodoList props", todos);
  return (
    <div>
        <h1>Todo List</h1>
        <TodoForm getDataFromChild={getDataFromChild}/>
        {todos.map((data, idx) => (
             <TodoCard key={idx} name={data} onDelete={() => onDelete(idx)}/>
        ))}
       
    </div> 
  )
}
