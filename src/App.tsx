import { useState, useEffect } from 'react'
import TaskCard from './components/TaskCard.tsx'
import Modal from './components/Modal.tsx'
import './App.css'

interface Todo {
  id: number
  title: string
  date: string
  timestamp: number
}

function App() {

  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'Start here!', date: '...' , timestamp: Date.now()}]
  })

  const [isOpen, setIsOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<{ id: number, title: string } | null>(null)
  const [sort, setSort] = useState('all')

  const sortedList = [...todoList].sort((a, b) => {
    if (sort === 'newest') return b.timestamp - a.timestamp
    if (sort === 'oldest') return a.timestamp - b.timestamp
    return 0
  })

  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todoList))
  }, [todoList])


  function handleAddTask(title: string) {

    const now = new Date()
    const date = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const formatted = `${date}, ${time}` // " Thursday 26, 9:30 AM "

    setTodoList(prev => [...prev, { id: Date.now(), title, date: formatted, timestamp: Date.now() }])
    setIsOpen(false)
  }

  function onDelete(id: number) {
    setTodoList(prev => prev.filter(todo => todo.id !== id))
  }

  function handleEdit(id: number, title: string) {
    setTodoList(prev => prev.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    ))
    setIsOpen(false)
    setEditingTask(null)
  }

  return (
    <main>
      <h1 className="title-h1">TODO LIST</h1>
      <div className="active-container">
        <button className="addtask-btn" onClick={() => setIsOpen(true)}>Add Task</button>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="all">All</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="task-container">
        {todoList.length === 0 && (
          <div className="welcome">
            <p>Click "Add Task" above to get started!</p>
          </div>
        )}
        {sortedList.map(todo => (
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
