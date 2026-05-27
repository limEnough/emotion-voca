import { useMemo } from 'react';
import { DIFFICULTY_LABEL } from '@/lib/category-colors';
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
        const isActive = active === cat.slug;
        return (
          <FilterPill
            key={cat.slug}
            active={isActive}
            onClick={() => onChange(cat.slug)}
            label={cat.name_ko}
          />
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
      { key: 'all', label: '전체' },
      { key: 'beginner', label: DIFFICULTY_LABEL.beginner.ko },
      { key: 'intermediate', label: DIFFICULTY_LABEL.intermediate.ko },
      { key: 'advanced', label: DIFFICULTY_LABEL.advanced.ko },
    ],
    []
  );

  return (
    <div className="inline-flex items-center bg-grey-100 p-1 rounded-2xl">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={cn(
            'focus-ring px-4 py-2 text-[13px] font-semibold rounded-xl transition-all whitespace-nowrap tracking-tight',
            active === item.key
              ? 'bg-white text-grey-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              : 'text-grey-600 hover:text-grey-900'
          )}
        >
          {item.label}
          {counts && counts[item.key] !== undefined && (
            <span className={cn('ml-1.5 text-[12px]', active === item.key ? 'text-grey-500' : 'text-grey-400')}>
              {counts[item.key]}
            </span>
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
        'focus-ring px-4 py-2 text-[14px] font-semibold rounded-full transition-all tracking-tight',
        active
          ? 'bg-grey-900 text-white'
          : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
      )}
    >
      {label}
    </button>
  );
}
