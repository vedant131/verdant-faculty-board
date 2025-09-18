import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({ 
  value, 
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration },
    onFrame: ({ number }) => {
      setDisplayValue(number);
    }
  });

  return (
    <animated.span className={className}>
      {prefix}
      {displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </animated.span>
  );
}