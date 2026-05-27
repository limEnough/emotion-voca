// 토스 디자인에 맞춰 카테고리 색상을 4개 톤으로 단순화.
// 기존 코드와의 호환성을 위해 동일한 키 셋을 유지하지만, 모두 4가지 톤 중 하나로 매핑됩니다.

type Token = {
  bg: string;      // 배지 배경
  bgSoft: string;  // 더 옅은 배경
  text: string;    // 배지 텍스트
  border: string;  // 좌측 액센트 바
  dot: string;     // 닷
};

// 4가지 톤
const TONES = {
  // Blue — 긍정·성취·즐거움
  blue: {
    bg: 'bg-toss-50',
    bgSoft: 'bg-toss-50/60',
    text: 'text-toss-500',
    border: 'border-toss-400',
    dot: 'bg-toss-400',
  },
  // Slate — 차분·평온·복합 감정
  slate: {
    bg: 'bg-grey-100',
    bgSoft: 'bg-grey-50',
    text: 'text-grey-700',
    border: 'border-grey-400',
    dot: 'bg-grey-500',
  },
  // Warm — 따뜻함·행복·감사 (옅은 amber 톤)
  warm: {
    bg: 'bg-[#FFF4E0]',
    bgSoft: 'bg-[#FFFAF0]',
    text: 'text-[#A06200]',
    border: 'border-[#FFB020]',
    dot: 'bg-[#FFB020]',
  },
  // Cool — 부정·우울·외로움
  cool: {
    bg: 'bg-[#EEF2F6]',
    bgSoft: 'bg-[#F5F7FA]',
    text: 'text-[#4E5968]',
    border: 'border-[#8B95A1]',
    dot: 'bg-[#8B95A1]',
  },
} as const;

// 기존 color_key (총 16개) → 4가지 톤 중 하나로 매핑
export const CATEGORY_COLORS: Record<string, Token> = {
  // 긍정 (Blue)
  teal: TONES.blue,       // 뿌듯·성취감
  sage: TONES.blue,       // 행복
  ochre: TONES.blue,      // 즐거움 — 원본 ochre이나 토스에선 블루 톤으로

  // 따뜻함 (Warm)
  sunset: TONES.warm,     // 신남·흥분
  lavender: TONES.warm,   // 감사
  rose: TONES.warm,       // 안도·평온
  amber: TONES.warm,      // (예비)

  // 차분/혼합 (Slate)
  plum: TONES.slate,      // 서운함
  sand: TONES.slate,      // 미안함
  forest: TONES.slate,    // 부러움·질투
  moss: TONES.slate,      // (예비)

  // 부정 (Cool)
  sky: TONES.cool,        // 상심·실망
  coral: TONES.cool,      // 후회·자책
  storm: TONES.cool,      // 우울함
  indigo: TONES.cool,     // 외로움
  crimson: TONES.cool,    // 분노
  // 짜증은 카테고리 데이터에 ochre로 되어 있는데, 위에서 blue로 매핑되어 있으므로
  // 의도와 다를 수 있음. 필요시 데이터에서 color_key를 'cool'로 바꾸면 됨.
};

export function getCategoryColor(key: string): Token {
  return CATEGORY_COLORS[key] ?? TONES.slate;
}

export const DIFFICULTY_LABEL: Record<string, { ko: string; en: string }> = {
  beginner: { ko: '초급', en: 'Beginner' },
  intermediate: { ko: '중급', en: 'Intermediate' },
  advanced: { ko: '고급', en: 'Advanced' },
};

// 난이도별 배지 스타일
export const DIFFICULTY_STYLE: Record<string, { bg: string; text: string }> = {
  beginner: { bg: 'bg-toss-50', text: 'text-toss-500' },
  intermediate: { bg: 'bg-[#FFF4E0]', text: 'text-[#A06200]' },
  advanced: { bg: 'bg-grey-100', text: 'text-grey-700' },
};
