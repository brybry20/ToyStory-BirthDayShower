// =======================================================================
// SOUND EFFECTS & PROCEDURAL MUSIC BOX (Web Audio API)
// Provides instant, high-fidelity sound without external audio dependencies.
// =======================================================================

class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.sfxGain = this.audioCtx.createGain();
        this.sfxGain.gain.value = 0.35;
        this.sfxGain.connect(this.audioCtx.destination);

        this.musicGain = this.audioCtx.createGain();
        this.musicGain.gain.value = 0.18;
        this.musicGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Envelope Open Magical Chime / Fanfare
  playEnvelopeOpen() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    // Arpeggio notes: C5, E5, G5, B5, C6 (Toy chime glockenspiel)
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
    freqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      noteGain.gain.setValueAtTime(0, now + idx * 0.08);
      noteGain.gain.linearRampToValueAtTime(0.4, now + idx * 0.08 + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);

      osc.connect(noteGain);
      noteGain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.25);
    });
  }

  // Sparkle / Star Twinkle Sound
  playSparkle() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const freqs = [880, 1174.66, 1396.91, 1760];
    freqs.forEach((f, i) => {
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.05);

      g.gain.setValueAtTime(0.2, now + i * 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.5);

      osc.connect(g);
      g.connect(this.sfxGain);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.55);
    });
  }

  // Balloon Pop Sound
  playBalloonPop() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    // Sharp noise burst + low thud
    const bufferSize = this.audioCtx.sampleRate * 0.08;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.09);
  }

  // Rocket Launch Whoosh
  playRocketLaunch() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.95);
  }

  // Teddy Bear Squeak / Bounce
  playTeddySqueak() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Toy Block Tap / Click
  playBlockTap() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Buzz Lightyear Space Laser Pew-Pew
  playLaser() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      [0, 0.08].forEach(delay => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now + delay);
        osc.frequency.exponentialRampToValueAtTime(180, now + delay + 0.12);

        gain.gain.setValueAtTime(0.28, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.15);
      });
    } catch {
      // Audio safety fallback
    }
  }

  // Little Green Alien "Oooohhh! The Claw!"
  playAlien() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch {
      // Audio safety fallback
    }
  }

  // Jessie the Yodeling Cowgirl Cheer / Western Arpeggio
  playYodel() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      // High cheerful yodel hop: E5 -> B5 -> G#5 -> E6
      const notes = [659.25, 987.77, 830.61, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.09;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.01, start);
        gain.gain.linearRampToValueAtTime(0.28, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.24);
      });
    } catch {
      // Audio safety fallback
    }
  }

  // Bullseye Horse Gallop Clip-Clop
  playGallop() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      // Two quick hollow wood knocks
      [0, 0.1, 0.22, 0.32].forEach((delay, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        const freq = i % 2 === 0 ? 320 : 260;
        osc.frequency.setValueAtTime(freq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(110, now + delay + 0.06);

        gain.gain.setValueAtTime(0.35, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.005, now + delay + 0.07);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.08);
      });
    } catch {
      // Audio safety fallback
    }
  }

  // Slinky Dog Spring Boing ("Booo-ing!")
  playBoing() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      // Spring wobble up and down
      osc.frequency.linearRampToValueAtTime(620, now + 0.12);
      osc.frequency.linearRampToValueAtTime(340, now + 0.22);
      osc.frequency.linearRampToValueAtTime(500, now + 0.32);
      osc.frequency.linearRampToValueAtTime(300, now + 0.42);

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.46);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.48);
    } catch {
      // Audio safety fallback
    }
  }

  // Mr. Potato Head Pop ("Pop!")
  playPop() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.07);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio safety fallback
    }
  }

  // Hamm Piggy Bank Coin Drop ("Cha-Ching!")
  playCoin() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      // High metallic chime
      [987.77, 1318.51].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.42);
      });
    } catch {
      // Audio safety fallback
    }
  }

  // Rex Dinosaur Cheerful Rumble
  playRexRoar() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.28);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.34);
    } catch {
      // Audio safety fallback
    }
  }

  // Woody Yee-Haw / Western Guitar Slide
  playWoodyCheer() {
    this.playSparkle();
  }

  // Wheezy the Penguin Rubber Toy Squeak
  playSqueaker() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      [0, 0.16].forEach((delay) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now + delay);
        osc.frequency.exponentialRampToValueAtTime(1400, now + delay + 0.08);
        osc.frequency.exponentialRampToValueAtTime(800, now + delay + 0.14);

        gain.gain.setValueAtTime(0.3, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.16);
      });
    } catch {}
  }

  // Combat Carl Military Bugle Fanfare
  playFanfare() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      const notes = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.1;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.24);
      });
    } catch {}
  }

  // Buttercup Magical Unicorn Chime
  playMagicChime() {
    this.playSparkle();
  }

  // Trixie Friendly Triceratops Chirp
  playDinoChirp() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(580, now + 0.12);
      osc.frequency.linearRampToValueAtTime(420, now + 0.22);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {}
  }

  // Toy Chest / Surprise Fanfare
  playCelebration() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    const now = this.audioCtx.currentTime;
    // Joyful celebration chord progression: C, E, G, C(octave)
    const chords = [
      [523.25, 659.25, 783.99],
      [587.33, 739.99, 880.00],
      [659.25, 830.61, 987.77],
      [1046.5, 1318.5, 1567.98]
    ];

    chords.forEach((chord, chordIdx) => {
      const time = now + chordIdx * 0.14;
      chord.forEach(freq => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        noteGain.gain.setValueAtTime(0, time);
        noteGain.gain.linearRampToValueAtTime(0.2, time + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

        osc.connect(noteGain);
        noteGain.connect(this.sfxGain);

        osc.start(time);
        osc.stop(time + 0.85);
      });
    });
  }

  // Ambient Procedural Toy Music Box (Gentle Lullaby)
  startProceduralMusic() {
    this.init();
    if (!this.audioCtx) return;
    this.isPlayingMusic = true;

    // Charming music-box lullaby melody (frequencies in Hz)
    // Dreamy notes inspired by playful bedtime lullabies
    const melody = [
      { note: 523.25, dur: 450 }, // C5
      { note: 659.25, dur: 450 }, // E5
      { note: 783.99, dur: 700 }, // G5
      { note: 659.25, dur: 450 }, // E5
      { note: 880.00, dur: 450 }, // A5
      { note: 783.99, dur: 800 }, // G5
      { note: 659.25, dur: 450 }, // E5
      { note: 523.25, dur: 600 }, // C5
      { note: 587.33, dur: 450 }, // D5
      { note: 659.25, dur: 450 }, // E5
      { note: 587.33, dur: 700 }, // D5
      { note: 392.00, dur: 800 }, // G4
      { note: 523.25, dur: 450 }, // C5
      { note: 659.25, dur: 450 }, // E5
      { note: 783.99, dur: 700 }, // G5
      { note: 1046.5, dur: 900 }, // C6
    ];

    const playNextNote = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const current = melody[this.musicStep % melody.length];
      this.musicStep++;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle'; // Sweet music-box timber
      osc.frequency.setValueAtTime(current.note, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + current.dur / 1000 * 1.5);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + current.dur / 1000 * 1.6);

      this.musicTimeout = setTimeout(playNextNote, current.dur);
    };

    playNextNote();
  }

  stopProceduralMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopProceduralMusic();
      return false;
    } else {
      this.startProceduralMusic();
      return true;
    }
  }

  setVolume(val) {
    if (this.musicGain) {
      this.musicGain.gain.value = Math.max(0, Math.min(1, val));
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopProceduralMusic();
    }
    return this.isMuted;
  }
}

export const soundEffects = new SoundSystem();
