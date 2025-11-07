'use client'

import { Users, Code, FileText, User, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function DashboardHome() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome back, <span className="gradient-text">{session?.user?.name || 'User'}</span>
          </h1>
          <p className="text-xl text-gray-400">Ready to start your application journey?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/dashboard/profile">
            <div className="glass-card p-6 hover:border-discord-blurple transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-discord-blurple/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6 text-discord-blurple" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Profile</h3>
                  <p className="text-sm text-gray-400">View your info</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/status">
            <div className="glass-card p-6 hover:border-discord-green transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-discord-green/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-discord-green" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Applications</h3>
                  <p className="text-sm text-gray-400">Track status</p>
                </div>
              </div>
            </div>
          </Link>

          <a href="/">
            <div className="glass-card p-6 hover:border-discord-fuchsia transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-discord-fuchsia/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6 text-discord-fuchsia" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Home</h3>
                  <p className="text-sm text-gray-400">Back to main</p>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Application Options */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Available Positions</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Helper Application */}
          <div className="glass-card p-8 hover:border-discord-green transition-all group">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Helper</h2>
                <p className="text-gray-400">Join our support team and help community members</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Assist members with questions and issues</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Moderate chat and enforce community rules</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Help organize and run community events</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Be active and friendly in the community</span>
              </div>
            </div>

            <Link href="/dashboard/applications/helper">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Apply for Helper
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Developer Application */}
          <div className="glass-card p-8 hover:border-discord-blurple transition-all group">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Code className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Developer</h2>
                <p className="text-gray-400">Build and maintain our Discord infrastructure</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Develop Discord bots and custom features</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Maintain and optimize existing codebase</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Collaborate on innovative new projects</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Experience with JavaScript/TypeScript preferred</span>
              </div>
            </div>

            <Link href="/dashboard/applications/developer">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Apply for Developer
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
