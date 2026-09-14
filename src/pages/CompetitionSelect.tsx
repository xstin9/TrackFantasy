import { useNavigate } from 'react-router-dom';
import { competitions } from '../data/competitions';
import { useApp } from '../context/AppContext';

export function CompetitionSelect() {
  const navigate = useNavigate();
  const { setSelectedCompetition, clearDraft } = useApp();

  function pick(id: string) {
    const comp = competitions.find((c) => c.id === id) ?? null;
    setSelectedCompetition(comp);
    clearDraft();
    navigate('/draft');
  }

  return (
    <div className="site-page mx-auto max-w-5xl px-5">
      <h1 className="font-display text-4xl font-bold">Choose a competition</h1>
      <p className="mt-2 text-[var(--lane-white)]/60">
        One meet at a time for now — pick it, then draft your squad.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {competitions.map((c) => (
          <button
            key={c.id}
            onClick={() => pick(c.id)}
            className="surface surface-interactive flex flex-col gap-3 p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-semibold">{c.shortName}</span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${
                  c.status === 'live'
                    ? 'bg-[var(--finish-red)]/20 text-[var(--finish-red)]'
                    : 'bg-white/10 text-[var(--lane-white)]/70'
                }`}
              >
                {c.status}
              </span>
            </div>
            <p className="text-sm text-[var(--lane-white)]/60">{c.date}</p>
            <div className="flex gap-4 text-xs text-[var(--lane-white)]/50">
              <span>{c.athletePool.length} athletes</span>
              <span>{c.budget}cr budget</span>
              <span>{c.squadSize}-a-side squad</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
