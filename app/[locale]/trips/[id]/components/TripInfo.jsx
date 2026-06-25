"use client";
import { FaDollarSign, FaEuroSign, FaClock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { usePurchase } from "@/context/PurchaseContext"; 
import { motion } from "framer-motion";

// كائن الترجمات
const translations = {
  en: { title: "Trip Info", Adult: "Adult", Child: "Child", duration: "Duration" },
  de: { title: "Reiseinformationen", Adult: "Erwachsene", Child: "Kind", duration: "Dauer" },
  it: { title: "Informazioni sul viaggio", Adult: "Adulto", Child: "Bambino", duration: "Durata" },
  es: { title: "Información del viaje", Adult: "Adulto", Child: "Niño", duration: "Duración" },
  zh: { title: "行程信息", Adult: "成人", Child: "孩子", duration: "持续时间" },
  fr: { title: "Informations sur le voyage", Adult: "Adulte", Child: "Enfant", duration: "Durée" },
};

export default function TripInfo({ trip, lang }) {
  const { theme } = useTheme();
  const { currency } = usePurchase();

  const t = translations[lang] || translations.en;

  // ✅ منطق التحويل
  let displayedPrice = trip.price;
  if (currency === "EUR" && trip.currency === "USD") {
    displayedPrice = (trip.price * 0.85).toFixed(2);
  } else if (currency === "USD" && trip.currency === "EUR") {
    displayedPrice = (trip.price * 1.18).toFixed(2);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-fit p-6 rounded-xl transition ${theme.card} ${theme.shadow} ${theme.text}`}
    >
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-2xl font-bold flex items-center gap-2 mb-4 border-b p-2 ${theme.title} ${theme.border}`}
      >
        {t.title}
      </motion.h2>

      {/* المعلومات */}
      <div className="space-y-3">
        {/* السعر للبالغ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            {currency === "USD" ? (
              <FaDollarSign className={theme.icon} />
            ) : (
              <FaEuroSign className={theme.icon} />
            )}
          </motion.div>
          <span className={theme.subText}>
            {t.Adult}: {displayedPrice} {currency}
          </span>
        </motion.div>

        {/* السعر للطفل */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            {currency === "USD" ? (
              <FaDollarSign className={theme.icon} />
            ) : (
              <FaEuroSign className={theme.icon} />
            )}
          </motion.div>
          <span className={theme.subText}>
            {t.Child}: {displayedPrice / 2} {currency}
          </span>
        </motion.div>

        {/* المدة */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: -10 }}>
            <FaClock className={theme.icon} />
          </motion.div>
          <span className={theme.subText}>
            {t.duration}: {trip.duration} {trip.duration_unit?.[lang]}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
