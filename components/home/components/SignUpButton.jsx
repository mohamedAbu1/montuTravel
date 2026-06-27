"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFemale, FaMale } from "react-icons/fa";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "react-toastify";
import { useSecurity } from "@/context/SecurityContext";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";

export default function SignUpModal() {
  const { handleLoginOpen } = useData();
  const { theme } = useTheme();
  const { validateField } = useSecurity();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const { t } = useTranslation("home");

  const { register, loading, open, handleClose } = useAuth();

  const handleSubmit = async () => {
    const nameError = validateField("Full Name", fullName);
    const emailError = validateField("Email", email);
    const passwordError = validateField("Password", password);
    if (nameError || emailError || passwordError || !gender) {
      toast.error(
        nameError || emailError || passwordError || "Gender is required",
      );
      return;
    }
    try {
      await register(email, password, fullName, gender);
      toast.success("✅ A confirmation message has been sent to your account.");
      handleClose();
    } catch (err) {
      toast.error("❌ Error: " + err.message);
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 bg-white/30 dark:bg-black/40 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-pink-500 drop-shadow-lg">
            Montu Travel
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t("CreateYourAccount")}
          </p>
        </div>

        {/* Content */}
        <DialogContent className="flex flex-col gap-5">
          <TextField
            label={t("FullName")}
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdPerson className="text-yellow-600" />
                </InputAdornment>
              ),
            }}
          />

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

          <FormLabel
            component="legend"
            style={{ color: "#fff" }}
            className="font-semibold text-white"
          >
            {t("Gender")}
          </FormLabel>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="justify-center gap-6  text-white"
          >
            <FormControlLabel
              value={t("male")}
              control={<Radio />}
              label={
                <div className="flex items-center gap-2">
                  <FaMale className="text-blue-500" /> {t("male")}
                </div>
              }
            />
            <FormControlLabel
              value={t("female")}
              control={<Radio />}
              label={
                <div className="flex items-center gap-2">
                  <FaFemale className="text-pink-500" /> {t("female")}
                </div>
              }
            />
          </RadioGroup>

          <Divider className="my-4 text-white">{t("orsignupwith")}</Divider>

          {/* Social Buttons */}
          <div className="flex justify-center mt-2">
            <IconButton
              onClick={loginWithGoogle}
              className="w-[280px] h-[56px] rounded-[10px] bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              <FcGoogle size={28} />
              <span className="ml-2">Sign in with Google</span>
            </IconButton>
          </div>

          {/* Sign Up Button */}
          <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-yellow-600 via-orange-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              {loading ? t("Creating") : t("SignUp")}
            </Button>
          </motion.div>

          {/* زر فتح نافذة تسجيل الدخول */}
          <Button
            fullWidth
            onClick={handleLoginOpen}
            className="mt-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 rounded-xl shadow hover:opacity-80 transition"
          >
            {t("Alreadyhaveanaccount?Login")}
          </Button>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
