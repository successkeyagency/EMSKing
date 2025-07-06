import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleR = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading ...</div>
  }

  if (!Array.isArray(requiredRole) || !requiredRole.includes(user?.role)) {
    alert("Unauthorized access")
    return <Navigate to="/unauthorized" />
  }

  return user ? children : <Navigate to="/signin" />
}

export default RoleR
