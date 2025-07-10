import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      themes={['light', 'dark']}
    >
      {children}
    </NextThemeProvider>
  )
} 