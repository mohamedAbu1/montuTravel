import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import LogoLetter from "@/components/LogoLetter";
import Decor from "../layout/Decor";
const NameWeb = () => {
  const { theme, themeName } = useTheme();

  return (
    <section className="hidden container lg:flex w-full h-[15vh] relative bg-cover bg-center flex-col items-center justify-center p-1">
      {/* العنوان */}
      <Decor pos={"top"} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="hero-title flex flex-wrap gap-4 justify-center font-[Cinzel] mb-5 z-[1] pt-15"
      >
        {["M", "O", "M", "T", "U", "𓂀", "T", "R", "A", "V", "E", "L"].map(
          (char, i) => (
            <LogoLetter key={i} char={char} theme={theme} />
          ),
        )}
      </motion.div>
    </section>
  );
};

export default NameWeb;
