"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.02, x: -2 }}
      whileTap={{ scale: 0.98 }}
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
  const faqQuestions = [
    "¿Cuánto cuesta desarrollar un MVP?",
    "¿Cuánto tiempo toma crear mi producto?", 
    "¿Qué tecnologías utilizan?"
  ];

  const handleSuggestionClick = (question) => {
    if (onSuggestionClick) {
      onSuggestionClick(question);
    }
  };

  return (
    <div className="flex flex-col items-end w-80">
      {/* FAQ Suggestions */}
      <div className="w-full mb-4">
        {faqQuestions.map((question, index) => (
          <SuggestionBox
            key={question}
            question={question}
            onClick={handleSuggestionClick}
            delay={1.4 + (index * 0.1)}
          />
        ))}
      </div>
      
      {/* Main Chat Input */}
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export { ChatInput, PromptInput, Button, SuggestionBox, ChatWidget };