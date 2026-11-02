import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Heart, User, Users, MessageSquare, Info, Download, Trash2, Phone, PhoneCall, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventDetails } from '../config/eventDetails';
import { soundEffects } from '../utils/soundEffects';
import { AlienCharacter, HammCharacter } from './ToyCharacters';
import { supabase } from '../utils/supabaseClient';

const RSVP_STORAGE_KEY = 'toystory_babyshower_rsvps';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: 'attending', // 'attending' or 'declined'
    guestCount: 1,
    contactInfo: '',
    dietaryNotes: '',
    message: '',
  });

  const [submittedList, setSubmittedList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRsvpSummary, setShowRsvpSummary] = useState(false);

  // Load RSVPs: First from local cache, then sync from Supabase Cloud Database with Realtime!
  useEffect(() => {
    // 1. Initial quick load from localStorage
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY);
      if (saved) {
        setSubmittedList(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load local RSVPs', e);
    }

    // 2. Fetch from Supabase Realtime Database if configured
    const fetchCloudRsvps = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('rsvps')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data) {
          const mapped = data.map((item) => ({
            id: item.id,
            fullName: item.full_name,
            attendance: item.attendance,
            guestCount: item.guest_count,
            contactInfo: item.contact_info || '',
            dietaryNotes: item.dietary_notes || '',
            message: item.message || '',
            submittedAt: item.created_at ? new Date(item.created_at).toLocaleString() : '',
          }));
          setSubmittedList(mapped);
          try {
            localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(mapped));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Failed to sync RSVPs from Supabase:', err);
      }
    };

    fetchCloudRsvps();

    // 3. Realtime listener: Whenever anyone submits on phone, laptop updates live!
    let channel;
    if (supabase) {
      try {
        channel = supabase
          .channel('realtime_rsvps_feed')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'rsvps' },
            () => {
              fetchCloudRsvps();
            }
          )
          .subscribe();
      } catch (e) {}
    }

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name so parents know who to expect!');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const newEntry = {
      id: Date.now(),
      fullName: formData.fullName.trim(),
      attendance: formData.attendance,
      guestCount: formData.attendance === 'attending' ? Number(formData.guestCount) : 0,
      contactInfo: formData.contactInfo.trim(),
      dietaryNotes: formData.dietaryNotes.trim(),
      message: formData.message.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    // 1. Post to Supabase Cloud Database if configured
    if (supabase) {
      try {
        const { error } = await supabase.from('rsvps').insert([
          {
            full_name: formData.fullName.trim(),
            attendance: formData.attendance,
            guest_count: formData.attendance === 'attending' ? Number(formData.guestCount) : 0,
            contact_info: formData.contactInfo.trim(),
            dietary_notes: formData.dietaryNotes.trim(),
            message: formData.message.trim(),
          },
        ]);
        if (error) {
          console.error('Supabase insert error:', error);
        }
      } catch (err) {
        console.error('Failed sending to Supabase:', err);
      }
    }

    // 2. Post to Google Sheets if configured
    if (eventDetails.rsvp.googleSheetScriptUrl) {
      try {
        await fetch(eventDetails.rsvp.googleSheetScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(newEntry),
        });
      } catch (err) {
        console.error('Failed sending to Google Sheets:', err);
      }
    }

    // 3. Send instant email notification to both bryan123james@gmail.com and Candidojannah18@gmail.com
    const notificationEmails = eventDetails.rsvp?.notificationEmails || [
      'bryan123james@gmail.com',
      'Candidojannah18@gmail.com',
    ];

    try {
      await Promise.allSettled(
        notificationEmails.map((email) =>
          fetch(`https://formsubmit.co/ajax/${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              _subject: `🎉 Bagong RSVP: ${formData.fullName} (${formData.attendance === 'attending' ? 'Attending' : 'Declined'})`,
              _template: 'table',
              'Full Name': formData.fullName,
              'Attendance': formData.attendance === 'attending' ? 'Attending 🎉' : 'Declined 💌',
              'Number of Guests': formData.attendance === 'attending' ? Number(formData.guestCount) : 0,
              'Contact Info': formData.contactInfo || 'N/A',
              'Dietary Notes / Allergy': formData.dietaryNotes || 'None',
              'Message to Parents': formData.message || 'No message',
              'Submitted At': new Date().toLocaleString(),
            }),
          })
        )
      );
    } catch (emailErr) {
      console.error('Email notification error:', emailErr);
    }

    // 4. Also keep in localStorage for local device confirmation
    const existing = submittedList.find(
      (r) => r.fullName.toLowerCase().trim() === formData.fullName.toLowerCase().trim()
    );

    let updatedList;
    if (existing) {
      updatedList = submittedList.map((r) => (r.id === existing.id ? newEntry : r));
    } else {
      updatedList = [newEntry, ...submittedList];
    }

    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updatedList));
      setSubmittedList(updatedList);
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
    soundEffects.playCelebration();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd000', '#2563eb', '#ff3b4e', '#38b000'],
      });
    } catch (e) {}

    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      attendance: 'attending',
      guestCount: 1,
      contactInfo: '',
      dietaryNotes: '',
      message: '',
    });
    setIsSuccess(false);
  };

  const handleDeleteEntry = async (id) => {
    const updated = submittedList.filter((item) => item.id !== id);
    setSubmittedList(updated);
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    if (supabase) {
      try {
        await supabase.from('rsvps').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete from Supabase:', e);
      }
    }
  };

  const handleExportRsvps = () => {
    if (!submittedList || submittedList.length === 0) return;

    // Excel-ready CSV headers
    const headers = [
      'Timestamp',
      'Full Name',
      'Attendance',
      'Number of Guests',
      'Contact Info',
      'Dietary Notes',
      'Message to Parents',
    ];

    const escapeCsv = (str) => {
      const stringValue = str === undefined || str === null ? '' : String(str);
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = submittedList.map((item) =>
      [
        escapeCsv(item.submittedAt || ''),
        escapeCsv(item.fullName || ''),
        escapeCsv(item.attendance === 'attending' ? 'Attending' : 'Declined'),
        escapeCsv(item.guestCount || (item.attendance === 'attending' ? 1 : 0)),
        escapeCsv(item.contactInfo || ''),
        escapeCsv(item.dietaryNotes || ''),
        escapeCsv(item.message || ''),
      ].join(',')
    );

    // \uFEFF UTF-8 BOM ensures Microsoft Excel renders cleanly with correct accents/characters
    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', url);
    dlAnchor.setAttribute(
      'download',
      `ToyStory_BabyShower_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="rsvp-section"
      style={{
        position: 'relative',
        padding: '70px 20px 90px 20px',
        zIndex: 10,
      }}
    >
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="toy-badge toy-badge-yellow" style={{ border: '2px solid #ffffff' }}>
              <Send size={16} /> RSVP CONFIRMATION
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
            Will You Join Our Adventure?
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
            Please let us know by {eventDetails.schedule.rsvpDeadline}
          </p>
        </div>

        {/* Form Card */}
        <div
          className="toy-card toy-card-inner"
          style={{
            background: '#ffffff',
            borderRadius: '32px',
            padding: 'clamp(24px, 5vw, 44px)',
            boxShadow: '0 25px 65px rgba(12, 50, 90, 0.28)',
            border: '8px solid #ffffff',
            position: 'relative',
          }}
        >
          {/* Hamm Piggy Bank (Counting Guests) on top-left corner */}
          <div
            className="toy-cutout-sticker"
            style={{
              position: 'absolute',
              top: '-52px',
              left: '20px',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
            onClick={() => soundEffects.playCoin()}
            title="Hamm counting the RSVPs!"
          >
            <HammCharacter height={95} />
          </div>

          {/* Animated Alien Cutout perching on top-right corner */}
          <div
            className="toy-cutout-sticker"
            style={{
              position: 'absolute',
              top: '-48px',
              right: '20px',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
            onClick={() => soundEffects.playAlien()}
            title="Oooooh! The RSVP Claw!"
          >
            <AlienCharacter height={95} />
          </div>
          {/* Direct Contact Card for Jo */}
          <div
            className="jo-rsvp-banner"
            style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
              border: '3px solid #38bdf8',
              borderRadius: '20px',
              padding: '18px 22px',
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: '0 6px 18px rgba(56, 189, 248, 0.12)',
            }}
          >
            <div className="jo-rsvp-banner-header" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                }}
              >
                <PhoneCall size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-toy)', fontSize: '1.25rem', color: '#0369a1', letterSpacing: '0.02em' }}>
                  RSVP Directly to Jo: (604) 892-7725
                </div>
                <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.88rem', color: '#475569' }}>
                  Call or text Jo directly, or submit your confirmation via the form below.
                </div>
              </div>
            </div>

            <div className="jo-rsvp-actions" style={{ display: 'flex', gap: '10px' }}>
              <a
                href={eventDetails.rsvp.callUrl}
                className="btn-toy btn-toy-blue"
                style={{ padding: '9px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Phone size={15} />
                <span>Call Jo</span>
              </a>
              <a
                href={eventDetails.rsvp.smsUrl}
                className="btn-toy btn-toy-yellow"
                style={{ padding: '9px 18px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={15} />
                <span>Text Jo</span>
              </a>
            </div>
          </div>

          {isSuccess ? (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '20px 10px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 8px 20px rgba(22, 163, 74, 0.2)',
                }}
              >
                <CheckCircle2 size={48} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-toy)',
                  fontSize: '2rem',
                  color: 'var(--text-dark)',
                  marginBottom: '10px',
                }}
              >
                {formData.attendance === 'attending'
                  ? 'HOORAY! YOU ARE ON THE ROSTER!'
                  : 'THANK YOU FOR LETTING US KNOW!'}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '1.1rem',
                  color: 'var(--text-muted)',
                  maxWidth: '480px',
                  margin: '0 auto 28px auto',
                  lineHeight: 1.5,
                }}
              >
                {formData.attendance === 'attending'
                  ? `We are thrilled to celebrate with you, ${formData.fullName}! Your spot for ${formData.guestCount} guest(s) has been noted.`
                  : `We'll miss you, ${formData.fullName}, but thank you so much for your kind warm wishes!`}
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleResetForm}
                  className="btn-toy btn-toy-yellow"
                  style={{ fontSize: '1rem', padding: '12px 28px' }}
                >
                  Submit Another RSVP
                </button>
                <button
                  onClick={() => setShowRsvpSummary(true)}
                  className="btn-toy btn-toy-white"
                  style={{ fontSize: '1rem', padding: '12px 28px' }}
                >
                  View Saved RSVPs ({submittedList.length})
                </button>
              </div>
            </motion.div>
          ) : (
            /* Active Form View */
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  htmlFor="fullName"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-dark)',
                    marginBottom: '8px',
                  }}
                >
                  Your Full Name <span style={{ color: 'var(--toy-red)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Woody Pride & Family"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px 14px 44px',
                      borderRadius: '16px',
                      border: '2px solid #e2e8f0',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: '#f8fafc',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--toy-blue)')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                  <User
                    size={20}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              {/* Attendance Radio Buttons */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-dark)',
                    marginBottom: '10px',
                  }}
                >
                  Will you be attending? <span style={{ color: 'var(--toy-red)' }}>*</span>
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '14px',
                  }}
                >
                  {/* Joyfully Accepts */}
                  <label
                    onClick={() => soundEffects.playBlockTap()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 16px',
                      borderRadius: '18px',
                      border: formData.attendance === 'attending' ? '3px solid #2563eb' : '2px solid #e2e8f0',
                      background: formData.attendance === 'attending' ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={formData.attendance === 'attending'}
                      onChange={handleChange}
                      style={{ accentColor: '#2563eb', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 800, color: '#1e40af', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Check size={16} color="#2563eb" /> Joyfully Accepts
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Can't wait to celebrate!</div>
                    </div>
                  </label>

                  {/* Regretfully Declines */}
                  <label
                    onClick={() => soundEffects.playBlockTap()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 16px',
                      borderRadius: '18px',
                      border: formData.attendance === 'declined' ? '3px solid #e11d48' : '2px solid #e2e8f0',
                      background: formData.attendance === 'declined' ? '#fff1f2' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="declined"
                      checked={formData.attendance === 'declined'}
                      onChange={handleChange}
                      style={{ accentColor: '#e11d48', width: '18px', height: '18px' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 800, color: '#9f1239', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <X size={16} color="#e11d48" /> Regretfully Declines
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Sending love from afar</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Guest Count (Only if Attending) */}
              {formData.attendance === 'attending' && (
                <div style={{ marginBottom: '22px' }}>
                  <label
                    htmlFor="guestCount"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-fun)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-dark)',
                      marginBottom: '8px',
                    }}
                  >
                    Number of Guests Attending (including yourself)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '14px 18px 14px 44px',
                        borderRadius: '16px',
                        border: '2px solid #e2e8f0',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        backgroundColor: '#f8fafc',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="1">1 Guest (Just Me)</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests (Party Crew)</option>
                    </select>
                    <Users
                      size={20}
                      color="#94a3b8"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>
              )}

              {/* Contact Info (Email or Phone) */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  htmlFor="contactInfo"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-fun)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-dark)',
                    marginBottom: '8px',
                  }}
                >
                  Email or Phone Number (Optional)
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  placeholder="For event updates & parking details"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '2px solid #e2e8f0',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>


              {/* Error Message */}
              {errorMessage && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    color: '#b91c1c',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button with Hamm Piggy Bank Cutout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-toy btn-toy-yellow"
                  style={{
                    flex: '1 1 240px',
                    fontSize: '1.25rem',
                    padding: '16px',
                    opacity: isSubmitting ? 0.75 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'SAVING TO GUEST LIST...' : 'CONFIRM RSVP'}</span>
                </button>

                {/* Hamm Piggy Bank Cutout Sticker */}
                <motion.div
                  className="toy-cutout-sticker"
                  animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={() => soundEffects.playBlockTap()}
                  title="Hamm is saving your RSVP!"
                  style={{ display: 'inline-flex' }}
                >
                  <HammCharacter height={85} />
                </motion.div>
              </div>

              {/* Guest Roster link */}
              {submittedList.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowRsvpSummary(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--toy-blue)',
                      fontFamily: 'var(--font-fun)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    View Saved RSVPs ({submittedList.length} recorded)
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal: Saved Local RSVPs Summary */}
        <AnimatePresence>
          {showRsvpSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRsvpSummary(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 12000,
                background: 'rgba(15, 30, 50, 0.75)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  maxWidth: '580px',
                  width: '100%',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  padding: '28px',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-toy)', fontSize: '1.6rem', color: 'var(--text-dark)' }}>
                    Saved RSVPs ({submittedList.length})
                  </h3>
                  <button
                    onClick={() => setShowRsvpSummary(false)}
                    style={{
                      border: 'none',
                      background: '#f1f5f9',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748b',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={handleExportRsvps}
                    className="btn-toy btn-toy-yellow"
                    style={{
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                    title="Download spreadsheet file that opens directly in Microsoft Excel"
                  >
                    <Download size={16} />
                    <span>EXPORT TO EXCEL (.CSV)</span>
                  </button>
                </div>

                {submittedList.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No RSVPs submitted yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {submittedList.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: '#f8fafc',
                          borderRadius: '16px',
                          padding: '14px 18px',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontFamily: 'var(--font-fun)' }}>
                            {item.fullName}{' '}
                            <span
                              style={{
                                fontSize: '0.75rem',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                background: item.attendance === 'attending' ? '#dcfce7' : '#fee2e2',
                                color: item.attendance === 'attending' ? '#166534' : '#991b1b',
                                marginLeft: '6px',
                              }}
                            >
                              {item.attendance === 'attending' ? `Attending (${item.guestCount})` : 'Declined'}
                            </span>
                          </div>
                          {item.message && (
                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                              "{item.message}"
                            </div>
                          )}
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                            Submitted: {item.submittedAt}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteEntry(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '6px',
                          }}
                          title="Delete entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
