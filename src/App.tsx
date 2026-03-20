import { useState } from 'react'
import TaskCard from './components/TaskCard.tsx'
import './App.css'


function App() {

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: 'Start here!',
      date: '10:30 AM, 03/19/2026'
    }
  ])

  function addTask() {
    setTodoList(prev => [...prev, { id: todoList.length + 1, title: 'test', date: 'test' }])
  }


  return (
    <main>
      <h1 className="title-h1">TODO LIST</h1>
      <div className="active-container">
        <button className="addtask-btn" onClick={ () => addTask() }>Add Task</button>
        <select name="sort-dropdown">
          <option value="all">All</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="task-container">
        {todoList.map(todo => (
          <TaskCard id={todo.id} title={todo.title} date={todo.date} />
        ))}
      </div>
    </main>
  )
}

export default App
