'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, FileText, Eye, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Application {
  id: string
  type: 'developer' | 'helper'
  status: 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'
  discordUsername: string
  submittedAt: string
  updatedAt: string
  // Application form fields
  [key: string]: any
}
// FDFD
export default function ApplicationStatus() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchApplications()
    }
  }, [status, session])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications/status')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative">
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-cyan)]"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="w-16 h-16 bg-[var(--accent-green)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-green)]/30 group-hover:scale-110 transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-[var(--accent-green)]" />
          </div>
        )
      case 'denied':
      case 'interview_failed':
        return (
          <div className="w-16 h-16 bg-[#FF1744]/20 rounded-xl flex items-center justify-center border border-[#FF1744]/30 group-hover:scale-110 transition-all duration-300">
            <XCircle className="w-8 h-8 text-[#FF1744]" />
          </div>
        )
      case 'interview':
        return (
          <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center border border-[#FF6B35]/30 group-hover:scale-110 transition-all duration-300">
            <AlertCircle className="w-8 h-8 text-[#FF6B35]" />
          </div>
        )
      default:
        return (
          <div className="w-16 h-16 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30 group-hover:scale-110 transition-all duration-300">
            <Clock className="w-8 h-8 text-[var(--accent-purple)]" />
          </div>
        )
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Under Review'
      case 'interview':
        return 'Interview Scheduled'
      case 'approved':
        return 'Approved'
      case 'denied':
        return 'Declined'
      case 'interview_failed':
        return 'Interview Not Passed'
      default:
        return status
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your application is being reviewed by our team. We\'ll update you soon!'
      case 'interview':
        return 'Congratulations! You\'ve been selected for an interview. Check your Discord DMs for details.'
      case 'approved':
        return 'Welcome to the team! Check your Discord for next steps and server access.'
      case 'denied':
        return 'Unfortunately, your application was not accepted at this time. You can apply again in the future.'
      case 'interview_failed':
        return 'Thank you for interviewing. Unfortunately, we won\'t be moving forward at this time.'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 overflow-hidden pt-32">
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
              <div className="w-3 h-3 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-semibold">Application Status</span>
            </div>
            <div className="text-sm text-gray-400">Track your progress</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-full mb-8">
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Status Dashboard</span>
            </div>
            <h1 className="render-title mb-4">
              Application <span style={{color: 'var(--accent-purple)'}}>Status</span>
            </h1>
            <p className="render-subtitle">Track your journey with us</p>
          </div>

          {applications.length === 0 ? (
            <div className="render-panel text-center py-16 fade-in-up relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-purple)]/5 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[var(--border-panel)]">
                  <FileText className="w-10 h-10 text-[var(--text-secondary)]" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">No Applications Found</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8">You haven't submitted any applications yet.</p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="btn-render-primary text-lg flex items-center gap-3 mx-auto group"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app, index) => {
                const statusColor = app.status === 'approved' ? 'var(--accent-green)' :
                  app.status === 'denied' || app.status === 'interview_failed' ? '#FF1744' :
                  app.status === 'interview' ? '#FF6B35' : 'var(--accent-purple)';
                
                return (
                  <div key={app.id} className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{borderLeftColor: statusColor, animationDelay: `${index * 0.1}s`}}>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" style={{backgroundColor: `${statusColor}15`}}></div>
                    
                    <div className="relative flex items-start gap-6">
                      {getStatusIcon(app.status)}
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold capitalize text-[var(--text-primary)]">{app.type} Application</h2>
                          <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded" style={{color: statusColor}}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        
                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                          {getStatusDescription(app.status)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-8 text-sm text-[var(--text-secondary)]">
                            <div className="flex flex-col">
                              <span className="font-semibold text-[var(--text-primary)] mb-1">Submitted</span>
                              <span>{new Date(app.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-[var(--text-primary)] mb-1">Last Updated</span>
                              <span>{new Date(app.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="btn-render-secondary flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="render-panel max-w-3xl w-full max-h-[85vh] overflow-y-auto relative">
            <div className="relative">
              <div className="flex items-center justify-between p-8 border-b border-[var(--border-panel)]">
                <h2 className="text-2xl font-bold capitalize text-[var(--text-primary)]">{selectedApp.type} Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-3 hover:bg-[var(--bg-secondary)] rounded-xl transition-all duration-300"
                >
                  <X className="w-6 h-6 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6 relative">
              {/* Status */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-panel)]">
                {getStatusIcon(selectedApp.status)}
                <div>
                  <div className="text-2xl font-bold mb-2 text-[var(--text-primary)]">{getStatusText(selectedApp.status)}</div>
                  <div className="text-[var(--text-secondary)] text-lg">{getStatusDescription(selectedApp.status)}</div>
                </div>
              </div>

              {/* Application Fields */}
              <div className="grid gap-4">
                {selectedApp.type === 'helper' ? (
                  <>
                    {selectedApp.age && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Age</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.age}</div>
                      </div>
                    )}
                    {selectedApp.previousExperience && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Previous Experience</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.previousExperience}</div>
                      </div>
                    )}
                    {selectedApp.whyHelper && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Why do you want to be a Helper?</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.whyHelper}</div>
                      </div>
                    )}
                    {selectedApp.availability && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Availability</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.availability}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Contact Information</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Additional Information</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {selectedApp.programmingExperience && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Programming Experience</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.programmingExperience}</div>
                      </div>
                    )}
                    {selectedApp.languages && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Programming Languages</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.languages}</div>
                      </div>
                    )}
                    {selectedApp.frameworks && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Frameworks & Technologies</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.frameworks}</div>
                      </div>
                    )}
                    {selectedApp.portfolio && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Portfolio/Projects</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.portfolio}</div>
                      </div>
                    )}
                    {selectedApp.github && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">GitHub Profile</label>
                        <div className="text-[var(--text-primary)] text-lg">
                          <a href={selectedApp.github} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-purple)] hover:text-[var(--accent-cyan)] transition-colors hover:underline">
                            {selectedApp.github}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedApp.reason && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Why do you want to be a Developer?</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.reason}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Contact Information</label>
                        <div className="text-[var(--text-primary)] text-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                        <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Additional Information</label>
                        <div className="text-[var(--text-primary)] text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                )}

                {/* Discord ID */}
                {selectedApp.discordId && (
                  <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)]">
                    <label className="block text-lg font-bold mb-3 text-[var(--accent-purple)]">Discord ID</label>
                    <div className="text-[var(--text-primary)] text-lg font-mono bg-[var(--bg-panel)] p-3 rounded-lg">{selectedApp.discordId}</div>
                  </div>
                )}

                {/* Submission Info */}
                <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-panel)] mt-8">
                  <h3 className="text-xl font-bold mb-4 text-[var(--accent-purple)]">Submission Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-bold mb-2 text-[var(--text-primary)]">Submitted</label>
                      <div className="text-[var(--text-secondary)] text-lg">{new Date(selectedApp.submittedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="block text-lg font-bold mb-2 text-[var(--text-primary)]">Last Updated</label>
                      <div className="text-[var(--text-secondary)] text-lg">{new Date(selectedApp.updatedAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
