# Inkwell · 영어 일기 감정 표현 단어장

> 한국어로는 자연스럽지만 영어로는 막막했던 그 감정들을 일기에 쓸 수 있는 패턴으로 정리한 웹앱입니다. **로컬 전용 / 정적 사이트** 버전 — 백엔드나 로그인 없이 동작합니다.

## ✨ Features

- 📚 **16개 감정 카테고리** · 상심, 서운함, 당황, 뿌듯, 후회, 안도, 즐거움, 신남, 행복, 우울, 감사, 미안함, 짜증, 분노, 부러움, 외로움
- 🎯 **난이도별 분류** · 초급/중급/고급
- 📋 **복사 기능** · 표현, 예문, variation, 일기 문장 단위 클립보드 복사
- 📔 **일기 샘플** · 여러 감정 표현을 엮은 짧은 일기 예시
- 🔍 **검색** · 한국어/영어 양쪽으로 검색
- 📱 **반응형 디자인** · PC/모바일 모두 최적화

## 🛠 Tech Stack

| 영역 | 기술 |
|-----|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Fraunces / Pretendard / JetBrains Mono |
| Routing | React Router v6 |
| Data | `public/data/vocab.json` (런타임 fetch) |

백엔드/DB/로그인 없음. 정적 사이트로 어디든 배포 가능합니다 (Vercel, Netlify, GitHub Pages, Cloudflare Pages, 심지어 단순 정적 호스팅까지).

## 📁 Project Structure

```
src/
├── components/       # UI 컴포넌트 (ExpressionCard, CopyButton, Filters, ...)
├── hooks/
│   └── useVocab.tsx  # vocab.json을 fetch하는 Context Provider
├── pages/            # HomePage, DiarySamplesPage
├── lib/              # utils, category-colors
├── types/            # 도메인 타입
├── App.tsx
└── main.tsx

public/
├── data/
│   └── vocab.json    # 모든 데이터 (카테고리/표현/일기 샘플)
└── favicon.svg
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

http://localhost:5173 으로 접속.

### Build & Preview

```bash
npm run build      # dist/ 생성
npm run preview    # 빌드 결과 로컬 미리보기
```

### 배포

`npm run build` 결과인 `dist/` 폴더를 어디든 업로드하면 됩니다.

**Vercel / Netlify / Cloudflare Pages**
- Build command: `npm run build`
- Output directory: `dist`
- 환경변수 없음 ✨

**GitHub Pages**
- `vite.config.ts`의 `base` 옵션을 저장소 경로(`/inkwell/` 등)로 설정 후 빌드

## 🗃 데이터 수정하기

모든 데이터는 `public/data/vocab.json` 한 파일에 있습니다.

### 표현 추가/수정

`expressions` 배열에서 원하는 항목을 편집하거나 새 객체를 추가하세요:

```json
{
  "id": "joy-050",
  "category_slug": "joy",
  "ko_pattern": "~을 해서 정말 즐거웠어",
  "en_pattern": "I had so much fun ___ing.",
  "difficulty": "beginner",
  "examples": ["I had so much fun catching up with old friends over dinner."],
  "variations": ["I really enjoyed ___ing"],
  "sort_order": 50
}
```

- `id`: 고유한 문자열이면 OK. 관례적으로 `{slug}-{sort_order}` 형식
- `category_slug`: `categories` 배열에 정의된 slug 중 하나
- `difficulty`: `beginner` | `intermediate` | `advanced`
- `sort_order`: 카테고리 안에서의 정렬 순서

### 카테고리 추가

`categories` 배열에 항목을 추가하면 `color_key`에 맞는 색이 자동 적용됩니다. 사용 가능한 색은 `src/lib/category-colors.ts`의 `CATEGORY_COLORS`를 참고하세요.

### 일기 샘플 추가

`diary_samples` 배열에 새 객체를 넣고, 각 문장의 `category_slug`로 어떤 감정 표현과 연결되는지 표시하세요.

### 재배포 없이 갱신하기

배포된 사이트의 `dist/data/vocab.json`만 새 파일로 교체하면 빌드 없이 데이터가 갱신됩니다. (브라우저 캐시 때문에 강력 새로고침은 필요할 수 있음)

## 🎨 Design Notes

- **타이포그래피**: 영어 본문은 Fraunces (variable serif, 일기·문학적 톤). 한국어는 Pretendard. 메타 정보는 JetBrains Mono.
- **컬러**: `ink-*` 그레이스케일을 기본으로, 카테고리 16개마다 고유한 컬러 키 (`coral`, `sage`, `plum`, ...). `src/lib/category-colors.ts`에서 매핑.
- **무드**: 종이/잉크 느낌. 라운드 코너, 가는 보더, 미세한 페이퍼 그라데이션 배경.

## 📝 License

MIT.
