import { useState, useEffect } from 'react'
interface ModalProps {
    onClose: () => void
    onSave: (title: string) => void
    editingTask: { id: number, title: string} | null
}

export default function Modal( {onClose, onSave, editingTask}: ModalProps) {
    const [title, setTitle] = useState(editingTask ? editingTask.title : '')

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSave(title)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-div">
                <button className="modal-close-btn" onClick={() => onClose()}>X</button>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="task-title">Enter task title:</label>
                    <input autoFocus id="task-title" placeholder="Ex. Buy apples" className="modal-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}