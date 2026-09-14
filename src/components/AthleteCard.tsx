import type { Athlete } from '../types';
import { flagEmoji } from '../lib/flag';

interface Props {
  athlete: Athlete;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  points?: number;
}

export function AthleteCard({ athlete, selected, disabled, onToggle, points }: Props) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled && !selected}
      className={`group relative flex w-full flex-col gap-2 rounded-lg border p-4 text-left transition-all ${
        selected
          ? 'border-[var(--split-lime)] bg-[var(--track-navy-lighter)]'
          : 'border-white/10 bg-[var(--track-navy-light)] hover:border-white/25 hover:shadow-lg hover:shadow-black/20'
      } ${disabled && !selected ? 'cursor-not-allowed opacity-40' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-lg font-semibold leading-tight">{athlete.name}</p>
          <p className="text-xs text-[var(--lane-white)]/60">
            {flagEmoji(athlete.country)} {athlete.event} · {athlete.group}
          </p>
        </div>
        <span className="font-mono-num rounded bg-black/25 px-2 py-1 text-xs font-bold">
          {athlete.price}cr
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-xs text-[var(--lane-white)]/50">SB {athlete.seasonBest}</span>
        {typeof points === 'number' ? (
          <span
            className="font-mono-num text-sm font-bold"
            style={{ color: points >= 0 ? 'var(--split-lime)' : 'var(--finish-red)' }}
          >
            {points >= 0 ? '+' : ''}
            {points} pts
          </span>
        ) : (
          <span
            className={`text-xs font-semibold ${selected ? 'text-[var(--split-lime)]' : 'text-[var(--lane-white)]/40'}`}
          >
            {selected ? 'Drafted' : 'Tap to draft'}
          </span>
        )}
      </div>
    </button>
  );
}
