import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Send, 
  Clock, 
  Sparkles, 
  MapPin, 
  Gift, 
  Camera, 
  Heart, 
  Mail, 
  Gamepad2, 
  CheckSquare, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function Navigation({ onReopenOpening }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: '3D Envelope Intro', href: '#opening', icon: Mail, color: '#f59e0b', action: 'replay' },
    { label: 'Invitation Details', href: '#invitation-card', icon: Mail, color: '#0284c7' },
    { label: 'Countdown', href: '#countdown-section', icon: Clock, color: '#f59e0b' },
    { label: 'Baby Gift Registry', href: '#gift-registry', icon: Gift, color: '#ea580c' },
    { label: 'Sticker Album', href: '#stickers-section', icon: Sparkles, color: '#eab308' },
    { label: 'Scrapbook', href: '#photo-gallery', icon: Camera, color: '#8b5cf6' },
    { label: 'RSVP Now', href: '#rsvp-section', icon: CheckSquare, color: '#2563eb' },
    { label: 'Location & Map', href: '#location-section', icon: MapPin, color: '#0d9488' },
  ];

  const handleLinkClick = (link) => {
    soundEffects.playBlockTap();
    setIsOpen(false);
    if (link.action === 'replay' && onReopenOpening) {
      onReopenOpening();
      return;
    }
    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    soundEffects.playBlockTap();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Navigation Pill (Top-Left) */}
      <div
        className="navigation-pill-container"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 9200,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Toggle Menu Button */}
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="navigation-pill-btn"
          style={{
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '9999px',
            padding: '9px 18px',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-fun)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.04em',
            color: '#1e293b',
            transition: 'all 0.2s ease',
          }}
          aria-label="Toggle Event Menu"
        >
          {isOpen ? <X size={16} color="#ef4444" /> : <Menu size={16} color="#0284c7" />}
          <span style={{ textTransform: 'uppercase' }}>{isOpen ? 'Close' : 'Menu'}</span>
        </motion.button>

        {/* Quick RSVP Action Button */}
        <motion.button
          onClick={() => handleLinkClick('#rsvp-section')}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="navigation-pill-btn"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '9999px',
            padding: '9px 20px',
            color: '#ffffff',
            boxShadow: '0 10px 20px -5px rgba(2, 132, 199, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            cursor: 'pointer',
            fontFamily: 'var(--font-fun)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.04em',
          }}
        >
          <Send size={14} />
          <span>RSVP</span>
        </motion.button>
      </div>

      {/* Floating Interactive Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9100,
              background: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '76px 20px 20px 20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: -16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: -16, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
                padding: '24px',
                maxWidth: '350px',
                width: '100%',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '14px',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-toy)',
                      fontSize: '1.15rem',
                      color: '#0f172a',
                      letterSpacing: '0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Sparkles size={18} color="#0284c7" />
                    <span>Event Directory</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                    Jannah & Josiah's Baby Shower
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                  }}
                  aria-label="Close menu"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Navigation Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => handleLinkClick(link)}
                      whileHover={{ x: 5, backgroundColor: '#f0f9ff' }}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '14px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-fun)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '8px',
                            background: `${link.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: link.color,
                          }}
                        >
                          <IconComponent size={16} />
                        </div>
                        <span>{link.label}</span>
                      </div>
                      <ArrowRight size={14} color="#94a3b8" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f1f5f9',
                  textAlign: 'center',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-fun)',
                  color: '#64748b',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                December 6, 2026 • Richmond, B.C.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
