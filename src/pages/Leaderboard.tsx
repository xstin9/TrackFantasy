import { useMemo, useState } from 'react';
import { competitions, sampleResults } from '../data/competitions';
import { teamsRepo } from '../lib/storage';
import { scoreTeam } from '../lib/scoring';
import type { LeaderboardRow } from '../types';

export function Leaderboard() {
  const [leagueCode, setLeagueCode] = useState('');
  const comp = competitions[0];

  const rows: LeaderboardRow[] = useMemo(() => {
    const pool = leagueCode.trim()
      ? teamsRepo.listByLeagueCode(leagueCode)
      : teamsRepo.listByCompetition(comp.id);

    return pool
      .map((team) => {
        const { totalPoints, breakdown } = scoreTeam(team, sampleResults);
        return { team, totalPoints, breakdown };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [leagueCode, comp.id]);

  return (
    <div className="site-page mx-auto max-w-5xl px-5">
      <h1 className="font-display text-4xl font-bold">Leaderboard</h1>
      <p className="mt-2 text-[var(--lane-white)]/60">{comp.shortName} · sample results</p>

      <label className="mt-6 flex max-w-xs flex-col gap-1">
        <span className="text-xs text-[var(--lane-white)]/60">Filter by private league code</span>
        <input
          value={leagueCode}
          onChange={(e) => setLeagueCode(e.target.value.toUpperCase())}
          placeholder="Leave blank for global"
          maxLength={6}
          className="rounded-[var(--radius-control)] border border-white/15 bg-black/20 px-3 py-2 text-sm uppercase outline-none transition-colors focus:border-[var(--split-lime)]"
        />
      </label>

      <div className="surface mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--track-navy-light)] text-xs uppercase text-[var(--lane-white)]/50">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">League</th>
              <th className="px-4 py-3 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[var(--lane-white)]/50">
                  No teams here yet.
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.team.id} className="border-t border-white/5 odd:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <span
                    className={`font-mono-num flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? 'bg-[var(--split-lime)] text-[var(--track-navy)]'
                        : 'bg-white/10 text-[var(--lane-white)]/70'
                    }`}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{row.team.managerName}</td>
                <td className="px-4 py-3 font-mono-num text-[var(--lane-white)]/50">
                  {row.team.leagueCode}
                </td>
                <td className="font-mono-num px-4 py-3 text-right text-base font-bold text-[var(--split-lime)]">
                  {row.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
