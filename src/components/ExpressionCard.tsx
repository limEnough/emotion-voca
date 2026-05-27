import { useState } from 'react';
import { CopyButton } from './CopyButton';
import { useToast } from './Toast';
import { getCategoryColor, DIFFICULTY_LABEL, DIFFICULTY_STYLE } from '@/lib/category-colors';
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
  const catColors = getCategoryColor(category.color_key);
  const difficulty = DIFFICULTY_LABEL[expression.difficulty];
  const diffStyle = DIFFICULTY_STYLE[expression.difficulty];

  const handleVariationClick = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const ok = await copyToClipboard(text);
    showToast(ok ? '복사했어요' : '복사하지 못했어요', ok ? 'success' : 'error');
  };

  return (
    <article className="group bg-white rounded-3xl border border-grey-100 overflow-hidden transition-all hover:border-grey-200">
      <div
        className="p-5 sm:p-6 cursor-pointer select-none"
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
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold rounded-full',
                catColors.bg,
                catColors.text
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', catColors.dot)} aria-hidden="true" />
              {category.name_ko}
            </span>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 text-[12px] font-semibold rounded-full',
                diffStyle.bg,
                diffStyle.text
              )}
            >
              {difficulty.ko}
            </span>
          </div>
          <ChevronIcon expanded={expanded} />
        </div>

        <p className="text-[14px] text-grey-500 font-medium mb-1.5 leading-relaxed">
          {expression.ko_pattern}
        </p>
        <p className="text-[18px] sm:text-[19px] font-bold text-grey-900 leading-snug tracking-tight">
          {expression.en_pattern}
        </p>
      </div>

      {expanded && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 animate-fade-in">
          <div className="bg-grey-50 rounded-2xl p-4 sm:p-5">
            <SectionLabel>일기 예문</SectionLabel>
            <ul className="mt-3 space-y-3">
              {expression.examples.map((ex, idx) => (
                <li
                  key={idx}
                  className="group/example flex items-start justify-between gap-3"
                >
                  <p className="text-[15px] font-medium text-grey-800 leading-relaxed flex-1 tracking-tight">
                    {ex}
                  </p>
                  <CopyButton
                    text={ex}
                    label="문장 복사"
                    className="opacity-0 group-hover/example:opacity-100 focus:opacity-100 transition-opacity shrink-0 -mt-1"
                  />
                </li>
              ))}
            </ul>
          </div>

          {expression.variations.length > 0 && (
            <div className="mt-4">
              <SectionLabel>다른 표현</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {expression.variations.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleVariationClick(e, v)}
                    className="focus-ring text-[14px] font-semibold px-3.5 py-2 rounded-xl bg-white border border-grey-200 text-grey-800 hover:border-toss-400 hover:text-toss-500 transition-colors tracking-tight"
                    title="클릭하여 복사"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <CopyButton
              text={`${expression.en_pattern}\n— ${expression.ko_pattern}`}
              label="표현 전체 복사"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      )}
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold text-grey-500 tracking-tight">
      {children}
    </p>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <div className={cn(
      'shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-full bg-grey-100 text-grey-600 transition-transform',
      expanded && 'rotate-180'
    )}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
