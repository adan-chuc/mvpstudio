"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { ArrowUp, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
Button.displayName = "Button";

const PromptInput = React.forwardRef(({ 
  placeholder = "¿En qué puedo ayudarte?", 
  onSubmit, 
  onChange, 
  disabled = false, 
  className 
}, ref) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && onSubmit) {
        onSubmit(value.trim());
        setValue("");
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full max-w-2xl mx-auto items-center gap-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-lg shadow-slate-200/50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 py-2"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          className="h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <ArrowUp size={18} />
          <span className="sr-only">Enviar mensaje</span>
        </Button>
      </form>
    </div>
  );
});
PromptInput.displayName = "PromptInput";

const ChatInput = ({ onSubmit, onChange, disabled = false, className }) => {
  const handleSubmit = (value) => {
    console.log("Mensaje enviado:", value);
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <PromptInput
      placeholder="Pregúntame lo que quieras..."
      onSubmit={handleSubmit}
      onChange={handleChange}
      disabled={disabled}
      className={cn(
        // Base bubble styling with proper gradient
        "bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-200/60",
        // Enhanced shadows and glow
        "shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40",
        // More prominent sizing
        "px-6 py-4 min-h-[60px]",
        // Enhanced glassmorphism without white overlay
        "backdrop-blur-lg",
        // Glow effect
        "ring-2 ring-blue-200/30 hover:ring-blue-300/50",
        // Smooth transitions
        "transition-all duration-300 ease-out",
        // Rounded pill shape
        "rounded-full",
        // Focus states
        "focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-200/40",
        // Hover effects
        "hover:scale-[1.02] hover:-translate-y-1",
        // Animated gradient border
        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-400/20 before:to-indigo-400/20 before:blur-sm before:-z-10",
        className
      )}
    />
  );
};

