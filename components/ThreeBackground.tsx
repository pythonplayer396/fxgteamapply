'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let particles: THREE.Points

    try {
      // Scene setup
      scene = new THREE.Scene()

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 5

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      mountRef.current.appendChild(renderer.domElement)

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 500 // Reduced for better performance

      const posArray = new Float32Array(particlesCount * 3)
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

      // Create material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.6,
      })

      // Create mesh
      particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)

        if (particles) {
          particles.rotation.x += 0.0005
          particles.rotation.y += 0.0005
        }

        renderer.render(scene, camera)
      }

      animate()

      // Handle scroll for zoom effect
      const handleScroll = () => {
        const scrollY = window.scrollY
        const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
        const scrollProgress = Math.min(scrollY / maxScroll, 1)
        
        if (camera) {
          camera.position.z = 5 + scrollProgress * 3
        }
      }

      // Handle resize
      const handleResize = () => {
        if (camera && renderer) {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
        }
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement)
        }
        
        renderer.dispose()
        particlesGeometry.dispose()
        particlesMaterial.dispose()
      }
    } catch (error) {
      console.error('Three.js error:', error)
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  )
}
