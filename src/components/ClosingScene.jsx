import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Rocket, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';
import { WoodyCharacter, BuzzCharacter } from './ToyCharacters';

export default function ClosingScene() {
  const hasFiredConfetti = useRef(false);

  const handleViewportEnter = () => {
    if (!hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 85,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16'],
        });
      } catch (e) {}
    }
  };

  const scrollToTop = () => {
    soundEffects.playRocketLaunch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="closing-scene"
      style={{
        position: 'relative',
        padding: '90px 20px 60px 20px',
        textAlign: 'center',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="container"
        style={{ maxWidth: '980px', margin: '0 auto' }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Woody and Buzz Lightyear with "See You There" Note */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 36px)',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Sheriff Woody */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <WoodyCharacter height={215} />
          </motion.div>

          {/* "See You There, Partner!" Note Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '3px solid #f59e0b',
              borderRadius: '24px',
              padding: 'clamp(20px, 4vw, 28px) clamp(22px, 5vw, 32px)',
              boxShadow: '0 16px 36px rgba(180, 83, 9, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
              maxWidth: '390px',
              position: 'relative',
              textAlign: 'center',
              transform: 'rotate(-1deg)',
            }}
          >
            {/* Top Pin Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#dc2626',
                color: '#ffffff',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
                border: '2px solid #ffffff',
              }}
            >
              <Sparkles size={14} color="#ffffff" />
            </div>

            <div
              style={{
                fontFamily: 'var(--font-fun)',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#b45309',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '6px',
                marginTop: '4px',
              }}
            >
              SPECIAL NOTE
            </div>

            <div
              style={{
                fontFamily: 'var(--font-toy)',
                fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)',
                color: '#78350f',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              SEE YOU THERE, PARTNER!
            </div>

            <p
              style={{
                fontFamily: 'var(--font-fun)',
                fontSize: '1rem',
                color: '#92400e',
                fontWeight: 700,
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              We can't wait to celebrate little baby Josiah with you! To infinity and beyond!
            </p>

            <div
              style={{
                fontFamily: 'var(--font-fun)',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#b45309',
                marginTop: '12px',
                fontStyle: 'italic',
              }}
            >
              — Sheriff Woody & Buzz Lightyear
            </div>
          </motion.div>

          {/* Buzz Lightyear */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <BuzzCharacter height={210} />
          </motion.div>
        </div>

        {/* Closing Title */}
        <h2
          style={{
            fontFamily: 'var(--font-toy)',
            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
            color: '#ffffff',
            textShadow: '0 5px 0 #1b639e, 0 10px 25px rgba(12, 45, 80, 0.35)',
            lineHeight: 1.15,
            marginBottom: '14px',
          }}
        >
          OUR LITTLE ADVENTURE IS BETTER WITH YOU!
        </h2>

        {/* Warm Message */}
        <p
          style={{
            fontFamily: 'var(--font-fun)',
            fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
            color: '#fff9d6',
            fontWeight: 700,
            marginBottom: '24px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Thank you for being part of our baby's story.
        </p>

        {/* Parents Names Capsule */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.96)',
            padding: '12px 30px',
            borderRadius: '9999px',
            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.15)',
            marginBottom: '36px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <Heart size={20} color="#e11d48" fill="#e11d48" />
          <span
            style={{
              fontFamily: 'var(--font-toy)',
              fontSize: '1.35rem',
              color: 'var(--toy-blue-dark)',
              letterSpacing: '0.02em',
            }}
          >
            With Love, {eventDetails.parents.combined}
          </span>
        </div>

        {/* Back to Top Rocket Button */}
        <div>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="btn-toy btn-toy-blue"
            style={{
              fontSize: '1rem',
              padding: '12px 28px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
            }}
          >
            <Rocket size={18} />
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}
