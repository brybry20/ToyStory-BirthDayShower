import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RealBoyStoryLogo from './RealBoyStoryLogo';
import { soundEffects } from '../utils/soundEffects';

// =======================================================================
// OFFICIAL GIPHY ANIMATED TOY STORY STICKERS (from giphy.com/explore/toy-story-stickers)
// High-energy transparent animated sticker GIF packs direct from Disney·Pixar on Giphy
// =======================================================================
import woodyGiphySticker from '../assets/giphy_stickers/woody_wave.gif';
import woodyHappySticker from '../assets/giphy_stickers/woody_happy.gif';
import woodyTipHatSticker from '../assets/giphy_stickers/woody_tip_hat.gif';
import woodyLaughSticker from '../assets/giphy_stickers/woody_laugh.gif';
import woodyBuzzFriendsSticker from '../assets/giphy_stickers/woody_buzz_friends.gif';
import woodyBuzzSticker from '../assets/giphy_stickers/woody_buzz_party.gif';
import buzzGiphySticker from '../assets/giphy_stickers/buzz_fly.gif';
import jessieGiphySticker from '../assets/giphy_stickers/jessie_yodel.gif';
import jessieDanceSticker from '../assets/giphy_stickers/jessie_dance.gif';
import bullseyeGiphySticker from '../assets/giphy_stickers/bullseye_run.gif';
import rexGiphySticker from '../assets/giphy_stickers/rex_dino.gif';
import alienGiphySticker from '../assets/giphy_stickers/aliens_three.gif';
import alienSingleSticker from '../assets/giphy_stickers/alien_single.gif';
import hammGiphySticker from '../assets/giphy_stickers/hamm_pig.gif';
import forkyGiphySticker from '../assets/giphy_stickers/forky_dance.gif';
import slinkyGiphySticker from '../assets/giphy_stickers/slinky_bounce.gif';
import potatoHeadGiphySticker from '../assets/giphy_stickers/potato_head.gif';
import celebrationSticker from '../assets/giphy_stickers/celebration_party.gif';
import dukeCaboomSticker from '../assets/giphy_stickers/duke_caboom.gif';
import disneyBabySticker from '../assets/giphy_stickers/disney_baby_toystory.gif';
import happyToyStorySticker from '../assets/giphy_stickers/happy_toy_story.gif';
import pixarTechToysSticker from '../assets/giphy_stickers/pixar_tech_toys.gif';

export const GIPHY_STICKERS = {
  woody: woodyGiphySticker,
  woodyHappy: woodyHappySticker,
  woodyTipHat: woodyTipHatSticker,
  woodyLaugh: woodyLaughSticker,
  woodyBuzzFriends: woodyBuzzFriendsSticker,
  woodyBuzz: woodyBuzzSticker,
  buzz: buzzGiphySticker,
  jessie: jessieGiphySticker,
  jessieDance: jessieDanceSticker,
  bullseye: bullseyeGiphySticker,
  rex: rexGiphySticker,
  alien: alienGiphySticker,
  alienSingle: alienSingleSticker,
  hamm: hammGiphySticker,
  forky: forkyGiphySticker,
  slinky: slinkyGiphySticker,
  potatoHead: potatoHeadGiphySticker,
  celebration: celebrationSticker,
  dukeCaboom: dukeCaboomSticker,
  disneyBaby: disneyBabySticker,
  happyToyStory: happyToyStorySticker,
  pixarTechToys: pixarTechToysSticker,
};

// Aliases for global compatibility
export const TOY_CUTOUTS = GIPHY_STICKERS;
export const TOY_STORY_ANIMATIONS = GIPHY_STICKERS;

// =======================================================================
// INTERACTIVE TOY WRAPPER WITH SPEECH BUBBLE & SOUND
// Die-cut sticker feel, crisp edges, spring physics on hover & tap
// =======================================================================

