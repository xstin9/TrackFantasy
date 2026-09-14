import type { CompetitionResults, ResultEntry, Team } from '../types';

// Place -> base points. Anything outside this table (finished but unplaced) scores 5.
const PLACE_POINTS: Record<number, number> = {
  1: 25,
  2: 20,
  3: 16,
  4: 13,
  5: 11,
  6: 10,
  7: 9,
  8: 8,
};

const SEASON_BEST_BONUS = 5;
const NATIONAL_RECORD_BONUS = 10;
const DNF_PENALTY = -5;
const DQ_PENALTY = -8;

export function pointsForEntry(entry: ResultEntry): number {
  let points = 0;

  if (entry.place === 'DNF') {
    return DNF_PENALTY;
  }
  if (entry.place === 'DQ') {
    return DQ_PENALTY;
  }

  points += PLACE_POINTS[entry.place] ?? 5;
  if (entry.isSeasonBest) points += SEASON_BEST_BONUS;
  if (entry.isNationalRecord) points += NATIONAL_RECORD_BONUS;

  return points;
}

export function scoreTeam(team: Team, results: CompetitionResults) {
  const breakdown = team.athleteIds.map((athleteId) => {
    const entry = results.entries.find((e) => e.athleteId === athleteId);
    return { athleteId, points: entry ? pointsForEntry(entry) : 0 };
  });

  const totalPoints = breakdown.reduce((sum, b) => sum + b.points, 0);
  return { totalPoints, breakdown };
}

export const SCORING_RULES_TEXT = [
  '1st: 25 pts · 2nd: 20 · 3rd: 16 · 4th: 13 · 5th: 11 · 6th: 10 · 7th: 9 · 8th: 8',
  'Finished but unplaced: 5 pts',
  `Season-best performance: +${SEASON_BEST_BONUS} pts`,
  `National record: +${NATIONAL_RECORD_BONUS} pts`,
  `DNF: ${DNF_PENALTY} pts · DQ: ${DQ_PENALTY} pts`,
];
