import { Link } from 'react-router-dom';
import { competitions } from '../data/competitions';

export function Home() {
  const featured = competitions[0];

  return (
    <div className="site-page mx-auto max-w-5xl px-5">
      <section className="hero-section">
        <svg className="hero-lanes" viewBox="0 0 560 360" fill="none" aria-hidden="true">
          <path d="M-20 320C150 275 280 205 590 30" stroke="var(--split-lime)" strokeWidth="2" />
          <path d="M-20 350C150 305 280 235 590 60" stroke="rgba(244,246,242,0.22)" strokeWidth="2" />
          <path d="M-20 380C150 335 280 265 590 90" stroke="rgba(244,246,242,0.16)" strokeWidth="2" />
          <path d="M-20 410C150 365 280 295 590 120" stroke="rgba(244,246,242,0.12)" strokeWidth="2" />
          <circle cx="398" cy="139" r="7" fill="var(--split-lime)" />
        </svg>
        <p className="hero-reveal hero-reveal-1 font-mono-num text-xs uppercase tracking-widest text-[var(--split-lime)]">
          Season 1 · Prototype
        </p>
        <h1 className="hero-reveal hero-reveal-2 max-w-3xl font-display text-5xl font-bold leading-[0.88] tracking-[-0.035em] sm:text-7xl">
          Draft the start line.
          <br />
          Own the finish.
        </h1>
        <p className="hero-reveal hero-reveal-3 max-w-lg text-[var(--lane-white)]/70">
          Build a fantasy squad from real sprinters, hurdlers and jumpers. Earn points
          off their actual results. Beat your mates on a private leaderboard.
        </p>
        <div className="hero-reveal hero-reveal-4 mt-2 flex flex-wrap gap-3">
          <Link
            to="/compete"
            className="button-primary rounded bg-[var(--split-lime)] px-5 py-3 font-display text-lg font-bold text-[var(--track-navy)]"
          >
            Pick a competition
          </Link>
          <Link
            to="/leaderboard"
            className="button-secondary px-5 py-3 font-display text-lg font-bold"
          >
            View leaderboard
          </Link>
        </div>
      </section>

      <div className="lane-divider my-10" />

      <section>
        <h2 className="font-display text-2xl font-bold">Up next</h2>
        <div className="surface surface-interactive mt-4 flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <p className="font-display text-2xl font-semibold">{featured.name}</p>
            <p className="text-sm text-[var(--lane-white)]/60">
              {featured.date} · {featured.athletePool.length} athletes in the pool ·{' '}
              {featured.budget}cr budget
            </p>
          </div>
          <Link
            to="/compete"
            className="button-secondary border-transparent bg-[var(--track-navy-lighter)] px-4 py-2 text-sm font-semibold hover:border-white/30"
          >
            Draft now →
          </Link>
        </div>
      </section>

      <p className="mt-10 text-xs text-[var(--lane-white)]/40">
        TrackFantasy is an independent fantasy game and is not affiliated with or
        endorsed by any athletics federation, meeting organiser, or governing body.
      </p>
    </div>
  );
}
