import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import type { VocabBundle, EmotionCategory, Expression } from '@/types/domain';

type VocabContextValue = {
  data: VocabBundle | null;
  isLoading: boolean;
  error: string | null;
  categoryBySlug: Map<string, EmotionCategory>;
  expressionsByCategorySlug: Map<string, Expression[]>;
};

const VocabContext = createContext<VocabContextValue | null>(null);

export function VocabProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<VocabBundle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetch(`${import.meta.env.BASE_URL}data/vocab.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`데이터를 불러오지 못했어요 (HTTP ${res.status})`);
        return res.json() as Promise<VocabBundle>;
      })
      .then((bundle) => {
        if (cancelled) return;
        setData(bundle);
        setError(null);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<VocabContextValue>(() => {
    const categoryBySlug = new Map<string, EmotionCategory>();
    const expressionsByCategorySlug = new Map<string, Expression[]>();

    if (data) {
      data.categories.forEach((c) => categoryBySlug.set(c.slug, c));
      data.expressions.forEach((e) => {
        const arr = expressionsByCategorySlug.get(e.category_slug) ?? [];
        arr.push(e);
        expressionsByCategorySlug.set(e.category_slug, arr);
      });
    }

    return { data, isLoading, error, categoryBySlug, expressionsByCategorySlug };
  }, [data, isLoading, error]);

  return <VocabContext.Provider value={value}>{children}</VocabContext.Provider>;
}

export function useVocab() {
  const ctx = useContext(VocabContext);
  if (!ctx) throw new Error('useVocab must be used inside VocabProvider');
  return ctx;
}
