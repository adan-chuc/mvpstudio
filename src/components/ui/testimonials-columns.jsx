import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const TestimonialsColumn = (props) => {
  const { theme } = useTheme();
  
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          transform: "translate3d(0, -33.33%, 0)",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
        style={{ willChange: "transform" }}
      >
        {[
          ...new Array(3).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 shadow-lg shadow-slate-200/50 dark:shadow-gray-800/50 hover:shadow-xl transition-all duration-300 max-w-xs w-full group" 
                  key={i}
                >
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-slate-800 dark:text-white">
                        {name}
                      </div>
                      <div className="leading-5 text-slate-500 dark:text-slate-400 tracking-tight text-sm">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};