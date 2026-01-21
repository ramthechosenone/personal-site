# Personal Website

A minimal, tactile personal website inspired by an Apple keyboard aesthetic. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Home Page**: Interactive draggable sphere for navigation
- **Work Page**: Grid layout showcasing work sections
- **Personal Page**: Circular interface with expandable pill keys
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

### Content

- Work sections: Edit `app/work/page.tsx`
- Personal sections: Edit `app/personal/page.tsx`
- Home page text: Edit `app/page.tsx`

## License

MIT
