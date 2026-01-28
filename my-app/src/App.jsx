import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoList } from '../components/TodoList'

function App() {
  const [todoList, setTodoList] = useState(['react Learn','Node js Learn'])

  const getDataFromChild = (data) => {
    setTodoList([...todoList, data]);
  }

  const handleDelete = (idx) => {
    setTodoList(todoList.filter((_, i) => i !== idx));
  }

  return (
    <>
      <div className="test">
        <TodoList todos={todoList} getDataFromChild={getDataFromChild} onDelete={handleDelete}/>
      </div>
    </>
  )
}

export default App
