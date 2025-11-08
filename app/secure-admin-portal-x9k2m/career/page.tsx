'use client'

import { useState, useEffect } from 'react'
import { Shield, Search, CheckCircle, XCircle, Swords } from 'lucide-react'

interface Application {
  id: string
  type: string
  careerType?: string
  applicationType?: string
  status: 'pending' | 'approved' | 'declined'
  submittedAt: string
  sessionUsername?: string
  sessionDiscordId?: string
  sessionAvatar?: string
  [key: string]: any
}

export default function CareerAdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if already authenticated via sessionStorage
    const authStatus = sessionStorage.getItem('careerAdminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) fetchApplications()
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications/career')
      
      if (!response.ok) {
        console.error('Failed to fetch career applications:', response.status)
        return
      }
      
      const data = await response.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching career applications:', error)
      setApplications([])
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    // Simple password check
    if (password === 'rian3030@123') {
      sessionStorage.setItem('careerAdminAuth', 'true')
      setIsAuthenticated(true)
    } else {
      setLoginError('Invalid password')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('careerAdminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const updateStatus = async (id: string, status: 'approved' | 'declined') => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/applications/career', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      
      if (response.ok) {
        // Update locally for instant feedback
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: status as Application['status'] } : app
        ))
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status: status as Application['status'] })
        }
        showSuccess(`Application ${status}`)
        
        // Send Discord DM notification
        await sendDiscordNotification(id, status)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendDiscordNotification = async (id: string, status: string) => {
    const app = applications.find(a => a.id === id)
    
    if (!app || !app.sessionDiscordId) {
      console.error('No Discord ID found for application')
      return
    }

    try {
      const response = await fetch('/api/admin/send-dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discordId: app.sessionDiscordId,
          applicantName: app.sessionUsername || 'Applicant',
          applicationType: app.careerType || app.type,
          status: status,
          isCareer: true
        }),
      })
      
      if (!response.ok) {
        console.error('Failed to send Discord DM')
      }
    } catch (error) {
      console.error('Error sending Discord notification:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="glass-card max-w-md w-full">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Swords className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">Career Admin Portal</h1>
          {loginError && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
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
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    )
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    declined: applications.filter(a => a.status === 'declined').length,
    slayer: applications.filter(a => a.careerType === 'slayer').length,
    dungeon: applications.filter(a => a.careerType === 'dungeon').length,
  }

  const filtered = applications.filter(app => {
    const username = app.sessionUsername || app.ign || ''
    return username.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
            ✓ {successMessage}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
            <div className="bg-discord-dark border border-discord-blurple rounded-lg p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple mx-auto"></div>
              <p className="text-white mt-4">Processing...</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Swords className="w-12 h-12 text-red-500" />
            <div>
              <h1 className="text-4xl font-bold">Career Admin Portal</h1>
              <p className="text-gray-400">{stats.total} total career applications</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-discord-dark border border-white/10 rounded-lg p-4 text-left">
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-discord-dark border border-yellow-500/20 rounded-lg p-4 text-left">
            <p className="text-yellow-500 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-discord-dark border border-green-500/20 rounded-lg p-4 text-left">
            <p className="text-green-500 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
          </div>
          <div className="bg-discord-dark border border-red-500/20 rounded-lg p-4 text-left">
            <p className="text-red-500 text-sm mb-1">Declined</p>
            <p className="text-3xl font-bold text-red-500">{stats.declined}</p>
          </div>
          <div className="bg-discord-dark border border-blue-500/20 rounded-lg p-4 text-left">
            <p className="text-blue-500 text-sm mb-1">Slayer / Dungeon</p>
            <p className="text-3xl font-bold text-blue-500">{stats.slayer} / {stats.dungeon}</p>
          </div>
        </div>

        <div className="glass-card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by username or IGN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">Showing {filtered.length} of {applications.length} applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`glass-card cursor-pointer transition-all ${
                  selectedApp?.id === app.id ? 'border-discord-blurple' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{app.sessionUsername || app.ign || 'Unknown'}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Type: {app.careerType || app.type}</p>
                <p className="text-gray-400 text-sm">IGN: {app.ign}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(app.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {selectedApp && (
            <div className="glass-card sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {selectedApp.sessionAvatar ? (
                    <img 
                      src={selectedApp.sessionAvatar} 
                      alt={selectedApp.sessionUsername || selectedApp.ign}
                      className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-bold">
                      {(selectedApp.sessionUsername || selectedApp.ign || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedApp.sessionUsername || selectedApp.ign}</h2>
                    <p className="text-gray-400 text-sm capitalize">
                      {selectedApp.careerType || selectedApp.type} Carrier
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Application Details */}
              <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
                <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedApp.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    selectedApp.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {selectedApp.status}
                  </span>
                </div>

                {Object.entries(selectedApp).map(([key, value]) => {
                  if (['id', 'status', 'submittedAt', 'updatedAt', 'sessionAvatar', 'sessionUsername', 'sessionEmail', 'sessionDiscordId', 'type', 'timestamp', 'applicationType', 'careerType'].includes(key)) return null
                  return (
                    <div key={key} className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-white break-words whitespace-pre-wrap">{String(value)}</p>
                    </div>
                  )
                })}

                <div className="bg-[#0a0a0a] rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                  <p className="text-white">{new Date(selectedApp.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {selectedApp.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Application
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'declined')}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Decline Application
                    </button>
                  </>
                )}
                {(selectedApp.status === 'approved' || selectedApp.status === 'declined') && (
                  <div className="text-gray-400 text-center py-4 bg-[#0a0a0a] rounded-lg border border-white/5">
                    Application has been {selectedApp.status}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
