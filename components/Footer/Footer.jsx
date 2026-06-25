"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Decor from "../layout/Decor";

const Footer = () => {
  const { theme, themeName } = useTheme();
  const { t } = useTranslation("footer");

  const symbols = [
    "𓂀","𓋹","𓆣","𓇼","𓇯","𓏏","𓎛","𓊽",
    "𓃾","𓅓","𓈇","𓉐","𓊹","𓌙","𓍿","𓎟",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className="hidden lg:flex w-full h-[80vh] relative bg-cover bg-center flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('/HomePageImage/417836234_bd196bf4-cede-44f4-b150-514004bdcb57.svg')",
      }}
    >
      <Decor pos={"top"} />

      {/* خلفية الرموز الفرعونية */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.15, y: 0 }}
            transition={{ duration: 2, delay: i * 0.1 }}
            className={`absolute ${
              themeName === "dark" ? "text-gray-700" : "text-[#222]"
            } text-6xl`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {symbols[Math.floor(Math.random() * symbols.length)]}
          </motion.span>
        ))}
      </div>

      {/* صورة اللوجو */}
      <motion.div variants={fadeUp} className="relative z-10">
        <Image
          src={
            themeName === "dark"
              ? "/HomePageImage/png-architecture-pyramid-panoramic-building.png"
              : "/fallback.jpg"
          }
          width={580}
          height={580}
          alt="Montu Travel Logo"
          className="w-180 h-80 object-contain mx-auto drop-shadow-lg"
        />
      </motion.div>

      {/* اسم البراند */}
      <motion.p
        variants={fadeUp}
        className={`text-3xl font-extrabold tracking-wide relative z-10 bg-gradient-to-r from-[var(--logoGradientFrom)] to-[var(--logoGradientTo)] bg-clip-text text-transparent drop-shadow-lg ${
          themeName === "light" ? "drop-shadow-[1px_1px_3px_rgba(0,0,0,0.4)]" : ""
        }`}
        style={{ WebkitTextStroke: `1px ${theme.logoBorder}` }}
      >
        Montu Travel
      </motion.p>

      {/* الوصف */}
      <motion.p
        variants={fadeUp}
        className={`mt-2 text-sm text-center max-w-xl relative z-10 ${
          themeName === "dark"
            ? "text-white/80"
            : "text-[#111] font-semibold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.4)] bg-white/60 px-2 py-1 rounded-md"
        }`}
      >
        {t("p")}
      </motion.p>

      {/* روابط سريعة */}
      <motion.div
        variants={fadeUp}
        className="flex gap-6 mt-6 text-sm font-medium relative z-10"
      >
        {["Home", "AboutUs", "Tours", "Contact"].map((link) => (
          <Link
            key={link}
            href={`/${link === "Home" ? "" : link.toLowerCase()}`}
            className={`hover:underline transition ${
              themeName === "dark"
                ? "text-white/80 hover:text-[var(--logoBorder)]"
                : "text-[#111] font-semibold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.4)] hover:text-[#222]"
            }`}
          >
            {t(link)}
          </Link>
        ))}
      </motion.div>

      {/* Divider متدرج */}
      <motion.div
        variants={fadeUp}
        className="w-32 h-[2px] bg-gradient-to-r from-[var(--logoGradientFrom)] to-[var(--logoGradientTo)] mt-6 mb-6 animate-pulse"
      ></motion.div>

      {/* أيقونات السوشيال ميديا */}
      <motion.div variants={fadeUp} className="flex gap-5 mt-4 relative z-10">
        {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className={`p-3 rounded-full transition shadow-md ${
              themeName === "dark"
                ? "bg-[var(--logoGradientFrom)]/20 hover:bg-[var(--logoGradientTo)]/40 text-[var(--logoBorder)]"
                : "bg-white/70 hover:bg-[var(--logoGradientTo)]/30 text-[#111] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.4)]"
            }`}
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>

      {/* حقوق النشر */}
      <motion.p
        variants={fadeUp}
        className={`mt-8 text-xs opacity-70 relative z-10 ${
          themeName === "dark"
            ? "text-white/70"
            : "text-[#111] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.4)] bg-white/50 px-2 py-1 rounded-md"
        }`}
      >
        © 2026 Montu Travel. All rights reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