const SuggestionBox = ({ question, onClick, delay = 0 }) => {
  return (
    <motion.button
      initial={{ 
        opacity: 0, 
        scale: 0.98
      }}
      animate={{ 
        opacity: 1, 
        scale: 1
      }}
      exit={{
        opacity: 0,
        transition: { 
          duration: 0.2
        }
      }}
      transition={{ 
        duration: 0.2, 
        ease: "easeOut",
        delay: delay
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      onClick={() => onClick(question)}
      className={cn(
        // Base styling
        "w-full text-left p-4 mb-3 rounded-2xl",
        // Background and borders
        "bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200/60",
        // Typography
        "text-sm text-slate-700 font-medium",
        // Effects
        "shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/30",
        "backdrop-blur-sm",
        // Transitions
        "transition-all duration-200 ease-out",
        // Focus states
        "focus:outline-none focus:ring-2 focus:ring-blue-300/50",
        // Hover effects
        "hover:border-blue-300/60 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
      )}
    >
      {question}
    </motion.button>
  );
};

const ChatWidget = ({ onSubmit, onSuggestionClick }) => {
  const [chatMode, setChatMode] = React.useState('faq'); // 'faq' | 'chat'
  const [messages, setMessages] = React.useState([]);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const faqQuestions = [
    "¿Cuánto cuesta desarrollar un MVP?",
    "¿Cuánto tiempo toma crear mi producto?", 
    "¿Qué tecnologías utilizan?"
  ];

  const faqResponses = {
    "¿Cuánto cuesta desarrollar un MVP?": "El costo de un MVP varía entre $15,000 y $50,000 MXN dependiendo de la complejidad, funcionalidades y tecnologías requeridas. Ofrecemos paquetes flexibles adaptados a tu presupuesto.",
    "¿Cuánto tiempo toma crear mi producto?": "Típicamente desarrollamos un MVP en 4-8 semanas. Esto incluye diseño UX/UI, desarrollo, testing y deployment. El tiempo exacto depende del alcance y complejidad de tu proyecto.",
    "¿Qué tecnologías utilizan?": "Trabajamos con tecnologías modernas como React, Node.js, MongoDB, PostgreSQL y servicios en la nube (AWS/Vercel). Elegimos el stack tecnológico ideal según las necesidades de tu proyecto."
  };

  const handleSuggestionClick = (question) => {
    // Switch to chat mode and add user message
    setIsTransitioning(true);
    
    setTimeout(() => {
      setChatMode('chat');
      setMessages([{ type: 'user', content: question, timestamp: new Date() }]);
      
      // Extended delay to ensure user message bubble is fully visible
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: faqResponses[question] || "Gracias por tu pregunta. Un especialista te contactará pronto.",
            timestamp: new Date() 
          }]);
        }, 2000);
      }, 600);
      
      setIsTransitioning(false);
    }, 300);

    if (onSuggestionClick) {
      onSuggestionClick(question);
    }
  };

  const handleInputSubmit = (message) => {
    if (chatMode === 'faq') {
      // First message, switch to chat mode
      setIsTransitioning(true);
      setTimeout(() => {
        setChatMode('chat');
        setMessages([{ type: 'user', content: message, timestamp: new Date() }]);
        
        // Extended delay to ensure user message bubble is fully visible
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
              type: 'bot', 
              content: "¡Hola! Gracias por contactarnos. Un especialista revisará tu consulta y te responderá pronto. ¿Hay algo específico en lo que pueda ayudarte?",
              timestamp: new Date() 
            }]);
          }, 2000);
        }, 600);
        
        setIsTransitioning(false);
      }, 300);
    } else {
      // Add message to existing conversation
      setMessages(prev => [...prev, { type: 'user', content: message, timestamp: new Date() }]);
      
      // Extended delay to ensure user message bubble is fully visible
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: "Gracias por tu mensaje. Estoy procesando tu consulta...",
            timestamp: new Date() 
          }]);
        }, 1500);
      }, 600);
    }

    if (onSubmit) {
      onSubmit(message);
    }
  };

  const handleMinimize = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setChatMode('faq');
      // Mantener mensajes para que el usuario pueda regresar a la conversación
      // setMessages([]);
      setIsTyping(false);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-end w-80">
      <AnimatePresence mode="wait">
        {/* FAQ Mode */}
        {chatMode === 'faq' && (
          <motion.div
            key="faq-mode"
            initial={{ opacity: messages.length > 0 ? 1 : 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: -5,
              transition: { 
                duration: 0.2
              }
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="w-full mb-4"
          >
            {/* Show return to chat option if there are messages */}
            {messages.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setChatMode('chat')}
                className="w-full p-3 mb-3 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300/60 text-blue-800 text-sm font-medium hover:from-blue-200 hover:to-blue-300 transition-all duration-200"
              >
                ↗ Regresar a la conversación
              </motion.button>
            )}
            
            {faqQuestions.map((question, index) => (
              <SuggestionBox
                key={question}
                question={question}
                onClick={handleSuggestionClick}
                delay={messages.length > 0 ? 0.3 + (index * 0.1) : 1.4 + (index * 0.1)}
              />
            ))}
          </motion.div>
        )}
        
        {/* Chat Mode */}
        {chatMode === 'chat' && (
          <motion.div
            key="chat-mode"
            initial={{ 
              opacity: 0, 
              y: 15
            }}
            animate={{ 
              opacity: 1, 
              y: 0
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              delay: 0.1
            }}
            className="w-full mb-4"
          >
            <ChatMessagesContainer 
              messages={messages} 
              isTyping={isTyping} 
              onMinimize={handleMinimize}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Chat Input */}
      <ChatInput onSubmit={handleInputSubmit} />
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-2 text-slate-500 text-sm pl-4 pb-2"
    >
      <span>MVP Studio está escribiendo</span>
      
      <div className="flex space-x-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-slate-400 rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const MessageBubble = ({ message, index }) => {
  const isUser = message.type === 'user';
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 10
      }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05
      }}
      className={cn(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-2xl shadow-sm",
          isUser 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md" 
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
};

const ChatMessagesContainer = ({ messages, isTyping, onMinimize }) => {
  const messagesEndRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ 
        height: 0, 
        opacity: 0
      }}
      animate={{ 
        height: "480px", 
        opacity: 1
      }}
      transition={{
        duration: 0.4, 
        ease: "easeOut"
      }}
      className={cn(
        "relative w-full rounded-2xl overflow-hidden",
        "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60",
        "shadow-2xl shadow-blue-500/25",
        "backdrop-blur-lg"
      )}
    >
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-blue-200/40 bg-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">MVP Studio</span>
          </div>
          
          {/* Minimize Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.15 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            onClick={onMinimize}
            className="p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors duration-200"
            title="Minimizar chat"
          >
            <Minus className="h-4 w-4 text-slate-600" />
          </motion.button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-[400px] overflow-y-auto px-4 py-4 space-y-2 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-slate-500 text-sm mb-2">
                👋 ¡Hola! ¿En qué puedo ayudarte?
              </div>
              <div className="text-slate-400 text-xs">
                Responderé tus preguntas sobre MVP Studio
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} index={index} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  );
};

export { ChatInput, PromptInput, Button, SuggestionBox, ChatWidget, ChatMessagesContainer, MessageBubble, TypingIndicator };