import { useMemo, useState } from 'react';
import { useVocab } from '@/hooks/useVocab';
import { ExpressionCard } from '@/components/ExpressionCard';
import { CategoryFilter, DifficultyFilter } from '@/components/Filters';
import { SearchInput } from '@/components/SearchInput';
import type { Difficulty, Expression } from '@/types/domain';

export function HomePage() {
  const { data, isLoading, error, categoryBySlug } = useVocab();

  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [search, setSearch] = useState('');

  // 검색·카테고리 필터까지만 적용한 중간 결과.
  // → 난이도 카운트는 이걸 기준으로 계산해서 "다른 필터에 반응"하도록.
  const preFilteredByCategoryAndSearch = useMemo(() => {
    const list = data?.expressions ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((e: Expression) => {
      if (categoryFilter !== 'all' && e.category_slug !== categoryFilter) return false;
      if (q) {
        const haystack = [e.ko_pattern, e.en_pattern, ...(e.examples ?? []), ...(e.variations ?? [])]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [data, categoryFilter, search]);

  // 최종 표시 목록 — 위 결과에 난이도 필터까지 적용
  const filtered = useMemo(() => {
    if (difficultyFilter === 'all') return preFilteredByCategoryAndSearch;
    return preFilteredByCategoryAndSearch.filter((e) => e.difficulty === difficultyFilter);
  }, [preFilteredByCategoryAndSearch, difficultyFilter]);

  // 난이도별 카운트 — 검색/카테고리 필터가 적용된 결과 기준으로 계산
  const difficultyCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0, beginner: 0, intermediate: 0, advanced: 0 };
    preFilteredByCategoryAndSearch.forEach((e) => {
      counts.all += 1;
      counts[e.difficulty] = (counts[e.difficulty] ?? 0) + 1;
    });
    return counts;
  }, [preFilteredByCategoryAndSearch]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Hero />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 pb-24">
        <div className="space-y-4 mb-8">
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
            <p className="text-[13px] font-semibold text-grey-500 tracking-tight">
              {isLoading ? '불러오는 중' : `${filtered.length}개 표현`}
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
    <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-12">
      <h1 className="text-[32px] sm:text-[44px] md:text-[52px] font-bold text-grey-900 leading-[1.15] tracking-tighter">
        오늘의 감정을,<br />
        영어로 솔직하게.
      </h1>
      <p className="mt-5 text-grey-600 text-[15px] sm:text-[17px] max-w-xl leading-relaxed font-medium tracking-tight">
        뿌듯함, 서운함, 당황스러움, 부러움 —<br className="hidden sm:inline" />
        한국어로는 자연스럽지만 영어로는 막막했던 그 감정들을 일기에 쓸 수 있는 패턴으로 정리했어요.
      </p>
    </section>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-36 bg-white border border-grey-100 rounded-3xl animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="bg-white border border-grey-100 rounded-3xl py-20 px-6 text-center">
      <p className="text-grey-900 font-bold text-[17px] tracking-tight">
        {hasSearch ? '검색 결과가 없어요' : '표시할 표현이 없어요'}
      </p>
      {hasSearch && (
        <p className="text-[14px] text-grey-500 mt-2 font-medium">다른 키워드로 검색해보세요</p>
      )}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-white border border-grey-100 rounded-3xl py-16 px-6 text-center">
      <p className="text-grey-900 font-bold text-[17px] tracking-tight">데이터를 불러오지 못했어요</p>
      <p className="text-[14px] text-grey-500 mt-2 font-medium">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="focus-ring toss-btn-primary mt-6 px-5 py-2.5 rounded-xl text-[14px]"
      >
        다시 시도
      </button>
    </div>
  );
}
