'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { User, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react'
import Link from 'next/link'

interface UserApplication {
  id: string
  type: string
  status: string
  submittedAt: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<UserApplication[]>([])
  const [stats, setStats] = useState({ approved: 0, declined: 0, pending: 0 })

  useEffect(() => {
    if (session?.user) {
      fetchUserApplications()
    }
  }, [session])

  const fetchUserApplications = async () => {
    try {
      const response = await fetch('/api/user/applications')
      const data = await response.json()
      setApplications(data)
      
      const approved = data.filter((app: UserApplication) => app.status === 'approved').length
      const declined = data.filter((app: UserApplication) => app.status === 'denied').length
      const pending = data.filter((app: UserApplication) => app.status === 'pending').length
      
      setStats({ approved, declined, pending })
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen relative">
      <section className="relative min-h-screen flex items-start px-4 overflow-hidden pt-32 pb-20">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
        {/* User Info */}
          <div className="render-panel mb-6 fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                  <h1 className="render-title">{session.user?.name}</h1>
                  <p className="render-subtitle">{session.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
                className="btn-render-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="render-panel fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-[var(--accent-green)]" />
                <span className="text-[var(--text-secondary)]">Approved</span>
              </div>
              <p className="text-4xl font-bold text-[var(--accent-green)]">{stats.approved}</p>
            </div>
            <div className="render-panel fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-500" />
                <span className="text-[var(--text-secondary)]">Declined</span>
            </div>
            <p className="text-4xl font-bold text-red-500">{stats.declined}</p>
          </div>
            <div className="render-panel fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-500" />
                <span className="text-[var(--text-secondary)]">Pending</span>
            </div>
            <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
        </div>

        {/* Applications History */}
          <div className="render-panel fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Your Applications</h2>
          {applications.length === 0 ? (
              <p className="text-[var(--text-secondary)] text-center py-8">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                  <div key={app.id} className="render-panel border-l-4 border-l-[var(--accent-cyan)]">
                  <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg capitalize text-[var(--text-primary)]">{app.type} Application</h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                        Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
            <Link href="/dashboard" className="btn-render-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
      </section>
    </div>
  )
}
