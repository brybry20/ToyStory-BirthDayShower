import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';
import boyStoryCutout from '../assets/its_a_boy_story_cutout.png';

// =======================================================================
// AUTHENTIC 3D "IT'S A BOY STORY" EMBLEM
// Seamlessly cut out from the original 3D render with transparent background.
// Features interactive 3D mouse parallax tilt, specular gleam sweep,
// and celebratory click reactions (audio chime + star confetti).
// =======================================================================

export default function RealBoyStoryLogo({
  className = '',
  style = {},
  maxWidth = 540,
  interactive = true,
  onClick,
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isPressed, setIsPressed] = useState(false);

  // 3D Parallax Mouse Tilt
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10; // -10 to 10 deg
    const rotY = ((x - centerX) / centerX) * 12;  // -12 to 12 deg

    setTilt({ rotateX: rotX, rotateY: rotY, scale: 1.03 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setIsPressed(false);
  };

  // Click Animation + Audio + Confetti Sparkle
  const handleClick = (e) => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 220);

    try {
      soundEffects.playCelebration();
    } catch {
      // audio fallback
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 32,
        spread: 60,
        startVelocity: 24,
        origin: { x: originX, y: originY },
        colors: ['#ffd000', '#094cd3', '#e5192c', '#ffffff', '#38b000'],
        shapes: ['circle', 'star'],
        scalar: 0.9,
      });
    }

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`real-boy-story-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        maxWidth: `${maxWidth}px`,
        width: '100%',
        perspective: '1000px',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isPressed ? 0.96 : tilt.scale,
        }}
        transition={{
          type: 'spring',
          stiffness: 340,
          damping: 25,
          mass: 0.8,
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* The Authentic 3D Cutout Image (Transparent background, no box) */}
        <img
          src={boyStoryCutout}
          alt="IT'S A BOY STORY"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 20px 32px rgba(12, 45, 85, 0.45)) drop-shadow(0 6px 12px rgba(12, 45, 85, 0.25))',
            pointerEvents: 'none',
          }}
          loading="eager"
        />

        {/* Specular Glint CSS Sweep Animation across the Logo */}
        <div
          className="logo-specular-sweep"
          style={{
            position: 'absolute',
            top: '4%',
            left: '4%',
            right: '4%',
            bottom: '4%',
            pointerEvents: 'none',
            overflow: 'hidden',
            borderRadius: '28px',
            opacity: 0.35,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-80%',
              width: '35%',
              height: '200%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
              transform: 'rotate(25deg)',
              animation: 'logoGleamSweep 5s infinite cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
