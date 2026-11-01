# ☁️ Toy Story-Inspired Baby Shower Invitation Website 🚀

A magical, animated baby shower invitation web experience inspired by Disney·Pixar's **Toy Story** and Andy's bedroom! 

Built with **React**, **Vite**, **Framer Motion**, and modern CSS, featuring authentic character art, tactile toy controls, interactive playroom, live countdown, gender/surprise reveal chest, memory gallery, and Randy Newman's iconic soundtrack **"You've Got a Friend in Me"**.

---

## 🌟 Key Features

1. **Cinematic 3D Opening Scene**:
   - Drifting Andy clouds, golden stars, and the authentic 3D **Toy Story** logo banner.
   - Interactive sealed envelope with Woody's cowhide ribbon and Sheriff badge wax seal.
   - "OPEN YOUR INVITATION" button with 3D flap flip, emerging invitation card, sound fanfare, and confetti cannon.
   - "Skip Intro" option for quick access.

2. **Official Toy Story Characters**:
   - 🤠 **Sheriff Woody**: Tipping his hat, yellow plaid shirt, cowhide vest, pull-string with random voice quotes ("There's a snake in my boot!", "You've got a friend in baby!").
   - 🚀 **Buzz Lightyear**: Extended wings, glowing red laser with sound effects, and "To Infinity and Beyond!" battle cry.
   - 👽 **Little Green Alien & The Claw**: Interactive arcade claw that swoops down from the ceiling to choose the baby!
   - 🦖 **Rex the Dinosaur**: Toothy cheerful smile, playful roar animations, and waving tiny arms.
   - 🐷 **Hamm the Piggy Bank**: Drops shiny gold coins into his slot with a "Cha-ching!" sound.
   - 🎾 **Pixar Luxo Ball**: Bounces and rolls 720° across Andy's room hardwood floorboards.

3. **Background Soundtrack ("You've Got a Friend in Me")**:
   - Seamlessly plays Randy Newman's beloved theme song `https://www.youtube.com/watch?v=1MPZRcyTrcU` directly in the custom Toy Story walkie-talkie player.
   - Play/Pause toggle, mute/unmute, and animated visualizer sound bars.

4. **Baby Shower Invitation Card**:
   - Storybook & Toy Box aesthetic with stitched borders and Andy's cloud wallpaper.
   - Date, time, venue, dress code color swatches, and RSVP deadline.
   - **"SAVE THE DATE"**: One-click download of an `.ics` calendar event + direct **Google Calendar** button!

5. **3D Toy Block Countdown Timer**:
   - Colorful alphabet cubes (Red, Blue, Yellow, Green) counting down Days, Hours, Minutes, and Seconds.
   - Tactile block tap sound effects and "Tap for Confetti Burst!" celebratory trigger.

6. **Andy's Toy Chest Baby Reveal**:
   - Large wooden toy chest labeled with **"ANDY"** in childlike crayon handwriting and guarded by Woody & Buzz.
   - Click "OPEN THE SURPRISE!" to pop open the chest with multi-stage confetti cannons.
   - Customizable gender reveal: **"IT'S A BOY!"**, **"IT'S A GIRL!"**, or **"OUR GREATEST ADVENTURE!"**.

7. **Polaroid Scrapbook & Etch-A-Sketch Lightbox**:
   - Responsive photo grid with colorful pushpins.
   - Click to view in an authentic **Etch-A-Sketch** red frame with white tuning knobs, keyboard navigation (Left/Right/Esc), and high-res captions.

8. **RSVP System & Guestbook**:
   - Full Name, Joyfully Accepts / Regretfully Declines, guest counter, and warm notes.
   - Stores submissions locally in browser `localStorage` with export to JSON.
   - Interactive corkboard guestbook with colorful sticky notes and real-time "❤️ Like" counters.

9. **Venue & Directions**:
   - Full venue address, parking instructions, and one-tap **"GET DIRECTIONS"** button linking directly to Google Maps.
   - Gift registry quick buttons (Amazon, Target, Babylist).

---

## 🛠️ Quick Start & Local Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `/dist` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 📝 Customizing Event Information

All text, dates, names, registry links, and venue addresses can be customized in **one single file**:

📁 `src/config/eventDetails.js`

```javascript
export const eventDetails = {
  parents: {
    parent1: "Andy",
    parent2: "Sarah",
    combined: "Andy & Sarah",
  },
  baby: {
    name: "Baby Oliver",
    nickname: "Our Little Space Ranger 🚀",
    gender: "boy", // "boy", "girl", or "neutral"
  },
  schedule: {
    dateFormatted: "Saturday, November 28, 2026",
    timeFormatted: "2:00 PM – 6:00 PM",
    targetCountdownDate: "2026-11-28T14:00:00", // Format: YYYY-MM-DDTHH:MM:SS
    rsvpDeadline: "November 15, 2026",
  },
  venue: {
    name: "Sunnyside Clubhouse (Playroom Ballroom)",
    address: "123 Storybook Lane, Tri-County Area, CA 90210",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sunnyside+Clubhouse",
  },
  // ...
};
```

---

## 🚀 Connecting RSVPs to Google Sheets / Database

By default, the website operates in **Local Demonstration Mode**, saving all RSVPs and guestbook wishes safely inside `localStorage` with a convenient "View Saved RSVPs" drawer and JSON export.

To receive instant notifications directly to the parents:

### Option A: Free Google Forms / Google Sheets Webhook
1. Create a Google Form with fields: Full Name, Attendance, Guests, Message.
2. In `src/components/RSVPForm.jsx`, point the `fetch()` POST call to your Google Form submission URL.
3. Every response will populate automatically in a live Google Sheet on the parents' phones!

### Option B: Supabase (PostgreSQL)
1. Create a free project on [Supabase](https://supabase.com).
2. Create an `rsvps` table with columns: `name`, `attending`, `guests`, `message`.
3. Call `supabase.from('rsvps').insert([...])` in `RSVPForm.jsx`.

---

## 📋 Checklist for Parents Before Publishing

- [ ] Update parents' names in `src/config/eventDetails.js`.
- [ ] Set baby's name or nickname.
- [ ] Set exact baby shower date & time (`targetCountdownDate`).
- [ ] Add the actual venue name, address, and Google Maps link.
- [ ] Insert gift registry links (Amazon, Target, Babylist).
- [ ] Select Gender Reveal setting (`gender: "boy" | "girl" | "neutral"`).
- [ ] Test the invitation on both mobile phone and desktop.

---

*"You've got a friend in me!"* 🤠🎈🚀
