import { useMemo } from 'react';
import { getCategoryColor, DIFFICULTY_LABEL } from '@/lib/category-colors';
import type { Difficulty, EmotionCategory } from '@/types/domain';
import { cn } from '@/lib/utils';

type CategoryFilterProps = {
  categories: EmotionCategory[];
  active: string | 'all';
  onChange: (slug: string | 'all') => void;
};

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterPill active={active === 'all'} onClick={() => onChange('all')} label="전체" />
      {categories.map((cat) => {
        const colors = getCategoryColor(cat.color_key);
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug)}
            className={cn(
              'focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all',
              isActive
                ? `${colors.bg} ${colors.text} ${colors.border} border-2`
                : 'border-ink-200 text-ink-700 hover:bg-ink-100'
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} aria-hidden="true" />
            {cat.name_ko}
          </button>
        );
      })}
    </div>
  );
}

type DifficultyFilterProps = {
  active: Difficulty | 'all';
  onChange: (d: Difficulty | 'all') => void;
  counts?: Record<string, number>;
};

export function DifficultyFilter({ active, onChange, counts }: DifficultyFilterProps) {
  const items: Array<{ key: Difficulty | 'all'; label: string }> = useMemo(
    () => [
      { key: 'all', label: '전체 난이도' },
      { key: 'beginner', label: DIFFICULTY_LABEL.beginner.ko },
      { key: 'intermediate', label: DIFFICULTY_LABEL.intermediate.ko },
      { key: 'advanced', label: DIFFICULTY_LABEL.advanced.ko },
    ],
    []
  );

  return (
    <div className="inline-flex items-center bg-ink-100 p-1 rounded-full">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={cn(
            'focus-ring px-3 py-1 text-xs sm:text-sm rounded-full transition-all whitespace-nowrap',
            active === item.key
              ? 'bg-white text-ink-900 shadow-sm'
              : 'text-ink-600 hover:text-ink-900'
          )}
        >
          {item.label}
          {counts && counts[item.key] !== undefined && (
            <span className="ml-1 text-ink-400">{counts[item.key]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all',
        active
          ? 'bg-ink-900 text-ink-50 border-ink-900'
          : 'border-ink-200 text-ink-700 hover:bg-ink-100'
      )}
    >
      {label}
    </button>
  );
}
