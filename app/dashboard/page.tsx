'use client'

import { Users, Code, FileText, User, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function DashboardHome() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-3">
            Welcome back, <span className="gradient-text">{session?.user?.name || 'User'}</span>
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 max-w-4xl mx-auto">
          <Link href="/dashboard/profile">
            <div className="glass-card p-5 hover:scale-105 transition-all cursor-pointer group text-center">
              <User className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Profile</h3>
            </div>
          </Link>

          <Link href="/dashboard/status">
            <div className="glass-card p-5 hover:scale-105 transition-all cursor-pointer group text-center">
              <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Applications</h3>
            </div>
          </Link>

          <a href="/">
            <div className="glass-card p-5 hover:scale-105 transition-all cursor-pointer group text-center">
              <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Home</h3>
            </div>
          </a>
        </div>

        {/* Application Options */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black">Choose Application Type</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Staff Applications */}
          <Link href="/dashboard/applications/staff">
            <div className="glass-card p-8 hover:scale-[1.02] transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-green-500/50">
                  <Users className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-black mb-4">Apply for Staff</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Join our staff team as Helper or Developer
                </p>

                <div className="flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                  View Positions <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          </Link>

          {/* Career Applications */}
          <Link href="/dashboard/applications/career">
            <div className="glass-card p-8 hover:scale-[1.02] transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/50">
                  <Code className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-black mb-4">Apply for Career</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Join as Slayer or Dungeon Carrier
                </p>

                <div className="flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                  View Positions <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
