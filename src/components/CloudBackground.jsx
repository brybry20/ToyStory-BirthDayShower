import React from 'react';
import { Star, Sparkles } from 'lucide-react';

// Andy's Room Iconic Cloud Shape (SVG path reproducing the classic silhouette)
export function AndyCloud({ className = "", style = {}, size = 120, opacity = 0.9 }) {
  return (
    <svg
      viewBox="0 0 170 100"
      width={size}
      height={(size * 100) / 170}
      className={`andy-cloud-svg ${className}`}
      style={{ opacity, ...style }}
      fill="currentColor"
    >
      {/* Cloud Base & Puffs */}
      <path
        d="M 30,75 
           L 140,75 
           A 22,22 0 0,0 152,38 
           A 28,28 0 0,0 115,22 
           A 36,36 0 0,0 52,28 
           A 24,24 0 0,0 20,55 
           A 18,18 0 0,0 30,75 Z"
        fill="#ffffff"
      />
      {/* Soft Bottom Shadow for Cartoon 3D Look */}
      <path
        d="M 30,75 
           L 140,75 
           A 22,22 0 0,0 152,65 
           C 130,70 50,70 30,75 Z"
        fill="#e1effe"
      />
    </svg>
  );
}

export default function CloudBackground({ animated = true }) {
  // Pre-configured cloud positions for a rich wallpaper look
  const staticClouds = [
    { top: '6%', left: '8%', size: 140, opacity: 0.88 },
    { top: '14%', right: '12%', size: 170, opacity: 0.92 },
    { top: '28%', left: '25%', size: 120, opacity: 0.85 },
    { top: '42%', right: '28%', size: 160, opacity: 0.9 },
    { top: '56%', left: '10%', size: 150, opacity: 0.87 },
    { top: '70%', right: '8%', size: 180, opacity: 0.93 },
    { top: '82%', left: '32%', size: 130, opacity: 0.85 },
    { top: '92%', right: '35%', size: 150, opacity: 0.88 },
  ];

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      aria-hidden="true"
    >
      {/* Static Andy Wallpaper Pattern Clouds */}
      {staticClouds.map((cloud, i) => (
        <div
          key={`static-cloud-${i}`}
          style={{
            position: 'absolute',
            top: cloud.top,
            left: cloud.left,
            right: cloud.right,
            zIndex: 1,
            filter: 'drop-shadow(0 8px 12px rgba(18, 64, 110, 0.12))',
          }}
        >
          <AndyCloud size={cloud.size} opacity={cloud.opacity} />
        </div>
      ))}

      {/* Gently Drifting Foreground Clouds */}
      {animated && (
        <>
          <div
            className="animate-drift-slow"
            style={{
              position: 'absolute',
              top: '18%',
              zIndex: 2,
              filter: 'drop-shadow(0 12px 18px rgba(15, 60, 105, 0.15))',
            }}
          >
            <AndyCloud size={210} opacity={0.95} />
          </div>

          <div
            className="animate-drift-mid"
            style={{
              position: 'absolute',
              top: '48%',
              animationDelay: '-12s',
              zIndex: 2,
              filter: 'drop-shadow(0 10px 16px rgba(15, 60, 105, 0.14))',
            }}
          >
            <AndyCloud size={160} opacity={0.9} />
          </div>

          <div
            className="animate-drift-fast"
            style={{
              position: 'absolute',
              top: '74%',
              animationDelay: '-20s',
              zIndex: 2,
              filter: 'drop-shadow(0 14px 20px rgba(15, 60, 105, 0.16))',
            }}
          >
            <AndyCloud size={190} opacity={0.92} />
          </div>
        </>
      )}

      {/* Subtle Toy Stars floating in background */}
      <div
        className="animate-twinkle"
        style={{
          position: 'absolute',
          top: '10%',
          left: '48%',
          opacity: 0.7,
        }}
      >
        <Sparkles size={22} color="#ffd000" />
      </div>
      <div
        className="animate-twinkle"
        style={{
          position: 'absolute',
          top: '38%',
          right: '18%',
          animationDelay: '1.2s',
          opacity: 0.8,
        }}
      >
        <Star size={24} fill="#ffffff" color="#ffffff" />
      </div>
      <div
        className="animate-twinkle"
        style={{
          position: 'absolute',
          top: '65%',
          left: '15%',
          animationDelay: '0.7s',
          opacity: 0.65,
        }}
      >
        <Sparkles size={20} color="#ffd000" />
      </div>
    </div>
  );
}
