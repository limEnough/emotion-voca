import { useVocab } from '@/hooks/useVocab';
import { CopyButton } from '@/components/CopyButton';
import { getCategoryColor } from '@/lib/category-colors';
import { cn } from '@/lib/utils';
import type { DiarySample, DiarySentence, EmotionCategory } from '@/types/domain';

export function DiarySamplesPage() {
  const { data, isLoading, error, categoryBySlug } = useVocab();
  const samples = data?.diary_samples ?? [];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="max-w-3xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 pb-10">
        <h1 className="text-[28px] sm:text-[36px] font-bold text-grey-900 leading-[1.2] tracking-tighter">
          하루의 감정을 엮은<br />
          일기 모음
        </h1>
        <p className="mt-5 text-grey-600 text-[15px] sm:text-[16px] leading-relaxed font-medium tracking-tight">
          여러 감정 표현을 한 편의 짧은 일기로 연결한 예시예요.<br />
          마음에 드는 문장은 클릭해서 복사해보세요.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-24 space-y-5">
        {error ? (
          <div className="bg-white border border-grey-100 rounded-3xl p-8 text-center">
            <p className="text-grey-900 font-bold text-[17px] tracking-tight">데이터를 불러오지 못했어요</p>
            <p className="text-[14px] text-grey-500 mt-2 font-medium">{error}</p>
          </div>
        ) : isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 bg-white border border-grey-100 rounded-3xl animate-pulse" />
            ))}
          </>
        ) : samples.length === 0 ? (
          <p className="text-center text-grey-500 py-12 font-medium">아직 등록된 일기 샘플이 없어요</p>
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
    <article className="bg-white border border-grey-100 rounded-3xl overflow-hidden">
      <header className="px-6 sm:px-8 pt-7 sm:pt-8 pb-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-toss-500 tracking-tight uppercase">
              {sample.date_label}
            </p>
            <h2 className="text-[22px] sm:text-[26px] font-bold text-grey-900 mt-2 leading-tight tracking-tight">
              {sample.title}
            </h2>
            <p className="text-[14px] text-grey-600 mt-3 leading-relaxed font-medium tracking-tight">
              {sample.mood_summary}
            </p>
          </div>
          <CopyButton text={fullText} label="전체 복사" variant="pill" />
        </div>
      </header>

      <div className="px-6 sm:px-8 pb-7 sm:pb-8 space-y-4">
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
    <div className="group bg-grey-50 hover:bg-grey-100 transition-colors rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[16px] sm:text-[17px] font-bold text-grey-900 leading-relaxed tracking-tight">
            {sentence.en}
          </p>
          <p className="text-[13px] sm:text-[14px] text-grey-500 mt-1.5 leading-relaxed font-medium tracking-tight">
            {sentence.ko}
          </p>
          {category && colors && (
            <span
              className={cn(
                'inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 text-[11px] font-semibold rounded-full',
                colors.bg,
                colors.text
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} aria-hidden="true" />
              {category.name_ko}
            </span>
          )}
        </div>
        <CopyButton
          text={sentence.en}
          label="문장 복사"
          className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0"
        />
      </div>
    </div>
  );
}
