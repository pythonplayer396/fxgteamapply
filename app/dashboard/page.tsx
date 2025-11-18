'use client'

import { Users, Code, FileText, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function DashboardHome() {
  const { data: session } = useSession()

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
              <div className="w-3 h-3 bg-[var(--accent-green)] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-semibold">Quick Access</span>
            </div>
            <div className="text-sm text-gray-400">Manage your applications</div>
          </div>

          <div className="floating-panel absolute top-32 right-96 w-84 h-40 render-panel opacity-80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-[var(--accent-purple)] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-semibold">Dashboard</span>
            </div>
            <div className="text-sm text-gray-400">Track your progress</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Welcome Header */}
          <div className="mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-full mb-8">
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Dashboard</span>
            </div>
            
            <h1 className="render-title text-[var(--text-primary)] mb-6 leading-tight">
              <div>Welcome back,</div>
              <div className="pl-8">
                <span style={{color: 'var(--accent-purple)'}}>{session?.user?.name || 'User'}</span>
              </div>
            </h1>
            
            <p className="render-subtitle mb-12 max-w-lg">
              Manage your applications and track your progress with our team.
            </p>
          </div>

        {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 max-w-4xl fade-in-up" style={{animationDelay: '0.1s'}}>
          <Link href="/dashboard/profile">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[var(--accent-purple)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-purple)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative text-center">
                  <User className="w-8 h-8 text-[var(--accent-purple)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-[var(--text-primary)]">Profile</h3>
                </div>
            </div>
          </Link>

          <Link href="/dashboard/status">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[var(--accent-cyan)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{animationDelay: '0.2s'}}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative text-center">
                  <FileText className="w-8 h-8 text-[var(--accent-cyan)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-[var(--text-primary)]">Applications</h3>
                </div>
            </div>
          </Link>

            <Link href="/">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[var(--accent-green)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{animationDelay: '0.3s'}}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-green)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative text-center">
                  <ArrowRight className="w-8 h-8 text-[var(--accent-green)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-[var(--text-primary)]">Home</h3>
                </div>
            </div>
            </Link>
        </div>

        {/* Application Options */}
          <div className="mb-10 fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="render-title text-center mb-4">Choose Application Type</h2>
            <p className="render-subtitle text-center">Pick your path</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Staff Applications */}
          <Link href="/dashboard/applications/staff">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[var(--accent-green)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-green)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[var(--accent-green)] rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Staff Team</span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">2 Roles</div>
                </div>
                
                  <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">Apply for Staff</h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    Join our staff team as Helper or Developer. Build the community and create amazing experiences.
                </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="text-xs bg-[var(--accent-green)]/20 text-[var(--accent-green)] px-2 py-1 rounded">Helper</span>
                      <span className="text-xs bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] px-2 py-1 rounded">Developer</span>
                    </div>
                    <div className="flex items-center text-[var(--accent-cyan)] font-medium group-hover:translate-x-1 transition-transform">
                      Apply <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Career Applications */}
          <Link href="/dashboard/applications/career">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[#FF6B35] hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{animationDelay: '0.1s'}}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Career Team</span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">2 Roles</div>
                </div>
                
                  <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">Apply for Career</h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    Join as Slayer or Dungeon Carrier. Elite combat specialists with premium rewards.
                </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="text-xs bg-[#FF1744]/20 text-[#FF1744] px-2 py-1 rounded">Slayer</span>
                      <span className="text-xs bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-1 rounded">Dungeon Carry</span>
                    </div>
                    <div className="flex items-center text-[var(--accent-cyan)] font-medium group-hover:translate-x-1 transition-transform">
                      Apply <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      </section>
    </div>
  )
}
