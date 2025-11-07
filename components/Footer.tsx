import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Copyright */}
        <div className="text-center text-gray-600">
          <p className="flex items-center justify-center gap-2 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by FxG Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
