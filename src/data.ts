import { EvidenceProject, SkillItem, TimelineEvent, FutureMission } from './types';

export const EVIDENCE_PROJECTS: EvidenceProject[] = [
  {
    id: 'evidence-001',
    title: 'Squash & Stretch Animation',
    category: 'Animation Fundamentals',
    photoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Fallback high-quality HTML5 video
    note: 'Learning timing and animation fundamentals. First breakthrough in manual keyframe graph interpolation.',
    noteType: 'sticky',
    coordinates: { x: 18, y: 15 },
    connections: ['evidence-004', 'evidence-005'],
    mission: 'Master basic physical laws of motion and manually implement keyframe curves in video editing.',
    objective: 'Recreate a high-fidelity bouncing ball loop with accurate acceleration, terminal velocity, squashed impacts, and stretched flight path.',
    process: [
      'Engineered custom bezier velocity curves to simulate realistic gravitational pull.',
      'Aligned audio impacts within 1/60th of a second (1 frame precision) of surface contact.',
      'Exported at variable framerates to test retention and motion-blur settings.'
    ],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Audition'],
    skillsLearned: ['Keyframe Interpolation', 'Bezier Curves', 'SFX Timing Synchrony', 'Framerates'],
    lessonsLearned: 'Pacing is entirely psychological. A single frame offset in squash-and-stretch can break the illusion of weight completely. Graph editing is the difference between amateur and professional motion.',
    beforeAfter: {
      before: 'Linear, robotic keyframes with static circular shape and no speed variation.',
      after: 'Highly organic, snappy motion with accurate mass deformation and responsive sub-bass sound design.'
    },
    duration: '18 Hours Deliberate Practice',
    timelineScreenshotUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evidence-002',
    title: 'iPhone 17 Pro Concept Edit',
    category: '3D Product Promo',
    photoUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    note: 'Promo practice video. Re-timing 3D render passes to match intense sub-bass sound cues.',
    noteType: 'polaroid',
    coordinates: { x: 82, y: 20 },
    connections: ['evidence-003', 'evidence-005'],
    mission: 'Establish high-energy visual pacing using clean product aesthetics (Apple-inspired).',
    objective: 'Edit raw open-source product mockups into a high-octane 15-second teaser with modern color grading and extreme speed ramping.',
    process: [
      'Synchronized rapid zoom actions to dynamic drums and synthesized clock-ticks.',
      'Color graded raw footage to emphasize the titanium texture using customized LUT adjustments.',
      'Created custom letterbox animations to enhance widescreen theatrical visual density.'
    ],
    toolsUsed: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    skillsLearned: ['Speed Ramping', 'LUT Color Grading', 'Sub-Bass Layering', 'Widescreen Formatting'],
    lessonsLearned: 'Videos live or die on sound design. Sound tells the viewer how heavy, smooth, or premium an object is before their brain even registers the visual details.',
    beforeAfter: {
      before: 'Slow, un-graded 3D render clip sequence with default audio track.',
      after: 'High-impact titanium-themed showcase with heavy sound accents, speed-ramped transitions, and cinematic color.'
    },
    duration: '35 Hours Deliberate Practice',
    timelineScreenshotUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evidence-003',
    title: 'Crypto Coin Camera Animation',
    category: '3D Camera Movement',
    photoUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    note: 'Cinematic camera movement. Working with multi-cam structures, camera shakes, and depth-of-field simulation.',
    noteType: 'handwritten',
    coordinates: { x: 78, y: 70 },
    connections: ['evidence-002', 'evidence-005'],
    mission: 'Simulate high-end physical camera operators inside virtual environments.',
    objective: 'Take a spinning crypto-coin sequence and composite real-world camera artifacts like organic camera shakes, lens flares, and depth-of-field refocusing.',
    process: [
      'Utilized wiggler expressions to create multi-axis hand-held micro-jitters.',
      'Designed custom rack-focus keyframes to pull attention from background code to the foreground coin.',
      'Applied chromatic aberration and dust textures to give the 3D renders a vintage digital look.'
    ],
    toolsUsed: ['After Effects', 'Premiere Pro', 'Universe Plugins'],
    skillsLearned: ['Rack Focusing', 'Wiggler Expressions', 'Chromatic Aberration', 'Camera Shake Modeling'],
    lessonsLearned: 'Perfect CGI looks fake. Adding imperfections (handheld jitter, lens dust, chromatic aberration) is what tricking the human eye into believing it is a physical camera is all about.',
    beforeAfter: {
      before: 'A clean, sterile vector rotate with static focal range.',
      after: 'A gritty, deep-dimension coin showcase with tactile focus-pulls and natural handheld camera feel.'
    },
    duration: '22 Hours Deliberate Practice',
    timelineScreenshotUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evidence-004',
    title: 'Devin Jatho Style Recreation',
    category: 'Pacing & Retaining',
    photoUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    note: 'Studied professional pacing. Attempting to replicate high-retention cinematic documentary style storytelling with technical map layers.',
    noteType: 'clip',
    coordinates: { x: 22, y: 68 },
    connections: ['evidence-001', 'evidence-005'],
    mission: 'Deconstruct and recreate the complex documentary style of Devin Jatho, focusing on deep information pacing.',
    objective: 'Recreate a 30-second documentary monologue featuring moving maps, paper textures, vintage typewriter captions, and deep narrative pacing.',
    process: [
      'Clipped historical archives, matching frame-rates to 18fps for a documentary look.',
      'Sourced high-contrast parchment paper scans, animating them with organic position jitters.',
      'Layered vintage camera sounds, paper shuffles, and typewriter keyclicks for sensory immersion.'
    ],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Photoshop'],
    skillsLearned: ['Documentary Pacing', 'Parchment Texturing', 'Archive Curation', 'Vintage Soundscapes'],
    lessonsLearned: 'Information must not just be told, it must be staged. Using paper textures and sound effects keeps the brain engaged during heavy educational topics.',
    beforeAfter: {
      before: 'A simple stock video sequence with default voiceover audio.',
      after: 'An immersive historical-style narrative with custom map overlays, animated physical evidence, and high tactile feedback.'
    },
    duration: '45 Hours Deliberate Practice',
    timelineScreenshotUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evidence-005',
    title: 'Retention Edit Showcase',
    category: 'Viewer Psychology',
    photoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    note: 'Viewer psychology experiment. Analyzing viewer retention curves and engineering hooks every 1.5 seconds.',
    noteType: 'sticky',
    coordinates: { x: 50, y: 45 }, // Connected to every project
    connections: ['evidence-001', 'evidence-002', 'evidence-003', 'evidence-004'],
    mission: 'Confront the modern attention span by engineering a short-form video that holds 80%+ retention.',
    objective: 'Design and edit a high-retention 45-second script with fast-paced graphical support, sound cues, and interactive subtitle physics.',
    process: [
      'Built custom bouncing subtitle templates using spring keyframe expressions.',
      'Mapped visual spikes to matching sound design elements every 1.2 to 1.8 seconds.',
      'Employed contrast shifts (color to B&W) during key conceptual transitions to force visual re-focusing.'
    ],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Audition'],
    skillsLearned: ['Hook Engineering', 'Pop Subtitles', 'Contrast Swaps', 'Audio Riser Mapping'],
    lessonsLearned: 'Retention editing is not about flashiness; it is about cognitive pacing. If a viewer predicts what happens next, they swipe. You must continuously introduce tiny visual or auditory pattern breaks.',
    beforeAfter: {
      before: 'A talking-head edit with occasional basic lower-thirds.',
      after: 'A hyper-stimulating, psychological edit utilizing custom kinetic typography, sound layers, and rhythmic scene variations.'
    },
    duration: '30 Hours Deliberate Practice',
    timelineScreenshotUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  { name: 'Premiere Pro', category: 'Core Editor', level: '85%', description: 'Multi-cam synchronization, timeline management, advanced shortcut workflows, and structured nested sequences.' },
  { name: 'After Effects', category: 'Compositing', level: '75%', description: 'Manual speed curves in graph editor, keyframe velocity manipulation, track mattes, and text element tracking.' },
  { name: 'Motion Graphics', category: 'Animation', level: '70%', description: 'Kinetic typography layouts, clean intro titles, custom vector transformations, and spring bounce animation presets.' },
  { name: 'Short Form Content', category: 'Engagement', level: '80%', description: 'High-retention subtitle layouts, snappy pacing, precise sound design triggers, and micro pattern breaks.' },
  { name: 'Longform Content', category: 'Pacing', level: '75%', description: 'Engaging documentary style structures, archival footage compilation, multi-act narrative flow, and background soundscapes.' }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: '13 June 2026',
    title: 'Mission Commenced',
    description: 'Began deliberate training program.',
    details: 'Set up local workflow, structured deliberate practice sheets, and defined visual standards to study and build editing projects with absolute honesty.'
  },
  {
    date: '17 June 2026',
    title: 'Premiere Pro Mastery',
    description: 'Acquired core multi-cam and timeline pacing skills.',
    details: 'Focused on high-efficiency trimming, nested sequences, structural cuts, frame-accurate keyframing, and custom hotkey layouts for rapid workflow execution.'
  },
  {
    date: '20 June 2026',
    title: 'After Effects Mastery',
    description: 'Developed advanced visual effects processing workflows.',
    details: 'Practiced graph editor mechanics, keyframe velocity curves, motion tracking, masked layers, and composite animation rendering loops.'
  },
  {
    date: '27 June 2026',
    title: 'Editing Fundamental Mastery',
    description: 'Deconstructed physical rules of rhythm and timing.',
    details: 'Mastered squash and stretch physics, speed-ramping dynamics, sound layering transients, and seamless focal flow techniques.'
  },
  {
    date: '30 June 2026',
    title: 'Devin Jatho Editing Style Mastery',
    description: 'Recreated advanced documentary-style pacing.',
    details: 'Engineered high-retention cinematic pacing with animated parchment papers, dynamic map pathways, typewriter triggers, and immersive retro audio soundscapes.'
  },
  {
    date: '06 July 2026',
    title: 'Cinematic Short Form Editing Mastery',
    description: 'Engineered high-retention short-form video layers.',
    details: 'Studied modern attention span pacing. Built kinetic pop-up typography, sound effects mapping, pattern breaks, and visual contrast triggers.'
  },
  {
    date: '10 July 2026',
    title: 'Viral Animation Mastery',
    description: 'Advanced motion graphics composition.',
    details: 'Layered high-energy 3D virtual camera motions, rack focus pulls, chromatic aberration artifacts, and complex text overlays for absolute visual engagement.'
  },
  {
    date: 'Present Day',
    title: 'Continuous Growth',
    description: 'The progress is going on.',
    details: 'Continuing to practice daily, reverse-engineer premium content, log real timeline hours, and improve editing capabilities without shortcuts.'
  }
];

export const FUTURE_MISSIONS: FutureMission[] = [
  { id: 'f-1', title: 'Devin Jatho Editing Style', category: 'Pacing Style', difficulty: 'Hard', completed: true },
  { id: 'f-2', title: 'Basic Motion Graphics', category: 'Animation', difficulty: 'Medium', completed: true },
  { id: 'f-3', title: 'Pacing Optimized Content', category: 'Pacing', difficulty: 'Medium', completed: true },
  { id: 'f-4', title: 'Cinematic Editing', category: 'Creative Edit', difficulty: 'Hard', completed: false },
  { id: 'f-5', title: 'SAAS Animations', category: 'SAAS', difficulty: 'Medium', completed: false },
  { id: 'f-6', title: 'SaaS Trailer', category: 'SAAS', difficulty: 'Expert', completed: false },
  { id: 'f-7', title: 'Interactive Historical Documentary Short', category: 'Documentary', difficulty: 'Hard', completed: false },
  { id: 'f-8', title: 'First Professional Client Campaign', category: 'Client', difficulty: 'Expert', completed: false }
];
