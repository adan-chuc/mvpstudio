import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CounterAnimation from './CounterAnimation'
import { 
  TrophyIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const LiveMetrics = ({ className = '' }) => {
  const [_isVisible, setIsVisible] = useState(false)
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0)

  const metrics = [
    {
      icon: TrophyIcon,
      label: "MVPs Exitosos",
      value: 127,
      suffix: "+",
      description: "Proyectos entregados y funcionando",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: UsersIcon,
      label: "Clientes Satisfechos",
      value: 89,
      suffix: "+",
      description: "Empresas que confían en nosotros",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: StarIcon,
      label: "Satisfacción Cliente",
      value: 98,
      suffix: "%",
      description: "Rating promedio de nuestros clientes",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: ClockIcon,
      label: "Tiempo Promedio",
      value: 4.2,
      suffix: " sem",
      description: "De idea a MVP funcional",
      color: "text-green-600",
      bgColor: "bg-green-100",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: ChartBarIcon,
      label: "ROI Promedio",
      value: 340,
      suffix: "%",
      description: "Retorno de inversión de nuestros MVPs",
      color: "text-red-600",
      bgColor: "bg-red-100",
      gradient: "from-red-400 to-rose-500"
    },
    {
      icon: CodeBracketIcon,
      label: "Líneas de Código",
      value: 1250000,
      suffix: "+",
      description: "Escritas para nuestros clientes",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      gradient: "from-indigo-400 to-blue-500",
      formatNumber: true
    }
  ]

  const achievements = [
    "🏆 Startup del Año 2023",
    "⚡ Entrega más rápida del mercado",
    "🔒 100% de confidencialidad garantizada",
    "🌟 Metodología propia validada"
  ]

  // Auto-cycle through featured metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetricIndex((prev) => (prev + 1) % 3) // Cycle through first 3 metrics
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
      {/* Featured Metrics Carousel */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, onComplete: () => setIsVisible(true) }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Números que Nos Respaldan
        </h3>

        {/* Main Featured Metric */}
        <motion.div
          className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200/50 shadow-xl shadow-slate-200/50 mb-6 max-w-md mx-auto"
          key={currentMetricIndex}
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-full ${metrics[currentMetricIndex].bgColor} flex items-center justify-center`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            {React.createElement(metrics[currentMetricIndex].icon, { 
              className: `h-8 w-8 ${metrics[currentMetricIndex].color}` 
            })}
          </motion.div>
          
          <div className="text-center">
            <CounterAnimation
              end={metrics[currentMetricIndex].value}
              suffix={metrics[currentMetricIndex].suffix}
              className={`text-4xl font-bold bg-gradient-to-r ${metrics[currentMetricIndex].gradient} bg-clip-text text-transparent`}
              duration={2}
              formatNumber={metrics[currentMetricIndex].formatNumber}
            />
            <h4 className="text-lg font-semibold text-slate-800 mt-2">
              {metrics[currentMetricIndex].label}
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              {metrics[currentMetricIndex].description}
            </p>
          </div>
        </motion.div>

        {/* Metric Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {metrics.slice(0, 3).map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMetricIndex ? 'bg-blue-500 scale-125' : 'bg-slate-300'
              }`}
              onClick={() => setCurrentMetricIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>

      {/* All Metrics Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ 
                y: -5,
                scale: 1.02
              }}
            >
              <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              
              <CounterAnimation
                end={metric.value}
                suffix={metric.suffix}
                className={`text-xl font-bold ${metric.color} block`}
                duration={1.5}
                formatNumber={metric.formatNumber}
              />
              
              <h4 className="text-sm font-semibold text-slate-800 mt-1">
                {metric.label}
              </h4>
              
              <p className="text-xs text-slate-600 mt-1 leading-tight">
                {metric.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">
          Reconocimientos y Logros
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((achievement, achievementIndex) => (
            <motion.div
              key={achievement}
              className="flex items-center bg-white/70 rounded-lg p-3 border border-blue-200/50"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-slate-700">{achievement}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-time Activity Indicator */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full mr-2"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          />
          Actualmente desarrollando 8 MVPs
        </div>
      </motion.div>
    </div>
  )
}

export default LiveMetrics