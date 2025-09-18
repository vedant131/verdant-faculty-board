import { ReactNode, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  floatIntensity?: number;
}

export function FloatingCard({ children, className = "", floatIntensity = 1 }: FloatingCardProps) {
  const [hovered, setHovered] = useState(false);

  const { transform, shadow } = useSpring({
    transform: hovered 
      ? `translateY(-${8 * floatIntensity}px) scale(1.02)` 
      : 'translateY(0px) scale(1)',
    shadow: hovered 
      ? `0 ${20 * floatIntensity}px ${40 * floatIntensity}px rgba(0, 0, 0, 0.1)` 
      : '0 4px 8px rgba(0, 0, 0, 0.05)',
    config: { mass: 1, tension: 300, friction: 30 }
  });

  return (
    <animated.div
      className={className}
      style={{ transform, boxShadow: shadow }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </animated.div>
  );
}

interface PulseEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export function PulseEffect({ children, className = "", color = "rgb(34, 197, 94)", intensity = 1 }: PulseEffectProps) {
  const [active, setActive] = useState(false);

  const { scale, glow } = useSpring({
    scale: active ? 1 + (0.05 * intensity) : 1,
    glow: active ? `0 0 ${20 * intensity}px ${color}` : '0 0 0px transparent',
    config: { mass: 1, tension: 400, friction: 30 }
  });

  return (
    <animated.div
      className={className}
      style={{ 
        transform: scale.to(s => `scale(${s})`),
        boxShadow: glow
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
    </animated.div>
  );
}

interface RippleEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function RippleEffect({ children, className = "", color = "rgba(34, 197, 94, 0.3)" }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute animate-ping rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: color,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
}