"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { LetterContent } from "@/lib/letter-content";

interface EnvelopeProps {
  t: LetterContent;
  opening: boolean;
  onOpen: () => void;
}

/**
 * A closed pink envelope with a wax-seal heart. When `opening` is true the
 * top flap rotates open, revealing a hint of the letter inside.
 */
export function Envelope({ t, opening, onOpen }: EnvelopeProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={opening}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, y: -30 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className="group relative flex flex-col items-center outline-none"
      aria-label={t.tapToOpen}
    >
      {/* Glow behind envelope */}
      <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-pink-300/30 blur-3xl" />

      <div
        className="relative"
        style={{ perspective: "1200px" }}
      >
        {/* Envelope body */}
        <div
          className="relative h-56 w-80 overflow-hidden rounded-xl bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 shadow-[0_24px_60px_-20px_rgba(236,72,153,0.6)] ring-1 ring-white/60 sm:h-64 sm:w-96"
        >
          {/* Lined paper peeking from top */}
          <div className="absolute inset-x-4 top-3 bottom-10 rounded-lg bg-white/80 shadow-inner" />

          {/* faint lines like ruled paper */}
          <div
            className="absolute inset-x-6 top-6 bottom-12 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0 13px, #f9a8d4 13px 14px)",
            }}
          />

          {/* Bottom V shape of the envelope front */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 49.5%, rgba(244,114,182,0.55) 50%, transparent 50.5%), linear-gradient(225deg, transparent 49.5%, rgba(244,114,182,0.55) 50%, transparent 50.5%)",
            }}
          />

          {/* Flower sprite tucked in the corner */}
          <img
            src="/flores.png"
            alt=""
            className="absolute bottom-2 right-2 h-12 w-12 opacity-90 drop-shadow transition-transform duration-500 group-hover:rotate-6 sm:h-14 sm:w-14"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Top flap (triangle) */}
        <motion.div
          className="absolute left-0 top-0 h-0 w-0"
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          initial={false}
          animate={{ rotateX: opening ? -175 : 0 }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.2, 1] }}
        >
          <div
            className="relative h-32 w-80 sm:h-36 sm:w-96"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #fda4d2 0%, #f472b6 100%)",
              boxShadow: "0 6px 14px -6px rgba(190,24,93,0.5)",
            }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(0deg, rgba(190,24,93,0.25), transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* Wax seal with heart */}
        {!opening && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 12 }}
          >
            <div className="animate-heartbeat flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_8px_24px_-4px_rgba(190,24,93,0.7)] ring-4 ring-white/70">
              <Heart className="h-7 w-7 fill-white" />
              <span className="mt-0.5 font-[family-name:var(--font-cormorant)] text-[9px] font-semibold uppercase tracking-wider">
                {t.sealHint}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tap to open hint */}
      <motion.div
        className="mt-7 flex items-center gap-2"
        animate={{ opacity: opening ? 0 : 1, y: opening ? 8 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="h-px w-6 bg-pink-400/60" />
        <p className="font-[family-name:var(--font-cormorant)] text-sm italic tracking-wide text-pink-600/90">
          {t.tapToOpen}
        </p>
        <span className="h-px w-6 bg-pink-400/60" />
      </motion.div>
    </motion.button>
  );
}
