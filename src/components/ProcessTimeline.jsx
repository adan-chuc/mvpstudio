import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const ProcessTimeline = ({ className = '' }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState(null)

  const steps = [
    {
      id: 1,
      title: "Consulta y Análisis",
      description: "Entendemos tu visión y definimos el alcance del MVP",
      duration: "1-2 días",
      icon: ChatBubbleLeftRightIcon,
      details: [
        "Reunión inicial para entender tu idea",
        "Análisis de mercado y competencia",
        "Definición de funcionalidades core",
        "Estimación de tiempo y costos"
      ],
      color: "blue"
    },
    {
      id: 2,
      title: "Diseño y Prototipo",
      description: "Creamos wireframes y el diseño visual de tu MVP",
      duration: "3-5 días",
      icon: PencilSquareIcon,
      details: [
        "Wireframes de todas las pantallas",
        "Diseño UI/UX profesional",
        "Prototipo interactivo",
        "Revisiones y ajustes"
      ],
      color: "purple"
    },
    {
      id: 3,
      title: "Desarrollo",
      description: "Construimos tu MVP con las mejores tecnologías",
      duration: "2-4 semanas",
      icon: CodeBracketIcon,
      details: [
        "Desarrollo frontend y backend",
        "Integración de APIs necesarias",
        "Testing continuo",
        "Updates semanales de progreso"
      ],
      color: "green"
    },
    {
      id: 4,
      title: "Lanzamiento",
      description: "Desplegamos tu MVP y te damos las herramientas",
      duration: "1-2 días",
      icon: RocketLaunchIcon,
      details: [
        "Deploy en producción",
        "Configuración de dominios",
        "Training de uso",
        "Documentación completa"
      ],
      color: "orange"
    }
  ]

  const colorClasses = {
    blue: {
      bg: "bg-blue-500",
      light: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-500"
    },
    purple: {
      bg: "bg-purple-500",
      light: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-500"
    },
    green: {
      bg: "bg-green-500",
      light: "bg-green-100",
      text: "text-green-600",
      border: "border-green-500"
    },
    orange: {
      bg: "bg-orange-500",
      light: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-500"
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
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Nuestro Proceso Comprobado
        </h3>
        <p className="text-slate-600">
          De la idea al MVP funcional en semanas, no meses
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
        
        {/* Animated Progress Line */}
        <motion.div
          className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"
          initial={{ height: 0 }}
          whileInView={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const colors = colorClasses[step.color]
            const isActive = index <= activeStep
            const isHovered = hoveredStep === index

            return (
              <motion.div
                key={step.id}
                className="relative flex items-start cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number/Icon */}
                <motion.div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                    isActive ? colors.bg : 'bg-white'
                  } ${isActive ? 'border-white' : 'border-slate-300'}`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: isActive 
                      ? "0 0 20px rgba(59, 130, 246, 0.4)" 
                      : "0 0 0px rgba(59, 130, 246, 0)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="icon"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold text-slate-600"
                      >
                        {step.id}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="ml-6 flex-1"
                  animate={{ x: isHovered ? 10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
                      isActive ? colors.border + ' bg-white' : 'border-slate-200'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
                    }}
                    animate={{
                      boxShadow: isActive 
                        ? "0 8px 25px -8px rgba(59, 130, 246, 0.2)" 
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`text-lg font-semibold ${isActive ? colors.text : 'text-slate-800'}`}>
                        {step.title}
                      </h4>
                      <div className={`flex items-center text-sm ${colors.text} ${colors.light} px-2 py-1 rounded-full`}>
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {step.duration}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4">
                      {step.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={`border-t pt-4 ${colors.border} border-opacity-20`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.details.map((detail, detailIndex) => (
                                <motion.div
                                  key={detail}
                                  className="flex items-center text-sm text-slate-600"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                                >
                                  <CheckCircleIcon className={`h-4 w-4 mr-2 ${colors.text} flex-shrink-0`} />
                                  {detail}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Auto-progress animation */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Auto-animate through steps
              let currentStep = 0
              const interval = setInterval(() => {
                setActiveStep(currentStep)
                currentStep++
                if (currentStep >= steps.length) {
                  clearInterval(interval)
                }
              }, 800)
            }}
          >
            Ver Proceso Completo
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProcessTimeline