import { useState, useEffect } from 'react'
import { account } from './config/appwrite'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      await account.get()
      setIsLoggedIn(true)
      setCurrentPage('dashboard')
    } catch (err) {
      setIsLoggedIn(false)
      setCurrentPage('login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard onLogout={() => {
          setIsLoggedIn(false)
          setCurrentPage('login')
        }} />
      ) : currentPage === 'login' ? (
        <Login 
          onLoginSuccess={() => {
            setIsLoggedIn(true)
            setCurrentPage('dashboard')
          }}
          onSwitchToSignup={() => setCurrentPage('signup')}
        />
      ) : (
        <Signup 
          onSignupSuccess={() => {
            setIsLoggedIn(true)
            setCurrentPage('dashboard')
          }}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}
    </div>
  )
}

export default App
