// src/config/waveConfig.ts

// Color configurations for the wave animation
export const waveColors = {
    primary: {
      color1: '#1e3791', // Deep blue
      color2: '#4285f4', // Lighter blue
    },
    darkMode: {
      color1: '#0f172a', // Deep navy
      color2: '#334155', // Slate
    },
    // Add more color themes as needed
  }
  
  // Animation settings
  export const waveSettings = {
    speed: 0.1,       // Base animation speed
    amplitude: 0.5,   // How tall the waves appear
    density: 128,     // Resolution of the wave grid (higher = more detailed)
    transparency: 0.9 // Opacity of the waves
  }