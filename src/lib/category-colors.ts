// 카테고리별 색상 토큰. 카테고리 데이터에 있는 color_key와 매칭됩니다.
export type CategoryColorKey =
  | 'coral'
  | 'sage'
  | 'ochre'
  | 'plum'
  | 'sky'
  | 'rose'
  | 'amber'
  | 'teal'
  | 'indigo'
  | 'crimson'
  | 'forest'
  | 'sunset'
  | 'lavender'
  | 'sand'
  | 'moss'
  | 'storm';

type Token = {
  bg: string;
  bgSoft: string;
  text: string;
  border: string;
  dot: string;
};

export const CATEGORY_COLORS: Record<CategoryColorKey, Token> = {
  coral: { bg: 'bg-[#fbe6df]', bgSoft: 'bg-[#fcefe9]', text: 'text-[#b14a2f]', border: 'border-[#e76f51]', dot: 'bg-[#e76f51]' },
  sage: { bg: 'bg-[#e2ecdf]', bgSoft: 'bg-[#eef3ea]', text: 'text-[#4a6b4f]', border: 'border-[#7a9e7e]', dot: 'bg-[#7a9e7e]' },
  ochre: { bg: 'bg-[#f5e6cf]', bgSoft: 'bg-[#faf0e0]', text: 'text-[#8a6020]', border: 'border-[#d4a373]', dot: 'bg-[#d4a373]' },
  plum: { bg: 'bg-[#e8dde9]', bgSoft: 'bg-[#f1eaf2]', text: 'text-[#503555]', border: 'border-[#7a5980]', dot: 'bg-[#7a5980]' },
  sky: { bg: 'bg-[#dde8f0]', bgSoft: 'bg-[#e9f0f5]', text: 'text-[#34607a]', border: 'border-[#5b8aa4]', dot: 'bg-[#5b8aa4]' },
  rose: { bg: 'bg-[#f3dde2]', bgSoft: 'bg-[#f8eaee]', text: 'text-[#8a445a]', border: 'border-[#c47b8a]', dot: 'bg-[#c47b8a]' },
  amber: { bg: 'bg-[#fae8c8]', bgSoft: 'bg-[#fcf1de]', text: 'text-[#8a5a10]', border: 'border-[#e0a040]', dot: 'bg-[#e0a040]' },
  teal: { bg: 'bg-[#d4e8e3]', bgSoft: 'bg-[#e4efec]', text: 'text-[#1f5a4e]', border: 'border-[#3a8a78]', dot: 'bg-[#3a8a78]' },
  indigo: { bg: 'bg-[#dedef0]', bgSoft: 'bg-[#eaeaf5]', text: 'text-[#3a3a78]', border: 'border-[#5a5aa8]', dot: 'bg-[#5a5aa8]' },
  crimson: { bg: 'bg-[#f0d8dc]', bgSoft: 'bg-[#f6e6ea]', text: 'text-[#8a2a3a]', border: 'border-[#b03a4a]', dot: 'bg-[#b03a4a]' },
  forest: { bg: 'bg-[#d8e3d0]', bgSoft: 'bg-[#e6ede0]', text: 'text-[#3a5a2a]', border: 'border-[#5a7a4a]', dot: 'bg-[#5a7a4a]' },
  sunset: { bg: 'bg-[#f8dccb]', bgSoft: 'bg-[#fbe8da]', text: 'text-[#a04020]', border: 'border-[#d86838]', dot: 'bg-[#d86838]' },
  lavender: { bg: 'bg-[#e0dcec]', bgSoft: 'bg-[#ebe8f2]', text: 'text-[#4a3a70]', border: 'border-[#7868a0]', dot: 'bg-[#7868a0]' },
  sand: { bg: 'bg-[#ece2d0]', bgSoft: 'bg-[#f2ebde]', text: 'text-[#6a5230]', border: 'border-[#a08858]', dot: 'bg-[#a08858]' },
  moss: { bg: 'bg-[#d8e0d0]', bgSoft: 'bg-[#e6ebde]', text: 'text-[#445a2a]', border: 'border-[#6a8048]', dot: 'bg-[#6a8048]' },
  storm: { bg: 'bg-[#d8dde2]', bgSoft: 'bg-[#e6eaee]', text: 'text-[#3a4a5a]', border: 'border-[#5a6a7a]', dot: 'bg-[#5a6a7a]' },
};

export function getCategoryColor(key: string): Token {
  return CATEGORY_COLORS[key as CategoryColorKey] ?? CATEGORY_COLORS.sage;
}

export const DIFFICULTY_LABEL: Record<string, { ko: string; en: string }> = {
  beginner: { ko: '초급', en: 'Beginner' },
  intermediate: { ko: '중급', en: 'Intermediate' },
  advanced: { ko: '고급', en: 'Advanced' },
};
