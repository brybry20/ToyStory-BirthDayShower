import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageSquarePlus, Send, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';

const WISHES_STORAGE_KEY = 'toystory_baby_wishes';

const STICKY_COLORS = [
  { name: 'Yellow', bg: '#fff3bf', border: '#f59f00', pin: '#f59f00' },
  { name: 'Sky Blue', bg: '#d0ebff', border: '#339af0', pin: '#228be6' },
  { name: 'Pink Coral', bg: '#ffc9c9', border: '#ff6b6b', pin: '#fa5252' },
  { name: 'Mint Green', bg: '#c3fae8', border: '#38d9a9', pin: '#20c997' },
  { name: 'Lilac', bg: '#eebefa', border: '#cc5de8', pin: '#be4bdb' },
];

export default function BabyGuestbook() {
  const [wishes, setWishes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relation: 'Friend',
    message: '',
    color: STICKY_COLORS[0].bg,
  });

  // Load wishes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHES_STORAGE_KEY);
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(eventDetails.initialWishes);
      }
    } catch (e) {
      setWishes(eventDetails.initialWishes);
    }
  }, []);

  const handleLike = (id) => {
    soundEffects.playSparkle();
    const updated = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, likes: (w.likes || 0) + 1 };
      }
      return w;
    });
    setWishes(updated);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handlePostWish = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    soundEffects.playCelebration();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd000', '#ff3b4e', '#2563eb'],
      });
    } catch (e) {}

    const newWish = {
      id: 'w_' + Date.now(),
      name: formData.name.trim(),
      relation: formData.relation.trim() || 'Loved One',
      message: formData.message.trim(),
      color: formData.color,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    setFormData({
      name: '',
      relation: 'Friend',
      message: '',
      color: STICKY_COLORS[0].bg,
    });
    setShowForm(false);
  };

  return (
    <section
      id="guestbook-section"
      style={{
        position: 'relative',
        padding: '70px 20px 90px 20px',
        zIndex: 10,
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="toy-badge toy-badge-yellow" style={{ border: '2px solid #ffffff' }}>
              <Sparkles size={16} /> WISHES & BLESSINGS
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
            Playroom Message Board
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1.2rem',
              color: '#fff4cc',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              marginBottom: '20px',
            }}
          >
            Leave words of love, blessings, or advice for the journey to infinity and beyond!
          </p>

          <button
            onClick={() => {
              soundEffects.playBlockTap();
              setShowForm(!showForm);
            }}
            className="btn-toy btn-toy-white"
            style={{ fontSize: '1.05rem', padding: '12px 28px' }}
          >
            <MessageSquarePlus size={20} color="#2563eb" />
            <span>{showForm ? 'Close Message Form' : 'Write a Wish for Baby'}</span>
          </button>
        </div>

        {/* Add Wish Form (Collapsible) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -15 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -15 }}
              style={{ overflow: 'hidden', marginBottom: '40px' }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '28px',
                  padding: '28px',
                  boxShadow: '0 16px 40px rgba(15, 52, 90, 0.22)',
                  maxWidth: '640px',
                  margin: '0 auto',
                  border: '4px solid #ffffff',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-toy)',
                    fontSize: '1.5rem',
                    color: 'var(--toy-blue-dark)',
                    marginBottom: '18px',
                    textAlign: 'center',
                  }}
                >
                  Pin Your Blessing to Andy's Board
                </h3>

                <form onSubmit={handlePostWish}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Buzz Lightyear"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                        Relation / Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Proud Aunt / Godmother"
                        value={formData.relation}
                        onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Sticky Color Picker */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                      Choose Sticky Note Color
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {STICKY_COLORS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: c.bg })}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: c.bg,
                            border: formData.color === c.bg ? `3px solid ${c.border}` : '2px solid #ffffff',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                            transform: formData.color === c.bg ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.15s ease',
                          }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                      Your Wish or Advice *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your sweet note for the baby and parents..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: '2px solid #e2e8f0',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-toy btn-toy-yellow"
                    style={{ width: '100%', fontSize: '1.1rem', padding: '14px' }}
                  >
                    <Send size={18} /> Pin to Board
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corkboard Grid of Sticky Notes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(14px, 3vw, 24px)',
          }}
        >
          {wishes.map((wish, idx) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6, rotate: idx % 2 === 0 ? 2 : -2 }}
              style={{
                background: wish.color || '#fff3bf',
                borderRadius: '16px',
                padding: '24px 20px 18px 20px',
                boxShadow: '0 10px 24px rgba(18, 55, 95, 0.15)',
                position: 'relative',
                transform: `rotate(${idx % 3 === 0 ? '-2deg' : idx % 3 === 1 ? '1.5deg' : '-1deg'})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {/* Pushpin at Top */}
              <div
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: idx % 2 === 0 ? '#ff3b4e' : '#2563eb',
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              />

              {/* Message Content */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-fun)',
                    fontSize: '1.05rem',
                    color: '#262626',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    fontStyle: 'italic',
                  }}
                >
                  "{wish.message}"
                </p>
              </div>

              {/* Author & Footer */}
              <div
                style={{
                  borderTop: '1px dashed rgba(0,0,0,0.12)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.1rem', color: '#1f2937' }}>
                    {wish.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                    {wish.relation} • {wish.date}
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(wish.id)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#e11d48',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                  }}
                  title="Send love"
                >
                  <Heart size={14} fill="#e11d48" />
                  <span>{wish.likes || 1}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
