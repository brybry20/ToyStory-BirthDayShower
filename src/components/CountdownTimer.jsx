import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';
import { RexCharacter, AlienCharacter } from './ToyCharacters';

export default function CountdownTimer() {
  const hasFiredConfetti = useRef(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const target = new Date(eventDetails.schedule.targetCountdownDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    soundEffects.playCelebration();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd000', '#ff3b4e', '#2563eb', '#38b000', '#8338ec'],
    });
  };

  const handleViewportEnter = () => {
    if (!hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      triggerCelebration();
    }
  };

  const timerBlocks = [
    { label: 'DAYS', value: timeLeft.days, color: 'toy-block-red', char: 'D' },
    { label: 'HOURS', value: timeLeft.hours, color: 'toy-block-blue', char: 'H' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'toy-block-yellow', char: 'M' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'toy-block-green', char: 'S' },
  ];

  return (
    <section
      id="countdown-section"
      style={{
        padding: '60px 20px',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <motion.div
        className="container"
        style={{ maxWidth: '820px' }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* Section Heading Tag */}
        <div style={{ marginBottom: '16px' }}>
          <span className="toy-badge toy-badge-white" style={{ border: '2px solid #ffffff' }}>
            <Clock size={16} color="#2563eb" /> COUNTDOWN TO ADVENTURE
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-toy)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#ffffff',
            textShadow: '0 4px 0 #1b639e, 0 8px 20px rgba(0,0,0,0.25)',
            marginBottom: '8px',
          }}
        >
          Counting Down to Playtime!
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.2rem',
            color: '#fff9d6',
            fontWeight: 600,
            marginBottom: '36px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Every tick brings us closer to welcoming {eventDetails.baby.name}!
        </p>

        {timeLeft.isComplete ? (
          /* Celebratory Finished State */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: 'var(--shadow-floating)',
              border: '6px solid var(--toy-yellow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#fef08a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#854d0e',
                  boxShadow: '0 4px 12px rgba(234, 179, 8, 0.25)',
                }}
              >
                <PartyPopper size={34} />
              </div>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-toy)',
                fontSize: '2.4rem',
                color: 'var(--toy-red)',
                marginBottom: '10px',
              }}
            >
              IT'S PARTY TIME!
            </h3>
            <p style={{ fontFamily: 'var(--font-fun)', fontSize: '1.2rem', fontWeight: 600 }}>
              The baby shower is happening right now! Let the celebrations begin!
            </p>
          </motion.div>
        ) : (
          /* Active 3D Toy Block Countdown with Character Cutouts */
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(10px, 3vw, 28px)',
                flexWrap: 'wrap',
              }}
            >
              {/* Rex Dinosaur Sticker (Left) */}
              <motion.div
                className="toy-cutout-sticker"
                animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => soundEffects.playRexRoar()}
                title="Rex is counting down!"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <RexCharacter height={135} />
              </motion.div>

              {/* Toy Blocks Container */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 'clamp(8px, 2vw, 20px)',
                  marginBottom: '12px',
                }}
              >
                {timerBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Toy Block Cube */}
                    <motion.div
                      whileHover={{ scale: 1.06, rotate: idx % 2 === 0 ? 3 : -3 }}
                      onClick={() => soundEffects.playBlockTap()}
                      className={`toy-block-cube ${block.color}`}
                      style={{
                        width: 'clamp(58px, 17vw, 100px)',
                        height: 'clamp(64px, 18vw, 100px)',
                        borderRadius: 'clamp(12px, 3vw, 20px)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {/* Small letter tag in upper-left corner */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '4px',
                          left: '8px',
                          fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)',
                          opacity: 0.6,
                          fontFamily: 'var(--font-toy)',
                        }}
                      >
                        {block.char}
                      </span>

                      {/* Numeric Value */}
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={block.value}
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 12, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            fontSize: 'clamp(1.45rem, 4.5vw, 2.6rem)',
                            lineHeight: 1,
                            fontWeight: 900,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {String(block.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>

                    {/* Label beneath block */}
                    <span
                      style={{
                        fontFamily: 'var(--font-fun)',
                        fontWeight: 800,
                        fontSize: 'clamp(0.72rem, 2vw, 0.95rem)',
                        color: '#ffffff',
                        marginTop: '8px',
                        letterSpacing: '1px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Green Alien Sticker (Right) */}
              <motion.div
                className="toy-cutout-sticker"
                animate={{ y: [4, -4, 4], rotate: [2, -2, 2] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => soundEffects.playAlien()}
                title="Alien is counting down!"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <AlienCharacter height={130} />
              </motion.div>
            </div>

          </div>
        )}
      </motion.div>
    </section>
  );
}
