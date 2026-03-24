import { useState } from 'react'
import TaskCard from './components/TaskCard.tsx'
import Modal from './components/Modal.tsx'
import './App.css'



function App() {

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: 'Start here!',
      date: '10:30 AM, 03/19/2026'
    }
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<{ id: number, title: string } | null>(null)


  function handleAddTask(title: string) {
    setTodoList(prev => [...prev, { id: todoList.length + 1, title, date: 'some date' }])
    setIsOpen(false)
  }

  function onDelete(id: number) {
    setTodoList(prev => prev.filter(todo => todo.id !== id))
  }

  function handleEdit(id: number, title: string) {
  setTodoList(prev => prev.map(todo => 
    todo.id === id ? { ...todo, title } : todo
  ))
  }

  return (
    <main>
      <h1 className="title-h1">TODO LIST</h1>
      <div className="active-container">
        <button className="addtask-btn" onClick={() => setIsOpen(true)}>Add Task</button>
        <select name="sort-dropdown">
          <option value="all">All</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="task-container">
        {todoList.map(todo => (
          <TaskCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            date={todo.date}
            onDelete={() => onDelete(todo.id)}
            onEdit={() => {
              setEditingTask({ id: todo.id, title: todo.title })
              setIsOpen(true)
            }}
          />
        ))}
      </div>
      {isOpen ? <Modal 
        onClose={() => {
          setIsOpen(false)
          setEditingTask(null)
        }} 
        onSave={(title) => {
          editingTask 
            ? handleEdit(editingTask.id, title) 
            : handleAddTask(title)
        }}
        editingTask={editingTask}
      /> : null}
    </main>
  )
}

export default App
