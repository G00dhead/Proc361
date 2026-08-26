import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'left' | 'right';
  className?: string;
  width?: string;
  title?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  align = 'center',
  className = '',
  width = 'w-60',
  title
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClass = () => {
    if (position === 'bottom') {
      if (align === 'right') return 'top-full right-0 mt-2';
      if (align === 'left') return 'top-full left-0 mt-2';
      return 'top-full left-1/2 -translate-x-1/2 mt-2';
    }
    if (position === 'top') {
      if (align === 'right') return 'bottom-full right-0 mb-2';
      if (align === 'left') return 'bottom-full left-0 mb-2';
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
    if (position === 'left') return 'right-full top-1/2 -translate-y-1/2 mr-2';
    if (position === 'right') return 'left-full top-1/2 -translate-y-1/2 ml-2';
    return 'top-full left-1/2 -translate-x-1/2 mt-2';
  };

  const getArrowClass = () => {
    if (position === 'bottom') {
      if (align === 'right') return 'bottom-full right-4 border-b-slate-950 border-x-transparent border-t-transparent border-4';
      if (align === 'left') return 'bottom-full left-4 border-b-slate-950 border-x-transparent border-t-transparent border-4';
      return 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-950 border-x-transparent border-t-transparent border-4';
    }
    if (position === 'top') {
      if (align === 'right') return 'top-full right-4 border-t-slate-950 border-x-transparent border-b-transparent border-4';
      if (align === 'left') return 'top-full left-4 border-t-slate-950 border-x-transparent border-b-transparent border-4';
      return 'top-full left-1/2 -translate-x-1/2 border-t-slate-950 border-x-transparent border-b-transparent border-4';
    }
    if (position === 'left') return 'left-full top-1/2 -translate-y-1/2 border-l-slate-950 border-y-transparent border-r-transparent border-4';
    if (position === 'right') return 'right-full top-1/2 -translate-y-1/2 border-r-slate-950 border-y-transparent border-l-transparent border-4';
    return 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-950 border-x-transparent border-t-transparent border-4';
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          role="tooltip"
          className={`absolute z-[100] ${getPositionClass()} ${width} max-w-[calc(100vw-32px)] p-2.5 bg-slate-950 text-white text-xs rounded-xl shadow-2xl pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 select-none border border-slate-800 break-words`}
        >
          {title && (
            <div className="font-bold text-white text-xs mb-1 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>{title}</span>
            </div>
          )}
          <div className="leading-relaxed font-normal text-slate-300 text-[11px]">
            {content}
          </div>
          <div className={`absolute w-0 h-0 ${getArrowClass()}`} />
        </div>
      )}
    </div>
  );
};

