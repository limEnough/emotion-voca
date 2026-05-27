export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type EmotionCategory = {
  slug: string;
  name_ko: string;
  name_en: string;
  description: string;
  icon: string;
  color_key: string;
  sort_order: number;
};

export type Expression = {
  id: string;
  category_slug: string;
  ko_pattern: string;
  en_pattern: string;
  difficulty: Difficulty;
  examples: string[];
  variations: string[];
  sort_order: number;
};

export type DiarySentence = {
  id: string;
  ko: string;
  en: string;
  category_slug: string | null;
};

export type DiarySample = {
  id: string;
  title: string;
  date_label: string;
  mood_summary: string;
  sort_order: number;
  sentences: DiarySentence[];
};

export type VocabBundle = {
  categories: EmotionCategory[];
  expressions: Expression[];
  diary_samples: DiarySample[];
  version: string;
  generated_at: string;
};
