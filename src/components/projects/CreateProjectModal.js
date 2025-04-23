"use client"
import { useForm } from "react-hook-form"
import Modal from "../common/Modal"
import "../common/Modal.css"

const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    onCreateProject(data)
    reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title cannot exceed 100 characters",
              },
            })}
          />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
          ></textarea>
          {errors.description && <span className="error">{errors.description.message}</span>}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn">
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateProjectModal
