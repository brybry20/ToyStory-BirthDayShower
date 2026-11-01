// =======================================================================
// EVENT DETAILS CONFIGURATION
// Real event details for Jannah & Josiah's Baby Shower!
// =======================================================================

import ultrasoundImg from '../assets/album_pictures/baby_boy_ultrasound.png';
import nurseryImg from '../assets/album_pictures/nursery_in_progress.png';
import momAndDadImg from '../assets/album_pictures/mom_and_dad.png';
import firstToyImg from '../assets/album_pictures/first_toy.png';
import babyShoesImg from '../assets/album_pictures/baby_shoes.png';
import invitationImg from '../assets/album_pictures/baby_shower_invitation.png';

export const eventDetails = {
  // Parents & Baby
  parents: {
    parent1: "Jannah",
    parent2: "Josiah",
    combined: "Jannah & Josiah",
    tagline: "Our Greatest Adventure Is About to Begin!",
    subheading: "You're Invited to Celebrate Our Baby Boy!",
    messageHeading: "A Message from the Parents",
    messageParagraph1: "Our greatest adventure is about to begin as we await the arrival of our baby boy!",
    messageParagraph2: "Please join us for a simple and intimate gathering as we celebrate this special chapter in our lives.",
    messageParagraph3: "Thank you for being part of our journey and for celebrating this beautiful moment with us. We can’t wait to share this special day with you!",
  },
  
  baby: {
    name: "Baby Boy",
    nickname: "Our Greatest Adventure",
    gender: "boy",
    expectedArrival: "Winter 2026",
    revealBadge: "IT'S A BOY!",
    revealHeading: "Our Greatest Adventure Is About to Begin!",
    revealMessage: "We can't wait to welcome our baby boy into our lives! Thank you for being part of our journey and surrounding our family with so much love.",
    ultrasoundPhoto: ultrasoundImg,
  },

  // Event Logistics
  schedule: {
    eventTitle: "Baby Shower Celebration",
    theme: "It's A Boy Story Baby Shower",
    dateFormatted: "Sunday, December 6, 2026",
    timeFormatted: "2:00 PM",
    targetCountdownDate: "2026-12-06T14:00:00",
    rsvpDeadline: "November 28, 2026",
  },

  venue: {
    name: "The Manoah Village Rec Hall",
    address: "10200 Fourth Avenue, Richmond B.C.",
    city: "Richmond, B.C.",
    room: "Village Community Hall",
    parkingNotes: "Guest parking available on site and street side along Fourth Avenue.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=10200+Fourth+Avenue+Richmond+BC",
  },

  rsvp: {
    contactPerson: "Jo",
    phone: "6048927725",
    phoneFormatted: "(604) 892-7725",
    callUrl: "tel:6048927725",
    smsUrl: "sms:6048927725",
    note: "Kindly RSVP to Jo by calling or texting 604-892-7725",
  },

  dressCode: {
    title: "Warm, Cozy & Casual (Toy Story Colors)",
    description: "Dress warmly and comfortably for December! Cozy knits, warm sweaters, comfy cardigans, warm layers, or casual jeans that make you feel relaxed. Feel free to accent with cheerful Toy Story colors: sky blue, denim, sunny yellow, cowboy red, or cozy cream.",
    palette: [
      { name: "Sky Blue", color: "#48a6e9" },
      { name: "Sunny Yellow", color: "#ffd000" },
      { name: "Cowboy Red", color: "#e63946" },
      { name: "Denim Blue", color: "#2563eb" },
      { name: "Cozy Cream", color: "#fef3c7" },
    ],
  },

  // Gift Registry Links
  registry: [
    {
      store: "Amazon Baby Registry",
      fullName: "Jannah & Josiah's Amazon Baby Registry",
      url: "https://www.amazon.ca/baby-reg/jannahandjosiah-hewko-february-2027-richmond/2R6502NVTNJQM?ref_=cm_sw_r_apann_dp_M6NMX0PQWJ8CE329V7C0&language=en-US",
      description: "Browse Jannah & Josiah's wishlist for baby boy on Amazon.ca",
      icon: "gift",
      color: "#ff9900",
      featured: true,
    },
  ],

  // Background Audio Config
  audio: {
    title: "Toyland Lullaby & Music Box",
    enableProceduralMusic: true,
    customAudioFile: "",
  },

  // Photo Gallery Items
  gallery: [
    {
      id: 1,
      title: "First Peek at Our Little One",
      subtitle: "Ultrasound Keepsake",
      caption: "Already waving hello to the world! Our baby boy is growing strong.",
      type: "ultrasound",
      category: "Milestone",
      image: "ultrasound",
      src: ultrasoundImg,
    },
    {
      id: 2,
      title: "Nursery In Progress",
      subtitle: "Painting Clouds on the Walls",
      caption: "Andy's iconic cloud wallpaper ready for countless bedtime stories and playtime.",
      type: "nursery",
      category: "Room Prep",
      image: "nursery",
      src: nurseryImg,
    },
    {
      id: 3,
      title: "Mom & Dad's Journey",
      subtitle: "Jannah & Josiah",
      caption: "Counting down the days until our greatest adventure begins.",
      type: "parents",
      category: "Parents",
      image: "parents",
      src: momAndDadImg,
    },
    {
      id: 4,
      title: "Our Baby's First Toys",
      subtitle: "Sweet Keepsakes",
      caption: "Classic alphabet wooden blocks, cozy teddy bear, and tiny cowboy boots.",
      type: "toys",
      category: "Keepsake",
      image: "toys",
      src: firstToyImg,
    },
    {
      id: 5,
      title: "Baby Shoes & Cowboy Hat",
      subtitle: "Tiny Boots Ready for Adventure",
      caption: "There's a snake in my boot! Teeny tiny baby booties ready to explore.",
      type: "booties",
      category: "Keepsake",
      image: "booties",
      src: babyShoesImg,
    },
    {
      id: 6,
      title: "Baby Shower Invitation",
      subtitle: "December 6, 2026",
      caption: "So thrilled to gather our favorite people to celebrate our baby boy.",
      type: "invitation",
      category: "Celebration",
      image: "invitation",
      src: invitationImg,
    },
  ],

  // Preloaded Demo Guestbook Wishes
  initialWishes: [
    {
      id: "w1",
      name: "Jo",
      relation: "Family",
      message: "So excited for Jannah & Josiah! Can't wait to celebrate our baby boy! Let the adventure begin!",
      color: "#d0ebff",
      date: "Oct 28, 2026",
      likes: 12,
    },
    {
      id: "w2",
      name: "Auntie Maria",
      relation: "Family Friend",
      message: "To infinity and beyond! Jannah and Josiah, you two are going to be wonderful parents!",
      color: "#fff3bf",
      date: "Oct 29, 2026",
      likes: 9,
    },
    {
      id: "w3",
      name: "Grandma Evelyn",
      relation: "Grandmother",
      message: "My heart is overflowing. A brand new little toy explorer joining our family tree. So much love for Jannah, Josiah, and baby boy!",
      color: "#ffc9c9",
      date: "Oct 30, 2026",
      likes: 18,
    },
  ],
};
