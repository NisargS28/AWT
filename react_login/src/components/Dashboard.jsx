import React, { useState, useEffect } from 'react'
import { account } from '../config/appwrite'
import './Dashboard.css'

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const userData = await account.get()
      setUser(userData)
    } catch (err) {
      console.error('Error fetching user:', err)
      onLogout()
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await account.deleteSession('current')
      alert('Logged out successfully!')
      onLogout()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome, {user?.name}!</h1>
        
        <div className="user-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.$id}</p>
          <p><strong>Created At:</strong> {new Date(user?.$createdAt).toLocaleString()}</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}
