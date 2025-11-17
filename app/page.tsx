'use client'

import Link from 'next/link'
import { ArrowRight, Users, Code, Shield, Zap, Award, CheckCircle, ChevronDown, ChevronUp, Sword, Crown, HelpCircle, Terminal } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (section: string) => {
    setOpenFAQ(openFAQ === section ? null : section)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 overflow-hidden">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 -z-10">
          <div className="render-grid"></div>
          <div className="grid-sweep"></div>
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Application Form Panels */}
        <div className="absolute inset-0 -z-5 pointer-events-none">
          {/* Panel 1 - Helper Application */}
          <div className="floating-panel absolute top-20 right-20 w-64 h-40 render-panel opacity-60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#00FF8C] rounded-full"></div>
              <span className="text-xs text-gray-400 font-medium">Helper Application</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-gray-300">Join our staff team as Helper</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Age Requirement</span>
                  <span className="text-[#00FF8C]">13+</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Microphone</span>
                  <span className="text-[#00E6F6]">Required</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Experience</span>
                  <span className="text-[#9A4DFF]">Any Level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 - Developer Application */}
          <div className="floating-panel absolute top-40 right-80 w-72 h-36 render-panel opacity-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#9A4DFF] rounded-full"></div>
              <span className="text-xs text-gray-400 font-medium">Developer Application</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-gray-300">Build the future with code</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Languages</span>
                  <span className="text-[#00E6F6]">Java, JS, Python</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Portfolio</span>
                  <span className="text-[#00FF8C]">Required</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Projects</span>
                  <span className="text-[#9A4DFF]">Bots, Plugins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3 - Dungeon Carry Application */}
          <div className="floating-panel absolute bottom-40 right-32 w-56 h-36 render-panel opacity-70">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
              <span className="text-xs text-gray-400 font-medium">Dungeon Carry</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-gray-300">Elite dungeon specialist</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Skill Level</span>
                  <span className="text-[#FF6B35]">Expert</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Availability</span>
                  <span className="text-[#00E6F6]">Flexible</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Rewards</span>
                  <span className="text-[#00FF8C]">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 4 - Slayer Application */}
          <div className="floating-panel absolute bottom-20 right-12 w-52 h-32 render-panel opacity-55">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FF1744] rounded-full"></div>
              <span className="text-xs text-gray-400 font-medium">Slayer</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-gray-300">Combat specialist</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Combat Skills</span>
                  <span className="text-[#FF1744]">Elite</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Boss Fights</span>
                  <span className="text-[#00E6F6]">Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content - Left Side */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-full mb-8">
              <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Now Hiring</span>
            </div>
            
            <h1 className="render-title text-[var(--text-primary)] mb-6">
              Join <span style={{color: 'var(--accent-purple)'}}>FakePixel x Giveaway</span> Staff Team
            </h1>
            
            <p className="render-subtitle mb-12 max-w-lg">
              Become part of something extraordinary. Build the future of gaming with our elite team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={session ? "/dashboard" : "/auth/login"}>
                <button className="btn-render-primary flex items-center gap-2">
                  {session ? "Dashboard" : "Apply Now"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="#positions">
                <button className="btn-render-secondary">
                  View Positions
                </button>
              </Link>
            </div>
          </div>

          {/* Right side - Animation space */}
          <div className="hidden lg:block relative h-96">
            {/* This space is for the floating panels which are positioned absolutely */}
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="render-title mb-4">Open Roles</h2>
            <p className="render-subtitle">Pick your path</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Staff Applications */}
            <Link href={session ? "/dashboard/applications/staff" : "/auth/login"}>
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
            <Link href={session ? "/dashboard/applications/career" : "/auth/login"}>
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

      {/* FAQ Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-full mb-8">
              <div className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Frequently Asked</span>
            </div>
            <h2 className="render-title mb-4">
              Got <span style={{color: 'var(--accent-purple)'}}>Questions?</span>
            </h2>
            <p className="render-subtitle">Everything you need to know about our roles</p>
          </div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {/* Dungeon Carry FAQ */}
            <div className="render-panel group cursor-pointer fade-in-up border-l-4 border-l-[#FF6B35] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
              <button
                onClick={() => toggleFAQ('dungeon')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                    <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Career Role</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Dungeon Carry</h3>
                </div>
                {openFAQ === 'dungeon' ? (
                  <ChevronUp className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === 'dungeon' ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4 border-t border-[var(--border-panel)] pt-6">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF6B35] mb-2 text-sm">What is Dungeon Carrying?</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Help players complete challenging dungeons and earn rewards through skilled gameplay and teamwork.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF6B35] mb-2 text-sm">Requirements</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">High skill level in dungeon mechanics, reliable availability, and excellent communication skills.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF6B35] mb-2 text-sm">What do I get?</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Competitive compensation, exclusive perks, and recognition within the community.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slayer FAQ */}
            <div className="render-panel group cursor-pointer fade-in-up border-l-4 border-l-[#FF1744] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
              <button
                onClick={() => toggleFAQ('slayer')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#FF1744] rounded-full"></div>
                    <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Career Role</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Slayer</h3>
                </div>
                {openFAQ === 'slayer' ? (
                  <ChevronUp className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === 'slayer' ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4 border-t border-[var(--border-panel)] pt-6">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF1744] mb-2 text-sm">What is Slayer?</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Elite combat specialists who help players with challenging boss fights and high-level content.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF1744] mb-2 text-sm">Requirements</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Exceptional combat skills, deep game knowledge, and ability to teach others effectively.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[#FF1744] mb-2 text-sm">Benefits</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Premium rewards, special recognition, and access to exclusive content and events.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helper FAQ */}
            <div className="render-panel group cursor-pointer fade-in-up border-l-4 border-l-[var(--accent-green)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
              <button
                onClick={() => toggleFAQ('helper')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[var(--accent-green)] rounded-full"></div>
                    <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Staff Role</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Helper</h3>
                </div>
                {openFAQ === 'helper' ? (
                  <ChevronUp className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === 'helper' ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4 border-t border-[var(--border-panel)] pt-6">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-green)] mb-2 text-sm">What do Helpers do?</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Assist community members, answer questions, and maintain a positive environment for all players.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-green)] mb-2 text-sm">Requirements</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Excellent communication skills, patience, good knowledge of server rules and mechanics.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-green)] mb-2 text-sm">Time Commitment</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Flexible schedule with consistent availability to help community members when needed.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer FAQ */}
            <div className="render-panel group cursor-pointer fade-in-up border-l-4 border-l-[var(--accent-purple)] hover:border-l-[var(--highlight-cyan)] transition-all duration-300">
              <button
                onClick={() => toggleFAQ('developer')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[var(--accent-purple)] rounded-full"></div>
                    <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Staff Role</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Developer</h3>
                </div>
                {openFAQ === 'developer' ? (
                  <ChevronUp className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === 'developer' ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-4 border-t border-[var(--border-panel)] pt-6">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-purple)] mb-2 text-sm">What do Developers do?</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Create plugins, websites, bots, and other technical solutions to enhance the server experience.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-purple)] mb-2 text-sm">Required Skills</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Programming experience in Java, JavaScript, Python, or other relevant languages and frameworks.</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded border border-[var(--border-subtle)]">
                    <h4 className="font-semibold text-[var(--accent-purple)] mb-2 text-sm">Projects</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Work on exciting projects including Discord bots, web applications, and Minecraft plugins.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
