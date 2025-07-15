import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles } from '../components/ui/sparkles'
import { BlogCard } from '../components/blog/BlogCard'
import { DockNavigation } from '../components/ui/dock-navigation'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'
import { 
  ArrowLeftIcon,
  NewspaperIcon,
  TagIcon
} from '@heroicons/react/24/outline'

// Datos de ejemplo para el blog
const blogPosts = [
  {
    id: 1,
    title: "Por qué un MVP es la mejor estrategia para tu startup en 2024",
    excerpt: "Descubre cómo un MVP puede ayudarte a validar tu idea de negocio minimizando riesgos y maximizando el aprendizaje. Casos reales de startups exitosas.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    category: "Startups",
    author: {
      name: "Laura Martínez",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    date: "15 Dic 2024",
    readTime: 5
  },
  {
    id: 2,
    title: "Stack tecnológico ideal para desarrollar tu MVP",
    excerpt: "Analizamos las mejores tecnologías para construir un MVP robusto y escalable. React, Node.js, y las herramientas que realmente importan.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    category: "Desarrollo",
    author: {
      name: "Carlos Rodríguez",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    date: "12 Dic 2024",
    readTime: 8
  },
  {
    id: 3,
    title: "Caso de éxito: De MVP a empresa millonaria en 18 meses",
    excerpt: "La historia de cómo Chatgo pasó de ser un simple MVP a procesar miles de pedidos diarios para restaurantes en toda América Latina.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
    category: "Casos de Éxito",
    author: {
      name: "Ana Gómez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    date: "10 Dic 2024",
    readTime: 6
  },
  {
    id: 4,
    title: "IA y MVPs: Cómo integrar inteligencia artificial sin complicarte",
    excerpt: "Guía práctica para incorporar características de IA en tu MVP sin necesidad de un equipo de data scientists. APIs y herramientas accesibles.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "Tecnología",
    author: {
      name: "Diego López",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: "8 Dic 2024",
    readTime: 7
  },
  {
    id: 5,
    title: "Los 5 errores más comunes al desarrollar un MVP (y cómo evitarlos)",
    excerpt: "Aprende de los errores de otros. Analizamos los fallos más frecuentes que cometen los emprendedores al crear su MVP y cómo puedes evitarlos.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    category: "Startups",
    author: {
      name: "Patricia Ruiz",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg"
    },
    date: "5 Dic 2024",
    readTime: 6
  },
  {
    id: 6,
    title: "MVP vs Producto Completo: Cuándo es momento de escalar",
    excerpt: "Señales claras de que tu MVP está listo para evolucionar. Métricas, feedback de usuarios y estrategias para una transición exitosa.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Negocios",
    author: {
      name: "Roberto Méndez",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    date: "3 Dic 2024",
    readTime: 9
  },
  {
    id: 7,
    title: "Diseño UX/UI para MVPs: Lo esencial sin perder calidad",
    excerpt: "Cómo crear una experiencia de usuario excepcional en tu MVP sin invertir meses en diseño. Principios básicos y herramientas recomendadas.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "Desarrollo",
    author: {
      name: "Sofía Hernández",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    date: "1 Dic 2024",
    readTime: 5
  },
  {
    id: 8,
    title: "Financiamiento para tu MVP: Opciones más allá del capital propio",
    excerpt: "Explora las diferentes formas de financiar el desarrollo de tu MVP. Desde bootstrapping hasta inversión ángel, con pros y contras de cada opción.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    category: "Negocios",
    author: {
      name: "Miguel Torres",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg"
    },
    date: "28 Nov 2024",
    readTime: 10
  }
]

const categories = [
  { name: "Todos", count: blogPosts.length },
  { name: "Desarrollo", count: blogPosts.filter(p => p.category === "Desarrollo").length },
  { name: "Startups", count: blogPosts.filter(p => p.category === "Startups").length },
  { name: "Tecnología", count: blogPosts.filter(p => p.category === "Tecnología").length },
  { name: "Casos de Éxito", count: blogPosts.filter(p => p.category === "Casos de Éxito").length },
  { name: "Negocios", count: blogPosts.filter(p => p.category === "Negocios").length }
]

function Blog() {
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredPosts = selectedCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 font-outfit">
      {/* Navegación fija */}
      <header className="bg-gradient-to-b from-white/90 to-slate-50/80 dark:from-gray-900/90 dark:to-gray-950/90 backdrop-blur-lg border-b border-slate-200/30 dark:border-gray-700/30 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="w-20"></div>
            
            <DockNavigation className="flex" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-20 flex justify-end"
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section del Blog */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <Sparkles
          density={800}
          className="absolute inset-0 -z-10"
          color={theme === "dark" ? "#ffffff" : "#000000"}
          opacity={0.1}
        />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <NewspaperIcon className="h-4 w-4" />
              <span>Blog de MVP Studio</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6">
              Insights para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Emprendedores</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Aprende de nuestra experiencia construyendo MVPs exitosos. 
              Guías, casos de estudio y las mejores prácticas del ecosistema startup.
            </p>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Volver al inicio
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar de categorías */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <TagIcon className="h-5 w-5" />
                  Categorías
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`
                        w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                        ${selectedCategory === category.name 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-60">({category.count})</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Grid de artículos */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    index={index}
                    isFeatured={index === 0 && selectedCategory === "Todos"}
                  />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-slate-500 dark:text-slate-400">
                    No hay artículos en esta categoría aún.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog