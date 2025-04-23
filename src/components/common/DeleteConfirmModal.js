"use client"
import Modal from "./Modal"
import "./Modal.css"

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="confirm-message">{message}</p>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal
