import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/compete', label: 'Competitions' },
  { to: '/team', label: 'My Team' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

export function Nav() {
  return (
    <header className="site-nav sticky top-0 z-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <NavLink to="/" className="font-display text-2xl font-bold tracking-tight">
          Track<span style={{ color: 'var(--split-lime)' }}>Fantasy</span>
        </NavLink>
        <nav className="flex gap-1 sm:gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-[var(--split-lime)] after:transition-transform after:duration-200 after:content-[\'\'] ${
                  isActive
                    ? 'text-[var(--lane-white)] after:scale-x-100'
                    : 'text-[var(--lane-white)]/60 after:scale-x-0 hover:text-[var(--lane-white)]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="lane-divider" />
    </header>
  );
}
