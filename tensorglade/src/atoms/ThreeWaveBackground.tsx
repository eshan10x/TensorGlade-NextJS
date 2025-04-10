// src/atoms/ThreeWaveBackground.tsx
'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ThreeWaveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ffffff')

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 30)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Clear existing content and append renderer
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    containerRef.current.appendChild(renderer.domElement)

    // Create a grid of particles
    const particleGeometry = new THREE.BufferGeometry()
    const width = 500
    const height = 80
    const spacing = 0.4

    const positions = []
    const colors = []
    const originalY: number[] = []

    const colorStart = new THREE.Color('#FF7518') // Deep blue
    const colorEnd = new THREE.Color('#ffb347')   // Teal/green
    const tempColor = new THREE.Color()

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        // Position in a grid pattern
        const x = (i - width / 2) * spacing
        const z = (j - height / 2) * spacing

        // Create an initial wave pattern for y-position
        const distance = Math.sqrt(x * x + z * z)
        const amplitude = 2.5
        const frequency = 0.15
        const y = Math.sin(distance * frequency) * amplitude

        positions.push(x, y, z)
        originalY.push(y)

        // Color gradient from blue to green based on position
        const ratio = (i + j) / (width + height)
        tempColor.copy(colorStart).lerp(colorEnd, ratio)
        colors.push(tempColor.r, tempColor.g, tempColor.b)
      }
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    particleGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    )

    // Material for particle tensors (small squares)
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      // Use a square texture instead of the default round
      map: createSquareTexture(),
      depthWrite: false,
    })

    // Create our square tensor texture
    function createSquareTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const context = canvas.getContext('2d')

      if (context) {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, 128, 128)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
      }

      // Fallback if canvas isn't supported
      return null
    }

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      // Removed unused shaderMaterial reference
    }

    window.addEventListener('resize', handleResize)

    // Scroll handler for animating the waves based on scroll position
    let scrollY = 0
    let targetScrollY = 0

    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth scroll transition
      scrollY += (targetScrollY - scrollY) * 0.05

      // Calculate normalized scroll value for animation effects
      const scrollFactor = Math.min(scrollY / 1000, 1)

      // Rotate particles slightly based on scroll
      particles.rotation.x = scrollFactor * -0.5
      particles.rotation.z = scrollFactor * 0.2

      // Update particle positions for wave animation
      const positions = particleGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length / 3; i++) {
        const ix = i * 3
        const iy = i * 3 + 1
        const iz = i * 3 + 2

        const x = positions[ix]
        const z = positions[iz]

        // Original wave position
        const baseY = originalY[i]

        // Add time-based animation
        const moveFactor = Math.sin(elapsedTime * 0.5 + x * 0.5 + z * 0.5)

        // Add scroll interaction
        positions[iy] = baseY + moveFactor * 0.5 + Math.cos(scrollFactor * 5 + x * 0.2) * scrollFactor * 3
      }

      particleGeometry.attributes.position.needsUpdate = true

      // Render
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose();
      (particleMaterial.map as THREE.CanvasTexture)?.dispose()

      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  )
}

export default ThreeWaveBackground