import { useMemo, useState } from 'react';
import { useVocab } from '@/hooks/useVocab';
import { ExpressionCard } from '@/components/ExpressionCard';
import { CategoryFilter, DifficultyFilter } from '@/components/Filters';
import { SearchInput } from '@/components/SearchInput';
import type { Difficulty } from '@/types/domain';

export function HomePage() {
  const { data, isLoading, error, categoryBySlug } = useVocab();

  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const list = data?.expressions ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((e) => {
      if (categoryFilter !== 'all' && e.category_slug !== categoryFilter) return false;
      if (difficultyFilter !== 'all' && e.difficulty !== difficultyFilter) return false;
      if (q) {
        const haystack = [e.ko_pattern, e.en_pattern, ...(e.examples ?? []), ...(e.variations ?? [])]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [data, categoryFilter, difficultyFilter, search]);

  const difficultyCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0, beginner: 0, intermediate: 0, advanced: 0 };
    (data?.expressions ?? []).forEach((e) => {
      counts.all += 1;
      counts[e.difficulty] = (counts[e.difficulty] ?? 0) + 1;
    });
    return counts;
  }, [data]);

  return (
    <div className="paper-bg min-h-[calc(100vh-3.5rem)]">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="space-y-4 mb-6">
          <SearchInput value={search} onChange={setSearch} />
          <CategoryFilter
            categories={data?.categories ?? []}
            active={categoryFilter}
            onChange={setCategoryFilter}
          />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <DifficultyFilter
              active={difficultyFilter}
              onChange={setDifficultyFilter}
              counts={difficultyCounts}
            />
            <p className="text-xs text-ink-500">
              {isLoading ? '불러오는 중...' : `${filtered.length}개 표현`}
            </p>
          </div>
        </div>

        {error ? (
          <ErrorState message={error} />
        ) : isLoading ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState hasSearch={!!search} />
        ) : (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
            {filtered.map((exp) => {
              const cat = categoryBySlug.get(exp.category_slug);
              if (!cat) return null;
              return <ExpressionCard key={exp.id} expression={exp} category={cat} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-3">
        emotion vocabulary for diary writers
      </p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink-900 leading-[1.05]">
        오늘의 감정을,<br />
        <span className="italic">영어로 솔직하게.</span>
      </h1>
      <p className="mt-4 text-ink-600 text-base sm:text-lg max-w-2xl leading-relaxed">
        뿌듯함, 서운함, 당황스러움, 부러움 — 한국어로는 자연스럽지만 영어로는 막막했던
        그 감정들을 일기에 쓸 수 있는 패턴으로 정리했어요.
      </p>
    </section>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 bg-white border border-ink-200 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  if (hasSearch) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-900 font-medium">검색 결과가 없어요</p>
        <p className="text-sm text-ink-500 mt-1">다른 키워드로 검색해보세요.</p>
      </div>
    );
  }
  return (
    <div className="text-center py-16">
      <p className="text-ink-900 font-medium">표시할 표현이 없어요</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-white border border-ink-200 rounded-2xl p-6 text-center">
      <p className="text-ink-900 font-medium">데이터를 불러오지 못했어요</p>
      <p className="text-sm text-ink-500 mt-1">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="focus-ring mt-4 px-4 py-1.5 text-sm rounded-full bg-ink-900 text-ink-50 hover:bg-ink-800 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
