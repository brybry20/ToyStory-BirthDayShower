import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Award, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_16_CHARACTERS } from './ToyCharacters';
import { soundEffects } from '../utils/soundEffects';

export default function StickerBook() {
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [collected, setCollected] = useState(new Set());
  const [filter, setFilter] = useState('all');

  const handleTapSticker = (char) => {
    if (char.sound) {
      char.sound();
    }
    setActiveCharacter(char);
    setCollected((prev) => new Set([...prev, char.id]));

    try {
      confetti({
        particleCount: 28,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16'],
      });
    } catch {}

    setTimeout(() => {
      setActiveCharacter((current) => (current?.id === char.id ? null : current));
    }, 3500);
  };

  const filteredCharacters = ALL_16_CHARACTERS.filter((char) => {
    if (filter === 'cowboys') {
      return ['woody_wave', 'buzz_fly', 'jessie_yodel', 'bullseye_run', 'woody_tip_hat', 'jessie_dance', 'woody_happy', 'woody_laugh'].includes(char.id);
    }
    if (filter === 'pals') {
      return ['rex_dino', 'aliens_three', 'slinky_bounce', 'potato_head', 'hamm_pig', 'forky_dance', 'alien_single'].includes(char.id);
    }
    if (filter === 'party') {
      return ['woody_buzz_party', 'woody_buzz_friends', 'duke_caboom', 'disney_baby', 'celebration_party', 'happy_toy_story', 'pixar_tech_toys'].includes(char.id);
    }
    return true;
  });

  return (
    <section
      id="stickers-section"
      style={{
        position: 'relative',
        padding: '80px 20px 90px 20px',
        zIndex: 10,
      }}
    >
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ marginBottom: '14px' }}>
            <span
              className="toy-badge toy-badge-yellow"
              style={{
                fontSize: '0.95rem',
                padding: '8px 24px',
                border: '2px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Star size={16} fill="#b45309" color="#b45309" /> OFFICIAL TOY STORY GIPHY STICKERS
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-toy)',
              fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
              color: '#ffffff',
              textShadow: '0 4px 0 #1b639e, 0 10px 25px rgba(12, 45, 80, 0.35)',
              marginBottom: '10px',
              lineHeight: 1.15,
            }}
          >
            OFFICIAL TOY STORY STICKER ALBUM
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1.15rem',
              color: '#f8fafc',
              fontWeight: 700,
              maxWidth: '680px',
              margin: '0 auto 20px auto',
              textShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            Direct from giphy.com/explore/toy-story-stickers! Tap any sticker to hear them speak, bounce, and celebrate with baby Josiah!
          </p>

          {/* Collection Progress Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 20px',
              borderRadius: '30px',
              border: '2px solid #ffd000',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              marginBottom: '24px',
            }}
          >
            <Award size={18} color="#d97706" />
            <span
              style={{
                fontFamily: 'var(--font-fun)',
                fontWeight: 800,
                fontSize: '0.9rem',
                color: '#1e293b',
              }}
            >
              Stickers Tapped: {collected.size} of {ALL_16_CHARACTERS.length} Complete
            </span>
          </div>

          {/* Filter Chips */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'all', label: 'All 22 Giphy Stickers' },
              { id: 'cowboys', label: 'Woody, Buzz & Jessie' },
              { id: 'pals', label: 'Rex, Slinky & Pals' },
              { id: 'party', label: 'Party & Celebration' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundEffects.playBlockTap();
                  setFilter(f.id);
                }}
                style={{
                  background: filter === f.id ? '#ffd000' : 'rgba(255, 255, 255, 0.9)',
                  color: filter === f.id ? '#78350f' : '#334155',
                  border: filter === f.id ? '2px solid #ffffff' : '2px solid transparent',
                  borderRadius: '24px',
                  padding: '7px 18px',
                  fontFamily: 'var(--font-fun)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 16 Sticker Album Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: 'clamp(14px, 3vw, 22px)',
          }}
        >
          {filteredCharacters.map((char) => {
            const isSpeaking = activeCharacter?.id === char.id;
            const isUnlocked = collected.has(char.id);

            return (
              <motion.div
                key={char.id}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleTapSticker(char)}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '26px',
                  padding: '20px 16px',
                  border: isSpeaking ? `3px solid ${char.quoteColor}` : '3px solid #ffffff',
                  boxShadow: isSpeaking
                    ? `0 16px 36px rgba(12, 45, 80, 0.28), 0 0 0 3px ${char.quoteColor}`
                    : '0 12px 28px rgba(12, 45, 80, 0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'border 0.2s ease, box-shadow 0.2s ease',
                  minHeight: '260px',
                }}
              >
                {/* Speech Bubble Overlay when clicked */}
                <AnimatePresence>
                  {isSpeaking && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                      style={{
                        position: 'absolute',
                        top: '-55px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        border: `2px solid ${char.quoteColor}`,
                        borderRadius: '16px',
                        padding: '6px 14px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                        zIndex: 60,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-fun)',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          color: char.quoteColor,
                        }}
                      >
                        {char.quote}
                      </span>
                      {/* Tail */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-7px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          width: '12px',
                          height: '12px',
                          background: '#ffffff',
                          borderRight: `2px solid ${char.quoteColor}`,
                          borderBottom: `2px solid ${char.quoteColor}`,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Character Silhouette Cutout Sticker */}
                <div
                  style={{
                    height: '145px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    style={{
                      maxHeight: '135px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 6px 14px rgba(12, 45, 80, 0.2))',
                      pointerEvents: 'none',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Info Text */}
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-toy)',
                      fontSize: '1.2rem',
                      color: 'var(--toy-blue-dark)',
                      marginBottom: '3px',
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-fun)',
                      fontSize: '0.78rem',
                      color: '#64748b',
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {char.role}
                  </div>
                </div>

                {/* Action Chip */}
                <div
                  style={{
                    marginTop: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 800,
                    color: isUnlocked ? '#15803d' : '#0284c7',
                    background: isUnlocked ? '#f0fdf4' : '#f0f9ff',
                    border: isUnlocked ? '1px solid #86efac' : '1px solid #bae6fd',
                    padding: '3px 10px',
                    borderRadius: '12px',
                  }}
                >
                  <Sparkles size={12} />
                  <span>{isSpeaking ? 'Speaking!' : 'Tap Sticker'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
