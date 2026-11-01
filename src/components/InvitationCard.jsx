import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Sparkles, Heart, 
  Download, ExternalLink, Shirt, CheckCircle2, Star,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendarHelper';
import { soundEffects } from '../utils/soundEffects';
import { 
  JessieCharacter, 
  BullseyeCharacter, 
  ToyStoryBanner 
} from './ToyCharacters';

export default function InvitationCard() {
  const [downloaded, setDownloaded] = useState(false);
  const hasFiredConfetti = useRef(false);

  const handleViewportEnter = () => {
    if (!hasFiredConfetti.current) {
      hasFiredConfetti.current = true;
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16'],
        });
      } catch (e) {}
    }
  };

  const handleSaveDate = () => {
    soundEffects.playEnvelopeOpen();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ffd000', '#2563eb', '#dc2626', '#84cc16'],
      });
    } catch (e) {}

    downloadIcsFile(eventDetails);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <section
      id="invitation-card"
      style={{
        position: 'relative',
        padding: '60px 20px 80px 20px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Storybook / Toy Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={handleViewportEnter}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="toy-card"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)',
            border: '8px solid #ffffff',
            boxShadow: '0 25px 65px -10px rgba(15, 52, 90, 0.38), 0 0 0 3px #ffd000',
            borderRadius: '38px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top Toy Story Cowboy Plaid & Cowhide Ribbon */}
          <div
            style={{
              height: '18px',
              background: 'repeating-linear-gradient(45deg, #ffd000, #ffd000 14px, #dc2626 14px, #dc2626 28px)',
            }}
          />

          {/* Card Inner Content */}
          <div className="toy-card-inner" style={{ padding: 'clamp(20px, 4.5vw, 48px)', position: 'relative' }}>
            {/* Header Badge */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span
                className="toy-badge toy-badge-yellow"
                style={{
                  fontSize: '1rem',
                  padding: '8px 24px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  border: '2px solid #ffffff',
                  transform: 'rotate(-1deg)',
                }}
              >
                <Star size={16} fill="#b45309" color="#b45309" /> OFFICIAL TOY STORY INVITATION
              </span>
            </div>

            {/* Toy Story Logo Banner Flanked Symmetrically by Jessie & Bullseye */}
            <div
              className="invitation-banner-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(8px, 2.5vw, 24px)',
                marginBottom: '26px',
                position: 'relative',
                width: '100%',
              }}
            >
              {/* Jessie Cutout (Left flank - hidden on mobile for extra space) */}
              <div
                className="invitation-flank-character"
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(70px, 13vw, 115px)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <JessieCharacter height={130} />
              </div>

              {/* Center Logo Banner */}
              <div style={{ flex: '1 1 auto', maxWidth: '440px', textAlign: 'center', width: '100%' }}>
                <ToyStoryBanner title="TOY STORY" subtitle="BABY SHOWER CELEBRATION" />
              </div>

              {/* Bullseye Cutout (Right flank - hidden on mobile for extra space) */}
              <div
                className="invitation-flank-character"
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(70px, 13vw, 115px)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <BullseyeCharacter height={130} />
              </div>
            </div>

            {/* Main Title */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-fun)',
                  color: 'var(--text-muted)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {eventDetails.parents.combined} warmly invite you to celebrate the arrival of their
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-toy)',
                  fontSize: 'clamp(2.5rem, 6.5vw, 4rem)',
                  color: 'var(--toy-blue-dark)',
                  marginBottom: '8px',
                  textShadow: '0 3px 0 rgba(0,0,0,0.06)',
                }}
              >
                {eventDetails.baby.name}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '1.25rem',
                  color: 'var(--toy-red)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {eventDetails.baby.nickname}
              </p>
            </div>

            {/* A Message from the Parents */}
            <div
              style={{
                padding: '10px 16px 20px 16px',
                marginBottom: '28px',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Heart size={18} color="#0284c7" fill="#38bdf8" />
                <h3 style={{ fontFamily: 'var(--font-toy)', fontSize: '1.35rem', color: '#0369a1' }}>
                  {eventDetails.parents.messageHeading}
                </h3>
                <Heart size={18} color="#0284c7" fill="#38bdf8" />
              </div>

              <p style={{ fontFamily: 'var(--font-fun)', fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.6, marginBottom: '10px' }}>
                “{eventDetails.parents.messageParagraph1}”
              </p>
              <p style={{ fontSize: '1.02rem', color: '#334155', lineHeight: 1.6, marginBottom: '10px' }}>
                {eventDetails.parents.messageParagraph2}
              </p>
              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>
                {eventDetails.parents.messageParagraph3}
              </p>
              <div style={{ fontFamily: 'var(--font-toy)', color: 'var(--toy-red)', fontSize: '1.15rem' }}>
                — With love, {eventDetails.parents.combined}
              </div>
            </div>

            {/* Woody's Belt & Toy Divider */}
            <div
              style={{
                height: '8px',
                background: 'linear-gradient(90deg, #ffd000, #dc2626, #2563eb, #84cc16)',
                borderRadius: '8px',
                marginBottom: '36px',
              }}
            />

            {/* Event Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: 'clamp(14px, 3vw, 24px)',
                marginBottom: '36px',
              }}
            >
              {/* Date Block */}
              <div
                style={{
                  background: '#f4f9ff',
                  borderRadius: '22px',
                  padding: '20px',
                  border: '3px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    background: '#2563eb',
                    borderRadius: '16px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <Calendar size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    DATE
                  </div>
                  <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.3rem', color: 'var(--text-dark)', marginTop: '2px' }}>
                    {eventDetails.schedule.dateFormatted}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Save to your calendar below
                  </div>
                </div>
              </div>

              {/* Time Block */}
              <div
                style={{
                  background: '#fffdf0',
                  borderRadius: '22px',
                  padding: '20px',
                  border: '3px solid #fef08a',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    background: '#ffd000',
                    borderRadius: '16px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#553b00',
                    flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(255, 208, 0, 0.3)',
                  }}
                >
                  <Clock size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    TIME
                  </div>
                  <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.3rem', color: 'var(--text-dark)', marginTop: '2px' }}>
                    {eventDetails.schedule.timeFormatted}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Playtime & games begin promptly!
                  </div>
                </div>
              </div>

              {/* Venue Block */}
              <div
                style={{
                  background: '#fef5f6',
                  borderRadius: '22px',
                  padding: '20px',
                  border: '3px solid #fecdd3',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    background: '#dc2626',
                    borderRadius: '16px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(220, 38, 38, 0.3)',
                  }}
                >
                  <MapPin size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    VENUE
                  </div>
                  <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.25rem', color: 'var(--text-dark)', marginTop: '2px' }}>
                    {eventDetails.venue.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {eventDetails.venue.address}
                  </div>
                </div>
              </div>

              {/* Dress Code Block */}
              <div
                style={{
                  background: '#f3fbf6',
                  borderRadius: '22px',
                  padding: '20px',
                  border: '3px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    background: '#84cc16',
                    borderRadius: '16px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(132, 204, 22, 0.3)',
                  }}
                >
                  <Shirt size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    DRESS CODE
                  </div>
                  <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-dark)', marginTop: '2px' }}>
                    {eventDetails.dressCode.title}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                    {eventDetails.dressCode.palette.map((p, idx) => (
                      <span
                        key={idx}
                        title={p.name}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: p.color,
                          border: '2px solid #ffffff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        }}
                      />
                    ))}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      Toy Story colors!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Mathematically Centered Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '14px',
                maxWidth: '760px',
                margin: '10px auto 0 auto',
                width: '100%',
              }}
            >
              <button
                onClick={handleSaveDate}
                className="btn-toy btn-toy-yellow"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {downloaded ? (
                  <>
                    <CheckCircle2 size={20} color="#15803d" />
                    <span>Added to Calendar!</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>SAVE THE DATE (.ics)</span>
                  </>
                )}
              </button>

              <a
                href={getGoogleCalendarUrl(eventDetails)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-toy btn-toy-blue"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => soundEffects.playSparkle()}
              >
                <Calendar size={20} />
                <span>Google Calendar</span>
                <ExternalLink size={16} />
              </a>

              <a
                href={eventDetails.registry[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-toy btn-toy-orange"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => soundEffects.playSparkle()}
              >
                <Gift size={20} />
                <span>BABY REGISTRY</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
