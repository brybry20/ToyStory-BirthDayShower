import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CloudBackground from './components/CloudBackground';
import OpeningAnimation from './components/OpeningAnimation';
import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import CountdownTimer from './components/CountdownTimer';
import PhotoGallery from './components/PhotoGallery';
import RSVPForm from './components/RSVPForm';
import LocationSection from './components/LocationSection';
import ClosingScene from './components/ClosingScene';
import MusicPlayer from './components/MusicPlayer';
import RopeClimber from './components/RopeClimber';
import './styles/index.css';
import './styles/animations.css';

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [startMusic, setStartMusic] = useState(false);

  const handleCompleteOpening = () => {
    setShowOpening(false);
    setStartMusic(true);
  };

  return (
    <div className="toystory-app-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 1. Fullscreen Opening Animation with 3D Envelope & Formal Invitation Letter */}
      <AnimatePresence>
        {showOpening && (
          <OpeningAnimation onComplete={handleCompleteOpening} />
        )}
      </AnimatePresence>

      {/* 2. Andy's Iconic Bedroom Clouds Background (Fixed across entire site) */}
      <CloudBackground animated={true} />

      {/* 3. Andy's Rope Climbing Scroll Animation Effect */}
      {!showOpening && <RopeClimber />}

      {/* 4. Main Website Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Section A: Hero */}
        <HeroSection heroActive={!showOpening} />

        {/* Section B: Baby Shower Invitation Card */}
        <InvitationCard />

        {/* Section C: Toy Block Countdown Timer with Automatic Confetti Burst on Scroll */}
        <CountdownTimer />

        {/* Section D: Baby Memory Snapshot Photo Gallery with Etch-A-Sketch Lightbox */}
        <PhotoGallery />

        {/* Section E: Interactive RSVP Confirmation Form & Direct Contact */}
        <RSVPForm />

        {/* Section F: Venue Location & Event Info */}
        <LocationSection />

        {/* Section G: Warm Closing Scene with Woody & Buzz Waving and "See You There" Note */}
        <ClosingScene />
      </main>

      {/* 6. Toy Story Music Player ("You've Got a Friend in Me") */}
      <MusicPlayer autoPlayTrigger={startMusic} />
    </div>
  );
}
