'use client'

import Link from 'next/link'
import { ArrowRight, Users, Code, Shield, Zap, Award, CheckCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-8 px-6 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
            <span className="text-blue-600 font-semibold text-sm">Now Accepting Applications</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Join <span className="gradient-text">FxG</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Apply to become part of our team
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard" : "/auth/login"}>
              <button className="btn-primary ripple-effect text-lg flex items-center gap-2 mx-auto">
                {session ? "Dashboard" : "Apply Now"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Positions</h2>
            <p className="text-gray-600">Choose your role</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Helper Position */}
            <div className="glass-card group hover:scale-105 cursor-pointer animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Helper</h3>
              <p className="text-gray-600 mb-6">
                Support community members
              </p>

              <Link href={session ? "/dashboard/applications/helper" : "/auth/login"}>
                <button className="btn-primary w-full ripple-effect">Apply</button>
              </Link>
            </div>

            {/* Developer Position */}
            <div className="glass-card group hover:scale-105 cursor-pointer animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Developer</h3>
              <p className="text-gray-600 mb-6">
                Build Discord features
              </p>

              <Link href={session ? "/dashboard/applications/developer" : "/auth/login"}>
                <button className="btn-primary w-full ripple-effect">Apply</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
