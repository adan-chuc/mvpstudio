import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const InteractiveCard = ({ 
  icon: Icon, 
  title, 
  description, 
  highlight,
  expandedContent,
  testimonial,
  className = '',
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: props.index * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div 
        className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100/50 shadow-sm h-full flex flex-col overflow-hidden"
        whileHover={{ 
          y: -4,
          scale: 1.01,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-purple-50/80 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 p-8">
          {/* Icon with enhanced animations */}
          <div className="mb-6">
            <motion.div 
              className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#e2e8f0"
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="h-6 w-6 text-slate-600" />
            </motion.div>
            
            {/* Subtle glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-200/0 via-slate-200/20 to-slate-200/0"
              animate={{ 
                opacity: isHovered ? 0.5 : 0
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col">
            <motion.h3 
              className="text-lg font-normal text-slate-900 mb-3 leading-snug"
              animate={{ 
                color: isHovered ? "#0f172a" : "#0f172a" 
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-slate-500 mb-4 leading-relaxed flex-1 font-normal"
              animate={{ 
                color: isHovered ? "#64748b" : "#64748b" 
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
            
            {/* Highlight badge */}
            <div className="mt-auto">
              <motion.div 
                className="inline-flex items-center px-3 py-1.5 bg-slate-50/80 text-slate-600 text-sm font-normal rounded-lg border border-slate-100"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#f8fafc",
                  color: "#475569"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"
                  animate={{ 
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    backgroundColor: isHovered ? "#10b981" : "#34d399"
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: isHovered ? Infinity : 0
                  }}
                />
                {highlight}
              </motion.div>
            </div>

            {/* Expand indicator */}
            {(expandedContent || testimonial) && (
              <motion.div 
                className="mt-4 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors duration-200"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="h-5 w-5" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (expandedContent || testimonial) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t border-slate-200/50 bg-slate-50/50"
            >
              <div className="p-6">
                {expandedContent && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-slate-700 text-sm leading-relaxed mb-4"
                  >
                    {expandedContent}
                  </motion.div>
                )}
                
                {testimonial && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white/70 rounded-xl p-4 border border-slate-200/50"
                  >
                    <p className="text-slate-600 text-sm italic mb-2">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-semibold">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-800 text-sm font-medium">
                          {testimonial.author}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-blue-400/0 pointer-events-none"
          animate={{ 
            borderColor: isHovered ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default InteractiveCard