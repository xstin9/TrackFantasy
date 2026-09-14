import type { Team } from '../types';

const TEAMS_KEY = 'trackfantasy:teams';

function readTeams(): Team[] {
  try {
    const raw = localStorage.getItem(TEAMS_KEY);
    return raw ? (JSON.parse(raw) as Team[]) : [];
  } catch {
    return [];
  }
}

function writeTeams(teams: Team[]) {
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
}

function makeLeagueCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1 confusion
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export const teamsRepo = {
  // Mirrors what a Firestore `getDocs(collection(db, 'teams'))` call would return.
  list(): Team[] {
    return readTeams();
  },

  listByLeagueCode(code: string): Team[] {
    return readTeams().filter((t) => t.leagueCode.toUpperCase() === code.toUpperCase());
  },

  listByCompetition(competitionId: string): Team[] {
    return readTeams().filter((t) => t.competitionId === competitionId);
  },

  // Mirrors `addDoc(collection(db, 'teams'), team)`.
  create(input: Omit<Team, 'id' | 'createdAt' | 'leagueCode'> & { leagueCode?: string }): Team {
    const team: Team = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      leagueCode: input.leagueCode?.trim() || makeLeagueCode(),
    };
    const teams = readTeams();
    teams.push(team);
    writeTeams(teams);
    return team;
  },

  remove(id: string) {
    writeTeams(readTeams().filter((t) => t.id !== id));
  },

  generateLeagueCode: makeLeagueCode,
};
