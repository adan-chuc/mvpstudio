import { Sparkles } from './ui/sparkles'
import { useTheme } from '../hooks/useTheme'
import { Retool, Vercel, Remote, Arc, Raycast } from './logos'

export function TrustedCompanies() {
  const { theme } = useTheme()
  
  return (
    <section className="relative py-20 w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto w-full max-w-2xl">
        <div className="text-center text-3xl text-foreground">
          <span className="text-indigo-900 dark:text-indigo-200">
            Marcas que han confiado en nosotros
          </span>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-8 text-zinc-900 dark:text-white">
          <Retool />
          <Vercel />
          <Remote />
          <Arc />
          <Raycast />
        </div>
      </div>

      <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color={theme === "dark" ? "#ffffff" : "#000000"}
        />
      </div>
    </section>
  )
} 