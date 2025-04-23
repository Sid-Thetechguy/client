"use client"

import { useState } from "react"
import { format } from "date-fns"
import { FaEllipsisV } from "react-icons/fa"
import "./TaskCard.css"

const TaskCard = ({ task, onUpdateStatus, onDeleteTask }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "To Do":
        return "badge-todo"
      case "In Progress":
        return "badge-progress"
      case "Completed":
        return "badge-completed"
      default:
        return "badge-todo"
    }
  }

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(task._id, newStatus)
    setShowMenu(false)
  }

  const handleDelete = () => {
    onDeleteTask(task._id)
    setShowMenu(false)
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-menu">
          <span className={`task-status ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
          <div className="menu-container">
            <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
              <FaEllipsisV />
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={() => handleStatusChange("To Do")}>Mark as To Do</button>
                <button onClick={() => handleStatusChange("In Progress")}>Mark as In Progress</button>
                <button onClick={() => handleStatusChange("Completed")}>Mark as Completed</button>
                <div className="menu-divider"></div>
                <button className="delete-option" onClick={handleDelete}>
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="task-body">
        <p>{task.description}</p>
      </div>
      <div className="task-footer">
        <div className="task-date">Created: {format(new Date(task.createdAt), "MMM d, yyyy")}</div>
        {task.status === "Completed" && task.completedAt && (
          <div className="task-date">Completed: {format(new Date(task.completedAt), "MMM d, yyyy")}</div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
