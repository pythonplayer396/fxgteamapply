'use client'

import { useState } from 'react'
import { Swords, Send, CheckCircle, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function SlayerCarrierApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    discordId: '',
    ign: '',
    networth: '',
    playtime: '',
    combatLevel: '',
    slayerBosses: '',
    timeCommitment: '',
    giveawayServers: '',
    additionalInfo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/applications/career/slayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'slayer',
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
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
            Thank you for applying! We'll review your application and contact you via Discord.
          </p>
          <Link href="/dashboard" className="btn-render-primary inline-block">
            Return to Dashboard
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
          <Link href="/dashboard/applications/career" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors fade-in-up">
            <ArrowLeft className="w-4 h-4" />
            Back to Career Applications
          </Link>

          <div className="render-panel mb-6 fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF1744]/20 rounded-xl flex items-center justify-center border border-[#FF1744]/30">
                <Swords className="w-6 h-6 text-[#FF1744]" />
              </div>
              <div>
                <h1 className="render-title">Slayer Carrier Application</h1>
                <p className="render-subtitle">Join our slayer carry team</p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="render-panel mb-6 border-l-4 border-l-[#FF6B35] fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#FF6B35] mb-2">Important Note</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  This role requires skill, consistency, and honesty. Any misuse or failure to perform duties will result in demotion or blacklist from the carrier team.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="render-panel mb-6 fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">Requirements:</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#FF1744] flex-shrink-0 mt-0.5" />
                <span>Combat Level 30+ mandatory.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#FF1744] flex-shrink-0 mt-0.5" />
                <span>Must not be part of any other server running fakepixel related giveaways strict policy.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#FF1744] flex-shrink-0 mt-0.5" />
                <span>Must follow all carrier guidelines strictly.</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="render-panel space-y-6 fade-in-up" style={{animationDelay: '0.4s'}}>
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
            <label htmlFor="ign" className="block text-sm font-semibold mb-2">
              What's your in-game name? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ign"
              name="ign"
              required
              value={formData.ign}
              onChange={handleChange}
              placeholder="YourIGN"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="networth" className="block text-sm font-semibold mb-2">
              What's your networth in fakepixel? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="networth"
              name="networth"
              required
              value={formData.networth}
              onChange={handleChange}
              placeholder="e.g., 100M, 1B"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="playtime" className="block text-sm font-semibold mb-2">
              What's your total playtime in fakepixel? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="playtime"
              name="playtime"
              required
              value={formData.playtime}
              onChange={handleChange}
              placeholder="e.g., 500 hours"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="combatLevel" className="block text-sm font-semibold mb-2">
              What's your combat level? (Must be 30+) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="combatLevel"
              name="combatLevel"
              required
              min="30"
              value={formData.combatLevel}
              onChange={handleChange}
              placeholder="30"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="slayerBosses" className="block text-sm font-semibold mb-2">
              Which slayer bosses and tiers can you confidently handle? (Specify) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="slayerBosses"
              name="slayerBosses"
              required
              value={formData.slayerBosses}
              onChange={handleChange}
              rows={4}
              placeholder="List the slayer bosses and tiers you can handle"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="timeCommitment" className="block text-sm font-semibold mb-2">
              How much time can you dedicate to slayer carries weekly? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="timeCommitment"
              name="timeCommitment"
              required
              value={formData.timeCommitment}
              onChange={handleChange}
              placeholder="e.g., 10-15 hours per week"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="giveawayServers" className="block text-sm font-semibold mb-2">
              Are you currently involved with any giveaway servers that host fakepixel giveaways? (If yes, Congratulations you are not ineligible). <span className="text-red-500">*</span>
            </label>
            <select
              id="giveawayServers"
              name="giveawayServers"
              required
              value={formData.giveawayServers}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select an option</option>
              <option value="no">No</option>
              <option value="yes">Yes (Not Eligible)</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-semibold mb-2">
              Is there anything else you'd like us to know?
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information"
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
