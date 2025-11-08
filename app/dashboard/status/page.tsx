'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, FileText, Eye, X } from 'lucide-react'
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
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'denied':
      case 'interview_failed':
        return <XCircle className="w-8 h-8 text-red-500" />
      case 'interview':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />
      default:
        return <Clock className="w-8 h-8 text-blue-500" />
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
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-12 h-12 text-discord-blurple" />
          <div>
            <h1 className="text-4xl font-bold">Application Status</h1>
            <p className="text-gray-400">Track your applications</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="glass-card text-center py-12">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Applications Found</h2>
            <p className="text-gray-400 mb-6">You haven't submitted any applications yet.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn-primary"
            >
              Apply Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="glass-card">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold capitalize">{app.type} Application</h2>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        app.status === 'denied' || app.status === 'interview_failed' ? 'bg-red-500/20 text-red-500' :
                        app.status === 'interview' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {getStatusText(app.status)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {getStatusDescription(app.status)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-6 text-sm text-gray-400">
                        <div>
                          <span className="font-semibold">Submitted:</span>{' '}
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold">Last Updated:</span>{' '}
                          {new Date(app.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="flex items-center gap-2 px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-discord-dark border border-white/10 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold capitalize">{selectedApp.type} Application Details</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-3 mb-6">
                {getStatusIcon(selectedApp.status)}
                <div>
                  <div className="text-lg font-semibold">{getStatusText(selectedApp.status)}</div>
                  <div className="text-gray-400 text-sm">{getStatusDescription(selectedApp.status)}</div>
                </div>
              </div>

              {/* Application Fields */}
              <div className="grid gap-4">
                {selectedApp.type === 'helper' ? (
                  <>
                    {selectedApp.age && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Age</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.age}</div>
                      </div>
                    )}
                    {selectedApp.previousExperience && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Previous Experience</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.previousExperience}</div>
                      </div>
                    )}
                    {selectedApp.whyHelper && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Why do you want to be a Helper?</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.whyHelper}</div>
                      </div>
                    )}
                    {selectedApp.availability && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Availability</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.availability}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Contact Information</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Additional Information</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {selectedApp.programmingExperience && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Programming Experience</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.programmingExperience}</div>
                      </div>
                    )}
                    {selectedApp.languages && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Programming Languages</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.languages}</div>
                      </div>
                    )}
                    {selectedApp.frameworks && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Frameworks & Technologies</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.frameworks}</div>
                      </div>
                    )}
                    {selectedApp.portfolio && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Portfolio/Projects</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.portfolio}</div>
                      </div>
                    )}
                    {selectedApp.github && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">GitHub Profile</label>
                        <div className="bg-black/20 p-3 rounded-lg">
                          <a href={selectedApp.github} target="_blank" rel="noopener noreferrer" className="text-discord-blurple hover:underline">
                            {selectedApp.github}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedApp.reason && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Why do you want to be a Developer?</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.reason}</div>
                      </div>
                    )}
                    {selectedApp.contactInfo && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Contact Information</label>
                        <div className="bg-black/20 p-3 rounded-lg">{selectedApp.contactInfo}</div>
                      </div>
                    )}
                    {selectedApp.additionalInfo && (
                      <div>
                        <label className="block text-sm font-semibold mb-1">Additional Information</label>
                        <div className="bg-black/20 p-3 rounded-lg whitespace-pre-wrap">{selectedApp.additionalInfo}</div>
                      </div>
                    )}
                  </>
                )}

                {/* Discord ID */}
                {selectedApp.discordId && (
                  <div>
                    <label className="block text-sm font-semibold mb-1">Discord ID</label>
                    <div className="bg-black/20 p-3 rounded-lg font-mono">{selectedApp.discordId}</div>
                  </div>
                )}

                {/* Submission Info */}
                <div className="border-t border-white/10 pt-4 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block font-semibold mb-1">Submitted</label>
                      <div className="text-gray-400">{new Date(selectedApp.submittedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Last Updated</label>
                      <div className="text-gray-400">{new Date(selectedApp.updatedAt).toLocaleString()}</div>
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
