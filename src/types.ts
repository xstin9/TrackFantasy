export type EventGroup = 'Sprints' | 'Hurdles' | 'Middle/Long' | 'Jumps' | 'Throws';

export interface Athlete {
  id: string;
  name: string;
  country: string; // ISO2 code for flag emoji
  event: string; // e.g. "100m", "400mH"
  group: EventGroup;
  price: number; // draft credits
  seasonBest: string; // display string e.g. "9.83"
}

export interface Competition {
  id: string;
  name: string;
  shortName: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  budget: number;
  squadSize: number;
  athletePool: string[]; // athlete ids
}

export interface ResultEntry {
  athleteId: string;
  place: number | 'DNF' | 'DQ';
  isSeasonBest?: boolean;
  isNationalRecord?: boolean;
}

export interface CompetitionResults {
  competitionId: string;
  entries: ResultEntry[];
}

export interface Team {
  id: string;
  competitionId: string;
  managerName: string;
  athleteIds: string[];
  leagueCode: string;
  createdAt: number;
}

export interface LeaderboardRow {
  team: Team;
  totalPoints: number;
  breakdown: { athleteId: string; points: number }[];
}
