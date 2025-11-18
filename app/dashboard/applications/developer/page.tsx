'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Code, Send, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DeveloperApplicationPage() {
  const { data: session } = useSession()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    discordId: '',
    programmingExperience: '',
    languages: '',
    frameworks: '',
    portfolio: '',
    github: '',
    reason: '',
    contactInfo: '',
    additionalInfo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/applications/developer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'developer',
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to submit application: ' + (data.error || 'Unknown error'))
        console.error('Submission failed:', data)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Check console for details.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="render-panel max-w-2xl w-full text-center fade-in-up">
          <div className="w-16 h-16 bg-[var(--accent-green)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-green)]/30 mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[var(--accent-green)]" />
          </div>
          <h1 className="render-title mb-3">Application Submitted!</h1>
          <p className="render-subtitle mb-6">
            Thank you for applying! We'll review your application and portfolio, then contact you via Discord.
          </p>
          <Link href="/" className="btn-render-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    )
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

        <div className="max-w-3xl mx-auto w-full">
          <Link href="/dashboard/applications/staff" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors fade-in-up">
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

          <div className="render-panel mb-6 fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30">
                <Code className="w-6 h-6 text-[var(--accent-purple)]" />
            </div>
            <div>
                <h1 className="render-title">Developer Application</h1>
                <p className="render-subtitle">Join our development team</p>
            </div>
          </div>
        </div>

          <form onSubmit={handleSubmit} className="render-panel space-y-6 fade-in-up" style={{animationDelay: '0.2s'}}>
            {/* Discord info */}
            <div className="bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/30 p-4 mb-6">
              <p className="text-sm text-[var(--text-primary)] mb-2">
                <span className="font-semibold text-[var(--accent-purple)]">Logged in as:</span> {session?.user?.name}
              </p>
            </div>

            <div>
              <label htmlFor="discordId" className="block text-sm font-semibold mb-2">
                Discord User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="discordId"
                name="discordId"
                required
                value={formData.discordId}
                onChange={handleChange}
                placeholder="123456789012345678"
                className="input-field"
              />
              <p className="text-xs text-gray-400 mt-1">
                Right-click your profile in Discord → Copy User ID (Developer Mode must be enabled)
              </p>
            </div>

            <div>
              <label htmlFor="programmingExperience" className="block text-sm font-semibold mb-2">
                Programming Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                id="programmingExperience"
                name="programmingExperience"
                required
                value={formData.programmingExperience}
                onChange={handleChange}
                rows={4}
                placeholder="How long have you been programming? What projects have you worked on?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="languages" className="block text-sm font-semibold mb-2">
                Programming Languages <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                required
                value={formData.languages}
                onChange={handleChange}
                placeholder="JavaScript, Python, TypeScript, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="frameworks" className="block text-sm font-semibold mb-2">
                Frameworks & Technologies <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="frameworks"
                name="frameworks"
                required
                value={formData.frameworks}
                onChange={handleChange}
                placeholder="React, Node.js, Next.js, Discord.js, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-semibold mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-semibold mb-2">
                Portfolio / Previous Projects <span className="text-red-500">*</span>
              </label>
              <textarea
                id="portfolio"
                name="portfolio"
                required
                value={formData.portfolio}
                onChange={handleChange}
                rows={4}
                placeholder="Share links to your projects, websites, or describe your best work..."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                Why do you want to join our dev team? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="What motivates you to contribute to our community?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-semibold mb-2">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Email or other contact method"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                placeholder="Anything else you'd like us to know?"
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-render-primary w-full flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Submit Application
            </button>
          </form>
      </div>
      </section>
    </div>
  )
}
