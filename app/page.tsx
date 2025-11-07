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
          <div className="absolute top-20 left-10 w-72 h-72 bg-discord-blurple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-discord-fuchsia/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-discord-blurple/20 rounded-full border border-discord-blurple/30">
            <span className="text-discord-blurple font-semibold">🎉 Now Accepting Applications</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Join the <span className="gradient-text">FxG Team</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Be part of an amazing Discord community. Help us create unforgettable experiences through giveaways, events, and support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard" : "/auth/login"}>
              <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto">
                {session ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="#positions">
              <button className="btn-secondary text-lg px-8 py-4">
                View Positions
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-400">Choose the role that fits you best</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Helper Position */}
            <div className="glass-card p-8 hover:border-discord-green transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Helper</h3>
              <p className="text-gray-400 mb-6">
                Support our community members, answer questions, and help maintain a positive environment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Assist community members with inquiries</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Moderate chat and enforce rules</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-green mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Help organize community events</span>
                </div>
              </div>

              <Link href={session ? "/dashboard/applications/helper" : "/auth/login"}>
                <button className="btn-primary w-full">Apply for Helper</button>
              </Link>
            </div>

            {/* Developer Position */}
            <div className="glass-card p-8 hover:border-discord-blurple transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Developer</h3>
              <p className="text-gray-400 mb-6">
                Build and maintain Discord bots, create custom features, and improve our infrastructure.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Develop Discord bots and features</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Maintain and optimize codebase</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-discord-blurple mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Collaborate on new projects</span>
                </div>
              </div>

              <Link href={session ? "/dashboard/applications/developer" : "/auth/login"}>
                <button className="btn-primary w-full">Apply for Developer</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
