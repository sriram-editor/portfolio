export interface EvidenceProject {
  id: string;
  title: string;
  category: string;
  photoUrl: string;
  videoUrl: string; // Embeddable URL or high-quality video mock
  note: string;
  noteType: 'sticky' | 'polaroid' | 'handwritten' | 'clip';
  coordinates: { x: number; y: number }; // Relative percentage for desktop cork board positioning
  connections: string[]; // Connected project IDs
  mission: string;
  objective: string;
  process: string[];
  toolsUsed: string[];
  skillsLearned: string[];
  lessonsLearned: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  duration: string;
  timelineScreenshotUrl: string;
}

export interface SkillItem {
  name: string;
  description: string;
  level: string;
  category: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  details: string;
}

export interface FutureMission {
  id: string;
  title: string;
  category: string;
  difficulty: 'Medium' | 'Hard' | 'Expert';
  completed: boolean;
}
