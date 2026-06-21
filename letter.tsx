"use client";

import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import type { LetterContent } from "@/lib/letter-content";
import { AudioPlayer } from "@/components/audio-player";

interface LetterProps {
  t: LetterContent;
  onClose: () => void;
}

export function Letter({ t, onClose }: LetterProps) {
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
      className="relative w-full max-w-2xl"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t.close}
        className="absolute -top-3 right-0 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-pink-500 shadow-md ring-1 ring-pink-200 transition hover:scale-110 hover:bg-white hover:text-pink-600"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Letter paper */}
      <div className="paper-texture relative overflow-hidden rounded-[1.75rem] border border-pink-200/80 bg-gradient-to-b from-white to-pink-50/80 shadow-[0_30px_80px_-30px_rgba(236,72,153,0.55)]">
        {/* Decorative inner border */}
        <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-dashed border-pink-300/50" />

        {/* Corner flourishes */}
        <CornerFlourish className="left-4 top-4" />
        <CornerFlourish className="right-4 top-4 rotate-90" />
        <CornerFlourish className="bottom-4 left-4 -rotate-90" />
        <CornerFlourish className="bottom-4 right-4 rotate-180" />

        <div className="relative px-6 py-10 sm:px-12 sm:py-14">
          {/* Dedication */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-center"
          >
            <p className="font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-[0.3em] text-pink-400">
              {t.toLabel}
            </p>
            <p className="mt-1 font-[family-name:var(--font-dancing)] text-lg leading-snug text-pink-600 sm:text-xl">
              {t.dedication}
            </p>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-300" />
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-300" />
            </div>
          </motion.div>

          {/* Flower sprite centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 12 }}
            className="my-7 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-300/40 blur-2xl" />
              <img
                src="/flores.png"
                alt="Ramo de flores"
                className="relative h-28 w-28 drop-shadow-[0_8px_16px_rgba(236,72,153,0.35)] sm:h-32 sm:w-32"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </motion.div>

          {/* Title H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="animate-shimmer text-center font-[family-name:var(--font-dancing)] text-5xl font-bold leading-tight sm:text-6xl"
          >
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h1>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl space-y-5"
          >
            {t.body.map((para, i) => (
              <p
                key={i}
                className="text-center font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-rose-900/80 sm:text-xl sm:leading-relaxed"
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 text-right"
          >
            <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-pink-500">
              {t.signature},
            </p>
            <p className="font-[family-name:var(--font-dancing)] text-3xl text-rose-500 sm:text-4xl">
              {t.code === "es" ? "Tu novia" : t.code === "en" ? "Your girlfriend" : "La tua fidanzata"}
            </p>
            <p className="mt-1 text-2xl">💕</p>
          </motion.div>

          {/* Audio player */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <AudioPlayer t={t} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute h-6 w-6 text-pink-300 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 2c6 0 10 4 10 10" strokeLinecap="round" />
      <path d="M2 8c3 0 6 3 6 6" strokeLinecap="round" />
      <circle cx="3" cy="3" r="1" fill="currentColor" />
    </svg>
  );
}
