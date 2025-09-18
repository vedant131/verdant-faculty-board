import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'leaf' | 'sparkle' | 'bubble';
}

interface ParticleSystemProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  types?: Array<'leaf' | 'sparkle' | 'bubble'>;
}

export function ParticleSystem({ 
  className = "", 
  particleCount = 50,
  colors = ['#90EE90', '#32CD32', '#FFD700', '#87CEEB', '#98FB98'],
  types = ['leaf', 'sparkle', 'bubble']
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const createParticle = useCallback((): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 0,
      maxLife: Math.random() * 200 + 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: types[Math.floor(Math.random() * types.length)]
    };
  }, [colors, types]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    const alpha = 1 - (particle.life / particle.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    
    switch (particle.type) {
      case 'leaf':
        // Draw leaf shape
        ctx.beginPath();
        ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 0.6, particle.life * 0.05, 0, Math.PI * 2);
        ctx.fill();
        break;
      
      case 'sparkle':
        // Draw star shape
        ctx.beginPath();
        const spikes = 4;
        const outerRadius = particle.size;
        const innerRadius = particle.size * 0.4;
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          const x = particle.x + Math.cos(angle) * radius;
          const y = particle.y + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
      
      case 'bubble':
        // Draw circle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.02; // gravity
      particle.life++;

      if (particle.life < particle.maxLife && particle.y > -10) {
        drawParticle(ctx, particle);
        return true;
      }
      return false;
    });

    // Add new particles
    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push(createParticle());
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [particleCount, createParticle, drawParticle]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}