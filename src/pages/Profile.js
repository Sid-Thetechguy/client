"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import "./Profile.css"

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      country: user?.country || "",
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch,
    reset: resetPassword,
  } = useForm()

  const newPassword = watch("newPassword", "")

  const onProfileSubmit = async (data) => {
    setIsProfileLoading(true)
    await updateProfile(data)
    setIsProfileLoading(false)
  }

  const onPasswordSubmit = async (data) => {
    setIsPasswordLoading(true)
    const success = await changePassword(data)
    setIsPasswordLoading(false)

    if (success) {
      resetPassword()
    }
  }

  return (
    <div className="profile-container">
      <h1>Profile Settings</h1>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Personal Information
        </button>
        <button
          className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-form">
            <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  {...registerProfile("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {profileErrors.name && <span className="error">{profileErrors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...registerProfile("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {profileErrors.email && <span className="error">{profileErrors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  {...registerProfile("country", {
                    required: "Country is required",
                  })}
                />
                {profileErrors.country && <span className="error">{profileErrors.country.message}</span>}
              </div>

              <button type="submit" className="btn" disabled={isProfileLoading}>
                {isProfileLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="password-form">
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                {passwordErrors.currentPassword && (
                  <span className="error">{passwordErrors.currentPassword.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {passwordErrors.newPassword && <span className="error">{passwordErrors.newPassword.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) => value === newPassword || "Passwords do not match",
                  })}
                />
                {passwordErrors.confirmPassword && (
                  <span className="error">{passwordErrors.confirmPassword.message}</span>
                )}
              </div>

              <button type="submit" className="btn" disabled={isPasswordLoading}>
                {isPasswordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
