# emotion-voca · 영어 일기 감정 표현 단어장

> 한국어로는 자연스럽지만 영어로는 막막했던 그 감정들을 일기에 쓸 수 있는 패턴으로 정리한 웹앱입니다. **로컬 전용 / 정적 사이트** 버전 — 백엔드나 로그인 없이 동작합니다.

🔗 **개발 주소 바로가기**: [https://emotion-voca.vercel.app/](https://emotion-voca.vercel.app/)

## ✨ Features

- 📚 **16개 감정 카테고리** · 상심, 서운함, 당황, 뿌듯, 후회, 안도, 즐거움, 신남, 행복, 우울, 감사, 미안함, 짜증, 분노, 부러움, 외로움
- 🎯 **난이도별 분류** · 입문/중급/고급 (텍스트 토글 + 카운트 표시)
- 📋 **복사 기능** · 표현, 예문, variation, 일기 문장 단위 클립보드 복사
- 📔 **일기 샘플** · 여러 감정 표현을 엮은 짧은 일기 예시
- 🔍 **검색** · 한국어/영어 양쪽으로 검색
- 📱 **반응형 디자인** · PC/모바일 모두 최적화

## 🛠 Tech Stack

| 영역     | 기술                                       |
| -------- | ------------------------------------------ |
| Frontend | React 18, TypeScript, Vite                 |
| Styling  | Tailwind CSS, Asta Sans (Google Fonts)     |
| Routing  | React Router v6                            |
| Data     | `public/data/vocab.json` (런타임 fetch)    |
| Hosting  | Vercel (자동 배포)                         |

백엔드/DB/로그인 없음. `npm run build` 산출물(`dist/`)만 있으면 어디든 정적 호스팅 가능합니다.

## 📁 Project Structure

```
src/
├── components/       # UI 컴포넌트
│   ├── ExpressionCard.tsx
│   ├── CopyButton.tsx
│   ├── Filters.tsx   # CategoryFilter (pill) + DifficultyFilter (텍스트 토글)
│   ├── SearchInput.tsx
│   ├── Header.tsx
│   └── Toast.tsx
├── hooks/
│   └── useVocab.tsx  # vocab.json을 fetch하는 Context Provider
├── pages/
│   ├── HomePage.tsx
│   └── DiarySamplesPage.tsx
├── lib/
│   ├── category-colors.ts  # 카테고리 4톤 매핑 (blue/slate/warm/cool)
│   └── utils.ts
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

## 🌐 배포

본 프로젝트는 **Vercel**에 자동 배포되어 있습니다. `main` 브랜치에 push하면 자동 재배포됩니다.

- 라이브 URL: https://emotion-voca.vercel.app/
- 설정 파일: `vercel.json` (SPA fallback rewrites)
- Framework Preset: Vite (자동 감지)
- Build Command: `npm run build`
- Output Directory: `dist`
- 환경변수 없음 ✨

### 다른 플랫폼 배포

`dist/` 폴더를 업로드하면 됩니다.

- **Netlify / Cloudflare Pages**: Vercel과 동일 설정. React Router 사용 시 SPA fallback(예: `_redirects`에 `/* /index.html 200`) 필요.
- **GitHub Pages**: `vite.config.ts`의 `base` 옵션을 저장소 경로(`/emotion-voca/`)로 지정 후 빌드. SPA 라우팅을 위해 `404.html`로 `index.html` 복사 등 우회책이 필요합니다.

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

`categories` 배열에 항목을 추가하면 `color_key`에 맞는 톤이 자동 적용됩니다. 카테고리 색은 4가지 톤(`blue` / `slate` / `warm` / `cool`)으로 단순화되어 있으며, 매핑은 `src/lib/category-colors.ts`를 참고하세요.

### 일기 샘플 추가

`diary_samples` 배열에 새 객체를 넣고, 각 문장의 `category_slug`로 어떤 감정 표현과 연결되는지 표시하세요.

### 재배포 없이 갱신하기

배포된 사이트의 `dist/data/vocab.json`만 새 파일로 교체하면 빌드 없이 데이터가 갱신됩니다. (브라우저 캐시 때문에 강력 새로고침은 필요할 수 있음)

## 🎨 Design Notes

토스(Toss) 디자인 시스템에서 영감을 받은 깔끔한 스타일.

- **타이포그래피**: 영문 본문은 **Asta Sans** (Google Fonts, variable wght 300–800). 한글은 시스템 기본 sans-serif로 자연스럽게 fallback (`Apple SD Gothic Neo` on macOS, `맑은 고딕` on Windows).
- **컬러**:
  - `grey-50 ~ grey-900` — 토스 그레이 스케일
  - `toss-50 ~ toss-600` — 토스 블루 (Primary, `#3182F6` 기준)
  - 시맨틱: `positive` / `negative` / `warning`
  - 카테고리 16개는 4가지 톤(`blue` / `slate` / `warm` / `cool`)으로 묶어 관리
- **모양**: 라운드 코너 (카드 `rounded-3xl` = 20px, 큰 카드 `rounded-4xl` = 24px), 가는 보더(`border-grey-100`), 그림자 거의 없음.
- **필터 위계**: Category는 진한 pill(주 필터), Difficulty는 가벼운 텍스트 토글(보조 필터)로 명확한 위계.

## 📝 License

MIT.
