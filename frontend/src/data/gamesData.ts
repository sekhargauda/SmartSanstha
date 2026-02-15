// frontend/src/data/gamesData.ts

import { Game, IScenario } from '../types';

export const GAMES: Game[] = [
  {
    id: 'memory',
    title: 'Constitution Card Match',
    subtitle: 'Match articles to learn key facts',
    description: 'Test your memory while learning about constitutional articles. Match pairs of cards to reveal their meanings.',
    difficulty: 'easy',
    estMinutes: 5,
    icon: 'Brain',
    isAvailable: true,
    // FIXED: Changed from 'memory-game' to '/games/memory' to match App.tsx
    route: '/games/memory'
  },
  {
    id: 'civic-city-builder',
    title: 'Civic City Builder',
    subtitle: 'Solve city problems with your duties',
    description: 'Apply your Fundamental Duties to solve real-world civic problems and watch your city thrive. A game of strategy and responsibility.',
    difficulty: 'medium',
    estMinutes: 5,
    icon: 'Building', 
    isAvailable: true,
    // FIXED: Changed from 'civic-city-builder' to '/games/civic-builder' to match App.tsx
    route: '/games/civic-builder',
  },
  {
    id: 'rights-duties',
    title: 'Rights vs. Duties',
    subtitle: 'Balance freedom and order in scenarios',
    description: 'Navigate real-world scenarios and make decisions that balance fundamental rights with civic duties.',
    difficulty: 'hard',
    estMinutes: 10,
    icon: 'Scale',
    isAvailable: true,
    // FIXED: Changed from 'rights-duties-game' to '/games/rights-duties' to match App.tsx
    route: '/games/rights-duties'
  },
  {
    id: 'jigsaw-puzzle',
    title: 'Constitutional Jigsaw',
    subtitle: 'Piece together constitutional knowledge',
    description: 'Arrange puzzle pieces to complete images related to the Constitution and learn about each article.',
    difficulty: 'medium',
    estMinutes: 8,
    icon: 'Puzzle',
    isAvailable: true,
    // FIXED: Changed from 'jigsaw-puzzle' to '/games/jigsaw' to match App.tsx
    route: '/games/jigsaw'
  },
  {
    id: 'spin-wheel',
    title: 'Spin the Constitutional Wheel',
    subtitle: 'Test your knowledge with random questions',
    description: 'Spin the wheel and answer questions about different parts of the Constitution.',
    difficulty: 'medium',
    estMinutes: 7,
    icon: 'Zap',
    isAvailable: false,
    route: '/games/spin-wheel'
  },
  {
    id: 'guess-article',
    title: 'Guess the Article',
    subtitle: 'Identify articles from descriptions',
    description: 'Read descriptions and guess which constitutional article they refer to.',
    difficulty: 'easy',
    estMinutes: 5,
    icon: 'Lightbulb',
    isAvailable: false,
    route: '/games/guess-article'
  }
];

export const SCENARIOS: IScenario[] = [
  {
    id: "rvd-001",
    title: "University Protest",
    description: "Students are organizing a large-scale protest on campus against a sudden fee hike. Tensions are high.",
    tokens: [
      { id: "right_speech", label: "Freedom of Speech", meter: { freedom: 15, order: -10 }, explanation: "Upholding the students' right to protest is a cornerstone of a free society (Article 19). It allows grievances to be aired publicly." },
      { id: "duty_order", label: "Maintain Public Order", meter: { freedom: -8, order: 12 }, explanation: "The university has a duty to ensure the safety of all students and prevent disruption to its educational activities." },
      { id: "policy_mediate", label: "Mediation Policy", meter: { freedom: 5, order: 5 }, explanation: "Initiating dialogue between the student union and the administration can lead to a peaceful resolution, balancing expression with order." }
    ],
    randomEvents: [{ chance: 0.3, effect: { freedom: -5, order: -15 }, desc: "The protest turns disruptive, leading to minor property damage." }],
  },
  {
    id: "rvd-002",
    title: "Investigative Journalism Report",
    description: "A major news outlet is about to publish a story with leaked documents exposing corruption in a government infrastructure project.",
    tokens: [
      { id: "right_press", label: "Freedom of the Press", meter: { freedom: 20, order: -15 }, explanation: "A free press is vital for holding power to account and informing the public. Exposing corruption strengthens democracy." },
      { id: "duty_security", label: "National Security", meter: { freedom: -25, order: 20 }, explanation: "The government argues the leaked documents contain sensitive information that could compromise national security if published." },
      { id: "policy_redact", label: "Redact Sensitive Info", meter: { freedom: -5, order: 10 }, explanation: "Publishing the story while redacting names and sensitive data balances transparency with security concerns." }
    ],
  },
  {
    id: "rvd-003",
    title: "Community Festival Permit",
    description: "A local religious group wants to hold a large public festival in the city's main park, which will require road closures.",
    tokens: [
      { id: "right_assembly", label: "Freedom of Assembly", meter: { freedom: 15, order: -5 }, explanation: "Citizens have the right to assemble peacefully, which includes cultural and religious celebrations." },
      { id: "duty_public_access", label: "Ensure Public Access", meter: { freedom: -10, order: 15 }, explanation: "The city must ensure that public spaces and services remain accessible to all citizens, minimizing disruption from private events." },
    ],
    randomEvents: [{ chance: 0.2, effect: { freedom: 0, order: -10 }, desc: "Counter-protesters arrive, creating friction and requiring a larger police presence." }],
  }
];