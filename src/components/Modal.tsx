import { useState } from 'react'
interface ModalProps {
    onClose: () => void
    onSave: (title: string) => void
    editingTask: { id: number, title: string} | null
}

export default function Modal( {onClose, onSave, editingTask}: ModalProps) {

    const [title, setTitle] = useState(editingTask ? editingTask.title : '')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSave(title)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-div">
                <button className="modal-close-btn" onClick={() => onClose()}>X</button>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}