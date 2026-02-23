import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";

const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  paper: "#E2E2D2",
};

export default function LoginPortalPage() {
  void motion;
  const reduce = useReducedMotion();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="relative min-h-[calc(100vh-170px)] overflow-hidden bg-[#E2E2D2]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 10% 15%, rgba(197,31,93,0.12), transparent 50%), radial-gradient(1000px circle at 90% 70%, rgba(36,52,71,0.12), transparent 55%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(197,31,93,0.22)" }}
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 14, 0] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(36,52,71,0.20)" }}
        animate={reduce ? undefined : { x: [0, -22, 0], y: [0, -16, 0] }}
        transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex rounded-full border border-[#243447]/20 bg-white/60 px-4 py-2 text-xs font-semibold tracking-widest text-[#243447]/80">
            PRAKTIX PORTAL
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#141D26] sm:text-5xl">
            {mode === "login" ? "Login to your" : "Create your"}
            <span style={{ color: COLORS.accent }}>
              {mode === "login" ? " learning dashboard" : " portal account"}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#243447]/80 sm:text-base">
            Access your cohorts, projects, sessions, and progress in one place.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.98, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="rounded-[34px] border border-[#243447]/12 bg-white/70 p-7 shadow-[0_24px_80px_rgba(20,29,38,0.14)] backdrop-blur"
        >
          {mode === "login" ? (
            <>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#141D26]">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#243447]/55" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 py-3 pl-11 pr-4 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#141D26]">Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#243447]/55" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 py-3 pl-11 pr-4 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 text-sm text-[#243447]/80">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#243447]/30 accent-[#C51F5D]" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-semibold text-[#C51F5D] hover:opacity-80">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #C51F5D 0%, #A5164E 100%)",
                    boxShadow: "0 14px 36px rgba(197,31,93,0.32)",
                  }}
                >
                  Login to Portal <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-6 border-t border-[#243447]/10 pt-5 text-center text-sm text-[#243447]/80">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setMode("register")} className="font-semibold text-[#C51F5D] hover:opacity-80">
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-sm font-semibold text-[#141D26]">Register</div>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-3">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                />
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                />
                <input
                  type="password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full rounded-2xl border border-[#243447]/14 bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:border-[#C51F5D]/40 focus:ring-2 focus:ring-[#C51F5D]/20"
                />
                <motion.button
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #243447 0%, #141D26 100%)",
                  }}
                >
                  Register <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-5 text-center text-sm text-[#243447]/80">
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-semibold text-[#C51F5D] hover:opacity-80">
                  Login
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
