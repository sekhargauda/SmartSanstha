// For the main game selection cards on the ExploreGames page
export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estMinutes: number;
  icon: string;
  isAvailable: boolean;
  route: string;
}

// The type for the detailed article data used in the Memory Game
export interface ArticleData {
  article: string;
  summary: string;
  details: {
    title: string;
    text: string;
  }[];
}

export interface IMeterEffect {
  freedom: number;
  order: number;
}

export interface IToken {
  id: string;
  label: string;
  meter: IMeterEffect;
  explanation: string;
}

export interface IRandomEvent {
  chance: number;
  effect: IMeterEffect;
  desc: string;
}

export interface IScenario {
  id: string;
  title: string;
  description: string;
  tokens: IToken[];
  randomEvents?: IRandomEvent[];
}



// The type for a single flippable card on the Memory Game board
// It inherits everything from ArticleData and adds game-specific properties
export interface ArticleCard extends ArticleData {
  uid: string;
  flipped: boolean;
  matched: boolean;
}
