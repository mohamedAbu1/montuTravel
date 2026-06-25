"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Decor({ pos }) {
  const [symbolsCount, setSymbolsCount] = useState(0);
  const { theme } = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateCount = () => {
      const width = containerRef.current.getBoundingClientRect().width;
      // مثال: كل 50px عرض = رمز واحد
      const count = Math.floor(width / 50);
      setSymbolsCount(count);
    };

    // أول مرة
    updateCount();

    // مراقبة التغييرات في الحجم
    const resizeObserver = new ResizeObserver(updateCount);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute ${pos}-0 flex justify-around w-full`}
    >
      {Array.from({ length: symbolsCount }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: i * 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl text-gradient"
          style={{
            filter: `drop-shadow(0 0 6px ${theme.logoBorder || "#C2A878"})`,
          }}
        >
          𓎛
        </motion.span>
      ))}
    </div>
  );
}
