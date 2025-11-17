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
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-8 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <span className="text-purple-400 font-semibold text-sm">✨ Now Hiring</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            Join <span className="gradient-text">FxG</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light">
            Become part of something extraordinary
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={session ? "/dashboard" : "/auth/login"}>
              <button className="btn-primary text-lg flex items-center gap-3 mx-auto group">
                {session ? "Dashboard" : "Apply Now"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Open Roles</h2>
            <p className="text-gray-500 text-lg">Pick your path</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Staff Applications */}
            <Link href={session ? "/dashboard/applications/staff" : "/auth/login"}>
              <div className="glass-card group hover:scale-[1.02] cursor-pointer animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-green-500/50">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4">Apply for Staff</h3>
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
            <Link href={session ? "/dashboard/applications/career" : "/auth/login"}>
              <div className="glass-card group hover:scale-[1.02] cursor-pointer animate-fade-in relative overflow-hidden" style={{animationDelay: '0.1s'}}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/50">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4">Apply for Career</h3>
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
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <span className="text-purple-400 font-semibold text-sm">❓ Frequently Asked</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 leading-none">
              Got <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-xl text-gray-400 font-light">Everything you need to know about our roles</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {/* Dungeon Carry FAQ */}
            <div className="glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <button
                  onClick={() => toggleFAQ('dungeon')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Sword className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Dungeon Carry</h3>
                  </div>
                  {openFAQ === 'dungeon' ? (
                    <ChevronUp className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  )}
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 'dungeon' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-orange-400 mb-2">What is Dungeon Carrying?</h4>
                      <p className="text-gray-300">Help players complete challenging dungeons and earn rewards through skilled gameplay and teamwork.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-orange-400 mb-2">Requirements</h4>
                      <p className="text-gray-300">High skill level in dungeon mechanics, reliable availability, and excellent communication skills.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-orange-400 mb-2">What do I get?</h4>
                      <p className="text-gray-300">Competitive compensation, exclusive perks, and recognition within the community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slayer FAQ */}
            <div className="glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <button
                  onClick={() => toggleFAQ('slayer')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Slayer</h3>
                  </div>
                  {openFAQ === 'slayer' ? (
                    <ChevronUp className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  )}
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 'slayer' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-red-400 mb-2">What is Slayer?</h4>
                      <p className="text-gray-300">Elite combat specialists who help players with challenging boss fights and high-level content.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-red-400 mb-2">Requirements</h4>
                      <p className="text-gray-300">Exceptional combat skills, deep game knowledge, and ability to teach others effectively.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-red-400 mb-2">Benefits</h4>
                      <p className="text-gray-300">Premium rewards, special recognition, and access to exclusive content and events.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Helper FAQ */}
            <div className="glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <button
                  onClick={() => toggleFAQ('helper')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Helper</h3>
                  </div>
                  {openFAQ === 'helper' ? (
                    <ChevronUp className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  )}
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 'helper' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-green-400 mb-2">What do Helpers do?</h4>
                      <p className="text-gray-300">Assist community members, answer questions, and maintain a positive environment for all players.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-green-400 mb-2">Requirements</h4>
                      <p className="text-gray-300">Excellent communication skills, patience, good knowledge of server rules and mechanics.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-green-400 mb-2">Time Commitment</h4>
                      <p className="text-gray-300">Flexible schedule with consistent availability to help community members when needed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer FAQ */}
            <div className="glass-card group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <button
                  onClick={() => toggleFAQ('developer')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Developer</h3>
                  </div>
                  {openFAQ === 'developer' ? (
                    <ChevronUp className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                  )}
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 'developer' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-blue-400 mb-2">What do Developers do?</h4>
                      <p className="text-gray-300">Create plugins, websites, bots, and other technical solutions to enhance the server experience.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-blue-400 mb-2">Required Skills</h4>
                      <p className="text-gray-300">Programming experience in Java, JavaScript, Python, or other relevant languages and frameworks.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-blue-400 mb-2">Projects</h4>
                      <p className="text-gray-300">Work on exciting projects including Discord bots, web applications, and Minecraft plugins.</p>
                    </div>
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
