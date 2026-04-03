import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Only track mouse, not touch — touch must not interfere with scrolling
    const handleMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setIsHovered(true);
    };
    const handleLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setIsHovered(false);
    };

    card.addEventListener('pointermove', handleMove);
    card.addEventListener('pointerenter', handleEnter);
    card.addEventListener('pointerleave', handleLeave);

    return () => {
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('pointerenter', handleEnter);
      card.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const inlineStyles: React.CSSProperties = {
    position: 'relative',
    touchAction: 'none',
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.06)',
  };

  if (width !== undefined) {
    inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      ref={cardRef}
      style={inlineStyles}
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-[20px]
        relative
        grid
        grid-rows-[1fr_auto]
        shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]
        p-6 md:p-8
        gap-4
        transition-transform duration-300 ease-out
        md:hover:scale-[1.02]
        ${className}
      `}
    >
      {/* Glow border overlay — only visible on hover */}
      <div
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            300px circle at ${mousePos.x}px ${mousePos.y}px,
            rgba(83, 58, 252, 0.08),
            transparent 60%
          )`,
        }}
      />
      {/* Glow border effect */}
      <div
        className="absolute inset-[-1px] rounded-[20px] pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            200px circle at ${mousePos.x}px ${mousePos.y}px,
            rgba(83, 58, 252, 0.35),
            transparent 60%
          )`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
