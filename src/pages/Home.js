"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Manage Your Tasks Efficiently</h1>
          <p>Track your projects, manage tasks, and boost your productivity with our intuitive task tracker.</p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="btn">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Create Projects</h3>
            <p>Organize your work into projects. Each user can manage up to 4 projects.</p>
          </div>
          <div className="feature-card">
            <h3>Manage Tasks</h3>
            <p>Create, read, update, and delete tasks with ease. Track progress and completion dates.</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Monitor task status and track your progress to stay on top of your projects.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
