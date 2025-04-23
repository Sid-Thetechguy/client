import { Link } from "react-router-dom"
import { format } from "date-fns"
import "./ProjectCard.css"

const ProjectCard = ({ project }) => {
  // Calculate progress percentage
  const totalTasks = project.taskCount || 0
  const completedTasks = project.completedTasks || 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3>
          <Link to={`/projects/${project._id}`}>{project.title}</Link>
        </h3>
      </div>
      <div className="project-card-body">
        <p className="project-description">{project.description}</p>
        <div className="project-progress">
          <div className="progress-info">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="project-card-footer">
        <div className="project-date">Created: {format(new Date(project.createdAt), "MMM d, yyyy")}</div>
        <div className="project-tasks">
          {completedTasks}/{totalTasks} tasks
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
