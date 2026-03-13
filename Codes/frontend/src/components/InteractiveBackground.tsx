import React from 'react';
import './InteractiveBackground.css';

interface InteractiveBackgroundProps {
  /** 'dashboard' = 4 scrolling hand-gesture strips on warm beige
   *  'default'   = soft gradient blend of the 3 theme colors */
  variant?: 'dashboard' | 'default';
}

// ── Strip data ───────────────────────────────────────────────────────────────
// Each strip has a colour tone, scroll direction, and its own mix of gestures.
const strips = [
  {
    id: 'strip-1',
    direction: 'ltr' as const,
    tone: 'orange',
    gestures: ['✋', '🤟', '☝️', '✌️', '🤙', '👋', '🖐️', '🤚', '🫶', '🤲', '👐', '🙌'],
  },
  {
    id: 'strip-2',
    direction: 'rtl' as const,
    tone: 'green',
    gestures: ['🤞', '👆', '🖖', '🤘', '👍', '🤜', '🤝', '☝️', '🫵', '🫱', '🫲', '🤏'],
  },
  {
    id: 'strip-3',
    direction: 'ltr' as const,
    tone: 'orange',
    gestures: ['👌', '🤏', '✋', '🤘', '🤙', '🖕', '✌️', '🤞', '🫳', '🫴', '🖐️', '🤚'],
  },
  {
    id: 'strip-4',
    direction: 'rtl' as const,
    tone: 'green',
    gestures: ['🖐️', '👋', '🤟', '☝️', '🤚', '🖖', '👆', '🤜', '🫷', '🫸', '🤲', '👐'],
  },
];

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  variant = 'dashboard',
}) => {
  if (variant === 'default') {
    return <div className="bg-container bg-default" />;
  }

  return (
    <div className="bg-container bg-dashboard">
      {/* Subtle grid texture */}
      <div className="bg-mesh" />

      {/* 4 scrolling strips */}
      <div className="strips-wrapper">
        {strips.map((strip) => {
          // Repeat 3× so the seam is invisible during loop
          const symbols = [...strip.gestures, ...strip.gestures, ...strip.gestures];
          return (
            <div key={strip.id} className={`strip-track strip-${strip.tone}`}>
              <div
                className={`strip-inner ${
                  strip.direction === 'rtl' ? 'scroll-rtl' : 'scroll-ltr'
                }`}
              >
                {symbols.map((sym, i) => (
                  <span key={i} className="gesture-symbol">
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Soft ambient glow blobs */}
      <div className="ambient-cast cast-top" />
      <div className="ambient-cast cast-bottom" />
    </div>
  );
};

export default InteractiveBackground;
