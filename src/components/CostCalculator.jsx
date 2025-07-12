import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CounterAnimation from './CounterAnimation'
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  CpuChipIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const CostCalculator = ({ className = '' }) => {
  const [selectedComplexity, setSelectedComplexity] = useState('medium')
  const [selectedFeatures, setSelectedFeatures] = useState(3)
  const [selectedTimeline, setSelectedTimeline] = useState('standard')
  const [showComparison, setShowComparison] = useState(false)

  const complexityOptions = [
    {
      id: 'simple',
      name: 'Simple',
      description: 'Landing page + formulario',
      multiplier: 0.7,
      icon: '📄'
    },
    {
      id: 'medium',
      name: 'Estándar',
      description: 'App web con funcionalidades core',
      multiplier: 1,
      icon: '💻'
    },
    {
      id: 'complex',
      name: 'Avanzado',
      description: 'Plataforma con múltiples módulos',
      multiplier: 1.5,
      icon: '🚀'
    }
  ]

  const timelineOptions = [
    {
      id: 'rush',
      name: '2-3 semanas',
      description: 'Entrega urgente',
      multiplier: 1.3,
      icon: '⚡'
    },
    {
      id: 'standard',
      name: '4-6 semanas',
      description: 'Tiempo estándar',
      multiplier: 1,
      icon: '⏱️'
    },
    {
      id: 'extended',
      name: '8-12 semanas',
      description: 'Desarrollo detallado',
      multiplier: 0.8,
      icon: '🎯'
    }
  ]

  const additionalFeatures = [
    'Autenticación de usuarios',
    'Panel de administración',
    'Notificaciones push',
    'Pasarela de pagos',
    'API externa',
    'Dashboard analytics',
    'Chat en tiempo real',
    'Multi-idioma'
  ]

  // Calcular costo
  const baseCost = 60000
  const complexity = complexityOptions.find(c => c.id === selectedComplexity)
  const timeline = timelineOptions.find(t => t.id === selectedTimeline)
  const featureCost = selectedFeatures * 8000

  const mvpCost = Math.round(
    (baseCost + featureCost) * complexity.multiplier * timeline.multiplier
  )
  
  const traditionalCost = mvpCost * 4.2
  const savings = traditionalCost - mvpCost

  useEffect(() => {
    // Auto-show comparison after user interacts
    const timer = setTimeout(() => {
      setShowComparison(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [selectedComplexity, selectedFeatures, selectedTimeline])

  return (
    <div className={`${className}`}>
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-xl shadow-slate-200/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Calculadora de Costos MVP
          </h3>
          <p className="text-slate-600">
            Personaliza tu proyecto y descubre el ahorro real
          </p>
        </div>

        <div className="space-y-8">
          {/* Complexity Selection */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <CpuChipIcon className="h-5 w-5 mr-2 text-blue-600" />
              Complejidad del Proyecto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {complexityOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedComplexity(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedComplexity === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-slate-800">{option.name}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Features Selection */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
              Funcionalidades Adicionales
            </h4>
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-700">Cantidad de funcionalidades:</span>
                <motion.span 
                  className="text-xl font-bold text-blue-600"
                  key={selectedFeatures}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedFeatures}
                </motion.span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                value={selectedFeatures}
                onChange={(e) => setSelectedFeatures(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(selectedFeatures / 8) * 100}%, #e2e8f0 ${(selectedFeatures / 8) * 100}%, #e2e8f0 100%)`
                }}
              />
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                {additionalFeatures.slice(0, selectedFeatures).map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center text-slate-600"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Selection */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-600" />
              Tiempo de Entrega
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {timelineOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedTimeline(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedTimeline === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-slate-800">{option.name}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Results */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
            layout
          >
            <h4 className="text-lg font-semibold text-slate-800 mb-6 text-center">
              Estimación de Costos
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">Tu MVP con nosotros:</span>
                  <CounterAnimation
                    end={mvpCost}
                    prefix="$"
                    suffix=" MXN"
                    className="text-2xl font-bold text-blue-700"
                    duration={1.5}
                  />
                </div>
              </div>

              <AnimatePresence>
                {showComparison && (
                  <>
                    <motion.div
                      className="bg-red-50 rounded-lg p-4 border border-red-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-red-600 font-medium">Desarrollo tradicional:</span>
                        <CounterAnimation
                          end={traditionalCost}
                          prefix="$"
                          suffix=" MXN"
                          className="text-xl font-bold text-red-700"
                          duration={1.5}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-green-50 rounded-lg p-4 border border-green-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-medium">Tu ahorro total:</span>
                        <CounterAnimation
                          end={savings}
                          prefix="$"
                          suffix=" MXN"
                          className="text-2xl font-bold text-green-700"
                          duration={2}
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Cotización Personalizada
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default CostCalculator