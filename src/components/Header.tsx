import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-grey-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-lg -ml-1 px-1 py-1">
          <Logo />
          <span className="font-bold text-lg sm:text-xl text-grey-900 tracking-tight">Inkwell</span>
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
          'focus-ring px-3.5 py-2 text-[15px] font-semibold rounded-lg transition-colors',
          isActive
            ? 'text-grey-900 bg-grey-100'
            : 'text-grey-500 hover:text-grey-900 hover:bg-grey-50'
        )
      }
    >
      {children}
    </NavLink>
  );
}

function Logo() {
  return (
    <div className="w-8 h-8 rounded-lg bg-toss-400 flex items-center justify-center">
      <span className="text-white font-bold text-base leading-none">I</span>
    </div>
  );
}
