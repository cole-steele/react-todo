
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

interface TaskCardProps {
  id: number,
  title: string,
  date: string
  onDelete: () => void
  onEdit: () => void
}

export default function TaskCard( {title, date, onDelete, onEdit} : TaskCardProps) {
  return (
    <div className="task-card">
      <div className="left-card-content">
        <input className="input-checkbox" type="checkbox"></input>
        <div className="task-card-text">
          <p className="card-title">{title}</p>
          <p className="card-date">{date}</p>
        </div>
      </div>
      <div className="right-card-content">
        <button className="trash-btn" onClick={onDelete}> <FaTrash /> </button>
        <button className="edit-btn" onClick={onEdit}> <FaPencilAlt /> </button>
      </div>
    </div>
  )
}