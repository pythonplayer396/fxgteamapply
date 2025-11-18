'use client'

import { Swords, Shield, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CareerApplicationsPage() {
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

        <div className="max-w-6xl mx-auto w-full">
          <Link href="/dashboard" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors fade-in-up">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
          <div className="render-panel mb-6 fade-in-up" style={{animationDelay: '0.1s'}}>
            <h1 className="render-title mb-3">Career Applications</h1>
            <p className="render-subtitle">
            Choose a carrier position below and fill out the application form
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/applications/career/slayer">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[#FF1744] hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{animationDelay: '0.2s'}}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1744]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#FF1744]/20 rounded-xl flex items-center justify-center border border-[#FF1744]/30">
                      <Swords className="w-8 h-8 text-[#FF1744]" />
                </div>
                <div>
                      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Slayer Carrier</h2>
                      <p className="text-[var(--text-secondary)] text-sm">Handle slayer carries</p>
                </div>
              </div>
              
              <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2 text-[var(--text-secondary)]">Requirements:</h3>
                <ul className="space-y-1">
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF1744] flex-shrink-0" />
                    Combat Level 30+ mandatory
                  </li>
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF1744] flex-shrink-0" />
                    Not part of other giveaway servers
                  </li>
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF1744] flex-shrink-0" />
                    Follow carrier guidelines strictly
                  </li>
                </ul>
              </div>

                  <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Apply Now
                <ArrowRight className="w-4 h-4" />
                  </div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/applications/career/dungeon">
              <div className="render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 border-l-[#FF6B35] hover:border-l-[var(--highlight-cyan)] transition-all duration-300" style={{animationDelay: '0.3s'}}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center border border-[#FF6B35]/30">
                      <Shield className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <div>
                      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Dungeon Carrier</h2>
                      <p className="text-[var(--text-secondary)] text-sm">Handle dungeon carries</p>
                </div>
              </div>
              
              <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2 text-[var(--text-secondary)]">Requirements:</h3>
                <ul className="space-y-1">
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                    Catacombs level 18+
                  </li>
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                    Proficiency in 2+ classes
                  </li>
                      <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                    F5–F7 & master floors experience
                  </li>
                </ul>
              </div>

                  <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Apply Now
                <ArrowRight className="w-4 h-4" />
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
