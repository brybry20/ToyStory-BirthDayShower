import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, ArrowRight, Calendar, MapPin, Heart, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';
import { AndyCloud } from './CloudBackground';
import { eventDetails } from '../config/eventDetails';

export default function OpeningAnimation({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedLines, setTypedLines] = useState({
    tag: '',
    salutation: '',
    announcement: '',
    parentsTitle: '',
    babyName: '',
    bodyMessage: '',
    date: '',
    venue: '',
    motto: '',
    signature: '',
  });
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const handleOpen = () => {
    if (isOpen) {
      onComplete();
      return;
    }
    setIsOpen(true);

    try {
      soundEffects.playEnvelopeOpen();
    } catch (e) {}

    // Multistage celebration confetti burst
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#ffd000', '#dc2626', '#2563eb', '#84cc16', '#ffffff'],
      });
    } catch (e) {}
  };

  // Typewriter effect that sequentially types out the formal invitation letter text
  useEffect(() => {
    if (!isOpen) return;

    let timer;
    const lines = [
      { key: 'tag', text: "★ OFFICIAL TOY STORY INVITATION ★" },
      { key: 'salutation', text: "Dear Beloved Family & Friends," },
      { key: 'announcement', text: "You are warmly invited to celebrate" },
      { key: 'parentsTitle', text: `${eventDetails.parents.combined}'s Baby Shower` },
      { key: 'babyName', text: "Welcoming Baby Boy Josiah!" },
      { key: 'bodyMessage', text: "Please join us for a joyful gathering filled with love, laughter, and games as we prepare to welcome our little adventurer." },
      { key: 'date', text: "Sunday, December 6, 2026 • 2:30 PM" },
      { key: 'venue', text: "The Manoah Village Recall • Richmond, B.C." },
      { key: 'motto', text: "“Our Greatest Adventure Is About to Begin!”" },
      { key: 'signature', text: `— With all our love, ${eventDetails.parents.combined} Hewko` },
    ];

    let currentLine = 0;
    let charPos = 0;

    const startDelay = setTimeout(() => {
      const typeNextChar = () => {
        if (currentLine >= lines.length) {
          setIsTypingComplete(true);
          return;
        }

        setActiveLineIdx(currentLine);
        const lineObj = lines[currentLine];

        if (charPos <= lineObj.text.length) {
          const slice = lineObj.text.slice(0, charPos);
          setTypedLines((prev) => ({ ...prev, [lineObj.key]: slice }));
          charPos++;
          timer = setTimeout(typeNextChar, 14); // Crisp, rhythmic typing speed
        } else {
          currentLine++;
          charPos = 0;
          timer = setTimeout(typeNextChar, 75); // Subtle pause between lines
        }
      };

      typeNextChar();
    }, 600);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // Once typing is complete, keep letter visible for 5 full seconds before auto-entering
  useEffect(() => {
    if (!isTypingComplete) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTypingComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'radial-gradient(circle at 50% 35%, #5ebff7 0%, #3598e0 55%, #186ab0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px 16px',
      }}
    >
      {/* Gentle Andy's Clouds Background */}
      <div className="animate-drift-slow" style={{ position: 'absolute', top: '8%', left: '0%', opacity: 0.85, pointerEvents: 'none' }}>
        <AndyCloud size={240} />
      </div>
      <div className="animate-drift-mid" style={{ position: 'absolute', top: '70%', left: '0%', opacity: 0.8, pointerEvents: 'none', animationDelay: '-12s' }}>
        <AndyCloud size={190} />
      </div>

      {/* Subtle Star Twinkles */}
      <div className="animate-twinkle" style={{ position: 'absolute', top: '14%', left: '12%', pointerEvents: 'none' }}>
        <Sparkles size={26} color="#ffd000" />
      </div>
      <div className="animate-twinkle" style={{ position: 'absolute', top: '18%', right: '14%', animationDelay: '0.8s', pointerEvents: 'none' }}>
        <Sparkles size={22} color="#ffffff" />
      </div>

      {/* Discreet Skip Button (Top Right) */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 120 }}>
        <button
          onClick={onComplete}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            borderRadius: '30px',
            padding: '7px 18px',
            fontFamily: 'var(--font-fun)',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#1e293b',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span>Skip Intro</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '560px',
          width: '100%',
          zIndex: 10,
          position: 'relative',
          margin: 'auto',
        }}
      >
        {/* ===================================================================
            STATE 1: CLOSED 3D ENVELOPE (BEFORE USER TAPS)
            =================================================================== */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Header Title */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#fff9d6',
                  textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                  marginBottom: '6px',
                }}
              >
                A Special Delivery For You
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-toy)',
                  fontSize: 'clamp(1.9rem, 5vw, 2.7rem)',
                  color: '#ffffff',
                  textShadow: '0 4px 0 #1b639e, 0 10px 20px rgba(12, 45, 80, 0.3)',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {eventDetails.parents.combined}'s Baby Shower
              </h1>
            </div>

            {/* 3D Envelope */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              style={{
                position: 'relative',
                width: 'clamp(300px, 90vw, 420px)',
                height: 'clamp(200px, 58vw, 270px)',
                perspective: '1400px',
                cursor: 'pointer',
                marginBottom: '28px',
              }}
              title="Click or tap to open your invitation letter!"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 25px 50px -8px rgba(15, 35, 60, 0.45), 0 12px 24px rgba(15, 35, 60, 0.25)',
                  overflow: 'visible',
                  background: 'linear-gradient(180deg, #fbf7ee 0%, #ede3cb 100%)',
                  border: '2px solid #e2d7ba',
                }}
              >
                {/* Envelope Front SVG Flaps */}
                <svg
                  viewBox="0 0 420 270"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 4,
                    pointerEvents: 'none',
                  }}
                >
                  <defs>
                    <linearGradient id="paperBottomGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#f5ecd5" />
                      <stop offset="100%" stopColor="#ede2c7" />
                    </linearGradient>
                    <linearGradient id="paperLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ece0c4" />
                      <stop offset="100%" stopColor="#dfd2b5" />
                    </linearGradient>
                    <linearGradient id="paperRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e8dcbe" />
                      <stop offset="100%" stopColor="#dbceb0" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 0,270 210,140" fill="url(#paperLeftGrad)" />
                  <polygon points="420,0 420,270 210,140" fill="url(#paperRightGrad)" />
                  <polygon points="0,270 420,270 210,130" fill="url(#paperBottomGrad)" />
                </svg>

                {/* Top Flap with Golden Star Wax Seal */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '140px',
                    zIndex: 6,
                    background: 'linear-gradient(180deg, #fcf6e8 0%, #f4ead3 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #ffe359 0%, #f59e0b 60%, #b45309 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 14px rgba(120, 53, 15, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                      border: '2px solid #ffffff',
                      marginBottom: '32px',
                    }}
                  >
                    <Star size={26} fill="#78350f" color="#78350f" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Tap To Open Envelope CTA Button */}
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-toy btn-toy-yellow animate-pulse-glow"
              style={{
                fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
                padding: 'clamp(12px, 2.5vw, 16px) clamp(28px, 5vw, 42px)',
                cursor: 'pointer',
              }}
            >
              <span>TAP TO OPEN ENVELOPE</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* ===================================================================
            STATE 2: THE FORMAL INVITATION LETTER ON PAPER (EXPANDED & FULL VIEW)
            Fully visible, authentic Toy Story formal stationery paper!
            =================================================================== */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 20,
            }}
          >
            {/* The Formal Invitation Paper Sheet */}
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'linear-gradient(180deg, #fffdf8 0%, #faf5ea 100%)',
                borderRadius: '24px',
                border: '3px solid #d4c59d',
                boxShadow: '0 25px 65px -8px rgba(12, 45, 80, 0.45), 0 0 0 6px rgba(255, 255, 255, 0.85), inset 0 2px 5px rgba(255, 255, 255, 0.9)',
                padding: 'clamp(20px, 4.5vw, 32px) clamp(16px, 4vw, 28px)',
                position: 'relative',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              {/* Inner Fine Dashed Stationery Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '16px',
                  border: '1.5px dashed #cfb989',
                  pointerEvents: 'none',
                }}
              />

              {/* Top Sheriff Star Seal Header */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Star size={14} fill="#b45309" color="#b45309" />
                <span
                  style={{
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    color: '#b45309',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {typedLines.tag}
                </span>
                <Star size={14} fill="#b45309" color="#b45309" />
              </div>

              {/* Toy Story Sky Blue & Gold Ribbon */}
              <div
                style={{
                  height: '3px',
                  width: '90px',
                  background: 'linear-gradient(90deg, #ffd000, #dc2626, #2563eb)',
                  borderRadius: '3px',
                  margin: '0 auto 14px auto',
                }}
              />

              {/* Salutation (Typewriter) */}
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                  fontWeight: 700,
                  color: '#475569',
                  marginBottom: '6px',
                  minHeight: '24px',
                }}
              >
                <span>{typedLines.salutation}</span>
                {activeLineIdx === 1 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#0284c7', fontWeight: 900 }}>|</motion.span>
                )}
              </div>

              {/* Formal Invitation Announcement (Typewriter) */}
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '0.88rem',
                  color: '#64748b',
                  fontWeight: 600,
                  marginBottom: '4px',
                  minHeight: '20px',
                }}
              >
                <span>{typedLines.announcement}</span>
                {activeLineIdx === 2 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#dc2626', fontWeight: 900 }}>|</motion.span>
                )}
              </div>

              {/* Parents Names Heading (Typewriter) */}
              <h2
                style={{
                  fontFamily: 'var(--font-toy)',
                  fontSize: 'clamp(1.6rem, 4.6vw, 2.3rem)',
                  color: '#0f172a',
                  lineHeight: 1.15,
                  margin: '4px 0 6px 0',
                  minHeight: '36px',
                }}
              >
                <span>{typedLines.parentsTitle}</span>
                {activeLineIdx === 3 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#ffd000', fontWeight: 900 }}>|</motion.span>
                )}
              </h2>

              {/* Welcoming Baby Boy Josiah! (Typewriter) */}
              <div
                style={{
                  fontFamily: 'var(--font-toy)',
                  fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)',
                  color: '#dc2626',
                  letterSpacing: '0.5px',
                  marginBottom: '10px',
                  minHeight: '26px',
                }}
              >
                <span>{typedLines.babyName}</span>
                {activeLineIdx === 4 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#dc2626', fontWeight: 900 }}>|</motion.span>
                )}
              </div>

              {/* Body Message (Typewriter) */}
              <p
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: 'clamp(0.88rem, 2.3vw, 0.98rem)',
                  color: '#334155',
                  lineHeight: 1.55,
                  maxWidth: '440px',
                  margin: '0 auto 16px auto',
                  fontWeight: 600,
                  minHeight: '44px',
                }}
              >
                <span>{typedLines.bodyMessage}</span>
                {activeLineIdx === 5 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#2563eb', fontWeight: 900 }}>|</motion.span>
                )}
              </p>

              {/* Formal Event Details Parchment Inset */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1.5px solid #e2d7ba',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  marginBottom: '14px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                }}
              >
                {/* Date & Time (Typewriter) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 800,
                    fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)',
                    color: '#0f172a',
                    minHeight: '22px',
                  }}
                >
                  {typedLines.date && <Calendar size={15} color="#dc2626" />}
                  <span>{typedLines.date}</span>
                  {activeLineIdx === 6 && !isTypingComplete && (
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#dc2626', fontWeight: 900 }}>|</motion.span>
                  )}
                </div>

                {/* Venue Location (Typewriter) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 2.2vw, 0.88rem)',
                    color: '#0284c7',
                    marginTop: '4px',
                    minHeight: '20px',
                  }}
                >
                  {typedLines.venue && <MapPin size={14} color="#0284c7" />}
                  <span>{typedLines.venue}</span>
                  {activeLineIdx === 7 && !isTypingComplete && (
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#0284c7', fontWeight: 900 }}>|</motion.span>
                  )}
                </div>
              </div>

              {/* Motto Tagline (Typewriter) */}
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  color: '#92400e',
                  background: typedLines.motto ? '#fef3c7' : 'transparent',
                  padding: typedLines.motto ? '4px 12px' : '0',
                  borderRadius: '20px',
                  display: 'inline-block',
                  border: typedLines.motto ? '1px solid #fde68a' : 'none',
                  marginBottom: '10px',
                  minHeight: '22px',
                }}
              >
                <span>{typedLines.motto}</span>
                {activeLineIdx === 8 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#92400e', fontWeight: 900 }}>|</motion.span>
                )}
              </div>

              {/* Formal Sign-off (Typewriter) */}
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#475569',
                  fontStyle: 'italic',
                  minHeight: '20px',
                }}
              >
                <span>{typedLines.signature}</span>
                {activeLineIdx === 9 && !isTypingComplete && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ color: '#dc2626', fontWeight: 900 }}>|</motion.span>
                )}
              </div>
            </div>

            {/* Action Enter Button with 5-Second Countdown Indicator */}
            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-toy btn-toy-yellow animate-pulse-glow"
              style={{
                fontSize: 'clamp(1rem, 2.6vw, 1.2rem)',
                padding: 'clamp(12px, 2.4vw, 15px) clamp(26px, 5vw, 38px)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {isTypingComplete ? (
                <>
                  <span>ENTER CELEBRATION ({countdown}s)</span>
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  <span>READING YOUR INVITATION...</span>
                  <Sparkles size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
