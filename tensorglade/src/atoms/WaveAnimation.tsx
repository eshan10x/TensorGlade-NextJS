// src/components/ThreeWaveBackground.tsx
'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ThreeWaveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 5)
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    // Clear existing content and append the renderer
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    containerRef.current.appendChild(renderer.domElement)
    
    // Create the wave geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128)
    
    // Shader materials
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2() },
        u_color1: { value: new THREE.Color('#FF7518') }, // Deep blue
        u_color2: { value: new THREE.Color('#4285f4') }, // Lighter blue
      },
      vertexShader: `
        uniform float u_time;
        
        varying vec2 vUv;
        varying float vElevation;
        
        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                           + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vUv = uv;
          
          // Calculate multiple noise values at different frequencies
          float noise1 = snoise(vUv * 3.0 + u_time * 0.1) * 0.5;
          float noise2 = snoise(vUv * 6.0 - u_time * 0.15) * 0.25;
          float noise3 = snoise(vUv * 12.0 + u_time * 0.05) * 0.125;
          
          // Combine noise values
          vElevation = noise1 + noise2 + noise3;
          
          // Apply elevation to vertex
          vec3 newPosition = position;
          newPosition.z += vElevation * 0.5;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Gradient based on elevation
          float mixFactor = (vElevation + 0.5) * 0.5; // Normalize to 0-1 range
          vec3 color = mix(u_color1, u_color2, mixFactor);
          
          // Add more brightness where elevation is higher
          color += vec3(0.1, 0.1, 0.2) * mixFactor;
          
          gl_FragColor = vec4(color, 0.9); // Slight transparency
        }
      `,
      transparent: true,
    })
    
    // Create the mesh
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 3
    scene.add(mesh)
    
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      material.uniforms.u_resolution.value.set(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.u_time.value = elapsedTime
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden"
    />
  )
}

export default ThreeWaveBackground