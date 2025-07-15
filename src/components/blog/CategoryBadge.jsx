import React from 'react'
import { motion } from 'framer-motion'

const categoryColors = {
  'Desarrollo': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Startups': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'Tecnología': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  'Casos de Éxito': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'Negocios': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
}

export const CategoryBadge = ({ category }) => {
  const colorClass = categoryColors[category] || categoryColors['Desarrollo']
  
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider
        border backdrop-blur-md shadow-lg
        ${colorClass}
      `}
    >
      {category}
    </motion.span>
  )
}