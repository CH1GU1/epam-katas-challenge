# Katas Web App

> React + TypeScript frontend for EPAM Katas Challenge. Interactive UI with 3 programming challenges.

## 🚀 Tech Stack

- **React 19** — UI library
- **TypeScript** — Static typing
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS
- **shadcn/ui** — Accessible, reusable components
- **TanStack Query** — Server state management
- **Axios** — HTTP client
- **Vitest + Testing Library** — Testing

## 📁 Structure

```
src/
├── components/
│   ├── challenges/           # Main kata components
│   │   ├── DictionaryChallenge.tsx      # Dictionary management
│   │   ├── ShoppingChallenge.tsx        # Shopping calculator
│   │   └── NthLetterChallenge.tsx       # Word decoder
│   └── ui/                   # Base components (shadcn/ui)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── slider.tsx
├── hooks/                    # Custom hooks (React Query)
│   ├── useDictionary.ts
│   ├── useNthLetter.ts
│   └── useShopping.ts
├── lib/                      # Utilities
│   ├── api.ts               # Configured Axios client
│   ├── queryClient.ts       # React Query config
│   └── utils.ts             # Helpers (cn, etc.)
├── types/
│   └── api.types.ts         # API TypeScript types
└── test/                    # Testing config
    ├── mocks/               # MSW mocks
    └── setup.ts             # Vitest setup
```

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run test` | Run tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Tests with coverage |
| `npm run lint` | ESLint |

## 🔌 API Client

The API client is configured in `src/lib/api.ts`:

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
})
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend base URL | `http://localhost:8000` |

## 🧩 Kata Components

### DictionaryChallenge
- Input to add word + definition
- Search bar with visual feedback (Found / Not Found badge)
- Integrates with `/dictionary/add` and `/dictionary/look`

### ShoppingChallenge
- Catalog items with checkboxes
- Slider to adjust tax (0–30%)
- Subtotal, tax, and total breakdown
- Integrates with `/shopping/total`

### NthLetterChallenge
- Dynamic word list (add/remove)
- Letter-by-letter breakdown visualization
- Integrates with `/nth-letter/decode`

## 🧪 Testing

Tests use **Vitest** + **Testing Library** + **MSW** for API mocks.

```bash
# Run tests
npm run test

# With coverage
npm run test:coverage
```

## 🐳 Docker

The frontend is dockerized with a multi-stage build:

1. **Stage 1**: Build with Node.js (compiles the app)
2. **Stage 2**: Serve with nginx (lightweight final image)

```bash
# Build
 docker build \
   --build-arg VITE_API_URL=http://localhost:8000 \
   -t katas-frontend .
```

---

**[⬅ Back to main README](../README.md)**
