import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Star } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function RopeClimber() {
  const { scrollYProgress, scrollY } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const [speechText, setSpeechText] = useState('Climb with Andy!');

  // Smooth out scroll progression for fluid climbing
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  // Calculate top percentage from 8% (near top ceiling) to 84% (near floor)
  const climberTop = useTransform(smoothY, [0, 1], ['8%', '84%']);

  // Dynamic swinging rotation based on scroll movement
  const scrollVelocity = useVelocity(scrollY);
  const climberRotate = useTransform(scrollVelocity, [-2000, 0, 2000], [-18, 0, 18]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const pct = Math.round(latest * 100);
      setScrollPercent(pct);

      if (pct < 15) {
        setSpeechText("Let's go, partners!");
      } else if (pct < 35) {
        setSpeechText("Rappelling Andy's wall!");
      } else if (pct < 60) {
        setSpeechText("Entering the celebration!");
      } else if (pct < 85) {
        setSpeechText("Welcoming our Baby Boy!");
      } else {
        setSpeechText("To Infinity and Beyond!");
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleClimberTap = () => {
    soundEffects.playTeddySqueak();
    setIsSwinging(true);
    setTimeout(() => setIsSwinging(false), 1200);
  };

  return (
    <aside
      className="rope-climber-aside"
      aria-label="Toy Story Rope Climbing Scroll Animation"
      style={{
        position: 'fixed',
        top: 0,
        right: 'clamp(8px, 2.5vw, 36px)',
        bottom: 0,
        width: '80px',
        zIndex: 8500,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 1. TOP CEILING ANCHOR: Golden Sheriff Star Peg */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onClick={handleClimberTap}
        title="Andy's Climbing Rope"
      >
        {/* Star Pin */}
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'radial-gradient(circle, #ffe66d 0%, #ffd000 65%, #d97706 100%)',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Star size={16} fill="#78350f" color="#78350f" />
        </div>
        {/* Wooden Coiled Hook */}
        <div
          style={{
            width: '10px',
            height: '14px',
            background: '#8c5324',
            borderRadius: '3px',
            border: '1px solid #5a3212',
            marginTop: '-2px',
          }}
        />
      </div>

      {/* 2. THE VERTICAL KNOTTED CLIMBING ROPE */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          bottom: '10px',
          width: '8px',
          background: 'repeating-linear-gradient(180deg, #d4a373 0px, #e7bfa0 4px, #bc8a5f 8px, #a3704c 12px)',
          borderRadius: '4px',
          boxShadow: '2px 0 6px rgba(0, 0, 0, 0.35), inset 1px 0 1px rgba(255, 255, 255, 0.4)',
          zIndex: 4,
        }}
      >
        {/* Knots placed along the rope */}
        {[10, 22, 35, 48, 62, 75, 88].map((topPos) => (
          <div
            key={topPos}
            style={{
              position: 'absolute',
              top: `${topPos}%`,
              left: '-4px',
              width: '16px',
              height: '12px',
              background: '#a3704c',
              borderRadius: '6px',
              border: '1.5px solid #6b3e15',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        ))}
      </div>

      {/* 3. THE CLIMBER (ANDY / WOODY RAPPELLING DOWN) */}
      <motion.div
        style={{
          position: 'absolute',
          top: climberTop,
          rotate: isSwinging ? [-15, 15, -10, 10, 0] : climberRotate,
          zIndex: 8,
          pointerEvents: 'auto',
          cursor: 'pointer',
          transformOrigin: 'top center',
        }}
        onClick={handleClimberTap}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Speech Bubble / Progress Tag */}
        <motion.div
          className="rope-climber-badge"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            right: '65px',
            top: '10px',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '2px solid #ffd000',
            borderRadius: '16px',
            padding: '4px 10px',
            boxShadow: '0 4px 12px rgba(12, 45, 80, 0.22)',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-fun)',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#78350f',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{speechText}</span>
          <span
            style={{
              background: '#2563eb',
              color: '#ffffff',
              padding: '1px 6px',
              borderRadius: '10px',
              fontSize: '0.7rem',
            }}
          >
            {scrollPercent}%
          </span>
        </motion.div>

        {/* Full-Body Illustrated Toy Climber (Sheriff Woody / Andy Rappelling on Rope) */}
        <svg
          viewBox="0 0 100 130"
          width="74"
          height="96"
          className="rope-woody-svg"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(3px 8px 12px rgba(12, 45, 80, 0.45))',
          }}
        >
          {/* Hands Grasping Rope */}
          <ellipse cx="50" cy="28" rx="7" ry="5" fill="#fbcfe8" stroke="#78350f" strokeWidth="1.5" />
          <ellipse cx="50" cy="40" rx="7" ry="5" fill="#fbcfe8" stroke="#78350f" strokeWidth="1.5" />

          {/* Cowboy Hat */}
          <ellipse cx="44" cy="15" rx="22" ry="7" fill="#854d0e" stroke="#583101" strokeWidth="1.8" />
          <path d="M 32,15 Q 44,2 56,15 Z" fill="#9a3412" stroke="#583101" strokeWidth="1.8" />
          <rect x="34" y="14" width="20" height="2" fill="#ffd000" />

          {/* Head & Face */}
          <circle cx="44" cy="22" r="9" fill="#fed7aa" stroke="#78350f" strokeWidth="1.2" />
          <circle cx="41" cy="21" r="1.5" fill="#78350f" />
          <circle cx="46" cy="21" r="1.5" fill="#78350f" />
          {/* Friendly Smile */}
          <path d="M 41,25 Q 44,28 47,25" stroke="#991b1b" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Red Bandana Scarf */}
          <polygon points="39,30 49,30 44,35" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />

          {/* Body: Yellow Plaid Shirt */}
          <rect x="34" y="32" width="20" height="24" rx="4" fill="#ffd000" stroke="#b45309" strokeWidth="1.5" />
          {/* Plaid Grid Lines */}
          <line x1="39" y1="32" x2="39" y2="56" stroke="#dc2626" strokeWidth="1" />
          <line x1="45" y1="32" x2="45" y2="56" stroke="#dc2626" strokeWidth="1" />
          <line x1="50" y1="32" x2="50" y2="56" stroke="#dc2626" strokeWidth="1" />
          <line x1="34" y1="40" x2="54" y2="40" stroke="#dc2626" strokeWidth="1" />
          <line x1="34" y1="48" x2="54" y2="48" stroke="#dc2626" strokeWidth="1" />

          {/* Cowhide Spotted Vest */}
          <path d="M 34,32 L 39,32 L 39,52 L 34,52 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="1" />
          <circle cx="36" cy="38" r="2" fill="#1f2937" />
          <circle cx="37" cy="46" r="1.5" fill="#1f2937" />

          <path d="M 49,32 L 54,32 L 54,52 L 49,52 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="1" />
          <circle cx="51" cy="40" r="2" fill="#1f2937" />
          <circle cx="52" cy="47" r="1.5" fill="#1f2937" />

          {/* Sheriff Star Badge on Chest */}
          <polygon
            points="41,37 42,39 44,39 42.5,40.5 43,42 41,41 39,42 39.5,40.5 38,39 40,39"
            fill="#ffd000"
            stroke="#b45309"
            strokeWidth="0.8"
          />

          {/* Cowboy Belt & Holster */}
          <rect x="33" y="54" width="22" height="5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <rect x="41" y="53.5" width="6" height="6" fill="#ffd000" stroke="#b45309" strokeWidth="0.8" />

          {/* Rappelling Bent Legs (Blue Jeans) */}
          {/* Left leg kicking out against wall */}
          <path
            d="M 36,58 L 24,72 L 20,86"
            stroke="#1d4ed8"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right leg wrapping towards rope */}
          <path
            d="M 48,58 L 54,72 L 50,88"
            stroke="#1d4ed8"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Cowboy Boots with Spurs */}
          <path d="M 18,84 L 23,84 L 20,96 L 12,96 Z" fill="#92400e" stroke="#451a03" strokeWidth="1.2" />
          {/* "ANDY" on sole of left boot! */}
          <text x="14" y="94" fontSize="4" fill="#ffd000" fontFamily="sans-serif" fontWeight="900">
            ANDY
          </text>
          <circle cx="21" cy="91" r="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />

          {/* Right Boot */}
          <path d="M 48,86 L 53,86 L 55,98 L 47,98 Z" fill="#92400e" stroke="#451a03" strokeWidth="1.2" />
          <circle cx="54" cy="93" r="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />

          {/* Pull-String Ring Dangles From Woody's Back! */}
          <path d="M 44,44 Q 30,52 32,64" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
          <circle cx="32" cy="65" r="4" fill="none" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </motion.div>
    </aside>
  );
}
