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
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-discord-green mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Application Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for applying! We'll review your application and contact you via Discord.
          </p>
          <Link href="/dashboard" className="btn-primary inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/applications/career" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Career Applications
        </Link>

        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Slayer Carrier Application</h1>
              <p className="text-gray-400">Join our slayer carry team</p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-500 mb-2">Important Note</h3>
              <p className="text-gray-300 text-sm">
                This role requires skill, consistency, and honesty. Any misuse or failure to perform duties will result in demotion or blacklist from the carrier team.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Requirements:</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Combat Level 30+ mandatory.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Must not be part of any other server running fakepixel related giveaways strict policy.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Must follow all carrier guidelines strictly.</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-discord-dark border border-white/10 rounded-lg p-8 space-y-6">
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

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}
