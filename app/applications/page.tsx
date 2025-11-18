'use client'

import { Users, Code, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ApplicationsPage() {
  const applications = [
    {
      title: 'Staff Application',
      description: 'Join our team as a staff member and support our community',
      icon: <Users className="w-12 h-12" />,
      color: 'from-discord-green to-emerald-600',
      href: '/applications/helper',
      requirements: [
        'Active Discord user',
        'Good communication skills',
        'Familiar with server rules',
        'Available regularly',
      ],
    },
    {
      title: 'Developer Application',
      description: 'Help us build amazing features and tools for our community',
      icon: <Code className="w-12 h-12" />,
      color: 'from-discord-blurple to-purple-600',
      href: '/applications/developer',
      requirements: [
        'Programming experience',
        'Knowledge of web technologies',
        'Portfolio or GitHub',
        'Team player mindset',
      ],
    },
  ]

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
          {/* Header */}
          <div className="render-panel mb-6 fade-in-up">
            <h1 className="render-title mb-3">Staff Applications</h1>
            <p className="render-subtitle">
              Choose a position below and fill out the application form
            </p>
          </div>

          {/* Application Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {applications.map((app, index) => (
              <Link key={index} href={app.href}>
                <div className={`render-panel group cursor-pointer fade-in-up relative overflow-hidden border-l-4 ${app.color.includes('green') ? 'border-l-[var(--accent-green)]' : 'border-l-[var(--accent-purple)]'} hover:border-l-[var(--highlight-cyan)] transition-all duration-300`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 ${app.color.includes('green') ? 'bg-[var(--accent-green)]/20 border border-[var(--accent-green)]/30' : 'bg-[var(--accent-purple)]/20 border border-[var(--accent-purple)]/30'} rounded-xl flex items-center justify-center`}>
                        <div className={app.color.includes('green') ? 'text-[var(--accent-green)]' : 'text-[var(--accent-purple)]'}>{app.icon}</div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{app.title}</h2>
                        <p className="text-[var(--text-secondary)] text-sm">{app.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2 text-[var(--text-secondary)]">Requirements:</h3>
                      <ul className="space-y-1">
                        {app.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle className="w-4 h-4 text-[var(--accent-green)] flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="render-panel fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30 mb-3">
                  <span className="text-lg font-bold text-[var(--accent-purple)]">1</span>
                </div>
                <h3 className="font-semibold mb-1 text-[var(--text-primary)]">Submit Application</h3>
                <p className="text-[var(--text-secondary)] text-sm">Fill out the form with your details</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30 mb-3">
                  <span className="text-lg font-bold text-[var(--accent-purple)]">2</span>
                </div>
                <h3 className="font-semibold mb-1 text-[var(--text-primary)]">Review Process</h3>
                <p className="text-[var(--text-secondary)] text-sm">Our team reviews your application</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30 mb-3">
                  <span className="text-lg font-bold text-[var(--accent-purple)]">3</span>
                </div>
                <h3 className="font-semibold mb-1 text-[var(--text-primary)]">Get Response</h3>
                <p className="text-[var(--text-secondary)] text-sm">We'll contact you via Discord</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
