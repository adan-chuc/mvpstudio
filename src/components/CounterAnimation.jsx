import { useState, useEffect, useRef, useMemo } from 'react'
import { useInView } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

const CounterAnimation = ({ 
  end, 
  prefix = '', 
  suffix = '', 
  duration = 2, 
  className = '',
  formatNumber = true
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  // Memoize parsed end value for performance
  const endValue = useMemo(() => {
    return parseInt(end.toString().replace(/[^0-9.]/g, ''))
  }, [end])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      
      // If user prefers reduced motion, instantly show final value
      if (prefersReducedMotion) {
        setCount(endValue)
        return
      }
      
      let startTime = null
      const startValue = 0
      let animationFrame = null

      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / (duration * 1000), 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentValue)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(endValue)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      
      // Cleanup function
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, endValue, duration, hasAnimated, prefersReducedMotion])

  const formatDisplayNumber = (num) => {
    if (!formatNumber) return num.toString()
    return num.toLocaleString('es-MX')
  }

  return (
    <span
      ref={ref}
      className={className}
    >
      {prefix}{formatDisplayNumber(count)}{suffix}
    </span>
  )
}

export default CounterAnimation