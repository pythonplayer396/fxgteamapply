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
  const [applications, setApplications  ] = useState<Application[]>([])
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
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:rotate-6 transition-all duration-500">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        )
      case 'denied':
      case 'interview_failed':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:rotate-6 transition-all duration-500">
            <XCircle className="w-8 h-8 text-white" />
          </div>
        )
      case 'interview':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:rotate-6 transition-all duration-500">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
        )
      default:
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:rotate-6 transition-all duration-500">
            <Clock className="w-8 h-8 text-white" />
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
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <span className="text-purple-400 font-semibold text-sm">📋 Status Dashboard</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none">
            Application <span className="gradient-text">Status</span>
          </h1>
          <p className="text-xl text-gray-400 font-light">Track your journey with us</p>
        </div>

        {applications.length === 0 ? (
          <div className="glass-card text-center py-16 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-4">No Applications Found</h2>
              <p className="text-gray-400 text-lg mb-8">You haven't submitted any applications yet.</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary text-lg flex items-center gap-3 mx-auto group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {applications.map((app, index) => (
              <div key={app.id} className="glass-card group hover:scale-[1.02] cursor-pointer animate-fade-in relative overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Animated background glow based on status */}
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ${
                  app.status === 'approved' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' :
                  app.status === 'denied' || app.status === 'interview_failed' ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20' :
                  app.status === 'interview' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' :
                  'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                }`}></div>
                
                <div className="relative flex items-start gap-6">
                  {getStatusIcon(app.status)}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-black capitalize">{app.type} Application</h2>
                      <span className={`px-6 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
                        app.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        app.status === 'denied' || app.status === 'interview_failed' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        app.status === 'interview' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {getStatusText(app.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {getStatusDescription(app.status)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8 text-sm text-gray-400">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white mb-1">Submitted</span>
                          <span>{new Date(app.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white mb-1">Last Updated</span>
                          <span>{new Date(app.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                      >
                        <Eye className="w-5 h-5" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass-card max-w-3xl w-full max-h-[85vh] overflow-y-auto relative">
            {/* Modal background glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
              selectedApp.status === 'approved' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' :
              selectedApp.status === 'denied' || selectedApp.status === 'interview_failed' ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20' :
              selectedApp.status === 'interview' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' :
              'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            }`}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <h2 className="text-3xl font-black capitalize">{selectedApp.type} Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-3 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6 relative">
              {/* Status */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                {getStatusIcon(selectedApp.status)}
                <div>
                  <div className="text-2xl font-bold mb-2">{getStatusText(selectedApp.status)}</div>
                  <div className="text-gray-300 text-lg">{getStatusDescription(selectedApp.status)}</div>
                </div>
              </div>

              {/* Application Fields */}
              <div className="grid gap-4">
                {selectedApp.type === 'helper' ? (
                  <>
                    {selectedApp.age && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Age</label>
                        <div className="text-gray-200 text-lg">{selectedApp.age}</div>
                      </div>
                    )}
                    {selectedApp.previousExperience && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Previous Experience</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.previousExperience}</div>
                      </div>
                    )}
                    {selectedApp.whyHelper && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Why do you want to be a Helper?</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.whyHelper}</div>
                      </div>
                    )}
                    {selectedApp.availability && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Availability</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.availability}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Contact Information</label>
                        <div className="text-gray-200 text-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Additional Information</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {selectedApp.programmingExperience && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Programming Experience</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.programmingExperience}</div>
                      </div>
                    )}
                    {selectedApp.languages && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Programming Languages</label>
                        <div className="text-gray-200 text-lg">{selectedApp.languages}</div>
                      </div>
                    )}
                    {selectedApp.frameworks && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Frameworks & Technologies</label>
                        <div className="text-gray-200 text-lg">{selectedApp.frameworks}</div>
                      </div>
                    )}
                    {selectedApp.portfolio && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Portfolio/Projects</label>
                        <div className="text-gray-200 text-lg">{selectedApp.portfolio}</div>
                      </div>
                    )}
                    {selectedApp.github && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">GitHub Profile</label>
                        <div className="text-gray-200 text-lg">
                          <a href={selectedApp.github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors hover:underline">
                            {selectedApp.github}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedApp.reason && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Why do you want to be a Developer?</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.reason}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Contact Information</label>
                        <div className="text-gray-200 text-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <label className="block text-lg font-bold mb-3 text-purple-400">Additional Information</label>
                        <div className="text-gray-200 text-lg whitespace-pre-wrap leading-relaxed">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                )}

                {/* Discord ID */}
                {selectedApp.discordId && (
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <label className="block text-lg font-bold mb-3 text-purple-400">Discord ID</label>
                    <div className="text-gray-200 text-lg font-mono bg-black/30 p-3 rounded-lg">{selectedApp.discordId}</div>
                  </div>
                )}

                {/* Submission Info */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Submission Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-bold mb-2 text-white">Submitted</label>
                      <div className="text-gray-300 text-lg">{new Date(selectedApp.submittedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="block text-lg font-bold mb-2 text-white">Last Updated</label>
                      <div className="text-gray-300 text-lg">{new Date(selectedApp.updatedAt).toLocaleString()}</div>
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
