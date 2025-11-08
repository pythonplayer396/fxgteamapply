'use client'

import Link from 'next/link'
import { ArrowRight, Users, Code, Shield, Zap, Award, CheckCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

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

    </div>
  )
}
