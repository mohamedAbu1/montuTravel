"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useSecurity } from "@/context/SecurityContext";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const { loginOpen, handleLoginClose, handleOpen } = useData();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation("home");

  const { login, loading, handleClose } = useAuth();
  const { validateField } = useSecurity();

  const handleSubmit = async () => {
    const emailError = validateField("Email", email);
    const passwordError = validateField("Password", password);

    if (emailError || passwordError) {
      toast.error(emailError || passwordError);
      return;
    }

    try {
      await login(email, password);
      toast.success("✅ Logged in successfully!");
      handleLoginClose();
      handleClose();
    } catch (err) {
      toast.error("❌ Error: The email or password is incorrect.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "select_account consent",
          },
        },
      });
      if (error) toast.error(`❌ خطأ في الاتصال بجوجل: ${error.message}`);
    } catch (err) {
      console.error("OAuth Error:", err);
      toast.error("❌ حدث خطأ غير متوقع أثناء تسجيل الدخول.");
    }
  };

  return (
    <Dialog open={loginOpen} onClose={handleLoginClose} fullWidth maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 bg-white/30 dark:bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-pink-500 drop-shadow-lg">
            {t("Login")}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t("WelcomeBack")}
          </p>
        </div>

        {/* Content */}
        <DialogContent className="flex flex-col gap-5">
          <TextField
            label={t("Email")}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail className="text-blue-600" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t("Password")}
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLock className="text-red-600" />
                </InputAdornment>
              ),
            }}
          />

          <Divider className="my-4">{t("orcontinuewith")}</Divider>

          {/* Social Buttons */}
          <div className="flex justify-center mt-2">
            <IconButton
              onClick={loginWithGoogle}
              className="w-[280px] h-[56px] rounded-xl bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              <FcGoogle size={28} />
              <span className="ml-2">Sign in with Google</span>
            </IconButton>
          </div>

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-yellow-600 via-orange-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              {loading ? t("Loggingin") : t("Login")}
            </Button>
          </motion.div>

          {/* زر العودة إلى إنشاء حساب */}
          <Button
            fullWidth
            onClick={() => {
              handleLoginClose();
              handleOpen();
            }}
            className="mt-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 rounded-xl shadow hover:opacity-80 transition"
          >
            {t("Don’thaveanaccount?SignUp")}
          </Button>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
