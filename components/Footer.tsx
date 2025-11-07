import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-purple-500 fill-purple-500 animate-pulse" /> by FxG Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
