# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite MVP landing page application for "MVP Studio" - a service that helps businesses build cost-effective MVPs. The project features:

- **Frontend**: React 19 with Vite bundling, Tailwind CSS styling, and Framer Motion animations
- **Backend**: Dual approach with Express.js server and API routes, both using Resend for email
- **Architecture**: Full-stack application with contact form integration and particle effects
- **Design**: Apple/Notion-inspired glassmorphism aesthetic with comprehensive design system

## Development Commands

```bash
# Install dependencies
npm install

# Development (frontend only)
npm run dev

# Development (full-stack - recommended)
npm run dev:full

# Backend server only
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

### Core Files
- `src/App.jsx` - Single React component containing the entire landing page
- `server.js` - Express backend with contact form API and Resend email integration
- `pages/api/contact.js` - Alternative API endpoint (Next.js style API route)
- `design-system.md` - Comprehensive design system documentation

### Configuration
- `vite.config.js` - Vite configuration with React plugin
- `tailwind.config.js` - Tailwind CSS config with custom Outfit font family
- `eslint.config.js` - ESLint configuration with React hooks and refresh plugins
- `postcss.config.js` - PostCSS configuration for Tailwind
- `.env.local` - Environment variables for email functionality

### Components
- `src/components/ui/sparkles.jsx` - shadcn/ui Sparkles component with density, color theming, and masking support
- `src/components/ThemeProvider.jsx` - Theme provider wrapper using next-themes
- `src/components/ThemeToggle.jsx` - Dark/light theme toggle button component
- `src/components/TrustedCompanies.jsx` - Trusted companies section with logos and particle effects
- `src/components/logos/` - SVG logo components (Retool, Vercel, Remote, Arc, Raycast)
- `src/hooks/useTheme.jsx` - Custom hook for theme management with hydration safety
- `src/main.jsx` - React app entry point with ThemeProvider wrapper
- `src/index.css` - Global styles and Tailwind imports

## Key Technologies

- **React 19** with modern hooks and functional patterns
- **Vite** for fast development and building
- **Tailwind CSS** with custom design system and Outfit font family
- **Framer Motion** for smooth animations and transitions
- **next-themes** for dark/light theme management with system preference support
- **shadcn/ui** component system with custom Sparkles component for particle effects
- **Heroicons** for consistent iconography
- **Express.js** backend with CORS support
- **Resend** for transactional email delivery
- **canvas-confetti** for celebration animations
- **concurrently** for running frontend and backend simultaneously
- **@tsparticles/react** and **@tsparticles/slim** for additional particle effects (complementing Sparkles component)

## Architecture

### Dual Backend Approach
The project includes two API implementations:
1. **Express Server** (`server.js`) - Main backend running on port 3001
2. **API Routes** (`pages/api/contact.js`) - Next.js style API endpoint

Both use identical Resend email functionality and validation logic.

### Frontend Architecture
- **Component-Based Design**: Main App component with modular sub-components for reusability
- **Theme System**: Dark/light theme support with next-themes, system preference detection, and hydration safety
- **State Management**: Local React state for form data, errors, and UI states
- **Animation System**: Framer Motion for entrance animations, hover effects, and page transitions
- **Particle System**: shadcn/ui Sparkles component with configurable density, color theming, and masking effects

### Form Flow
1. Frontend form validates input (email format, phone number, required fields)
2. Submits to Express server at `http://localhost:3001/api/contact`
3. Server validates, sends formatted email via Resend, returns success/error
4. Success triggers confetti animation and modal display
5. Error handling with user-friendly messages and specific error types

## Environment Variables

Required for email functionality (stored in `.env.local`):
- `RESEND_API_KEY` - API key for Resend service
- `RESEND_FROM_EMAIL` - Sender email address (defaults to onboarding@resend.dev)
- `RESEND_TO_EMAIL` - Recipient email address (defaults to delivered@resend.dev)
- `PORT` - Server port (defaults to 3001)

### Setting up .env.local
Create a `.env.local` file in the project root:
```bash
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=delivered@resend.dev
PORT=3001
```

