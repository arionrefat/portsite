'use client';

import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  delay: number;
}

export default function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  const createParticle = useCallback((id: number): Particle => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 20,
  }), []);

  useEffect(() => {
    setMounted(true);
    
    // Create initial particles
    const initialParticles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push(createParticle(i));
    }
    
    setParticles(initialParticles);
    
    // Animation loop with requestAnimationFrame for smooth performance
    let animationId: number;
    
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          
          // Wrap around screen edges
          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;
          if (newY < -5) newY = 105;
          if (newY > 105) newY = -5;
          
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      
      animationId = requestAnimationFrame(animateParticles);
    };
    
    animationId = requestAnimationFrame(animateParticles);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [createParticle]);

  if (!mounted) return null;

  return (
    <div className="particles-background">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
