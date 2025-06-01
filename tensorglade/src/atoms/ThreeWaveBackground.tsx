'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ThreeWaveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()

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

    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    containerRef.current.appendChild(renderer.domElement)

    const particleGeometry = new THREE.BufferGeometry()
    const width = 400
    const height = 110
    const spacing = 0.4

    const positions = []
    const colors = []
    const sizes = [] 
    const originalY: number[] = []

    // Color settings
    const colorStart = new THREE.Color('#FF7518') 
    const colorEnd = new THREE.Color('#ffb347')  
    const tempColor = new THREE.Color()

    // Improved symmetrical pattern settings
    const centerX = 0.5 // Center point (50% from left)
    const maxSize = 0.6  // Size at the edges
    const minSize = 0.1  // Reduced size in the middle section
    
    // Create a symmetrical density pattern
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

        // Calculate relative position for size and density adjustments
        const percentAcross = i / width
        
        // Calculate distance from center (0 at center, 1 at edges)
        const distFromCenter = Math.abs(percentAcross - centerX) * 2 // 0->1 scale
        
        // Create a symmetrical skip pattern
        // Skip more particles near the center, fewer at the edges
        if (distFromCenter < 0.7) { // Within 70% distance from center
          const skipProbability = 0.7 * (1 - distFromCenter / 0.7)
          if (Math.random() < skipProbability) {
            continue; // Skip this particle
          }
        }
        
        // Set particle size based on distance from center (symmetrical)
        let particleSize = maxSize;
        
        if (distFromCenter < 0.7) {
          // Create a U-shaped curve for size (smallest in the middle, largest at edges)
          // Linear interpolation between min and max size based on distance from center
          particleSize = minSize + (maxSize - minSize) * (distFromCenter / 0.7);
        }
        
        positions.push(x, y, z)
        originalY.push(y)
        sizes.push(particleSize)

        // Color gradient from orange to light orange based on position
        // Make this symmetrical too by using distance from center
        const ratio = (distFromCenter + j / height) / 2 // Blend distance and height factors
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
    
    particleGeometry.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(sizes, 1)
    )

    // Material with custom shader to handle varying sizes
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        pointTexture: { value: createSquareTexture() }
      },
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        
        varying vec3 vColor;
        
        void main() {
          gl_FragColor = vec4(vColor, 0.8) * texture2D(pointTexture, gl_PointCoord);
        }
      `
    });

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
      return new THREE.Texture();
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

        // Add time-based animation - ensure it's symmetrical
        const moveFactor = Math.sin(elapsedTime * 0.5 + Math.abs(x) * 0.5 + Math.abs(z) * 0.5)

        // Add scroll interaction with symmetrical pattern
        positions[iy] = baseY + moveFactor * 0.5 + Math.cos(scrollFactor * 5 + Math.abs(x) * 0.2) * scrollFactor * 3
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
      particleMaterial.dispose()
      
      if (particleMaterial.uniforms.pointTexture.value) {
        particleMaterial.uniforms.pointTexture.value.dispose()
      }

      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute w-full h-full -z-10"
    />
  )
}

export default ThreeWaveBackground