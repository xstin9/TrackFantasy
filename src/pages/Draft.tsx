import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { athletes } from '../data/athletes';
import { useApp } from '../context/AppContext';
import { AthleteCard } from '../components/AthleteCard';
import { teamsRepo } from '../lib/storage';
import type { EventGroup } from '../types';

const GROUPS: (EventGroup | 'All')[] = ['All', 'Sprints', 'Hurdles', 'Middle/Long', 'Jumps', 'Throws'];

export function Draft() {
  const navigate = useNavigate();
  const { selectedCompetition, draftAthleteIds, toggleDraftAthlete, managerName, setManagerName } =
    useApp();
  const [filter, setFilter] = useState<(typeof GROUPS)[number]>('All');
  const [joinCode, setJoinCode] = useState('');

  if (!selectedCompetition) {
    navigate('/compete');
    return null;
  }

  const competition = selectedCompetition;
  const pool = athletes.filter((a) => competition.athletePool.includes(a.id));
  const visible = filter === 'All' ? pool : pool.filter((a) => a.group === filter);

  const drafted = pool.filter((a) => draftAthleteIds.includes(a.id));
  const spent = drafted.reduce((sum, a) => sum + a.price, 0);
  const remaining = competition.budget - spent;
  const squadFull = draftAthleteIds.length >= competition.squadSize;
  const missingAthletes = Math.max(0, competition.squadSize - draftAthleteIds.length);
  const hasManagerName = managerName.trim().length > 0;

  const canSave = draftAthleteIds.length === competition.squadSize && hasManagerName;
  const saveReason = !canSave
    ? [
        missingAthletes > 0
          ? `Pick ${missingAthletes} more athlete${missingAthletes === 1 ? '' : 's'}`
          : '',
        !hasManagerName ? 'enter a manager name' : '',
      ]
        .filter(Boolean)
        .join(' and ')
    : '';

  function handleToggle(athleteId: string, price: number) {
    const isSelected = draftAthleteIds.includes(athleteId);
    if (!isSelected && price > remaining) return; // can't afford it
    if (!isSelected && squadFull) return;
    toggleDraftAthlete(athleteId, price, competition.budget, competition.squadSize);
  }

  function handleSave() {
    if (!canSave || !competition) return;
    teamsRepo.create({
      competitionId: competition.id,
      managerName: managerName.trim(),
      athleteIds: draftAthleteIds,
      leagueCode: joinCode.trim() || undefined,
    });
    navigate('/team');
  }

  const budgetPct = Math.max(0, Math.min(100, (spent / competition.budget) * 100));

  return (
    <div className="site-page mx-auto max-w-5xl px-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">{competition.shortName} draft</h1>
          <p className="text-[var(--lane-white)]/60">
            Pick {competition.squadSize} athletes. Stay under budget.
          </p>
        </div>
        <div className="w-full max-w-xs sm:w-64">
          <div className="flex justify-between font-mono-num text-xs">
            <span>{spent}cr spent</span>
            <span className={remaining < 0 ? 'text-[var(--finish-red)]' : ''}>
              {remaining}cr left
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-[var(--split-lime)] transition-all"
              style={{ width: `${budgetPct}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-[var(--lane-white)]/50">
            {draftAthleteIds.length}/{competition.squadSize} squad slots
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              filter === g
                ? 'bg-[var(--split-lime)] text-[var(--track-navy)]'
                : 'bg-white/5 text-[var(--lane-white)]/70 hover:bg-white/10'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => {
          const isSelected = draftAthleteIds.includes(a.id);
          const cantAfford = !isSelected && a.price > remaining;
          const full = !isSelected && squadFull;
          return (
            <AthleteCard
              key={a.id}
              athlete={a}
              selected={isSelected}
              disabled={cantAfford || full}
              onToggle={() => handleToggle(a.id, a.price)}
            />
          );
        })}
      </div>

      <div className="lane-divider my-8" />

      <div className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-xs text-[var(--lane-white)]/60">Manager name</span>
            <input
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="e.g. Paul"
              className="rounded-[var(--radius-control)] border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--split-lime)]"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-xs text-[var(--lane-white)]/60">Join a league code (optional)</span>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Leave blank to start a new league"
              maxLength={6}
              className="rounded-[var(--radius-control)] border border-white/15 bg-black/20 px-3 py-2 text-sm uppercase outline-none transition-colors focus:border-[var(--split-lime)]"
            />
          </label>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {!canSave && (
            <p className="max-w-56 text-right text-xs text-[var(--lane-white)]/60" aria-live="polite">
              {saveReason} to save your team
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="button-primary rounded bg-[var(--split-lime)] px-6 py-3 font-display text-lg font-bold text-[var(--track-navy)] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            Save team
          </button>
        </div>
      </div>
    </div>
  );
}
