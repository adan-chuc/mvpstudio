import * as React from "react"
import { motion } from "framer-motion"
import { RocketLaunchIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"

const DockTextButton = React.forwardRef(
  ({ label, onClick, className, isActive }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          relative group px-4 py-2 rounded-xl
          text-sm font-medium
          text-slate-700 dark:text-slate-300
          hover:bg-slate-100/50 dark:hover:bg-gray-800/50
          hover:text-blue-600 dark:hover:text-blue-400
          transition-all duration-200
          ${isActive ? 'bg-slate-100/50 dark:bg-gray-800/50 text-blue-600 dark:text-blue-400' : ''}
          ${className || ''}
        `}
      >
        {label}
      </motion.button>
    )
  }
)
DockTextButton.displayName = "DockTextButton"

const DockNavigation = React.forwardRef(
  ({ className }, ref) => {
    const [activeSection, setActiveSection] = React.useState('inicio');
    const location = useLocation();

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100; // Height of the dock
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        setActiveSection(sectionId);
      }
    };

    // Track active section on scroll
    React.useEffect(() => {
      const handleScroll = () => {
        const sections = ['inicio', 'beneficios', 'servicios', 'caracteristicas', 'casos-exito', 'testimonios', 'contacto'];
        const scrollPosition = window.scrollY + 150;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            const absoluteTop = top + window.scrollY;
            const absoluteBottom = bottom + window.scrollY;

            if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Items para la página principal
    const landingItems = [
      { label: "Inicio", sectionId: "inicio" },
      { label: "Beneficios", sectionId: "beneficios" },
      { label: "Servicios", sectionId: "servicios" },
      { label: "Características", sectionId: "caracteristicas" },
      { label: "Casos de Éxito", sectionId: "casos-exito" },
      { label: "Testimonios", sectionId: "testimonios" },
      { label: "Blog", sectionId: "blog", isLink: true, href: "/blog" },
      { label: "Contacto", sectionId: "contacto" }
    ];

    // Items para la página del blog
    const blogItems = [
      { label: "Inicio", isLink: true, href: "/" },
      { label: "Contacto", isLink: true, href: "/#contacto" }
    ];

    // Seleccionar items según la página actual
    const items = location.pathname === "/blog" ? blogItems : landingItems;

    return (
      <div ref={ref} className={`flex items-center justify-center ${className || ''}`}>
        <div className="
          flex items-center gap-2 p-2 rounded-2xl
          backdrop-blur-lg border shadow-lg
          bg-white/80 dark:bg-gray-900/80 
          border-slate-200/50 dark:border-gray-700/50
          hover:shadow-xl transition-shadow duration-300
        ">
          {/* MVP Studio Logo */}
          <div className="flex items-center gap-2 px-3 border-r border-slate-200/50 dark:border-gray-700/50">
            <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-slate-800 dark:text-white hidden sm:block">MVP Studio</span>
          </div>
          
          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {items.map((item, index) => (
              item.isLink ? (
                <Link to={item.href} key={item.label}>
                  <DockTextButton 
                    label={item.label}
                    className={location.pathname === "/blog" ? "" : (index > 3 ? "hidden lg:block" : index > 2 ? "hidden md:block" : "")}
                  />
                </Link>
              ) : (
                <DockTextButton 
                  key={item.label} 
                  label={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  isActive={activeSection === item.sectionId}
                  className={index > 3 ? "hidden lg:block" : index > 2 ? "hidden md:block" : ""}
                />
              )
            ))}
          </div>
        </div>
      </div>
    )
  }
)
DockNavigation.displayName = "DockNavigation"

export { DockNavigation }