**Note**: The `.env.local` file is git-ignored and should never be committed to version control.

### Adding the Sparkles Component
To add the shadcn/ui Sparkles component, use:
```bash
npx shadcn@latest add "https://21st.dev/r/lepikhinb/sparkles?api_key=eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ybXdGd3U1cW5FQXozZ1U2dmxnMW13ZU1PZEoiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovLzIxc3QuZGV2IiwiZXhwIjoxNzUyMTI4MDE1LCJpYXQiOjE3NTIxMjcxMTUsImlzcyI6Imh0dHBzOi8vY2xlcmsuMjFzdC5kZXYiLCJqdGkiOiIwM2QxOWQwNmIxNWViOTVlYWVlNyIsIm5iZiI6MTc1MjEyNzExMCwic3ViIjoidXNlcl8ydUR0dnhGemRiN2tLaDFxRkpvODBjOENRenMifQ.S-O882tFGoUGiiX6CJM-DI2E3iAQBqu27UtKPgHx2HJ9Ak1taIUFwhscPJP1tjRxj8LccpjkGGEiwuqxGIKK-H20tKxuCQYx8THZ_tYW0JMWUr7QLGtAxX795-v1geQazbsuotZBjQ5oa2s6sPeSWd6Mdk2zokg7JmMAsQoX-pFow2dwsh_fn6QkcDSmuca9p6wUEaI2PxonPVo1hxap88niGrrRGN1SwoqXLRTWPM5R-xh4OT0I39S-1zOWymUEVDrF_77bFTrBHL1qvvLTY2SnOcQQCwL_BPFcyIG8kGU8-8sWWHzrgzHuITRKrx5c1WRpCNARfTjyH9M7m8kbpw"
```

This will install the component to `src/components/ui/sparkles.jsx` with support for density, color theming, and CSS masking effects.

## Design System

### Core Principles
- **Apple/Notion-inspired** aesthetics with clean, minimal design
- **Glassmorphism effects** using `backdrop-blur` and semi-transparent backgrounds
- **Consistent spacing** using Tailwind's spacing scale
- **Smooth animations** with Framer Motion for all interactions

### Color Palette
- **Light Theme**: `slate-50`, `white`, `slate-100` backgrounds with `slate-800` text
- **Dark Theme**: `gray-900`, `gray-950`, `slate-800` backgrounds with `white` text
- **Text**: `slate-800` (primary), `slate-600` (secondary), `slate-400` (muted)
- **Accents**: `blue-600`/`blue-700` for primary actions, `indigo-900`/`indigo-200` for themed elements
- **Borders**: `slate-200` with 50% opacity variations, `white/20` for dark theme

### Typography
- **Font Family**: Outfit (Google Fonts)
- **Hierarchy**: `text-3xl` to `text-7xl` for headings, standard sizes for body text
- **Weight**: `font-semibold` for headings, `font-medium` for buttons

## Code Patterns

### React Patterns
- **Functional Components**: All components use hooks (useState, useEffect)
- **Theme Management**: Custom useTheme hook with hydration safety and system preference detection
- **Form Handling**: Controlled inputs with validation and error states
- **Animation Patterns**: Consistent Framer Motion usage for entrance and interaction animations

### Styling Patterns
- **Tailwind Utility Classes**: Extensive use following design system guidelines
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Theme-Aware Styling**: `dark:` prefix for dark theme variants (e.g., `dark:bg-gray-900`)
- **Glassmorphism**: `bg-white/80 backdrop-blur-sm` pattern throughout
- **Shadows**: `shadow-xl shadow-slate-200/50` for depth

### Animation Patterns
```jsx
// Standard entrance animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Button interactions
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

### Theme Patterns
```jsx
// Theme-aware styling with hydration safety
import { useTheme } from '../hooks/useTheme'

const { theme } = useTheme()

// Dynamic theme-based properties
<Sparkles
  color={theme === "dark" ? "#ffffff" : "#000000"}
/>

// Theme toggle component
<ThemeToggle />

