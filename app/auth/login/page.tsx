'use client'

import { signIn } from 'next-auth/react'
import { Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Info */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 px-4 py-2 bg-discord-blurple/20 rounded-full border border-discord-blurple/30">
              <span className="text-discord-blurple font-semibold">🚀 Join Our Team</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="gradient-text">FxG</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Sign in with Discord to start your application journey and become part of our amazing community.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-discord-green flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Quick & Secure</h3>
                  <p className="text-gray-400">Sign in safely with your Discord account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-discord-blurple flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Track Applications</h3>
                  <p className="text-gray-400">Monitor your application status in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-discord-fuchsia flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-lg">Join the Team</h3>
                  <p className="text-gray-400">Be part of an active and supportive community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="render-panel p-10 text-center fade-in-up">
            <div className="w-20 h-20 bg-[var(--accent-purple)]/20 rounded-xl flex items-center justify-center border border-[var(--accent-purple)]/30 mx-auto mb-6">
              <Shield className="w-10 h-10 text-[var(--accent-purple)]" />
            </div>
            
            <h2 className="render-title mb-4">Sign In</h2>
            <p className="render-subtitle mb-8">
              Connect your Discord account to continue
            </p>
            
            <button
              onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
              className="btn-render-primary w-full flex items-center justify-center gap-3 text-lg py-4 mb-6"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Sign in with Discord
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/" className="text-discord-blurple hover:underline">
                  Learn more about FxG
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
