import { useState } from 'react';
import { CopyButton } from './CopyButton';
import { useToast } from './Toast';
import { getCategoryColor, DIFFICULTY_LABEL } from '@/lib/category-colors';
import type { EmotionCategory, Expression } from '@/types/domain';
import { cn, copyToClipboard } from '@/lib/utils';

type Props = {
  expression: Expression;
  category: EmotionCategory;
  defaultExpanded?: boolean;
};

export function ExpressionCard({ expression, category, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { showToast } = useToast();
  const colors = getCategoryColor(category.color_key);
  const difficulty = DIFFICULTY_LABEL[expression.difficulty];

  const handleVariationClick = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const ok = await copyToClipboard(text);
    showToast(ok ? '복사 완료!' : '복사 실패', ok ? 'success' : 'error');
  };

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl border border-ink-200 hover:border-ink-300 transition-all overflow-hidden',
        'shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
      )}
    >
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', colors.dot)} aria-hidden="true" />

      <div
        className="px-5 py-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 mb-2 min-w-0">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-full',
                colors.bg,
                colors.text
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} aria-hidden="true" />
              {category.name_ko}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-full bg-ink-100 text-ink-600">
              {difficulty.ko}
            </span>
          </div>
          <div className="flex items-center gap-1 -mt-1 -mr-1 shrink-0">
            <CopyButton
              text={`${expression.en_pattern}\n— ${expression.ko_pattern}`}
              label="표현 복사"
            />
            <ChevronIcon expanded={expanded} />
          </div>
        </div>

        <p className="font-ko text-sm text-ink-600 mb-1.5 leading-relaxed">{expression.ko_pattern}</p>
        <p className="font-display text-[17px] sm:text-[18px] leading-snug text-ink-900 italic">
          {expression.en_pattern}
        </p>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-1 animate-fade-in border-t border-ink-100">
          <div className="mt-4">
            <SectionLabel icon={<PencilIcon />}>일기 예문</SectionLabel>
            <ul className="mt-2 space-y-2.5">
              {expression.examples.map((ex, idx) => (
                <li
                  key={idx}
                  className={cn(
                    'group/example flex items-start gap-2 pl-3 py-1.5 border-l-2 rounded-r-md hover:bg-ink-50/60 transition-colors',
                    colors.border
                  )}
                >
                  <p className="font-display text-[15px] leading-relaxed text-ink-800 flex-1">{ex}</p>
                  <CopyButton
                    text={ex}
                    label="문장 복사"
                    className="opacity-0 group-hover/example:opacity-100 focus:opacity-100 transition-opacity shrink-0"
                  />
                </li>
              ))}
            </ul>
          </div>

          {expression.variations.length > 0 && (
            <div className="mt-5">
              <SectionLabel icon={<ShuffleIcon />}>다른 표현</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {expression.variations.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleVariationClick(e, v)}
                    className="font-display italic text-[14px] px-3 py-1 rounded-full bg-ink-100 text-ink-800 hover:bg-ink-200 transition-colors"
                    title="클릭하여 복사"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-ink-500">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-ink-400 transition-transform', expanded && 'rotate-180')}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
