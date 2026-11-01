import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Camera, X, ChevronLeft, ChevronRight, ZoomIn, Heart, Cloud, Compass, Gift, Mail, Layers, Wifi, Battery, Power, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';

// Illustrated Artwork for Gallery Placeholders (NO EMOJIS - Elegant & Professional)
function GalleryArtwork({ type }) {
  switch (type) {
    case 'ultrasound':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, #0f172a 0%, #020617 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '2px dashed #38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={28} color="#38bdf8" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.05rem', color: '#ffd000', letterSpacing: '0.05em' }}>
            BABY BOY ULTRASOUND
          </div>
          <div style={{ position: 'absolute', top: '12px', left: '14px', fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
            20-WEEK MILESTONE • KEEPSAKE
          </div>
        </div>
      );
    case 'nursery':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #78c8fb 0%, #38bdf8 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Cloud size={32} color="#ffffff" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.15rem' }}>
            Andy's Cloud Nursery
          </div>
          <div style={{ fontSize: '0.82rem', opacity: 0.95, fontFamily: 'var(--font-fun)', marginTop: '2px' }}>
            Hand-painted blue skies & clouds
          </div>
        </div>
      );
    case 'parents':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fed7aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Heart size={30} color="#ea580c" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.15rem', color: '#9a3412' }}>
            Jannah & Josiah
          </div>
          <div style={{ fontSize: '0.82rem', color: '#c2410c', fontFamily: 'var(--font-fun)', marginTop: '2px' }}>
            Awaiting the Arrival of Baby Boy
          </div>
        </div>
      );
    case 'toys':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Gift size={28} color="#16a34a" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.15rem', color: '#166534' }}>
            Baby's First Keepsakes
          </div>
          <div style={{ fontSize: '0.82rem', color: '#15803d', fontFamily: 'var(--font-fun)', marginTop: '2px' }}>
            Classic toys and nursery mementos
          </div>
        </div>
      );
    case 'booties':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fde047',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Compass size={28} color="#854d0e" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.15rem', color: '#854d0e' }}>
            Tiny Cowboy Booties
          </div>
          <div style={{ fontSize: '0.82rem', color: '#a16207', fontFamily: 'var(--font-fun)', marginTop: '2px' }}>
            Little adventurer ready to explore
          </div>
        </div>
      );
    default:
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Mail size={28} color="#0284c7" />
          </div>
          <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.15rem', color: '#0369a1' }}>
            Shower Invitation Keepsake
          </div>
          <div style={{ fontSize: '0.82rem', color: '#475569', fontFamily: 'var(--font-fun)', marginTop: '2px' }}>
            December 6, 2026 • Richmond, B.C.
          </div>
        </div>
      );
  }
}

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const hasFiredConfetti = useRef(false);

  const handleViewportEnter = () => {
    if (!hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#ffd000', '#2563eb', '#ff3b4e', '#38b000'],
        });
      } catch (e) {}
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const handleOpenPhoto = (item) => {
    soundEffects.playSparkle();
    setActivePhoto(item);
  };

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = eventDetails.gallery.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % eventDetails.gallery.length;
    setActivePhoto(eventDetails.gallery[nextIndex]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = eventDetails.gallery.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + eventDetails.gallery.length) % eventDetails.gallery.length;
    setActivePhoto(eventDetails.gallery[prevIndex]);
  };

  return (
    <section
      id="photo-gallery"
      style={{
        position: 'relative',
        padding: '70px 20px 90px 20px',
        zIndex: 10,
      }}
    >
      <motion.div
        className="container"
        style={{ maxWidth: '1100px' }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="toy-badge toy-badge-white" style={{ border: '2px solid #ffffff' }}>
              <Camera size={16} color="#dc2626" /> MEMORY POLAROIDS
            </span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontFamily: 'var(--font-toy)',
                fontSize: 'clamp(2.3rem, 5.5vw, 3.6rem)',
                color: '#ffffff',
                textShadow: '0 5px 0 #1b639e, 0 10px 25px rgba(0,0,0,0.3)',
                margin: 0,
              }}
            >
              Andy's Scrapbook Memories
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1.25rem',
              color: '#fff4cc',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Snapshots pinned to Andy's room wall on our way to welcoming {eventDetails.baby.name}!
          </p>
        </div>

        {/* Polaroid Snapshots Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(18px, 4vw, 32px)',
            justifyContent: 'center',
          }}
        >
          {eventDetails.gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02, rotate: idx % 2 === 0 ? 1.5 : -1.5 }}
              onClick={() => handleOpenPhoto(item)}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '18px 18px 24px 18px',
                boxShadow: '0 16px 36px rgba(15, 52, 90, 0.22)',
                cursor: 'pointer',
                position: 'relative',
                transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})`,
                border: '4px solid #ffffff',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              {/* Pushpin at the top */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: idx % 3 === 0 ? '#dc2626' : idx % 3 === 1 ? '#ffd000' : '#2563eb',
                  border: '2px solid #ffffff',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.35)',
                  zIndex: 5,
                }}
              />

              {/* Photo Display Window */}
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#0f172a',
                  position: 'relative',
                  marginBottom: '16px',
                  border: '2px solid #e2e8f0',
                }}
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    loading="lazy"
                  />
                ) : (
                  <GalleryArtwork type={item.image} />
                )}

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontFamily: 'var(--font-fun)',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <ZoomIn size={20} /> Click to Expand
                </div>
              </div>

              {/* Caption Area */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-fun)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: 'var(--toy-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Star size={12} fill="var(--toy-blue)" color="var(--toy-blue)" />
                    <span>{item.category}</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    {item.subtitle}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-toy)',
                    fontSize: '1.3rem',
                    color: 'var(--text-dark)',
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    lineHeight: 1.4,
                    fontWeight: 600,
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal styled like Etch-A-Sketch Frame */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 11000,
                background: 'rgba(15, 30, 50, 0.88)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              {/* Lilypad - Toy Story 5 Frog Smart Tablet Modal */}
              <motion.div
                initial={{ scale: 0.8, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'linear-gradient(150deg, #4ade80 0%, #22c55e 55%, #16a34a 100%)',
                  borderRadius: '38px',
                  maxWidth: '600px',
                  width: '100%',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.65), 0 0 35px rgba(74, 222, 128, 0.35)',
                  border: '6px solid #15803d',
                  position: 'relative',
                  padding: '16px',
                  marginTop: '30px',
                }}
              >
                {/* 1. Lilypad's Iconic Frog Eyes on Top of Tablet */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-38px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '70px',
                    zIndex: 25,
                    pointerEvents: 'none',
                  }}
                >
                  {/* Left Frog Eye */}
                  <div
                    style={{
                      width: '56px',
                      height: '46px',
                      borderRadius: '50% 50% 35% 35%',
                      background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
                      border: '4px solid #15803d',
                      borderBottom: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 -4px 10px rgba(21, 128, 61, 0.4)',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: '2px solid #166534',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Animated Blinking Pupil */}
                      <motion.div
                        animate={{
                          scaleY: [1, 1, 0.1, 1],
                          x: [-2, 2, 0, -2],
                        }}
                        transition={{
                          scaleY: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.94, 1] },
                          x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#0f172a',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '3px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#ffffff',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Cute Frog Smile Between Eyes */}
                  <div
                    style={{
                      width: '32px',
                      height: '16px',
                      borderRadius: '0 0 16px 16px',
                      borderBottom: '3px solid #15803d',
                      marginBottom: '4px',
                    }}
                  />

                  {/* Right Frog Eye */}
                  <div
                    style={{
                      width: '56px',
                      height: '46px',
                      borderRadius: '50% 50% 35% 35%',
                      background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
                      border: '4px solid #15803d',
                      borderBottom: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 -4px 10px rgba(21, 128, 61, 0.4)',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: '2px solid #166534',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Animated Blinking Pupil */}
                      <motion.div
                        animate={{
                          scaleY: [1, 1, 0.1, 1],
                          x: [-2, 2, 0, -2],
                        }}
                        transition={{
                          scaleY: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.94, 1] },
                          x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#0f172a',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '3px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#ffffff',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* 2. Webbed Frog Corner Feet (Protective Rugged Rubber Bumpers) */}
                {/* Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '36px',
                    height: '36px',
                    background: '#15803d',
                    borderRadius: '50% 20% 50% 50%',
                    zIndex: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    border: '2px solid #166534',
                  }}
                />
                {/* Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '36px',
                    height: '36px',
                    background: '#15803d',
                    borderRadius: '20% 50% 50% 50%',
                    zIndex: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    border: '2px solid #166534',
                  }}
                />
                {/* Bottom Left Webbed Foot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-14px',
                    left: '-6px',
                    width: '54px',
                    height: '32px',
                    background: '#15803d',
                    borderRadius: '30% 30% 60% 60%',
                    zIndex: 2,
                    boxShadow: '0 6px 12px rgba(0,0,0,0.35)',
                    border: '2px solid #166534',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                    paddingTop: '14px',
                  }}
                >
                  <div style={{ width: '8px', height: '12px', borderRadius: '50%', background: '#166534' }} />
                  <div style={{ width: '8px', height: '14px', borderRadius: '50%', background: '#166534' }} />
                  <div style={{ width: '8px', height: '12px', borderRadius: '50%', background: '#166534' }} />
                </div>
                {/* Bottom Right Webbed Foot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-14px',
                    right: '-6px',
                    width: '54px',
                    height: '32px',
                    background: '#15803d',
                    borderRadius: '30% 30% 60% 60%',
                    zIndex: 2,
                    boxShadow: '0 6px 12px rgba(0,0,0,0.35)',
                    border: '2px solid #166534',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                    paddingTop: '14px',
                  }}
                >
                  <div style={{ width: '8px', height: '12px', borderRadius: '50%', background: '#166534' }} />
                  <div style={{ width: '8px', height: '14px', borderRadius: '50%', background: '#166534' }} />
                  <div style={{ width: '8px', height: '12px', borderRadius: '50%', background: '#166534' }} />
                </div>

                {/* 3. Lilypad Tablet Top Status & Branding Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 10px 10px 10px',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-fun)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Left: Wi-Fi & The Pond Network */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Wifi size={14} color="#ffffff" />
                    <span>The Pond 5G</span>
                  </div>

                  {/* Center: Official Lilypad Badge */}
                  <div
                    style={{
                      background: 'rgba(21, 128, 61, 0.45)',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>🐸</span>
                    <span
                      style={{
                        fontFamily: "'Lilita One', cursive",
                        fontSize: '1.15rem',
                        letterSpacing: '1px',
                        color: '#fef08a',
                      }}
                    >
                      LILYPAD
                    </span>
                    <span style={{ fontSize: '0.68rem', opacity: 0.9, letterSpacing: '0.5px' }}>
                      TOY STORY 5
                    </span>
                  </div>

                  {/* Right: Battery & Close/Power Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Battery size={15} color="#fef08a" />
                      <span>100%</span>
                    </div>

                    <button
                      onClick={() => setActivePhoto(null)}
                      title="Turn off / Close Lilypad"
                      style={{
                        background: '#dc2626',
                        color: '#ffffff',
                        border: '2px solid #ffffff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                        transition: 'transform 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* 4. Touchscreen Display Area */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '22px',
                    overflow: 'hidden',
                    border: '4px solid #0f172a',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Photo Display Window */}
                  <div
                    style={{
                      width: '100%',
                      minHeight: '270px',
                      maxHeight: '420px',
                      position: 'relative',
                      background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderBottom: '3px solid #e2e8f0',
                    }}
                  >
                    {activePhoto.src ? (
                      <img
                        src={activePhoto.src}
                        alt={activePhoto.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '420px',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <GalleryArtwork type={activePhoto.image} />
                    )}

                    {/* Lilypad Watermark / App Badge on Screen */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#86efac',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-fun)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(134, 239, 172, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span>🐸</span>
                      <span>Lilypad Keepsake App</span>
                    </div>
                  </div>

                  {/* Photo Info & App Controls */}
                  <div style={{ padding: '20px 22px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-fun)',
                          color: '#15803d',
                          background: '#dcfce7',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          border: '1px solid #bbf7d0',
                        }}
                      >
                        {activePhoto.category}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                        {activePhoto.subtitle}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-toy)',
                        fontSize: '1.75rem',
                        color: 'var(--text-dark)',
                        marginBottom: '8px',
                        lineHeight: 1.2,
                      }}
                    >
                      {activePhoto.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.02rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        marginBottom: '18px',
                      }}
                    >
                      {activePhoto.caption}
                    </p>

                    {/* Navigation Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '2px solid #f1f5f9',
                        paddingTop: '14px',
                      }}
                    >
                      <button
                        onClick={handlePrev}
                        className="btn-toy btn-toy-green"
                        style={{
                          padding: '8px 18px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        <ChevronLeft size={18} /> Prev
                      </button>

                      <span
                        style={{
                          fontFamily: 'var(--font-fun)',
                          fontSize: '0.82rem',
                          color: '#94a3b8',
                          fontWeight: 600,
                        }}
                      >
                        Swipe or use ← / →
                      </span>

                      <button
                        onClick={handleNext}
                        className="btn-toy btn-toy-green"
                        style={{
                          padding: '8px 18px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        Next <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Lilypad Signature Bottom Home Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '14px',
                    paddingTop: '12px',
                  }}
                >
                  {/* Speaker Grill Dots */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                  </div>

                  {/* Circular Lilypad Home Button */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      soundEffects.playPop();
                      setActivePhoto(null);
                    }}
                    title="Press Home Button to return to Scrapbook"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #fef08a 0%, #a3e635 60%, #4ade80 100%)',
                      border: '3px solid #ffffff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                    }}
                  >
                    🐸
                  </motion.button>

                  {/* Microphone Grill Dots */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#15803d' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
