import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TechStackShowcase = ({ className = '' }) => {
  const [hoveredTech, setHoveredTech] = useState(null)

  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      icon: '⚛️',
      color: '#61DAFB',
      description: 'Interfaces de usuario modernas y reactivas'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: '🟢',
      color: '#339933',
      description: 'APIs escalables y de alto rendimiento'
    },
    {
      name: 'AWS',
      category: 'Cloud',
      icon: '☁️',
      color: '#FF9900',
      description: 'Infraestructura cloud empresarial'
    },
    {
      name: 'TypeScript',
      category: 'Language',
      icon: '🔷',
      color: '#3178C6',
      description: 'Código robusto y mantenible'
    },
    {
      name: 'Docker',
      category: 'DevOps',
      icon: '🐳',
      color: '#2496ED',
      description: 'Despliegues consistentes y escalables'
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      icon: '🐘',
      color: '#336791',
      description: 'Base de datos robusta y confiable'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className={`${className}`}>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Tecnologías de Vanguardia
        </h3>
        <p className="text-sm text-slate-600">
          Stack tecnológico moderno para máximo rendimiento
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            className="relative"
            onHoverStart={() => setHoveredTech(tech)}
            onHoverEnd={() => setHoveredTech(null)}
          >
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 cursor-pointer group"
              whileHover={{ 
                y: -8,
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Tech Icon */}
              <motion.div
                className="text-3xl mb-2 flex justify-center"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.2
                }}
                transition={{ duration: 0.4 }}
              >
                {tech.icon}
              </motion.div>

              {/* Tech Name */}
              <motion.h4 
                className="text-sm font-semibold text-slate-800 text-center mb-1"
                animate={{ 
                  color: hoveredTech?.name === tech.name ? tech.color : "#1e293b" 
                }}
                transition={{ duration: 0.3 }}
              >
                {tech.name}
              </motion.h4>

              {/* Category */}
              <motion.p 
                className="text-xs text-slate-500 text-center"
                animate={{ 
                  color: hoveredTech?.name === tech.name ? "#64748b" : "#94a3b8" 
                }}
                transition={{ duration: 0.3 }}
              >
                {tech.category}
              </motion.p>

              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                animate={{ 
                  borderColor: hoveredTech?.name === tech.name 
                    ? `${tech.color}40` 
                    : "transparent"
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating particles */}
              <AnimatePresence>
                {hoveredTech?.name === tech.name && (
                  <>
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{ 
                          x: "50%", 
                          y: "50%", 
                          opacity: 0,
                          scale: 0 
                        }}
                        animate={{ 
                          x: `${50 + (Math.cos(i * 180 * Math.PI / 180) * 60)}%`,
                          y: `${50 + (Math.sin(i * 180 * Math.PI / 180) * 60)}%`,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTech?.name === tech.name && (
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    {tech.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional stats */}
      <motion.div
        className="mt-8 grid grid-cols-3 gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
          <div className="text-lg font-bold text-blue-600">99.9%</div>
          <div className="text-xs text-slate-600">Uptime</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
          <div className="text-lg font-bold text-green-600">24/7</div>
          <div className="text-xs text-slate-600">Monitoreo</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-slate-200/50">
          <div className="text-lg font-bold text-purple-600">Auto</div>
          <div className="text-xs text-slate-600">Escalado</div>
        </div>
      </motion.div>
    </div>
  )
}

export default TechStackShowcase