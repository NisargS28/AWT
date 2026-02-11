import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoList } from '../components/TodoList'

function App() {
  const [todoList, setTodoList] = useState([
    { text: 'react Learn', completed: false },
    { text: 'Node js Learn', completed: false }
  ])

  const getDataFromChild = (data) => {
    setTodoList([...todoList, { text: data, completed: false }]);
  }

  const handleDelete = (idx) => {
    setTodoList(todoList.filter((_, i) => i !== idx));
  }

  const handleToggleComplete = (idx) => {
    setTodoList(todoList.map((todo, i) =>
      i === idx ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const handleEdit = (idx, newText) => {
    setTodoList(todoList.map((todo, i) =>
      i === idx ? { ...todo, text: newText } : todo
    ));
  }

  return (
    <>
      <div className="test">
        <TodoList
          todos={todoList}
          getDataFromChild={getDataFromChild}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
        />
      </div>
    </>
  )
}

export default App