export function InteractiveToy({
  name,
  quote,
  quoteColor = '#1d4ed8',
  src,
  alt,
  height = 180,
  onClick,
  onSound,
  className = '',
  style = {},
  imgStyle = {},
  bubblePlacement = 'top',
  interactive = true,
}) {
  const [isTalking, setIsTalking] = useState(false);
  const timerRef = useRef(null);

  const handleClick = (e) => {
    if (onSound) {
      onSound();
    }
    if (interactive) {
      setIsTalking(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsTalking(false);
      }, 3200);
    }
    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      className={`interactive-toy-wrapper ${className}`}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.08, y: -5 } : {}}
      whileTap={interactive ? { scale: 0.94 } : {}}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        cursor: interactive ? 'pointer' : 'default',
        touchAction: 'manipulation',
        ...style,
      }}
      title={interactive ? `Click ${name} to hear from them!` : name}
    >
      {/* Interactive Speech Bubble Quote */}
      <AnimatePresence>
        {isTalking && quote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: bubblePlacement === 'bottom' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: bubblePlacement === 'bottom' ? -10 : 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            style={{
              position: 'absolute',
              [bubblePlacement === 'bottom' ? 'bottom' : 'top']: '-58px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#ffffff',
              border: `2.5px solid ${quoteColor}`,
              borderRadius: '18px',
              padding: '7px 16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              zIndex: 90,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-fun)',
                fontWeight: 800,
                fontSize: '0.84rem',
                color: quoteColor,
                letterSpacing: '0.3px',
              }}
            >
              {quote}
            </div>
            {/* Speech bubble tail */}
            <div
              style={{
                position: 'absolute',
                [bubblePlacement === 'bottom' ? 'top' : 'bottom']: '-8px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '13px',
                height: '13px',
                background: '#ffffff',
                borderRight: `2.5px solid ${quoteColor}`,
                borderBottom: `2.5px solid ${quoteColor}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt || name}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 8px 18px rgba(12, 45, 80, 0.22))',
          pointerEvents: 'none',
          ...imgStyle,
        }}
        loading="eager"
      />
    </motion.div>
  );
}

// =======================================================================
// OFFICIAL CORE ANIMATED GIPHY STICKER CHARACTERS
// Direct from https://giphy.com/explore/toy-story-stickers
// =======================================================================

export function WoodyCharacter({ height = 220, size = 220, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Sheriff Woody"
      quote="Reach for the sky, partner!"
      quoteColor="#b45309"
      src={GIPHY_STICKERS.woody}
      height={finalHeight}
      onSound={() => soundEffects.playWoodyCheer()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function BuzzCharacter({ height = 210, size = 210, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Buzz Lightyear"
      quote="To infinity and beyond!"
      quoteColor="#15803d"
      src={GIPHY_STICKERS.buzz}
      height={finalHeight}
      onSound={() => soundEffects.playLaser()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function JessieCharacter({ height = 180, size = 180, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Jessie the Cowgirl"
      quote="Yeeee-haw! Time to celebrate!"
      quoteColor="#dc2626"
      src={GIPHY_STICKERS.jessie}
      height={finalHeight}
      onSound={() => soundEffects.playYodel()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function BullseyeCharacter({ height = 160, size = 160, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Bullseye the Horse"
      quote="Ride like the wind, Bullseye!"
      quoteColor="#854d0e"
      src={GIPHY_STICKERS.bullseye}
      height={finalHeight}
      onSound={() => soundEffects.playGallop()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function RexCharacter({ height = 170, size = 170, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Rex the Dinosaur"
      quote="Rawr! I am so excited for the baby!"
      quoteColor="#16a34a"
      src={GIPHY_STICKERS.rex}
      height={finalHeight}
      onSound={() => soundEffects.playRexRoar()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function AlienCharacter({ height = 140, size = 140, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Little Green Alien"
      quote="The Claw has chosen the best family!"
      quoteColor="#15803d"
      src={GIPHY_STICKERS.alien}
      height={finalHeight}
      onSound={() => soundEffects.playAlien()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function HammCharacter({ height = 135, size = 135, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Hamm Piggy Bank"
      quote="Cha-ching! Best baby celebration ever!"
      quoteColor="#db2777"
      src={GIPHY_STICKERS.hamm}
      height={finalHeight}
      onSound={() => soundEffects.playCoin()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function ForkyCharacter({ height = 135, size = 135, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Forky"
      quote="I am not trash, I am a party guest!"
      quoteColor="#ea580c"
      src={GIPHY_STICKERS.forky}
      height={finalHeight}
      onSound={() => soundEffects.playBoing()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function SlinkyCharacter({ height = 145, size = 145, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Slinky Dog"
      quote="Golly bob howdy! I am stretched to celebrate!"
      quoteColor="#b45309"
      src={GIPHY_STICKERS.slinky}
      alt="Slinky Dog"
      height={finalHeight}
      onSound={() => soundEffects.playBoing()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function PotatoHeadCharacter({ height = 145, size = 145, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Mr. Potato Head"
      quote="Look, I got my party eyes on!"
      quoteColor="#9a3412"
      src={GIPHY_STICKERS.potatoHead}
      alt="Mr. Potato Head"
      height={finalHeight}
      onSound={() => soundEffects.playPop()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function DukeCaboomCharacter({ height = 145, size = 145, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Duke Caboom"
      quote="Yes we Canada! Doing stunts for our little adventurer!"
      quoteColor="#e11d48"
      src={GIPHY_STICKERS.dukeCaboom}
      alt="Duke Caboom"
      height={finalHeight}
      onSound={() => soundEffects.playLaser()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function DisneyBabyCharacter({ height = 140, size = 140, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Disney Baby Toy Story"
      quote="Welcome to the world, precious baby boy!"
      quoteColor="#0284c7"
      src={GIPHY_STICKERS.disneyBaby}
      alt="Disney Baby Toy Story"
      height={finalHeight}
      onSound={() => soundEffects.playSparkle()}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

export function CelebrationCharacter({ height = 210, size = 210, onClick, interactive = true, className = '', style = {} }) {
  const finalHeight = height || size;
  return (
    <InteractiveToy
      name="Woody & Buzz Celebration"
      quote="To infinity and beyond! Best adventure ever!"
      quoteColor="#1d4ed8"
      src={GIPHY_STICKERS.woodyBuzz}
      height={finalHeight}
      onSound={() => {
        soundEffects.playBuzz();
        setTimeout(() => soundEffects.playWoodyCheer(), 250);
      }}
      onClick={onClick}
      interactive={interactive}
      className={className}
      style={style}
    />
  );
}

// =======================================================================
// FALLBACK EXPORTS FOR COMPLETE COMPATIBILITY
// All old character requests are cleanly redirected to official Giphy animated stickers
// =======================================================================
export const TrixieCharacter = RexCharacter;
export const WheezyCharacter = HammCharacter;
export const ButtercupCharacter = BullseyeCharacter;
export const MrPricklepantsCharacter = PotatoHeadCharacter;
export const BonnieCharacter = DisneyBabyCharacter;
export const AndyCharacter = WoodyCharacter;
export const MollyCharacter = JessieCharacter;
export const EmilyCharacter = JessieCharacter;
export const BigBabyCharacter = DisneyBabyCharacter;
export const KenCharacter = WoodyCharacter;
export const BarbieCharacter = JessieCharacter;
export const CombatCarlCharacter = DukeCaboomCharacter;
export const DollyCharacter = ForkyCharacter;
export const AlMcWhigginCharacter = PotatoHeadCharacter;
export const StinkyPeteCharacter = WoodyCharacter;
export const BoPeepCharacter = JessieCharacter;

// =======================================================================
// SVG TOY STORY ICONS & DECORATIONS
// =======================================================================

export function TheClaw({ className = '', style = {}, size = 90 }) {
  return (
    <motion.svg
      viewBox="0 0 100 120"
      width={size}
      height={(size * 120) / 100}
      className={`the-claw ${className}`}
      style={{ overflow: 'visible', cursor: 'pointer', ...style }}
      whileHover={{ y: 8, scale: 1.05 }}
      whileTap={{ y: 16 }}
      onClick={() => soundEffects.playAlien()}
      title="The Claw! Click to lower!"
    >
      <line x1="50" y1="0" x2="50" y2="45" stroke="#94a3b8" strokeWidth="3" />
      <rect x="42" y="44" width="16" height="12" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <ellipse cx="50" cy="58" rx="18" ry="8" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <path d="M 36,60 Q 18,85 30,110 Q 34,110 36,105 Q 26,88 40,62 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
      <path d="M 64,60 Q 82,85 70,110 Q 66,110 64,105 Q 74,88 60,62 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
      <path d="M 50,62 Q 50,92 50,114 Q 52,114 54,112 Q 54,92 50,62 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <circle cx="48" cy="52" r="3" fill="#ffffff" opacity="0.8" />
    </motion.svg>
  );
}

export function LuxoBall({ className = '', style = {}, size = 80 }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`luxo-ball ${className}`}
      style={{ overflow: 'visible', cursor: 'pointer', ...style }}
      whileHover={{ rotate: 360, scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.8 }}
      onClick={() => soundEffects.playBoing()}
      title="Pixar Luxo Ball - Click to roll!"
    >
      <circle cx="50" cy="50" r="46" fill="#ffd000" stroke="#d97706" strokeWidth="2" />
      <path d="M 6,50 Q 50,65 94,50 Q 94,40 92,35 Q 50,50 8,35 Z" fill="#2563eb" />
      <polygon
        points="50,26 56,42 74,42 59,53 65,70 50,60 35,70 41,53 26,42 44,42"
        fill="#ef4444"
        stroke="#b91c1c"
        strokeWidth="1"
      />
      <ellipse cx="34" cy="30" rx="14" ry="8" fill="#ffffff" opacity="0.45" transform="rotate(-30 34 30)" />
    </motion.svg>
  );
}

export function ItsABoyStoryLogo({ className = '', style = {}, maxWidth = 480, showClouds = true, interactive = true }) {
  return (
    <RealBoyStoryLogo
      className={className}
      style={style}
      maxWidth={maxWidth}
      showClouds={showClouds}
      interactive={interactive}
    />
  );
}

export function ToyStoryBanner({ title = 'TOY STORY', subtitle, size = 'normal', maxWidth = 460 }) {
  const actualMaxWidth = size === 'large' ? 560 : maxWidth;
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        width: '100%',
        maxWidth: `${actualMaxWidth}px`,
      }}
    >
      <RealBoyStoryLogo maxWidth={actualMaxWidth} showClouds={true} interactive={true} />
    </div>
  );
}

// =======================================================================
// ALL 22 OFFICIAL GIPHY ANIMATED TOY STORY STICKERS
// Sourced direct from https://giphy.com/explore/toy-story-stickers
// =======================================================================
export const ALL_22_GIPHY_STICKERS = [
  { id: 'woody_wave', name: 'Sheriff Woody', role: 'Official GIPHY Sticker', quote: "Reach for the stars, little partner!", quoteColor: '#b45309', image: GIPHY_STICKERS.woody, sound: () => soundEffects.playWoodyCheer() },
  { id: 'buzz_fly', name: 'Buzz Lightyear', role: 'Official GIPHY Sticker', quote: "To infinity and beyond!", quoteColor: '#15803d', image: GIPHY_STICKERS.buzz, sound: () => soundEffects.playLaser() },
  { id: 'jessie_yodel', name: 'Jessie Cowgirl', role: 'Official GIPHY Sticker', quote: "Yodel-ay-hee-hoo! Welcome little baby!", quoteColor: '#dc2626', image: GIPHY_STICKERS.jessie, sound: () => soundEffects.playYodel() },
  { id: 'bullseye_run', name: 'Bullseye Steed', role: 'Official GIPHY Sticker', quote: "Ride like the wind, Bullseye!", quoteColor: '#854d0e', image: GIPHY_STICKERS.bullseye, sound: () => soundEffects.playGallop() },
  { id: 'rex_dino', name: 'Rex Dinosaur', role: 'Official GIPHY Sticker', quote: "Roar! I am so excited for the baby!", quoteColor: '#16a34a', image: GIPHY_STICKERS.rex, sound: () => soundEffects.playRexRoar() },
  { id: 'aliens_three', name: 'Three Green Aliens', role: 'Official GIPHY Sticker', quote: "The Claw has chosen a wonderful baby boy!", quoteColor: '#059669', image: GIPHY_STICKERS.alien, sound: () => soundEffects.playAlien() },
  { id: 'slinky_bounce', name: 'Slinky Dog', role: 'Official GIPHY Sticker', quote: "Golly bob howdy! I'm stretched to celebrate!", quoteColor: '#ca8a04', image: GIPHY_STICKERS.slinky, sound: () => soundEffects.playBoing() },
  { id: 'potato_head', name: 'Mr. Potato Head', role: 'Official GIPHY Sticker', quote: "Look, I got my party eyes on!", quoteColor: '#9a3412', image: GIPHY_STICKERS.potatoHead, sound: () => soundEffects.playPop() },
  { id: 'hamm_pig', name: 'Hamm Piggy Bank', role: 'Official GIPHY Sticker', quote: "Cha-ching! Best baby shower ever!", quoteColor: '#db2777', image: GIPHY_STICKERS.hamm, sound: () => soundEffects.playCoin() },
  { id: 'forky_dance', name: 'Forky Spork Dance', role: 'Official GIPHY Sticker', quote: "I am not trash, I am a party guest!", quoteColor: '#ea580c', image: GIPHY_STICKERS.forky, sound: () => soundEffects.playBoing() },
  { id: 'woody_buzz_party', name: 'Woody & Buzz Party', role: 'Official GIPHY Sticker', quote: "Best toy buddies celebrating Jannah & Josiah!", quoteColor: '#2563eb', image: GIPHY_STICKERS.woodyBuzz, sound: () => soundEffects.playFanfare() },
  { id: 'woody_buzz_friends', name: 'Woody & Buzz Friends', role: 'Official GIPHY Sticker', quote: "You got a friend in me, partner!", quoteColor: '#1d4ed8', image: GIPHY_STICKERS.woodyBuzzFriends, sound: () => soundEffects.playSparkle() },
  { id: 'duke_caboom', name: 'Duke Caboom', role: 'Official GIPHY Sticker', quote: "Yes we Canada! Doing stunts for the baby!", quoteColor: '#e11d48', image: GIPHY_STICKERS.dukeCaboom, sound: () => soundEffects.playLaser() },
  { id: 'disney_baby', name: 'Disney Baby Toy Story', role: 'Official GIPHY Sticker', quote: "Welcome to the world, precious baby boy!", quoteColor: '#0284c7', image: GIPHY_STICKERS.disneyBaby, sound: () => soundEffects.playSparkle() },
  { id: 'woody_tip_hat', name: 'Woody Tipping Hat', role: 'Official GIPHY Sticker', quote: "Howdy partner! Congratulations mom and dad!", quoteColor: '#b45309', image: GIPHY_STICKERS.woodyTipHat, sound: () => soundEffects.playWoodyCheer() },
  { id: 'jessie_dance', name: 'Jessie Dancing', role: 'Official GIPHY Sticker', quote: "Kick up your boots and celebrate!", quoteColor: '#dc2626', image: GIPHY_STICKERS.jessieDance, sound: () => soundEffects.playYodel() },
  { id: 'woody_happy', name: 'Woody Happy Bounce', role: 'Official GIPHY Sticker', quote: "Yee-haw! The greatest celebration in the wild west!", quoteColor: '#b45309', image: GIPHY_STICKERS.woodyHappy, sound: () => soundEffects.playWoodyCheer() },
  { id: 'woody_laugh', name: 'Woody Laughing', role: 'Official GIPHY Sticker', quote: "Haha! Best baby party ever!", quoteColor: '#b45309', image: GIPHY_STICKERS.woodyLaugh, sound: () => soundEffects.playWoodyCheer() },
  { id: 'alien_single', name: 'Green Alien Solo', role: 'Official GIPHY Sticker', quote: "The Claw is our master!", quoteColor: '#15803d', image: GIPHY_STICKERS.alienSingle, sound: () => soundEffects.playAlien() },
  { id: 'celebration_party', name: 'Confetti Celebration', role: 'Official GIPHY Sticker', quote: "Hooray! Confetti and joy for everyone!", quoteColor: '#f59e0b', image: GIPHY_STICKERS.celebration, sound: () => soundEffects.playCelebration() },
  { id: 'happy_toy_story', name: 'Happy Toy Celebration', role: 'Official GIPHY Sticker', quote: "We are so happy for your growing family!", quoteColor: '#0284c7', image: GIPHY_STICKERS.happyToyStory, sound: () => soundEffects.playSparkle() },
  { id: 'pixar_tech_toys', name: 'Pixar Tech Toys', role: 'Official GIPHY Sticker', quote: "Ready for high-tech baby shower fun!", quoteColor: '#7c3aed', image: GIPHY_STICKERS.pixarTechToys, sound: () => soundEffects.playLaser() },
];

export const ALL_16_CHARACTERS = ALL_22_GIPHY_STICKERS;
export const OFFICIAL_GIPHY_ANIMATED_STICKERS = ALL_22_GIPHY_STICKERS;
