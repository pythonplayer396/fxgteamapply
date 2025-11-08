'use client'

import { Swords, Shield, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CareerApplicationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <h1 className="text-4xl font-bold mb-3">Career Applications</h1>
          <p className="text-gray-400 text-lg">
            Choose a carrier position below and fill out the application form
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/applications/career/slayer">
            <div className="bg-discord-dark border border-white/10 hover:border-red-500 rounded-lg p-6 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Swords className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Slayer Carrier</h2>
                  <p className="text-gray-400 text-sm">Handle slayer carries</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-400">Requirements:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    Combat Level 30+ mandatory
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    Not part of other giveaway servers
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    Follow carrier guidelines strictly
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/applications/career/dungeon">
            <div className="bg-discord-dark border border-white/10 hover:border-blue-500 rounded-lg p-6 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Dungeon Carrier</h2>
                  <p className="text-gray-400 text-sm">Handle dungeon carries</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-400">Requirements:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Catacombs level 18+
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    Proficiency in 2+ classes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    F5–F7 & master floors experience
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-blue-500 font-semibold text-sm">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
