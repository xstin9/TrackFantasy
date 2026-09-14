import { useState } from 'react';
import { Link } from 'react-router-dom';
import { athletes } from '../data/athletes';
import { competitions, sampleResults } from '../data/competitions';
import { teamsRepo } from '../lib/storage';
import { scoreTeam, SCORING_RULES_TEXT } from '../lib/scoring';
import { AthleteCard } from '../components/AthleteCard';

export function MyTeam() {
  const [teams, setTeams] = useState(teamsRepo.list());

  if (teams.length === 0) {
    return (
      <div className="site-page mx-auto max-w-5xl px-5 text-center">
        <h1 className="font-display text-4xl font-bold">No team yet</h1>
        <p className="mt-2 text-[var(--lane-white)]/60">
          Draft a squad and it'll show up here.
        </p>
        <Link
          to="/compete"
          className="button-primary mt-6 inline-block rounded bg-[var(--split-lime)] px-5 py-3 font-display text-lg font-bold text-[var(--track-navy)]"
        >
          Go draft
        </Link>
      </div>
    );
  }

  function handleRemove(id: string) {
    teamsRepo.remove(id);
    setTeams(teamsRepo.list());
  }

  return (
    <div className="site-page mx-auto max-w-5xl px-5">
      <h1 className="font-display text-4xl font-bold">My teams</h1>

      <div className="mt-6 flex flex-col gap-8">
        {teams.map((team) => {
          const comp = competitions.find((c) => c.id === team.competitionId);
          const results = sampleResults.competitionId === team.competitionId ? sampleResults : null;
          const scored = results ? scoreTeam(team, results) : null;

          return (
            <div key={team.id} className="surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-semibold">{team.managerName}'s squad</p>
                  <p className="text-sm text-[var(--lane-white)]/60">
                    {comp?.shortName ?? 'Unknown competition'} · League code{' '}
                    <span className="font-mono-num font-bold text-[var(--split-lime)]">
                      {team.leagueCode}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {scored && (
                    <span className="font-mono-num text-2xl font-bold text-[var(--split-lime)]">
                      {scored.totalPoints} pts
                    </span>
                  )}
                  <button
                    onClick={() => handleRemove(team.id)}
                    className="button-secondary px-3 py-1.5 text-xs font-semibold text-[var(--lane-white)]/60 hover:border-[var(--finish-red)] hover:text-[var(--finish-red)]"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {team.athleteIds.map((id) => {
                  const athlete = athletes.find((a) => a.id === id);
                  if (!athlete) return null;
                  const points = scored?.breakdown.find((b) => b.athleteId === id)?.points;
                  return <AthleteCard key={id} athlete={athlete} points={points} />;
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="lane-divider my-8" />

      <details className="surface p-4">
        <summary className="cursor-pointer font-display text-lg font-semibold">
          How scoring works
        </summary>
        <ul className="mt-3 space-y-1 text-sm text-[var(--lane-white)]/70">
          {SCORING_RULES_TEXT.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
