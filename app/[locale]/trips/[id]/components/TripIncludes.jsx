"use client";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

// كائن الترجمات
const translations = {
  en: { title: "Includes" },
  de: { title: "Enthält" },
  it: { title: "Include" },
  es: { title: "Incluye" },
  zh: { title: "包含" },
  fr: { title: "Inclus" },
};

export default function TripIncludes({ trip, lang }) {
  const { theme } = useTheme();

  // لو اللغة مش موجودة، نرجع للإنجليزية
  const t = translations[lang] || translations.en;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-1/2 p-6 rounded-xl transition ${theme.card} ${theme.shadow} ${theme.text}`}
    >
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-2xl font-bold flex items-center gap-2 mb-4 border-b p-2 ${theme.title} ${theme.border}`}
      >
        <FaCheckCircle className={theme.icon} />
        {t.title}
      </motion.h2>

      {/* العناصر */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.includes?.map((inc, idx) => (
          <motion.div
            key={inc.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${theme.card}`}
          >
            <motion.div
              whileHover={{ scale: 1.3, rotate: 10 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaCheckCircle className={theme.icon} />
            </motion.div>
            <span className={`text-sm md:text-base font-medium ${theme.subText}`}>
              {inc.include_translations?.[lang] || inc.include_translations?.en}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
