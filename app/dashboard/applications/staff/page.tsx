'use client'

import { Users, Code, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function StaffApplicationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <h1 className="text-4xl font-bold mb-3">Staff Applications</h1>
          <p className="text-gray-400 text-lg">
            Choose a staff position below and fill out the application form
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/applications/helper">
            <div className="bg-discord-dark border border-white/10 hover:border-discord-blurple rounded-lg p-6 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Staff Application</h2>
                  <p className="text-gray-400 text-sm">Join our staff team</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-400">Requirements:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Active Discord user
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Good communication skills
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Familiar with server rules
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-discord-blurple font-semibold text-sm">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/applications/developer">
            <div className="bg-discord-dark border border-white/10 hover:border-discord-blurple rounded-lg p-6 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Developer Application</h2>
                  <p className="text-gray-400 text-sm">Build amazing features</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-400">Requirements:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Programming experience
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Knowledge of web technologies
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                    Portfolio or GitHub
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-discord-blurple font-semibold text-sm">
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
