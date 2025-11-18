'use client'

import { useState, useEffect } from 'react'
import { Shield, Search, Download, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { getAdminToken, setAdminToken, clearAdminToken } from '@/lib/adminAuth'

interface Application {
  id: string
  type: string
  applicationType?: string
  careerType?: string
  discordUsername: string
  discordId: string
  status: 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'
  submittedAt: string
  [key: string]: any
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'helper' | 'developer' | 'slayer' | 'dungeon'>('all')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const token = getAdminToken()
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) fetchApplications()
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications', {
        credentials: 'include', // Important: include cookies
      })
      
      if (!response.ok) {
        console.error('Failed to fetch applications:', response.status)
        if (response.status === 401) {
          // Session expired, logout
          handleLogout()
        }
        return
      }
      
      const data = await response.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAdminToken(data.token)
        setIsAuthenticated(true)
      } else {
        setLoginError('Invalid username or password')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const updateStatus = async (id: string, status: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
        credentials: 'include',
      })
      
      if (response.ok) {
        // Update locally for instant feedback
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: status as Application['status'] } : app
        ))
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status: status as Application['status'] })
        }
        showSuccess(`Status updated to ${status}`)
        
        // Send Discord DM notification
        await sendDiscordNotification(id, status)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCategory = async (id: string, category: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          type: category === 'helper' || category === 'developer' ? category : undefined,
          careerType: category === 'slayer' || category === 'dungeon' ? category : undefined,
          applicationType: category === 'slayer' || category === 'dungeon' ? 'career' : undefined
        }),
        credentials: 'include',
      })
      
      if (response.ok) {
        // Update locally for instant feedback
        setApplications(prev => prev.map(app => {
          if (app.id === id) {
            if (category === 'helper' || category === 'developer') {
              return { ...app, type: category, applicationType: undefined, careerType: undefined }
            } else {
              return { ...app, type: category, applicationType: 'career', careerType: category }
            }
          }
          return app
        }))
        if (selectedApp?.id === id) {
          if (category === 'helper' || category === 'developer') {
            setSelectedApp({ ...selectedApp, type: category, applicationType: undefined, careerType: undefined })
          } else {
            setSelectedApp({ ...selectedApp, type: category, applicationType: 'career', careerType: category })
          }
        }
        showSuccess(`Category updated to ${category}`)
      }
    } catch (error) {
      console.error('Error updating category:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendDiscordNotification = async (id: string, status: string) => {
    const app = applications.find(a => a.id === id)
    
    console.log('Attempting to send Discord notification:', {
      id,
      status,
      hasApp: !!app,
      hasDiscordId: !!app?.sessionDiscordId,
      discordId: app?.sessionDiscordId,
      isCareer: app?.careerType === 'slayer' || app?.careerType === 'dungeon'
    })
    
    if (!app) {
      console.error('Application not found for Discord notification')
      return
    }
    
    if (!app.sessionDiscordId) {
      console.error('No Discord ID found for application:', app)
      showSuccess(`Status updated but no Discord DM sent (missing Discord ID)`)
      return
    }

    const isCareerApp = app.careerType === 'slayer' || app.careerType === 'dungeon'

    try {
      console.log('Sending DM request to API...')
      
      // Use different endpoint for career applications
      const endpoint = isCareerApp ? '/api/admin/send-career-dm' : '/api/admin/send-dm'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discordId: app.sessionDiscordId,
          applicantName: app.sessionUsername || app.discordUsername,
          applicationType: app.careerType || app.type,
          status: status
        }),
        credentials: 'include',
      })
      
      // Safely parse JSON response
      let data
      try {
        const text = await response.text()
        data = text ? JSON.parse(text) : { error: 'Empty response' }
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        data = { 
          error: response.status === 504 
            ? 'Request timeout - The bot API did not respond in time' 
            : 'Invalid response from server'
        }
      }
      
      console.log('DM API response:', data)
      
      if (!response.ok) {
        console.error('Failed to send Discord DM:', data)
        const errorMsg = data.error || data.details || 'Unknown error'
        showSuccess(`Status updated but DM failed: ${errorMsg}`)
      } else {
        console.log('Discord DM sent successfully!')
      }
    } catch (error: any) {
      console.error('Error sending Discord notification:', error)
      const errorMsg = error?.message || error?.toString() || 'Network error'
      showSuccess(`Status updated but DM failed: ${errorMsg}`)
    }
  }

  const deleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/applications?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include',
      })
      
      if (response.ok) {
        // Remove locally for instant feedback
        setApplications(prev => prev.filter(app => app.id !== id))
        setSelectedApp(null)
        showSuccess('Application deleted')
      }
    } catch (error) {
      console.error('Error deleting application:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToJSON = () => {
    const dataToExport = activeTab === 'all' ? applications : filtered
    const dataStr = JSON.stringify(dataToExport, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `applications-${activeTab}-${Date.now()}.json`
    link.click()
    showSuccess(`Exported ${dataToExport.length} applications`)
  }

  const exportToCSV = () => {
    const dataToExport = activeTab === 'all' ? applications : filtered
    if (dataToExport.length === 0) return

    const headers = Object.keys(dataToExport[0]).join(',')
    const rows = dataToExport.map(app => 
      Object.values(app).map(val => `"${val}"`).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `applications-${activeTab}-${Date.now()}.csv`
    link.click()
    showSuccess(`Exported ${dataToExport.length} applications to CSV`)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Panels */}
        <div className="absolute inset-0 -z-5 pointer-events-none">
          <div className="floating-panel absolute top-16 right-16 w-80 h-40 render-panel opacity-85">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-[var(--accent-purple)] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-semibold">Admin Portal</span>
            </div>
            <div className="text-sm text-gray-400">Secure access</div>
          </div>
        </div>

        <div className="render-panel max-w-md w-full fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30">
              <Shield className="w-8 h-8 text-[var(--accent-purple)]" />
            </div>
          </div>
          <h1 className="render-title text-center mb-6">Admin Login</h1>
          {loginError && (
            <div className="bg-[#FF1744]/20 border border-[#FF1744] text-[#FF1744] px-4 py-3 mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn-render-primary w-full">Login</button>
          </form>
        </div>
      </div>
    )
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    interview: applications.filter(a => a.status === 'interview').length,
    approved: applications.filter(a => a.status === 'approved').length,
    denied: applications.filter(a => a.status === 'denied').length,
    interviewFailed: applications.filter(a => a.status === 'interview_failed').length,
    helper: applications.filter(a => a.type === 'helper').length,
    developer: applications.filter(a => a.type === 'developer').length,
    slayer: applications.filter(a => a.careerType === 'slayer').length,
    dungeon: applications.filter(a => a.careerType === 'dungeon').length,
  }

  const filtered = applications.filter(app => {
    const username = app.sessionUsername || app.discordUsername || ''
    const matchesSearch = username.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter by status
    const matchesStatus = activeTab === 'all' || app.status === activeTab
    
    // Filter by category
    let matchesCategory = true
    if (categoryFilter === 'helper') matchesCategory = app.type === 'helper'
    else if (categoryFilter === 'developer') matchesCategory = app.type === 'developer'
    else if (categoryFilter === 'slayer') matchesCategory = app.careerType === 'slayer'
    else if (categoryFilter === 'dungeon') matchesCategory = app.careerType === 'dungeon'
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start px-4 overflow-hidden pt-32 pb-20">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Panels */}
        <div className="absolute inset-0 -z-5 pointer-events-none">
          <div className="floating-panel absolute top-16 right-16 w-80 h-40 render-panel opacity-85">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-[var(--accent-purple)] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-semibold">Admin Portal</span>
            </div>
            <div className="text-sm text-gray-400">Manage applications</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
        {/* Success Message */}
        {successMessage && (
            <div className="fixed top-24 right-4 z-50 bg-[var(--accent-green)] text-white px-6 py-3 shadow-lg fade-in-up">
            ✓ {successMessage}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
              <div className="render-panel p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-cyan)] mx-auto"></div>
                <p className="text-[var(--text-primary)] mt-4">Processing...</p>
            </div>
          </div>
        )}

          <div className="flex items-center justify-between mb-8 fade-in-up">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30">
                <Shield className="w-6 h-6 text-[var(--accent-purple)]" />
              </div>
            <div>
                <h1 className="render-title">Admin Dashboard</h1>
                <p className="render-subtitle">{stats.total} total applications</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-render-secondary">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
              className={`render-panel p-4 text-left fade-in-up transition-all ${
                activeTab === 'all' ? 'border-[var(--accent-cyan)] border-2' : ''
            }`}
              style={{animationDelay: '0.1s'}}
          >
              <p className="text-[var(--text-secondary)] text-sm mb-1">Total</p>
              <p className="text-3xl font-bold text-[var(--text-primary)]">{stats.total}</p>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
              className={`render-panel p-4 text-left fade-in-up border-l-4 transition-all ${
                activeTab === 'pending' ? 'border-l-[#FF6B35]' : 'border-l-[#FF6B35]/30'
            }`}
              style={{animationDelay: '0.2s'}}
          >
              <p className="text-[#FF6B35] text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-[#FF6B35]">{stats.pending}</p>
          </button>
          <button
            onClick={() => setActiveTab('interview')}
              className={`render-panel p-4 text-left fade-in-up border-l-4 transition-all ${
                activeTab === 'interview' ? 'border-l-[var(--accent-cyan)]' : 'border-l-[var(--accent-cyan)]/30'
            }`}
              style={{animationDelay: '0.3s'}}
          >
              <p className="text-[var(--accent-cyan)] text-sm mb-1">Interview</p>
              <p className="text-3xl font-bold text-[var(--accent-cyan)]">{stats.interview}</p>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
              className={`render-panel p-4 text-left fade-in-up border-l-4 transition-all ${
                activeTab === 'approved' ? 'border-l-[var(--accent-green)]' : 'border-l-[var(--accent-green)]/30'
            }`}
              style={{animationDelay: '0.4s'}}
          >
              <p className="text-[var(--accent-green)] text-sm mb-1">Approved</p>
              <p className="text-3xl font-bold text-[var(--accent-green)]">{stats.approved}</p>
          </button>
          <button
            onClick={() => setActiveTab('denied')}
              className={`render-panel p-4 text-left fade-in-up border-l-4 transition-all ${
                activeTab === 'denied' ? 'border-l-[#FF1744]' : 'border-l-[#FF1744]/30'
            }`}
              style={{animationDelay: '0.5s'}}
          >
              <p className="text-[#FF1744] text-sm mb-1">Denied</p>
              <p className="text-3xl font-bold text-[#FF1744]">{stats.denied}</p>
          </button>
          <button
            onClick={() => setActiveTab('interview_failed')}
              className={`render-panel p-4 text-left fade-in-up border-l-4 transition-all ${
                activeTab === 'interview_failed' ? 'border-l-[#FF6B35]' : 'border-l-[#FF6B35]/30'
            }`}
              style={{animationDelay: '0.6s'}}
          >
              <p className="text-[#FF6B35] text-sm mb-1">Interview Failed</p>
              <p className="text-3xl font-bold text-[#FF6B35]">{stats.interviewFailed}</p>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3 font-semibold">Filter by Category:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                categoryFilter === 'all' ? 'bg-[var(--accent-purple)] text-white' : 'render-panel border border-[var(--border-panel)] hover:border-[var(--accent-purple)]/50'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setCategoryFilter('helper')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                categoryFilter === 'helper' ? 'bg-[var(--accent-green)] text-white' : 'render-panel border border-[var(--border-panel)] hover:border-[var(--accent-green)]/50'
              }`}
            >
              Helper ({stats.helper})
            </button>
            <button
              onClick={() => setCategoryFilter('developer')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                categoryFilter === 'developer' ? 'bg-[var(--accent-cyan)] text-white' : 'render-panel border border-[var(--border-panel)] hover:border-[var(--accent-cyan)]/50'
              }`}
            >
              Developer ({stats.developer})
            </button>
            <button
              onClick={() => setCategoryFilter('slayer')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                categoryFilter === 'slayer' ? 'bg-[#FF1744] text-white' : 'render-panel border border-[var(--border-panel)] hover:border-[#FF1744]/50'
              }`}
            >
              Slayer ({stats.slayer})
            </button>
            <button
              onClick={() => setCategoryFilter('dungeon')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                categoryFilter === 'dungeon' ? 'bg-[#FF6B35] text-white' : 'render-panel border border-[var(--border-panel)] hover:border-[#FF6B35]/50'
              }`}
            >
              Dungeon ({stats.dungeon})
            </button>
          </div>
        </div>

          <div className="render-panel mb-6 fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={exportToJSON} className="btn-render-primary flex items-center gap-2">
                <Download className="w-5 h-5" />
                JSON
              </button>
              <button onClick={exportToCSV} className="btn-render-secondary flex items-center gap-2">
                <Download className="w-5 h-5" />
                CSV
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
            <p>Showing {filtered.length} of {applications.length} applications</p>
            <p>Filter: <span className="text-white font-semibold capitalize">{activeTab ? activeTab.replace('_', ' ') : 'all'}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`render-panel cursor-pointer transition-all ${
                  selectedApp?.id === app.id ? 'border-discord-blurple' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{app.sessionUsername || app.discordUsername || 'Unknown'}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    app.status === 'interview' ? 'bg-blue-500/20 text-blue-500' :
                    app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    app.status === 'denied' ? 'bg-red-500/20 text-red-500' :
                    'bg-orange-500/20 text-orange-500'
                  }`}>
                    {app.status ? app.status.replace('_', ' ') : 'Unknown'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Type: {app.type}</p>
                <p className="text-gray-400 text-sm">ID: {app.sessionDiscordId || app.discordId || 'N/A'}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(app.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {selectedApp && (
            <div className="render-panel sticky top-24">
              {/* Header with Profile Picture and Name */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {selectedApp.sessionAvatar ? (
                    <img 
                      src={selectedApp.sessionAvatar} 
                      alt={selectedApp.sessionUsername || selectedApp.discordUsername}
                      className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                      {(selectedApp.sessionUsername || selectedApp.discordUsername).charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedApp.sessionUsername || selectedApp.discordUsername}</h2>
                    <p className="text-gray-400 text-sm">
                      {selectedApp.careerType ? selectedApp.careerType.charAt(0).toUpperCase() + selectedApp.careerType.slice(1) : selectedApp.type.charAt(0).toUpperCase() + selectedApp.type.slice(1)} Application
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Application Details Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">ID</p>
                    <p className="text-white font-mono text-sm">{selectedApp.id}</p>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedApp.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      selectedApp.status === 'interview' ? 'bg-blue-500/20 text-blue-500' :
                      selectedApp.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      selectedApp.status === 'denied' ? 'bg-red-500/20 text-red-500' :
                      'bg-orange-500/20 text-orange-500'
                    }`}>
                      {selectedApp.status ? selectedApp.status.replace('_', ' ') : 'Unknown'}
                    </span>
                  </div>
                </div>
                
                {/* Category Change */}
                <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-2">Change Category</p>
                  <select
                    value={selectedApp.careerType || selectedApp.type}
                    onChange={(e) => updateCategory(selectedApp.id, e.target.value)}
                    className="w-full bg-discord-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="helper">Helper</option>
                    <option value="developer">Developer</option>
                    <option value="slayer">Slayer</option>
                    <option value="dungeon">Dungeon</option>
                  </select>
                </div>

                {Object.entries(selectedApp).map(([key, value]) => {
                  if (['id', 'status', 'submittedAt', 'updatedAt', 'sessionAvatar', 'sessionUsername', 'sessionEmail', 'sessionDiscordId'].includes(key)) return null
                  return (
                    <div key={key} className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-gray-500 mb-1 capitalize">{key ? key.replace(/([A-Z])/g, ' $1') : ''}</p>
                      <p className="text-white break-words">{String(value)}</p>
                    </div>
                  )
                })}

                <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                  <p className="text-white">{new Date(selectedApp.submittedAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-2">
                {/* Career applications (Slayer/Dungeon) - No interview */}
                {(selectedApp.careerType === 'slayer' || selectedApp.careerType === 'dungeon') && selectedApp.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'denied')}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline
                    </button>
                  </>
                )}

                {/* Staff applications (Helper/Developer) - With interview */}
                {!(selectedApp.careerType === 'slayer' || selectedApp.careerType === 'dungeon') && selectedApp.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'interview')}
                      disabled={loading}
                      className="btn-render-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Take for Interview
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'denied')}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline Application
                    </button>
                  </>
                )}
                
                {selectedApp.status === 'interview' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Application
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'denied')}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline Application
                    </button>
                  </>
                )}
                {(selectedApp.status === 'approved' || selectedApp.status === 'denied') && (
                  <p className="text-gray-400 text-center py-4">Application {selectedApp.status}</p>
                )}
                <button
                  onClick={() => deleteApplication(selectedApp.id)}
                  disabled={loading}
                  className="btn-render-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </section>
    </div>
  )
}
