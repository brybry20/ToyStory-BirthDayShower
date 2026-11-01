import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Radio, ExternalLink } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function MusicPlayer({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useYouTube, setUseYouTube] = useState(true);
  const iframeRef = useRef(null);

  // YouTube video ID from the user: 1MPZRcyTrcU ("You've Got a Friend in Me" by Randy Newman)
  const youtubeVideoId = '1MPZRcyTrcU';

  const togglePlay = () => {
    soundEffects.playSparkle();
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (useYouTube && iframeRef.current) {
      const command = nextState
        ? '{"event":"command","func":"playVideo","args":""}'
        : '{"event":"command","func":"pauseVideo","args":""}';
      iframeRef.current.contentWindow.postMessage(command, '*');
    }

    // Also toggle procedural synth if YouTube is not active
    if (!useYouTube) {
      if (nextState) soundEffects.startProceduralMusic();
      else soundEffects.stopProceduralMusic();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (useYouTube && iframeRef.current) {
      const command = nextMuted
        ? '{"event":"command","func":"mute","args":""}'
        : '{"event":"command","func":"unMute","args":""}';
      iframeRef.current.contentWindow.postMessage(command, '*');
    }

    soundEffects.toggleMute();
  };

  // If user triggers open invitation, start music
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      togglePlay();
    }
  }, [autoPlayTrigger]);

  return (
    <div
      className="music-player-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Hidden YouTube Iframe for Randy Newman - You've Got a Friend in Me */}
      <iframe
        ref={iframeRef}
        id="yt-music-player"
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&loop=1&playlist=${youtubeVideoId}`}
        title="You've Got a Friend in Me - Randy Newman"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        allow="autoplay"
      />

      {/* Toy Story Retro Boombox / Walkie-Talkie Floating Capsule */}
      <div
        className="music-player-capsule"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fffdf5 100%)',
          borderRadius: '50px',
          padding: '8px 18px',
          boxShadow: '0 12px 30px rgba(18, 64, 110, 0.28), 0 4px 0 #b45309',
          border: '3px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Play/Pause Button styled like Woody's sheriff badge */}
        <button
          onClick={togglePlay}
          className="btn-toy-yellow music-player-btn"
          title={isPlaying ? "Pause 'You've Got a Friend in Me'" : "Play 'You've Got a Friend in Me'"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          style={{
            width: '44px',
            height: '44px',
            padding: 0,
            borderRadius: '50%',
            border: '2px solid #ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 0 #d49a00',
            flexShrink: 0,
          }}
        >
          {isPlaying ? (
            <Pause size={18} color="#523900" />
          ) : (
            <Play size={18} color="#523900" style={{ marginLeft: '2px' }} />
          )}
        </button>

        {/* Music Title Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className="music-player-title"
            style={{
              fontFamily: 'var(--font-toy)',
              fontSize: '0.9rem',
              color: 'var(--toy-blue-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Music size={14} color="#0284c7" />
              <span>You've Got a Friend in Me</span>
            </span>
          </div>
          <span
            className="music-player-subtext"
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-fun)',
              fontWeight: 700,
            }}
          >
            {isPlaying ? 'Randy Newman (Toy Story Theme)' : 'Tap play to listen'}
          </span>
        </div>

        {/* Animated Equalizer Sound Bars */}
        {isPlaying && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '3px',
              height: '18px',
              marginLeft: '2px',
            }}
          >
            <span
              style={{
                width: '3px',
                height: '100%',
                background: 'var(--toy-red)',
                borderRadius: '3px',
                animation: 'floatGentle 0.7s ease-in-out infinite alternate',
              }}
            />
            <span
              style={{
                width: '3px',
                height: '65%',
                background: 'var(--toy-yellow)',
                borderRadius: '3px',
                animation: 'floatGentle 0.5s ease-in-out infinite alternate-reverse',
              }}
            />
            <span
              style={{
                width: '3px',
                height: '90%',
                background: '#84cc16',
                borderRadius: '3px',
                animation: 'floatGentle 0.8s ease-in-out infinite alternate',
              }}
            />
          </div>
        )}

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: isMuted ? 'var(--toy-red)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