// Theme-aware CSS classes
<div className="bg-white dark:bg-gray-900 text-slate-800 dark:text-white">
```

#### Theme System Implementation
The theme system uses `next-themes` with a custom hook for hydration safety:
- **ThemeProvider**: Wraps app with `next-themes` provider, enables system preference detection
- **useTheme hook**: Custom wrapper that prevents hydration mismatches by checking mounted state
- **ThemeToggle**: Button component that cycles between light/dark/system themes
- **CSS Classes**: Uses Tailwind's `dark:` prefix for theme-aware styling

### Sparkles Component Patterns
```jsx
// Basic Sparkles usage
import { Sparkles } from "@/components/ui/sparkles"

<Sparkles
  density={1200}
  className="absolute inset-x-0 bottom-0 h-full w-full"
  color="#000000"
/>

// Sparkles with masking and theming
<Sparkles
  density={1200}
  className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
  color={theme === "dark" ? "#ffffff" : "#000000"}
/>

// Company logos grid pattern (from demo)
<div className="mt-14 grid grid-cols-5 text-zinc-900 dark:text-white">
  <CompanyLogo1 />
  <CompanyLogo2 />
  <CompanyLogo3 />
  <CompanyLogo4 />
  <CompanyLogo5 />
</div>
```

### Error Handling Patterns
- **Form Validation**: Client-side validation with real-time error display
- **API Error Handling**: Specific error messages for different failure types
- **Network Errors**: Connection and rate limiting detection

## Development Workflow

### Local Development
1. **Full-stack mode**: Use `npm run dev:full` to run both frontend (port 5173) and backend (port 3001)
2. **Frontend only**: Use `npm run dev` for UI development without backend
3. **Backend only**: Use `npm run server` for API development

### Port Configuration
- **Frontend (Vite)**: Port 5173
- **Backend (Express)**: Port 3001
- **No conflicts**: Designed to run simultaneously without port conflicts

### Email Testing
- Configure `.env.local` with valid Resend credentials
- Use Resend's test email addresses for development
- Both HTML and plain text email templates are generated

### Debugging
- **Server logs**: Detailed console logging in Express server (check terminal running `npm run server`)
- **Client errors**: Browser console for frontend issues, React DevTools for component state
- **Email debugging**: Check Resend dashboard for delivery status and bounce reports
- **Theme issues**: Check if `mounted` state is causing hydration problems in useTheme hook
- **Form validation**: Use browser DevTools Network tab to inspect API requests/responses
- **Animation problems**: Check Framer Motion DevTools and verify CSS transitions

## Common Development Tasks

### Adding New Sections
1. Add new motion.section with consistent animation patterns
2. Follow design system guidelines for spacing and colors
3. Use Tailwind utility classes consistently
4. Test responsive behavior across breakpoints

### Modifying Email Templates
1. Update both `server.js` and `pages/api/contact.js` if using both
2. Maintain both HTML and text versions
3. Test email rendering across different clients

### Animation Updates
1. Use consistent Framer Motion patterns
2. Test performance with multiple animations
3. Ensure accessibility considerations for reduced motion

## Testing and Quality

### Linting
- **ESLint configuration**: Modern config with React hooks and refresh plugins
- **Rules**: Unused variables allowed for constants (varsIgnorePattern)
- **Commands**: Use `npm run lint` to check code quality

### Building
- **Production build**: `npm run build` creates optimized bundle
- **Preview**: `npm run preview` to test production build locally
- **Assets**: Vite handles asset optimization and bundling

## Performance Considerations

- **Particle System**: shadcn/ui Sparkles component optimized with configurable density and efficient rendering
- **Animations**: Framer Motion animations optimized for 60fps
- **Bundle Size**: Vite code splitting and tree shaking enabled
- **Email Templates**: Inline CSS for email client compatibility

## Security Notes

- **Environment Variables**: Sensitive keys stored in `.env.local` (not committed)
- **Input Validation**: Both client and server-side validation implemented
- **CORS**: Configured for development, review for production deployment
- **Email Security**: Resend handles email security and deliverability

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.