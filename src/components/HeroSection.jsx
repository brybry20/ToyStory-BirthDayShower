import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';
import {
  WoodyCharacter,
  BuzzCharacter,
  JessieCharacter,
  BullseyeCharacter,
  RexCharacter,
  SlinkyCharacter,
  HammCharacter,
  ForkyCharacter,
  AlienCharacter,
  PotatoHeadCharacter,
  ToyStoryBanner,
  LuxoBall,
} from './ToyCharacters';

export default function HeroSection({ heroActive = true }) {
  const [assembleKey, setAssembleKey] = useState(0);
  const [isAssembled, setIsAssembled] = useState(false);
  const [scatterFactor, setScatterFactor] = useState(1);

  // Responsive scatter factor so letters fit perfectly on both mobile phones and laptops
  useEffect(() => {
    const checkSize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        setScatterFactor(0.55);
      } else {
        setScatterFactor(1);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Automatically start assembling immediately when homepage opens
  useEffect(() => {
    if (!heroActive) {
      setIsAssembled(false);
      return;
    }

    // Immediately trigger assembly the moment homepage opens!
    const startTimer = setTimeout(() => {
      setIsAssembled(true);
    }, 80);

    // Multistage celebration confetti burst right as words lock in (~1.1s)
    const celebrationTimer = setTimeout(() => {
      try {
        confetti({
          particleCount: 85,
          spread: 90,
          origin: { y: 0.45 },
          colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16', '#ff3b4e'],
        });
        soundEffects.playCelebration();
      } catch (e) {}
    }, 1100);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(celebrationTimer);
    };
  }, [heroActive, assembleKey]);

  // Words that start visibly scattered across the screen and assemble into place
  const headlineWords = [
    { text: "You're", from: { x: -230, y: -85, rotate: -28, scale: 0.95 } },
    { text: "Invited", from: { x: 210, y: -95, rotate: 25, scale: 0.95 } },
    { text: "to", from: { x: -140, y: 70, rotate: -22, scale: 0.85 } },
    { text: "Celebrate", from: { x: 220, y: 80, rotate: 28, scale: 1.0 } },
    { text: "Our", from: { x: -170, y: -35, rotate: -16, scale: 0.9 } },
    { text: "Little", from: { x: 150, y: 75, rotate: 20, scale: 0.9 } },
    { text: "One!", from: { x: 20, y: 130, rotate: -14, scale: 1.08 } },
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '90px 20px 60px 20px',
        textAlign: 'center',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* ================================================================= */}
      {/* DESKTOP SIDE FLOATERS (FEATURING DIFFERENT UNIQUE CHARACTERS)    */}
      {/* All fully interactive with sound and speech bubbles               */}
      {/* ================================================================= */}

      {/* Sheriff Woody on Upper Left */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="desktop-toy-float"
        style={{
          position: 'absolute',
          left: 'clamp(20px, 5vw, 85px)',
          top: '18%',
          zIndex: 6,
        }}
      >
        <WoodyCharacter height={230} />
      </motion.div>

      {/* Bullseye Horse on Lower Left (Woody's trusted steed) */}
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="desktop-toy-float"
        style={{
          position: 'absolute',
          left: 'clamp(30px, 9vw, 130px)',
          bottom: '10%',
          zIndex: 6,
        }}
      >
        <BullseyeCharacter height={155} />
      </motion.div>

      {/* Buzz Lightyear on Upper Right */}
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="desktop-toy-float"
        style={{
          position: 'absolute',
          right: 'clamp(20px, 5vw, 85px)',
          top: '18%',
          zIndex: 6,
        }}
      >
        <BuzzCharacter height={220} />
      </motion.div>

      {/* Jessie the Yodeling Cowgirl on Mid-Right */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="desktop-toy-float"
        style={{
          position: 'absolute',
          right: 'clamp(35px, 10vw, 145px)',
          bottom: '14%',
          zIndex: 6,
        }}
      >
        <JessieCharacter height={165} />
      </motion.div>

      {/* Pixar Luxo Ball on bottom right */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.15 }}
        transition={{ duration: 0.8 }}
        className="desktop-toy-float"
        style={{
          position: 'absolute',
          right: 'clamp(15px, 3.5vw, 45px)',
          bottom: '5%',
          zIndex: 7,
          cursor: 'pointer',
          filter: 'drop-shadow(0 10px 18px rgba(12, 45, 80, 0.25))',
        }}
      >
        <LuxoBall size={75} />
      </motion.div>

      {/* ================================================================= */}
      {/* CENTER MAIN STAGE HERO (FLYING LETTERS & ELEMENTS ASSEMBLING)     */}
      {/* ================================================================= */}
      <div
        style={{
          maxWidth: '840px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >

        {/* 1. Official Toy Story 3D Logo Banner (Swooping Flying Entrance) */}
        <motion.div
          key={`logo-${assembleKey}`}
          initial={{ opacity: 0, scale: 0.35, y: -160, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{
            type: 'spring',
            damping: 14,
            stiffness: 120,
            delay: 0.15,
          }}
          style={{ marginBottom: '22px', width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <ToyStoryBanner title="TOY STORY" subtitle="AN ADVENTURE IS ABOUT TO BEGIN!" size="large" />
        </motion.div>

        {/* 2. Main Headline with Scattered Flying Letters Assembling on Open */}
        <h1
          className="hero-headline-title"
          onClick={() => {
            soundEffects.playToySpring();
            setIsAssembled(false);
            setAssembleKey((k) => k + 1);
          }}
          title="Click to scatter and re-assemble!"
          style={{
            fontFamily: 'var(--font-toy)',
            fontSize: 'clamp(1.5rem, 5.2vw, 3.8rem)',
            color: '#ffffff',
            textShadow: '0 5px 0 #1b639e, 0 10px 25px rgba(12, 45, 80, 0.35)',
            lineHeight: 1.18,
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '800px',
            cursor: 'pointer',
            minHeight: '80px',
            position: 'relative',
          }}
        >
          {headlineWords.map((item, idx) => {
            const targetX = item.from.x * scatterFactor;
            const targetY = item.from.y * scatterFactor;

            return (
              <motion.span
                key={`headline-${assembleKey}-${idx}`}
                initial={{
                  x: targetX,
                  y: targetY,
                  rotate: item.from.rotate,
                  scale: item.from.scale,
                  opacity: 1,
                }}
                animate={
                  isAssembled
                    ? {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        x: targetX,
                        y: targetY,
                        rotate: item.from.rotate,
                        scale: item.from.scale,
                        opacity: 1,
                      }
                }
                transition={
                  isAssembled
                    ? {
                        type: 'spring',
                        damping: 14,
                        stiffness: 95,
                        delay: idx * 0.1,
                      }
                    : {
                        duration: 0.15,
                      }
                }
                whileHover={{ scale: 1.15, rotate: 6 }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.28em',
                  userSelect: 'none',
                  filter: !isAssembled ? 'drop-shadow(0 10px 20px rgba(12, 45, 80, 0.5))' : 'none',
                  transition: 'filter 0.3s ease',
                }}
              >
                {item.text}
              </motion.span>
            );
          })}
        </h1>

        {/* 3. Parents and Baby Banner Card (Swooping up once words assemble) */}
        <motion.div
          key={`parents-${assembleKey}`}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={isAssembled ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{
            type: 'spring',
            damping: 16,
            stiffness: 140,
            delay: 0.55,
          }}
          className="hero-parents-pill"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: '12px 36px',
            border: '4px solid #ffffff',
            boxShadow: '0 14px 30px rgba(16, 52, 90, 0.25)',
            marginBottom: '28px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-toy)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              color: 'var(--toy-blue-dark)',
            }}
          >
            {eventDetails.parents.combined}
          </span>
          <span style={{ color: 'var(--toy-red)', display: 'flex', alignItems: 'center' }}>
            <Heart size={16} color="#e11d48" fill="#e11d48" />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-fun)',
              fontWeight: 800,
              fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
              color: 'var(--toy-red)',
            }}
          >
            Welcoming {eventDetails.baby.name}
          </span>
        </motion.div>

        {/* 4. Date and Venue Chips (Swooping in from sides once assembled) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <motion.div
            key={`date-${assembleKey}`}
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={isAssembled ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -60, scale: 0.8 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 150,
              delay: 0.7,
            }}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-fun)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-dark)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
              border: '2px solid #ffd000',
            }}
          >
            <Calendar size={18} color="#dc2626" />
            <span>{eventDetails.schedule.dateFormatted}</span>
          </motion.div>

          <motion.div
            key={`venue-${assembleKey}`}
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={isAssembled ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.8 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 150,
              delay: 0.8,
            }}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-fun)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-dark)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
              border: '2px solid #2563eb',
            }}
          >
            <MapPin size={18} color="#2563eb" />
            <span>{eventDetails.venue.name}</span>
          </motion.div>
        </div>



        {/* ================================================================= */}
        {/* CHARACTER FRIENDS ROW (NEW DIVERSE TOY CHARACTERS)                */}
        {/* Shows on laptops and cellphones with interactive speech bubbles   */}
        {/* ================================================================= */}
        <div
          className="mobile-toy-row"
          style={{
            marginTop: '36px',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 'clamp(8px, 3vw, 20px)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <RexCharacter height={115} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Rex
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <SlinkyCharacter height={105} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Slinky Dog
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <HammCharacter height={105} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Hamm
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <ForkyCharacter height={105} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Forky
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <AlienCharacter height={105} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Alien
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <PotatoHeadCharacter height={105} />
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              Potato Head
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
