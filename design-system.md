# Sistema de Diseño Apple/Notion

## 🎨 Paleta de Colores

### Colores Primarios
```css
/* Backgrounds */
--bg-primary: from-slate-50 via-white to-slate-100  /* Gradient principal */
--bg-surface: bg-white/80                           /* Superficie cards */
--bg-input: bg-slate-50/50                         /* Inputs */

/* Textos */
--text-primary: text-slate-800                     /* Títulos principales */
--text-secondary: text-slate-600                   /* Subtítulos */
--text-muted: text-slate-400                       /* Placeholders, iconos */

/* Acentos */
--accent-primary: bg-blue-600 hover:bg-blue-700    /* Botones primarios */
--accent-text: text-blue-600 hover:text-blue-700   /* Links */
--accent-error: text-red-500                       /* Errores */

/* Bordes */
--border-default: border-slate-200                 /* Bordes normales */
--border-subtle: border-slate-200/50               /* Bordes suaves */
--border-focus: focus:border-blue-500              /* Estados focus */
```

### Tokens de Color
```javascript
// Tailwind Classes
const colors = {
  background: {
    primary: 'bg-gradient-to-br from-slate-50 via-white to-slate-100',
    surface: 'bg-white/80',
    input: 'bg-slate-50/50'
  },
  text: {
    primary: 'text-slate-800',
    secondary: 'text-slate-600',
    muted: 'text-slate-400'
  },
  accent: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    text: 'text-blue-600 hover:text-blue-700',
    error: 'text-red-500'
  },
  border: {
    default: 'border-slate-200',
    subtle: 'border-slate-200/50',
    focus: 'focus:border-blue-500'
  }
}
```

## 🔤 Tipografía

### Font Family
```css
font-family: 'Outfit', sans-serif;
```

### Escala Tipográfica
```css
/* Títulos */
.heading-xl { @apply text-3xl font-semibold text-slate-800; }
.heading-lg { @apply text-2xl font-semibold text-slate-800; }
.heading-md { @apply text-xl font-semibold text-slate-800; }

/* Cuerpo */
.body-lg { @apply text-base font-medium text-slate-800; }
.body-md { @apply text-sm font-medium text-slate-600; }
.body-sm { @apply text-xs font-medium text-slate-600; }

/* Texto muted */
.text-muted { @apply text-slate-400; }
```

## 🧩 Componentes Base

### Buttons

#### Primary Button
```jsx
className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"

// Con Framer Motion
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"
>
  Texto del botón
</motion.button>
```

#### Secondary Button
```jsx
className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
```

#### Ghost Button
```jsx
className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
```

### Form Controls

#### Input con Icono
```jsx
<div className="relative">
  <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
  <input
    type="email"
    placeholder="Email"
    className="w-full pl-10 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
  />
</div>
```

#### Input con Acción
```jsx
<div className="relative">
  <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
  <input
    type="password"
    placeholder="Contraseña"
    className="w-full pl-10 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
  />
  <button
    type="button"
    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
  >
    <EyeIcon className="h-5 w-5" />
  </button>
</div>
```

### Cards y Containers

#### Card Principal
```jsx
className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-200/50"
```

#### Container Responsivo
```jsx
className="w-full max-w-md"
```

#### Layout Principal
```jsx
className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center font-outfit p-4"
```

## 📏 Espaciado y Layout

### Sistema de Espaciado
```css
/* Espaciado interno */
.spacing-xs { @apply p-2; }     /* 8px */
.spacing-sm { @apply p-4; }     /* 16px */
.spacing-md { @apply p-6; }     /* 24px */
.spacing-lg { @apply p-8; }     /* 32px */
.spacing-xl { @apply p-12; }    /* 48px */

/* Espaciado entre elementos */
.stack-xs { @apply space-y-2; }  /* 8px */
.stack-sm { @apply space-y-4; }  /* 16px */
.stack-md { @apply space-y-6; }  /* 24px */
.stack-lg { @apply space-y-8; }  /* 32px */
```

### Bordes Redondeados
```css
.rounded-button { @apply rounded-xl; }    /* Botones, inputs */
.rounded-card { @apply rounded-3xl; }     /* Cards principales */
.rounded-small { @apply rounded-lg; }     /* Elementos pequeños */
```

## ✨ Animaciones y Transiciones

### Animaciones de Entrada
```jsx
// Fade in + slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Fade in + scale
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.1, duration: 0.4 }}
>

// Slide from left
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.4 }}
>
```

### Animaciones de Interacción
```jsx
// Hover y tap
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>

// Error message
<motion.p 
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-red-500 text-xs mt-1 ml-1"
>
```

### Transiciones CSS
```css
/* Transiciones estándar */
.transition-standard { @apply transition-all duration-200; }
.transition-colors { @apply transition-colors duration-200; }
.transition-slow { @apply transition-all duration-300; }

/* Estados de hover */
.hover-lift:hover { @apply -translate-y-0.5; }
.hover-scale:hover { @apply scale-105; }
```

## 🎯 Estados y Variantes

### Estados de Input
```jsx
// Normal
className="border border-slate-200"

// Focus
className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"

// Error
className="border border-red-300 focus:border-red-500 focus:ring-red-500/20"

// Disabled
className="bg-slate-100 text-slate-400 cursor-not-allowed"
```

### Estados de Botón
```jsx
// Primary
className="bg-blue-600 hover:bg-blue-700 text-white"

// Disabled
className="bg-slate-300 text-slate-500 cursor-not-allowed"

// Loading
className="bg-blue-600 text-white opacity-75 cursor-wait"
```

## 🔧 Utilidades y Helpers

### Clases Reutilizables
```css
/* Glassmorphism */
.glass { @apply bg-white/80 backdrop-blur-sm; }

/* Sombras */
.shadow-soft { @apply shadow-xl shadow-slate-200/50; }
.shadow-button { @apply shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30; }

/* Gradientes */
.gradient-bg { @apply bg-gradient-to-br from-slate-50 via-white to-slate-100; }
```

### Breakpoints Responsive
```css
/* Mobile First */
.responsive-container { 
  @apply p-4 sm:p-6 md:p-8 lg:p-12; 
}

.responsive-text { 
  @apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl; 
}
```

## 📋 Mejores Prácticas

### Do's ✅
- Usar la paleta de colores definida
- Implementar animaciones sutiles
- Mantener consistencia en espaciado
- Usar backdrop-blur para profundidad
- Aplicar estados de hover/focus

### Don'ts ❌
- No usar colores fuera de la paleta
- Evitar animaciones muy llamativas
- No omitir estados de interacción
- No usar bordes duros sin redondear
- Evitar contrastes muy altos

### Checklist de Implementación
- [ ] Colores de la paleta aplicados
- [ ] Tipografía Outfit configurada
- [ ] Animaciones Framer Motion agregadas
- [ ] Estados hover/focus implementados
- [ ] Responsive design verificado
- [ ] Accesibilidad considerada