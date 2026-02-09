# Osamah Portfolio - Next.js TypeScript Version

This is a modern, responsive portfolio website built with Next.js 14, TypeScript, and React. It's a complete conversion of the original HTML portfolio to a TypeScript Next.js application.

## Features

- **Modern Tech Stack**: Next.js 14, TypeScript, React 18


- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Component Architecture**: Modular React components for maintainability
- **SEO Optimized**: Next.js built-in SEO features
- **Performance**: Optimized images and code splitting

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── About.tsx            # About section component
│   ├── Contact.tsx           # Contact form component
│   ├── Experience.tsx       # Experience section component
│   ├── Footer.tsx           # Footer component
│   ├── Header.tsx           # Navigation header component
│   ├── Hero.tsx             # Hero section component
│   ├── Projects.tsx         # Projects showcase component
│   └── TechStack.tsx        # Tech stack component
├── data/
│   └── index.ts             # Portfolio data and content
├── types/
│   └── index.ts             # TypeScript interfaces and types
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up EmailJS (for contact form - works with static hosting like GitHub Pages):
   - Sign up for a free account at [https://www.emailjs.com](https://www.emailjs.com)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{to_email}}` - Recipient (set to: osamah0alini@gmail.com)
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{location}}` - Sender's location
     - `{{coordinates}}` - GPS coordinates
     - `{{message}}` - Message content
     - `{{subject}}` - Email subject
   - Get your Service ID, Template ID, and Public Key
   - Open `components/Contact.tsx` and replace:
     - `YOUR_SERVICE_ID` with your EmailJS Service ID
     - `YOUR_TEMPLATE_ID` with your EmailJS Template ID
     - `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   - These keys are safe to hardcode as they're meant for client-side use

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Key Improvements from HTML Version

1. **Type Safety**: All components are properly typed with TypeScript interfaces
2. **Component Reusability**: Modular components for better maintainability
3. **State Management**: React hooks for interactive features
4. **Performance**: Next.js optimizations for faster loading
5. **SEO**: Built-in meta tags and structured data
6. **Developer Experience**: Better debugging and development tools

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules with global styles
- **UI Components**: Custom React components
- **Icons**: Emoji-based icons for simplicity
- **Images**: SVG data URIs for placeholder images
- **Email Service**: EmailJS for contact form emails (works with static hosting)

## Customization

### Adding New Projects
Edit `data/index.ts` and add new project objects to the `projects` array.

### Modifying Content
Update the data in `data/index.ts` to change portfolio content.

### Styling Changes
Modify `app/globals.css` for global styles or individual component files for component-specific styles.

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any hosting service that supports Node.js

## License

This project is for portfolio purposes. Feel free to use as inspiration for your own portfolio.


