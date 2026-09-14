import type { Competition, CompetitionResults } from '../types';

export const competitions: Competition[] = [
  {
    id: 'c1',
    name: 'Golden Spike Meeting',
    shortName: 'Golden Spike',
    date: '2026-09-12',
    status: 'upcoming',
    budget: 100,
    squadSize: 5,
    athletePool: [
      'a1','a2','a3','a4','a5','a6','a7','a8','a9','a10',
      'a11','a12','a13','a14','a15','a16','a17','a18','a19','a20',
    ],
  },
];

// Sample completed results for a past meet, used to demo the scoring
// engine and leaderboard before the "live" one has actually happened.
export const sampleResults: CompetitionResults = {
  competitionId: 'c1',
  entries: [
    { athleteId: 'a2', place: 1, isSeasonBest: true },
    { athleteId: 'a1', place: 2 },
    { athleteId: 'a13', place: 1 },
    { athleteId: 'a15', place: 2 },
    { athleteId: 'a3', place: 1, isSeasonBest: true },
    { athleteId: 'a4', place: 2 },
    { athleteId: 'a5', place: 3 },
    { athleteId: 'a6', place: 'DNF' },
    { athleteId: 'a7', place: 1, isNationalRecord: true },
    { athleteId: 'a8', place: 2 },
    { athleteId: 'a9', place: 3 },
    { athleteId: 'a11', place: 1 },
    { athleteId: 'a12', place: 2 },
    { athleteId: 'a10', place: 1 },
    { athleteId: 'a18', place: 1 },
    { athleteId: 'a16', place: 1, isSeasonBest: true },
    { athleteId: 'a17', place: 4 },
    { athleteId: 'a19', place: 2 },
    { athleteId: 'a20', place: 1 },
    { athleteId: 'a14', place: 'DQ' },
  ],
};
