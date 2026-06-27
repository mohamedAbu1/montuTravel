"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import Button from '@mui/material/Button';
import { useAuth } from "@/context/AuthContext";
import { FaSignOutAlt, FaUserPlus } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, themeName } = useTheme();
  const { user, isLoggedIn, logout, handleOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? themeName === "dark"
            ? "bg-black/80 backdrop-blur-sm shadow-lg border-b border-gray-700"
            : "bg-white/40 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 py-4 flex items-center justify-between">
        {/* شعار الموقع */}
        <Logo scrolled={scrolled} />

        {/* روابط التنقل */}
        <NavBar scrolled={scrolled} />

        {/* يمين الهيدر (تبديل الثيم + المستخدم) */}
        <RightBar scrolled={scrolled} />

        {/* زر تسجيل الدخول/الخروج */}
        <motion.div whileHover={{ scale: 1.05 }} className="hidden lg:flex">
          <Button
            onClick={isLoggedIn ? logout : handleOpen}
            className={`transition-all font-semibold tracking-wide uppercase shadow-md flex items-center gap-2 px-6 py-3 rounded-xl ${
              isLoggedIn ? theme.buttonSecondary : theme.buttonPrimary
            }`}
          >
            {isLoggedIn ? (
              <>
                <FaSignOutAlt size={20} />
                <span>Logout</span>
              </>
            ) : (
              <>
                <FaUserPlus size={20} />
                <span>Sign Up</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
