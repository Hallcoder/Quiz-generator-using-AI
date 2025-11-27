# QuizGPT Frontend

Interactive Next.js frontend for AI-powered quiz generation.

## Features

- **Multiple Input Types**: Upload text, URLs, PDFs, or images
- **Interactive Quiz Taking**: Beautiful, responsive quiz interface
- **Real-time Progress**: Track your progress as you answer questions
- **Instant Results**: Get immediate feedback with detailed explanations
- **Question Types**: Support for multiple choice, true/false, short answer, and fill-in-blank
- **Difficulty Levels**: Choose from easy, medium, or hard difficulty

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Backend API running (see ../backend/README.md)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.local .env.local.example
# Edit .env.local and set NEXT_PUBLIC_API_URL if needed
```

### Development

```bash
# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── quiz/
│       ├── QuizGenerator.tsx    # Quiz generation form
│       ├── QuizTaking.tsx       # Quiz taking interface
│       ├── QuizResults.tsx      # Results display
│       └── QuestionCard.tsx     # Question component
├── lib/
│   └── api/
│       ├── client.ts         # API client
│       └── quiz.ts           # Quiz API functions
├── types/
│   └── quiz.ts               # TypeScript types
└── public/                   # Static assets
```

## Usage

### 1. Generate a Quiz

1. Choose your content source (text, URL, PDF, or image)
2. Enter content or upload a file
3. Select difficulty level (easy, medium, hard)
4. Choose number of questions (5-50)
5. Select question types you want
6. Click "Generate Quiz"

### 2. Take the Quiz

- Answer all questions
- Track your progress with the progress bar
- Review your answers before submitting
- Click "Submit Quiz" when ready

### 3. View Results

- See your score and percentage
- Review correct and incorrect answers
- Read explanations for each question
- Retry the same quiz or create a new one

## API Integration

The frontend connects to the FastAPI backend. Make sure to:

1. Start the backend server (default: http://localhost:8000)
2. Set `NEXT_PUBLIC_API_URL` in `.env.local` to match your backend URL

## Customization

### Styling

The app uses Tailwind CSS. Customize styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles
- Component files - Component-specific styles

### API Client

Modify `lib/api/client.ts` to customize API requests, add authentication, etc.

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Troubleshooting

### Connection Refused

Make sure the backend API is running:
```bash
cd ../backend
poetry run uvicorn app.main:app --reload
```

### CORS Errors

Check that the backend `ALLOWED_ORIGINS` includes your frontend URL.

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
