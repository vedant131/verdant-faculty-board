interface EcoLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GrowingTreeLoader({ size = 'md', className = "" }: EcoLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        {/* Tree trunk */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-amber-700 animate-pulse"
             style={{ height: '40%', animationDelay: '0s' }} />
        
        {/* Tree leaves - growing animation */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
               style={{ animationDelay: '0.1s' }} />
        </div>
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"
               style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="absolute bottom-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-green-300 rounded-full animate-bounce"
               style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  );
}

export function RecycleSpinner({ size = 'md', className = "" }: EcoLoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <div className="absolute inset-0 animate-spin">
        <div className="w-full h-full border-2 border-transparent border-t-green-500 border-r-green-400 border-b-green-300 rounded-full" />
      </div>
      <div className="absolute inset-1 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
        <div className="w-full h-full border-2 border-transparent border-l-emerald-500 border-b-emerald-400 rounded-full" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 text-xs">
        ♻️
      </div>
    </div>
  );
}

export function LeafFallLoader({ size = 'md', className = "" }: EcoLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-12',
    md: 'w-12 h-16',
    lg: 'w-16 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden`}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full animate-bounce"
          style={{
            left: `${25 + (i * 15)}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
}

export function WaveLoader({ size = 'md', className = "" }: EcoLoaderProps) {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8'
  };

  return (
    <div className={`flex items-end space-x-1 ${sizeClasses[size]} ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-full animate-pulse"
          style={{
            width: size === 'sm' ? '3px' : size === 'md' ? '4px' : '6px',
            height: '100%',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  );
}