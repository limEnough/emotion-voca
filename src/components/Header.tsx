import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-ink-50/80 border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md">
          <Logo />
          <span className="font-display italic text-lg sm:text-xl text-ink-900">Inkwell</span>
          <span className="hidden sm:inline text-[11px] text-ink-500 ml-1">감정 표현 단어장</span>
        </Link>

        <nav className="flex items-center gap-1">
          <HeaderLink to="/">단어장</HeaderLink>
          <HeaderLink to="/diary-samples">일기 샘플</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          'focus-ring px-3 py-2 text-sm font-medium rounded-md transition-colors relative',
          isActive ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
        )
      }
    >
      {({ isActive }) => (
        <span className="relative">
          {children}
          {isActive && (
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-ink-900 rounded-full" />
          )}
        </span>
      )}
    </NavLink>
  );
}

function Logo() {
  return (
    <div className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center">
      <span className="font-display italic text-ink-50 text-sm leading-none">I</span>
    </div>
  );
}
