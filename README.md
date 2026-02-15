# Personal Website

A minimal, tactile personal website inspired by an Apple keyboard aesthetic. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Home Page**: Interactive draggable sphere for navigation
- **Work Page**: Grid layout showcasing work sections
- **Personal Page**: Circular interface with expandable pill keys
- **Schedule Page** (`/schedule`): Book a time – shows your Google Calendar availability (free/busy only) and creates events when visitors book
- **Smooth Animations**: Framer Motion powered transitions
- **Keyboard Navigation**: Arrow keys and Enter to navigate
- **Responsive Design**: Works on desktop and mobile

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
```

### 4. Start Production Server

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page with draggable sphere
│   ├── work/
│   │   └── page.tsx          # Work page with grid layout
│   ├── personal/
│   │   └── page.tsx          # Personal page with pill keys
│   ├── schedule/
│   │   ├── layout.tsx        # Schedule page metadata
│   │   └── page.tsx          # Schedule with me – book a time
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── common/
│   │   ├── KeyCard.tsx       # Reusable card component
│   │   └── PillKey.tsx       # Expandable pill component
│   ├── home/
│   │   └── Sphere.tsx        # Draggable sphere component
│   └── layout/
│       ├── BackButton.tsx    # Back navigation button
│       └── SiteShell.tsx     # Base layout wrapper
└── public/                   # Static assets
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Navigation

- **Home Page**: Drag the sphere left/right or use arrow keys + Enter
- **Work Page**: Click cards to navigate (content to be added)
- **Personal Page**: Click pill keys to expand sections

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  background: "#F5F5F7",
  elevated: "#E5E5E7",
  border: "#D2D2D6",
  // ...
}
```

### Hiding Work and Personal content until ready

The home page always shows the sphere and the Personal/Work buttons (and their behavior). The **content** of the Work and Personal pages is hidden until you turn it on:

- **`NEXT_PUBLIC_SHOW_WORK_AND_PERSONAL`** = `true` — `/work` and `/personal` show their full content (case studies, pill keys, etc.). Set this in Vercel (or `.env.local`) when you’re ready to publish.
- Leave unset or set to anything else — Visiting `/work` or `/personal` shows a simple “In the works — check back soon.” with a back button. The sphere and labels on the home page still work and navigate to these placeholder pages.

### Content

- Work sections: Edit `app/work/page.tsx`
- Personal sections: Edit `app/personal/page.tsx`
- Home page text: Edit `app/page.tsx`

### Schedule page (`/schedule`)

The schedule page uses Google Calendar to show your availability and create events when someone books. No event titles or details are shown—only free and busy times.

1. **Google Cloud**: Create a project, enable the [Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com), and create a **service account**. Download its JSON key.
2. **Share your calendar**: In Google Calendar → Settings → your calendar → Share with specific people, add the service account email (e.g. `xxx@project.iam.gserviceaccount.com`) with “Make changes to events”.
3. **Environment variables** (e.g. in `.env.local`):

   - `GOOGLE_CALENDAR_ID` – your calendar id (usually your Gmail address for the primary calendar)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` – from the JSON key
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` – the `private_key` from the JSON (keep the `\n` line breaks or use real newlines)

Slots are shown for the next 14 days, weekdays 9 AM–5 PM in the visitor’s timezone (or default America/Los_Angeles). When they book, an event is created on your calendar and they receive the invite.

## License

MIT
