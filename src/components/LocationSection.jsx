import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Shirt, Gift, ExternalLink, Sparkles, Clock, Calendar, Copy, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);
  const hasFiredConfetti = useRef(false);

  const handleViewportEnter = () => {
    if (!hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16'],
        });
      } catch (e) {}
    }
  };

  const handleCopyLink = (url) => {
    try {
      navigator.clipboard.writeText(url);
    } catch (e) {}
    soundEffects.playBlockTap();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <section
      id="location-section"
      style={{
        position: 'relative',
        padding: '70px 20px 90px 20px',
        zIndex: 10,
      }}
    >
      <motion.div
        className="container"
        style={{ maxWidth: '960px' }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="toy-badge toy-badge-white" style={{ border: '2px solid #ffffff' }}>
              <MapPin size={16} color="#2563eb" /> EVENT LOGISTICS & VENUE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-toy)',
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: '#ffffff',
              textShadow: '0 4px 0 #1b639e, 0 8px 20px rgba(0,0,0,0.25)',
              marginBottom: '8px',
            }}
          >
            How to Reach the Clubhouse
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1.2rem',
              color: '#fff4cc',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            All the key coordinates for our celebration day!
          </p>
        </div>

        {/* Venue Information Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 3vw, 28px)',
            marginBottom: '40px',
          }}
        >
          {/* Main Venue Card */}
          <div
            className="toy-card"
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: 'clamp(24px, 4vw, 36px)',
              border: '6px solid #ffffff',
              boxShadow: '0 20px 50px rgba(15, 52, 90, 0.22)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    background: '#2563eb',
                    borderRadius: '16px',
                    width: '52px',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <MapPin size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    CELEBRATION VENUE
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-toy)', fontSize: '1.5rem', color: 'var(--text-dark)', lineHeight: 1.2 }}>
                    {eventDetails.venue.name}
                  </h3>
                </div>
              </div>

              {/* Address details */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-fun)', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
                  {eventDetails.venue.address}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {eventDetails.venue.room}
                </div>
              </div>

              {/* Parking Notes */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '24px',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Car size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{eventDetails.venue.parkingNotes}</span>
              </div>
            </div>

            {/* GET DIRECTIONS Button */}
            <a
              href={eventDetails.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playSparkle()}
              className="btn-toy btn-toy-blue"
              style={{
                width: '100%',
                fontSize: '1.15rem',
                padding: '16px',
              }}
            >
              <Navigation size={20} />
              <span>GET DIRECTIONS (Google Maps)</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Right Column: Dress Code & Gift Registries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Dress Code Card */}
            <div
              className="toy-card"
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px 28px',
                border: '4px solid #ffffff',
                boxShadow: '0 16px 36px rgba(15, 52, 90, 0.16)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shirt size={22} color="#ff3b4e" />
                  <h4 style={{ fontFamily: 'var(--font-toy)', fontSize: '1.25rem', color: 'var(--text-dark)' }}>
                    Dress Code Suggestions
                  </h4>
                </div>
                <span
                  style={{
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 800,
                    color: '#92400e',
                  }}
                >
                  Warm &amp; Comfy Attire
                </span>
              </div>

              {/* Cozy Clothes Highlight Callout */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  marginBottom: '12px',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-fun)',
                  color: '#334155',
                  lineHeight: 1.5,
                }}
              >
                <strong>Stay Warm &amp; Comfortable:</strong> Wear cozy clothes that keep you relaxed! Warm sweaters, comfy cardigans, cozy knits, or casual winter layers.
              </div>

              <p style={{ fontFamily: 'var(--font-fun)', fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                {eventDetails.dressCode.description}
              </p>
              {/* Color chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {eventDetails.dressCode.palette.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#f8fafc',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-fun)',
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: color.color,
                        border: '1px solid #cbd5e1',
                      }}
                    />
                    <span>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baby Gift Registry Card with Rex Cutout */}
            <div
              id="gift-registry"
              className="toy-card"
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '26px 28px',
                border: '4px solid #ffffff',
                boxShadow: '0 16px 36px rgba(15, 52, 90, 0.16)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(234, 88, 12, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Gift size={22} color="#ea580c" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-toy)', fontSize: '1.25rem', color: 'var(--text-dark)', lineHeight: 1.2 }}>
                      Baby Gift Registry
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 700, fontFamily: 'var(--font-fun)' }}>
                      Amazon Canada
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid #fde68a',
                  }}
                >
                  Official Wishlist
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-fun)', fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.55 }}>
                Your love and presence are the greatest gifts of all! For friends and family who have kindly inquired about gifts for baby boy, Jannah &amp; Josiah have organized their wishlist on Amazon Canada:
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>
                    Jannah &amp; Josiah Hewko
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Baby Registry • Richmond, B.C.
                  </div>
                </div>

                <button
                  onClick={() => handleCopyLink(eventDetails.registry[0].url)}
                  style={{
                    background: copied ? '#dcfce7' : '#ffffff',
                    border: `1px solid ${copied ? '#86efac' : '#cbd5e1'}`,
                    color: copied ? '#15803d' : '#475569',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease',
                  }}
                  title="Copy registry link to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} color="#15803d" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={eventDetails.registry[0].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playSparkle()}
                className="btn-toy btn-toy-orange"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <Gift size={20} />
                <span>OPEN AMAZON BABY REGISTRY</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
