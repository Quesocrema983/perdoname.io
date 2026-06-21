"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/envelope";
import { Letter } from "@/components/letter";
import { LANG_ORDER, LETTERS, type LangCode } from "@/lib/letter-content";

export default function Home() {
  const [lang, setLang] = useState<LangCode>("es");
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const t = LETTERS[lang];

  // Petals use a *seeded* PRNG so the server-rendered HTML matches the client
  // exactly (no hydration mismatch) while still looking random.
  const petals = useMemo(() => makePetals(16, 20240614), []);

  const handleOpen = () => {
    if (opening || opened) return;
    setOpening(true);
    // let the flap finish opening, then reveal the letter
    window.setTimeout(() => setOpened(true), 750);
  };

  const handleClose = () => {
    setOpened(false);
    setOpening(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100">
      {/* Floating petals background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {petals.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-[-40px] select-none"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Soft radial glows */}
      <div className="pointer-events-none fixed -left-32 top-0 z-0 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-1/3 z-0 h-96 w-96 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-200/30 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 px-4 pt-8 sm:pt-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <p className="font-[family-name:var(--font-dancing)] text-2xl text-pink-500 sm:text-3xl">
            {t.code === "es" ? "Una carta para ti" : t.code === "en" ? "A letter for you" : "Una lettera per te"}
          </p>

          {/* Language selector */}
          <div className="inline-flex items-center gap-1 rounded-full border border-pink-200 bg-white/70 p-1 shadow-sm backdrop-blur">
            {LANG_ORDER.map((code) => {
              const item = LETTERS[code];
              const active = code === lang;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition sm:px-4 ${
                    active
                      ? "text-white"
                      : "text-pink-500 hover:text-pink-600"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 shadow"
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                  <span className="relative">{item.flag}</span>
                  <span className="relative hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-10 sm:py-14">
        <div className="my-auto flex w-full items-center justify-center py-4">
          <AnimatePresence mode="wait">
            {!opened ? (
              <Envelope key="envelope" t={t} opening={opening} onOpen={handleOpen} />
            ) : (
              <Letter key="letter" t={t} onClose={handleClose} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky footer */}
      <footer className="relative z-10 mt-auto px-4 pb-6 pt-4">
        <p className="text-center font-[family-name:var(--font-cormorant)] text-xs italic text-pink-400/90">
          {t.madeWith} · <span className="text-pink-500">♡</span>
        </p>
      </footer>
    </div>
  );
}

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

function makePetals(count: number, seed: number): Petal[] {
  const emojis = ["🌸", "🌷", "💗", "💮", "🌹"];
  const rand = mulberry32(seed);
  const arr: Petal[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      id: i,
      left: rand() * 100,
      size: 12 + rand() * 18,
      duration: 12 + rand() * 14,
      delay: rand() * 14,
      emoji: emojis[i % emojis.length],
    });
  }
  return arr;
}

/** Deterministic PRNG so the server and client produce identical petals. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
