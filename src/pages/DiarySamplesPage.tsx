import { useVocab } from '@/hooks/useVocab';
import { CopyButton } from '@/components/CopyButton';
import { getCategoryColor } from '@/lib/category-colors';
import { cn } from '@/lib/utils';
import type { DiarySample, DiarySentence, EmotionCategory } from '@/types/domain';

export function DiarySamplesPage() {
  const { data, isLoading, error, categoryBySlug } = useVocab();
  const samples = data?.diary_samples ?? [];

  return (
    <div className="paper-bg min-h-[calc(100vh-3.5rem)]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-3">
          diary samples
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink-900 leading-tight">
          하루의 감정을 엮은 <br />
          <span className="italic">일기 모음.</span>
        </h1>
        <p className="mt-4 text-ink-600 leading-relaxed">
          여러 감정 표현을 한 편의 짧은 일기로 연결한 예시예요. 마음에 드는 문장은 클릭해서 복사해보세요.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        {error ? (
          <div className="bg-white border border-ink-200 rounded-2xl p-6 text-center">
            <p className="text-ink-900 font-medium">데이터를 불러오지 못했어요</p>
            <p className="text-sm text-ink-500 mt-1">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-white border border-ink-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : samples.length === 0 ? (
          <p className="text-center text-ink-500 py-12">아직 등록된 일기 샘플이 없어요.</p>
        ) : (
          samples.map((sample) => (
            <DiarySampleCard
              key={sample.id}
              sample={sample}
              categoryBySlug={categoryBySlug}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DiarySampleCard({
  sample,
  categoryBySlug,
}: {
  sample: DiarySample;
  categoryBySlug: Map<string, EmotionCategory>;
}) {
  const fullText = sample.sentences.map((s) => s.en).join(' ');

  return (
    <article className="bg-white border border-ink-200 rounded-3xl overflow-hidden">
      <header className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-ink-100">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-500">
              {sample.date_label}
            </p>
            <h2 className="font-display text-2xl sm:text-[26px] text-ink-900 mt-1 leading-tight">
              {sample.title}
            </h2>
            <p className="text-sm text-ink-600 mt-2 leading-relaxed">{sample.mood_summary}</p>
          </div>
          <CopyButton text={fullText} label="전체 복사" variant="pill" />
        </div>
      </header>

      <div className="px-6 sm:px-8 py-5 sm:py-6 space-y-4">
        {sample.sentences.map((sentence) => (
          <DiarySentenceRow
            key={sentence.id}
            sentence={sentence}
            categoryBySlug={categoryBySlug}
          />
        ))}
      </div>
    </article>
  );
}

function DiarySentenceRow({
  sentence,
  categoryBySlug,
}: {
  sentence: DiarySentence;
  categoryBySlug: Map<string, EmotionCategory>;
}) {
  const category = sentence.category_slug ? categoryBySlug.get(sentence.category_slug) : null;
  const colors = category ? getCategoryColor(category.color_key) : null;

  return (
    <div className="group relative pl-4">
      <div
        className={cn(
          'absolute left-0 top-2 bottom-2 w-0.5 rounded-full',
          colors ? colors.dot : 'bg-ink-200'
        )}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-[16px] sm:text-[17px] leading-relaxed text-ink-900">
            {sentence.en}
          </p>
          <p className="font-ko text-[13px] text-ink-500 mt-1 leading-relaxed">{sentence.ko}</p>
          {category && colors && (
            <span
              className={cn(
                'inline-flex items-center gap-1 mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full',
                colors.bg,
                colors.text
              )}
            >
              <span className={cn('w-1 h-1 rounded-full', colors.dot)} aria-hidden="true" />
              {category.name_ko}
            </span>
          )}
        </div>
        <CopyButton
          text={sentence.en}
          label="문장 복사"
          className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0 mt-1"
        />
      </div>
    </div>
  );
}
