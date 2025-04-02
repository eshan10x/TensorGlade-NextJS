'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { noise } from '../utils/perlin'

const WaveAnimation = ({ width = 800, height = 600 }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Initialize noise function
    noise.seed(Math.random())

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 1.5, 3.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(5, 5, 128, 128)
    
    // Materials
    const material = new THREE.MeshStandardMaterial({
      color: 0x2080ff,
      wireframe: false,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.2,
      flatShading: true,
    })
    
    // Create mesh
    const waves = new THREE.Mesh(geometry, material)
    waves.rotation.x = -Math.PI / 2
    scene.add(waves)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 5, 5)
    scene.add(directionalLight)

    // Animation variables
    let frame = 0

    // Animation loop
    const animate = () => {
      // Update wave vertices
      const positions = geometry.attributes.position.array
      const time = frame * 0.01
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 2]
        
        // Create wave effect using noise
        const scale = 1.5
        const noiseValue = noise.simplex3(x * 0.3, z * 0.3, time)
        positions[i + 1] = noiseValue * scale * 0.3
      }
      
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
      
      renderer.render(scene, camera)
      frame++
      requestAnimationFrame(animate)
    }
    
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
    }
  }, [width, height])

  return <div ref={mountRef} style={{ width, height }} />
}

export default WaveAnimation