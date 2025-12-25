# Copilot Instructions - Osamah Portfolio

## Project Overview
This is a Next.js 14 portfolio website with TypeScript, configured for **static site generation** (`output: "export"` in next.config.js) to deploy on GitHub Pages. The architecture follows a single-page application pattern where all sections are components rendered on the home page.

## Architecture & Data Flow

### Component Structure
- **Single-Page Layout**: [app/page.tsx](app/page.tsx) orchestrates all section components in order: Header → Hero → TechStack → About → Experience → Projects → Contact → Footer
- **Centralized Data**: All portfolio content lives in [data/index.ts](data/index.ts) - never hardcode content in components
- **Type Safety**: All interfaces defined in [types/index.ts](types/index.ts) - always import and use these types

### Styling Architecture
- **Global CSS**: [app/globals.css](app/globals.css) contains all styles with responsive breakpoints
- **Base Font Size**: Set to 110% in html tag to match 110% browser zoom
- **Responsive Strategy**: Uses `clamp()` for fluid typography and spacing throughout
- **Max Width Pattern**: Main container is `max-width: min(1540px, 95vw)` with additional breakpoint at 1400px for very large screens

## Key Patterns

### Data Management
```typescript
// Always import from centralized data
import { projects, techStack, experience } from '@/data';

// Never do this:
const projects = [{ title: "My Project", ... }]; // ❌ Wrong
```

### Path Aliases
- Use `@/` prefix for all imports: `@/components`, `@/data`, `@/types`
- Configured in tsconfig.json paths

### Component Styling
- Inline styles with `clamp()` for responsive values: `fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'`
- Color scheme: Primary `#667eea`, Secondary `#764ba2` (purple gradient theme)
- Animation: Framer Motion for scroll reveals with `whileInView` pattern

### Contact Form Implementation
- Uses **EmailJS** for client-side email sending (compatible with static hosting)
- Credentials are hardcoded in [components/Contact.tsx](components/Contact.tsx) - this is intentional for client-side API
- Template parameters: `to_email`, `from_name`, `from_email`, `location`, `coordinates`, `message`, `subject`
- Includes geolocation detection with reverse geocoding via bigdatacloud.net API

### Image Carousel Pattern
- [components/ImageCarousel.tsx](components/ImageCarousel.tsx) handles project screenshot slideshows
- Projects with multiple images use `images: string[]` array in data
- Single images fall back to `image: string` property

## Development Workflow

### Running Locally
```bash
npm install
npm run dev  # Opens on localhost:3000
```

### Building for Production
```bash
npm run build  # Generates static site in /out folder
npm start      # Previews production build
```

### Adding New Content
1. **New Project**: Add to `projects` array in [data/index.ts](data/index.ts) with required fields: `id`, `title`, `description`, `technologies`, `image`/`images`
2. **Update Experience**: Edit `experience` object in [data/index.ts](data/index.ts)
3. **Tech Stack**: Modify `techStack` array with icon paths from `/public`

## Critical Constraints

### Static Export Mode
- **No Server-Side Features**: Cannot use API routes, server components with dynamic data, or ISR
- **No Next.js Image Optimization**: Use standard `<img>` tags or external image services
- **Client-Side Only**: All interactivity must be client-side ('use client' directive)

### Deployment Target
- Configured for GitHub Pages at `https://osamah-s7s.github.io`
- Base path is root (`/`) - no subfolder configuration needed
- All public assets must be in `/public` folder

## Component Responsibilities

- **Header**: Sticky navigation with smooth scroll to section IDs
- **Hero**: Intro section with call-to-action
- **Projects**: Grid display with ImageCarousel integration, "Under Development" badge support
- **Contact**: Form validation, EmailJS integration, location detection
- **Experience**: Single experience object with responsibilities grid
- **Footer**: Social links from `socialLinks` data array

## Common Modifications

### Changing Colors
Update color variables in individual components (currently defined inline). Primary: `#667eea`, Secondary: `#764ba2`

### Adding Social Links
Edit `socialLinks` array in [data/index.ts](data/index.ts) - includes LinkedIn, GitHub, Upwork with icon classes

### Updating Metadata/SEO
Modify [app/layout.tsx](app/layout.tsx) `metadata` export for title, description, Open Graph, Twitter cards

## Dependencies Notes
- `framer-motion`: Animation library used extensively for scroll reveals
- `lucide-react`: Icon library for Contact form
- `@emailjs/browser`: Client-side email service
- `styled-components`: Installed but not actively used (legacy)
- Next.js 14 with App Router (not Pages Router)
