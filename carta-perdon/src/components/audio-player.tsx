"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LetterContent } from "@/lib/letter-content";

interface AudioPlayerProps {
  t: LetterContent;
}

/**
 * A small, romantic vinyl-style audio player.
 *
 * It points to `/song.mp3` in the public folder. If that file is missing
 * (the user will drop their own song there later) the player gracefully
 * shows a sweet "coming soon" state instead of looking broken.
 */
export function AudioPlayer({ t }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => {
      setDuration(isFinite(audio.duration) ? audio.duration : 0);
      setAvailable(true);
    };
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
    };
    // If the file is missing the browser fires an error event.
    const onErr = () => setAvailable(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);

    // Probe the file.
    audio.load();

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || available === false) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false));
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * duration;
    setCurrent(audio.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="mt-8 w-full">
      <audio ref={audioRef} src="/song.mp3" preload="metadata" />

      <div className="relative overflow-hidden rounded-3xl border border-pink-200/70 bg-white/70 p-4 shadow-[0_10px_40px_-12px_rgba(236,72,153,0.35)] backdrop-blur-sm sm:p-5">
        {/* soft glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-300/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-rose-300/30 blur-2xl" />

        <div className="relative flex items-center gap-4">
          {/* Vinyl / play button */}
          <button
            type="button"
            onClick={toggle}
            disabled={available === false}
            aria-label={playing ? "Pause" : "Play"}
            className={cn(
              "group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full",
              "bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-500/30",
              "transition-transform duration-300 hover:scale-105 active:scale-95",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {/* spinning disc */}
            <span
              className={cn(
                "absolute inset-0 rounded-full border-2 border-white/40",
                "bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_4px)]",
                playing && "animate-spin-slow",
              )}
            />
            {/* center label = flower sprite */}
            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
              <img
                src="/flores.png"
                alt=""
                className="h-7 w-7 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </span>
            <span className="relative z-20 text-white drop-shadow">
              {playing ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 translate-x-0.5 fill-current" />
              )}
            </span>
          </button>

          {/* Track info + progress */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
              <p className="truncate font-[family-name:var(--font-cormorant)] text-base font-semibold text-pink-700 sm:text-lg">
                {t.ourSong}
              </p>
            </div>

            {available === false ? (
              <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm italic text-pink-400">
                {t.songComingSoon}
              </p>
            ) : (
              <>
                <div
                  onClick={seek}
                  className="mt-2 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-pink-100"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500 transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-pink-400">
                  <span>{fmt(current)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
