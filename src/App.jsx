import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles } from './components/ui/sparkles'
import { ThemeToggle } from './components/ThemeToggle'
import { Retool, Vercel, Remote, Arc, Raycast } from './components/logos'
import CounterAnimation from './components/CounterAnimation'
import InteractiveCard from './components/InteractiveCard'
import TechStackShowcase from './components/TechStackShowcase'
import CostCalculator from './components/CostCalculator'
import ProcessTimeline from './components/ProcessTimeline'
import LiveMetrics from './components/LiveMetrics'
import { 
  CurrencyDollarIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CreditCardIcon,
  CodeBracketIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

function App() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectDescription: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Trigger confetti after modal appears
  useEffect(() => {
    if (showSuccessModal) {
      // Wait for modal elements to finish flowing, then fire confetti
      const timer = setTimeout(() => {
        fireConfetti()
      }, 400) // 400ms delay for natural flow after elements complete
      
      return () => clearTimeout(timer)
    }
  }, [showSuccessModal])

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: "Ahorro Garantizado",
      description: "Hasta 200,000 pesos menos que un desarrollo tradicional",
      highlight: "Ahorro promedio del 75%",
      expandedContent: "Nuestro proceso optimizado y metodología ágil nos permite entregar MVPs funcionales por una fracción del costo tradicional. Eliminamos elementos innecesarios y nos enfocamos en las funcionalidades core que realmente importan.",
      testimonial: {
        quote: "Ahorramos más de $180,000 comparado con otras cotizaciones. El ROI fue inmediato.",
        author: "Carlos Mendez",
        role: "CEO, TechStart"
      }
    },
    {
      icon: ClockIcon,
      title: "Tiempo Reducido",
      description: "Lanza tu MVP en 4-6 semanas, no meses",
      highlight: "85% más rápido que métodos tradicionales",
      expandedContent: "Mientras otros tardan 6-12 meses, nosotros entregamos MVPs funcionales en semanas. Usamos frameworks modernos, componentes pre-construidos y un equipo especializado en desarrollo rápido.",
      testimonial: {
        quote: "En 5 semanas teníamos nuestro MVP funcionando con usuarios reales. Increíble velocidad.",
        author: "Ana Torres",
        role: "Fundadora, EcoApp"
      }
    },
    {
      icon: ShieldCheckIcon,
      title: "Riesgo Minimizado",
      description: "Valida tu idea antes de invertir en desarrollo completo",
      highlight: "95% de nuestros MVPs validan la hipótesis",
      expandedContent: "Un MVP te permite probar tu idea con usuarios reales antes de comprometer grandes presupuestos. Identificamos problemas temprano y ajustamos la estrategia basada en feedback real del mercado.",
      testimonial: {
        quote: "Descubrimos que nuestros usuarios querían algo diferente. El MVP nos ahorró meses de desarrollo incorrecto.",
        author: "Roberto Silva",
        role: "CTO, InnovateLab"
      }
    }
  ]

  const features = [
    "Desarrollo ágil y eficiente",
    "Funcionalidades core validadas",
    "Diseño profesional incluido",
    "Soporte técnico por 30 días"
  ]

  const workingBenefits = [
    {
      icon: CreditCardIcon,
      title: "Pagos por Entregables",
      description: "No pagas todo de contado. Pagas conforme avanza el proyecto y ves resultados reales",
      highlight: "Sin riesgo financiero inicial",
      expandedContent: "Dividimos el proyecto en hitos específicos. Solo pagas cuando cada entregable está completado y aprobado por ti. Esto te da control total sobre el presupuesto y asegura calidad en cada fase.",
      testimonial: {
        quote: "El modelo de pagos por entregables nos dio mucha tranquilidad. Veíamos progreso real antes de cada pago.",
        author: "María González",
        role: "COO, StartupLab"
      }
    },
    {
      icon: CodeBracketIcon,
      title: "Eres Dueño del Código",
      description: "100% código limpio que te entregamos. Tu MVP, tu código, tu decisión de qué hacer con él",
      highlight: "Propiedad completa e independencia",
      expandedContent: "Todo el código fuente, documentación y assets son 100% tuyos. Sin dependencias a terceros, sin licencias restrictivas. Puedes modificarlo, escalarlo o cambiar de proveedor cuando quieras.",
      testimonial: {
        quote: "Tener el código completo nos permitió escalar rápidamente cuando conseguimos inversión. Total independencia.",
        author: "Jorge Ramirez",
        role: "CTO, TechVenture"
      }
    },
    {
      icon: ClockIcon,
      title: "Semanas, No Meses",
      description: "Tu MVP funcional en producción lo más rápido posible. Porque el tiempo de validación es oro",
      highlight: "Velocidad de lanzamiento real",
      expandedContent: "Usamos metodologías ágiles, frameworks probados y nuestro stack tecnológico optimizado para entregar MVPs funcionales en tiempo récord. Cada día cuenta en el mercado.",
      testimonial: {
        quote: "En 28 días teníamos usuarios reales usando nuestro producto. Esa velocidad nos dio ventaja competitiva crucial.",
        author: "Andrea López",
        role: "Fundadora, InnovaApp"
      }
    }
  ]

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/
    return phoneRegex.test(phone)
  }

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form
    const errors = {}
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El correo es requerido'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Correo electrónico no válido'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido'
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Número de teléfono no válido'
    }
    
    if (!formData.projectDescription.trim()) {
      errors.projectDescription = 'La descripción del proyecto es requerida'
    } else if (formData.projectDescription.trim().length < 20) {
      errors.projectDescription = 'La descripción debe tener al menos 20 caracteres'
    }
    
    setFormErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      try {
        // Send data to API (Express server)
        const response = await fetch('http://localhost:3001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (response.ok) {
          // Success
          setShowSuccessModal(true)
        } else {
          // API returned an error
          throw new Error(result.error || 'Error al enviar el mensaje')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        
        // Handle different types of errors
        if (error.message.includes('Failed to fetch')) {
          alert('Error de conexión. Verifica tu conexión a internet e intenta de nuevo.')
        } else if (error.message.includes('rate limit')) {
          alert('Has enviado demasiadas solicitudes. Espera unos minutos antes de intentar de nuevo.')
        } else {
          alert(`Error: ${error.message}`)
        }
      }
    }
    
    setIsSubmitting(false)
  }

  // Close modal and clear form
  const closeSuccessModal = () => {
    setShowSuccessModal(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      projectDescription: ''
    })
  }

  // Smooth spectacular confetti explosion from center
  const fireConfetti = () => {
    const defaults = { 
      ticks: 60,  // Optimized for performance
      zIndex: 9999,  // Maximum z-index for super crisp visibility
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
      origin: { x: 0.5, y: 0.5 },  // Perfect center
      useWorker: true  // Background rendering for smoothness
    };

    // Burst 1: Initial concentrated explosion
    confetti({
      ...defaults,
      particleCount: 60,
      spread: 45,  // Much more concentrated
      startVelocity: 40
    });

    // Burst 2: Medium spread (25ms later)
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        spread: 70,  // Concentrated medium spread
        startVelocity: 30
      });
    }, 25);

    // Burst 3: Controlled spread (50ms later)
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        spread: 100,  // More controlled spread
        startVelocity: 25
      });
    }, 50);

    // Burst 4: Final concentrated flourish (100ms later)
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 40,
        spread: 130,  // Final concentrated touch
        startVelocity: 20
      });
    }, 100);
  }

  return (
    <div className="min-h-screen relative font-outfit overflow-hidden scroll-smooth">
      {/* Modern Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Blob 1 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        
        {/* Large Blob 2 */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        
        {/* Medium Blob 3 */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/15 to-blue-400/15 rounded-full blur-2xl"
        />
        
        {/* Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 transform rotate-45 blur-xl"
        />
        
        <motion.div
          animate={{
            rotate: [360, 0],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-blue-300/30 rounded-full blur-xl"
        />
        
        {/* Grafiti-style elements */}
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2/3 left-1/2 w-40 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg transform -rotate-12"
        />
        
        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-28 h-8 bg-gradient-to-r from-blue-400/25 to-purple-400/25 rounded-full blur-lg transform rotate-45"
        />
        
        {/* Small floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400/40 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-3/4 right-1/3 w-6 h-6 bg-pink-400/30 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/2 w-3 h-3 bg-purple-400/50 rounded-full blur-sm"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <RocketLaunchIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-semibold text-slate-800">MVP Studio</span>
            </motion.div>
            
            <div className="flex items-center space-x-8">
              <motion.nav
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:flex space-x-8"
              >
                <a href="#servicios" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Servicios</a>
                <a href="#proceso" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Proceso</a>
                <a href="#contacto" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Contacto</a>
              </motion.nav>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero and Trusted Companies Combined Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50/80 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Unified background layers */}
        <div className="absolute inset-0">
          {/* Main radial gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-indigo-50/50 via-purple-50/30 to-transparent"></div>
          {/* Center radial overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-white/40 via-transparent to-transparent"></div>
        </div>

        {/* Sparkles effect for the entire combined section */}
        <div className="absolute inset-0 z-5">
          <Sparkles
            density={800}
            className="absolute inset-0"
            color="#8B5CF6"
            background="transparent"
            size={1.2}
            speed={0.4}
            opacity={0.6}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-2">Ahorra hasta</div>
                <div className="text-blue-600 dark:text-blue-400 mb-2">$200,000 pesos</div>
                <div>en el desarrollo de tu producto</div>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Construimos <strong>MVPs</strong> para empresas y emprendedores que quieren 
                ahorrar dinero en un desarrollo caro y prefieren validar sin arriesgar capital
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 flex items-center justify-center group"
                >
                  Solicita tu MVP
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-slate-200/50 dark:shadow-gray-800/50"
                >
                  Conoce más
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trusted Companies Content - Now integrated into the same section */}
        <div className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-2xl">
            <motion.div 
              className="text-center text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-black dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Marcas que han confiado en nosotros
              </h2>
            </motion.div>

            <motion.div 
              className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-8 text-zinc-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Retool />
              <Vercel />
              <Remote />
              <Arc />
              <Raycast />
            </motion.div>
          </div>

          {/* Curved bottom section with sparkles */}
          <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
            <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section with Interactive Elements */}
      <section className="relative pt-0 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Subtle Notion/Apple style gradient */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)'
          }}
        ></div>
        
        {/* Minimal geometric elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-slate-300 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-slate-200 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6 tracking-tight">
              ¿Por qué elegir un MVP?
            </h2>
            <p className="text-xl font-normal text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              Valida tu idea de negocio sin arriesgar todo tu capital
            </p>
            
            {/* Key metrics with Notion/Apple style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100/50 p-6 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg min-h-[120px] flex flex-col justify-center">
                  <CounterAnimation
                    end={200000}
                    prefix="$"
                    suffix=""
                    className="text-3xl font-light text-slate-900 block mb-2"
                    duration={2.5}
                  />
                  <p className="text-sm font-normal text-slate-500">Costo promedio tradicional</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100/50 p-6 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg min-h-[120px] flex flex-col justify-center">
                  <CounterAnimation
                    end={50}
                    suffix="%"
                    className="text-3xl font-light text-emerald-600 block mb-2"
                    duration={2.5}
                  />
                  <p className="text-sm font-normal text-slate-500">Menos costo con MVP</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100/50 p-6 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg min-h-[120px] flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="text-3xl font-light text-blue-600">4-6</span>
                    <span className="text-lg font-light text-slate-400 ml-1">semanas</span>
                  </div>
                  <p className="text-sm font-normal text-slate-500">Tiempo de entrega</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <InteractiveCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                highlight={benefit.highlight}
                expandedContent={benefit.expandedContent}
                testimonial={benefit.testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Progress indicators with real data */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-10 border border-slate-100/50 shadow-sm">
              <h3 className="text-2xl font-light text-slate-900 mb-8 text-center tracking-tight">
                Comparación Visual de Ahorros
              </h3>
              
              <div className="space-y-8">
                {/* Traditional Development */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-normal text-slate-600">Desarrollo Tradicional</span>
                    <span className="text-sm font-normal text-slate-800">$400,000 - 8 meses</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <motion.div
                      className="bg-slate-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* MVP Development */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-normal text-slate-600">MVP con Nosotros</span>
                    <span className="text-sm font-normal text-slate-800">$100,000 - 4-6 semanas</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <motion.div
                      className="bg-emerald-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "25%" }}
                      transition={{ duration: 2, delay: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-normal text-slate-600">Tu Ahorro Total</span>
                    <CounterAnimation
                      end={300000}
                      prefix="$"
                      suffix=" + 7 meses"
                      className="text-lg font-light text-slate-900"
                      duration={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Working Benefits Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Enhanced gradient with depth */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, white 0%, #faf9fc 8%, #f3f1f8 20%, #ebe8f4 35%, #e2dff0 50%, #ebe8f4 65%, #f3f1f8 80%, #f8f9fa 92%, rgba(248, 250, 252, 0.5) 100%)'
          }}
        ></div>
        
        {/* Animated code elements in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 text-4xl opacity-10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-3xl opacity-10"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'{...}'}
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              ¿Qué incluye trabajar con nosotros?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Una forma inteligente de desarrollar tu MVP sin los riesgos tradicionales
            </p>
            
            {/* Live metrics showcase */}
            <LiveMetrics className="mb-12" />
          </motion.div>

          {/* Interactive Cards with Premium Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {workingBenefits.map((benefit, index) => (
              <InteractiveCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                highlight={benefit.highlight}
                expandedContent={benefit.expandedContent}
                testimonial={benefit.testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Tech Stack Showcase */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TechStackShowcase />
          </motion.div>

          {/* Enterprise Level Guarantees */}
          <motion.div
            className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Garantías de Nivel Empresarial
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  <CounterAnimation
                    end={100}
                    suffix="% Garantía"
                    className="text-green-600 font-bold"
                    duration={1.5}
                  />
                </h4>
                <p className="text-sm text-slate-600">Satisfacción o reembolso</p>
              </motion.div>

              <motion.div
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  <CounterAnimation
                    end={30}
                    suffix=" días"
                    className="text-blue-600 font-bold"
                    duration={1.5}
                  />
                </h4>
                <p className="text-sm text-slate-600">Soporte post-lanzamiento</p>
              </motion.div>

              <motion.div
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  <span className="text-purple-600 font-bold">NDA Total</span>
                </h4>
                <p className="text-sm text-slate-600">Confidencialidad garantizada</p>
              </motion.div>

              <motion.div
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  <CounterAnimation
                    end={24}
                    suffix="/7 Monitoreo"
                    className="text-orange-600 font-bold"
                    duration={1.5}
                  />
                </h4>
                <p className="text-sm text-slate-600">Infraestructura siempre activa</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Interactive Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Enhanced gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.5) 0%, #f1f5f9 20%, #e2e8f0 50%, #f8fafc 80%, white 100%)'
          }}
        ></div>
        
        {/* Subtle animated patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              Todo lo que necesitas para validar tu idea
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Nuestro proceso está diseñado para crear un producto mínimo viable 
              que te permita probar tu concepto en el mercado real.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Enhanced Features List with Interactive Elements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Funcionalidades Incluidas
              </h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </motion.div>
                    <span className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* Process Timeline Integration */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ProcessTimeline />
              </motion.div>
            </motion.div>

            {/* Interactive Cost Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CostCalculator />
            </motion.div>
          </div>

          {/* Portfolio Showcase Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Casos de Éxito Recientes
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "EcoApp",
                  industry: "Sustentabilidad",
                  timeline: "5 semanas",
                  users: "2.5K",
                  revenue: "$45K",
                  color: "green"
                },
                {
                  name: "FinanceAI",
                  industry: "Fintech",
                  timeline: "6 semanas",
                  users: "1.8K",
                  revenue: "$72K",
                  color: "blue"
                },
                {
                  name: "HealthTrack",
                  industry: "Healthcare",
                  timeline: "4 semanas",
                  users: "3.2K",
                  revenue: "$38K",
                  color: "purple"
                }
              ].map((project) => (
                <motion.div
                  key={project.name}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-lg"
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-slate-800">{project.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${project.color}-100 text-${project.color}-700`}>
                      {project.industry}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Tiempo:</span>
                      <span className="text-sm font-medium text-slate-800">{project.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Usuarios:</span>
                      <CounterAnimation
                        end={parseFloat(project.users.replace('K', '')) * 1000}
                        suffix=""
                        className="text-sm font-medium text-blue-600"
                        duration={1.5}
                        formatNumber={false}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Revenue/mes:</span>
                      <CounterAnimation
                        end={parseFloat(project.revenue.replace('$', '').replace('K', '')) * 1000}
                        prefix="$"
                        className="text-sm font-medium text-green-600"
                        duration={1.5}
                        formatNumber={false}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200/50">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Estado: Activo</span>
                      <motion.div
                        className={`w-2 h-2 bg-${project.color}-400 rounded-full`}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action with Enhanced Interactivity */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                ¿Listo para construir tu MVP?
              </h3>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                Únete a más de 120 empresas que han validado sus ideas con nosotros
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                <div className="text-center">
                  <CounterAnimation
                    end={120}
                    suffix="+"
                    className="text-xl font-bold text-blue-600"
                    duration={2}
                  />
                  <p className="text-xs text-slate-600">Proyectos</p>
                </div>
                <div className="text-center">
                  <CounterAnimation
                    end={98}
                    suffix="%"
                    className="text-xl font-bold text-green-600"
                    duration={2}
                  />
                  <p className="text-xs text-slate-600">Satisfacción</p>
                </div>
                <div className="text-center">
                  <CounterAnimation
                    end={4.2}
                    suffix=" sem"
                    className="text-xl font-bold text-purple-600"
                    duration={2}
                  />
                  <p className="text-xs text-slate-600">Promedio</p>
                </div>
              </div>
              
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Comenzar Mi MVP Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              ¿Listo para validar tu idea?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte 
              a crear un MVP exitoso
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-xl shadow-slate-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <UserIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                  />
                </div>
                {formErrors.fullName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 ml-1"
                  >
                    {formErrors.fullName}
                  </motion.p>
                )}
              </motion.div>

              {/* Email and Phone Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  {formErrors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 ml-1"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Número telefónico"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  {formErrors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 ml-1"
                    >
                      {formErrors.phone}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Project Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <ChatBubbleLeftRightIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos sobre tu proyecto: ¿qué problema resuelve? ¿quién es tu público objetivo? ¿qué funcionalidades principales necesitas?"
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none"
                  />
                </div>
                {formErrors.projectDescription && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 ml-1"
                  >
                    {formErrors.projectDescription}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 px-8 rounded-xl font-medium transition-all duration-200 flex items-center justify-center group ${
                    isSubmitting 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar consulta gratuita
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeSuccessModal}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-200/50 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-2xl font-semibold text-slate-800 text-center mb-3"
            >
              ¡Mensaje Enviado!
            </motion.h3>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-slate-600 text-center mb-8 leading-relaxed"
            >
              Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo muy pronto.
            </motion.p>

            {/* Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={closeSuccessModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"
            >
              Perfecto
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default App
