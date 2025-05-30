import TaskCard from "./TaskCard"
import "./TaskList.css"

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks in this column</div>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdateStatus={onUpdateStatus} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  )
}

export default TaskList
