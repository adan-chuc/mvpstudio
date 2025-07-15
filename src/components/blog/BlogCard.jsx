import React from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, ArrowRightIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { CategoryBadge } from './CategoryBadge'
import { AuthorInfo } from './AuthorInfo'

export const BlogCard = ({ post, index, isFeatured }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`
        group relative bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 
        backdrop-blur-xl rounded-2xl overflow-hidden
        border border-slate-200/60 dark:border-gray-700/60
        shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-all duration-500 ease-out
        ${isFeatured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''}
      `}
    >
      {/* Imagen destacada */}
      <div className={`relative overflow-hidden ${isFeatured ? 'h-full min-h-[300px]' : 'h-64'}`}>
        <motion.img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Overlay gradient mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Elementos flotantes */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <CategoryBadge category={post.category} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2"
          >
            <EyeIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{Math.floor(Math.random() * 1000) + 100}</span>
          </motion.div>
        </div>
        
        {/* Indicador de lectura */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            whileInView={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className={`p-8 flex flex-col justify-between ${isFeatured ? 'md:p-10' : ''}`}>
        <div>
          <motion.h3 
            className={`
              font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 
              group-hover:text-transparent group-hover:bg-clip-text 
              group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
              transition-all duration-300
              ${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}
            `}
          >
            {post.title}
          </motion.h3>
          
          <p className={`
            text-slate-600 dark:text-slate-300 leading-relaxed mb-6 
            ${isFeatured ? 'text-base md:text-lg line-clamp-4' : 'text-sm md:text-base line-clamp-3'}
          `}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['React', 'MVP', 'Startups'].slice(0, 2).map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <AuthorInfo author={post.author} date={post.date} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <ClockIcon className="h-4 w-4" />
                <span>{post.readTime} min</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <HeartIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-3 font-semibold
              text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600
              hover:gap-4 transition-all duration-300
              ${isFeatured ? 'text-base' : 'text-sm'}
            `}
          >
            Leer artículo completo
            <ArrowRightIcon className="h-4 w-4 text-blue-600" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}