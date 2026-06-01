"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Each line: the raw text to type, plus how to render it styled
const LINES = [
  {
    id: "cmd1",
    raw: "$ npm install portfolio@1.0.0",
    render: (t: string) => (
      <>
        <span className="text-white/40">{t.startsWith("$") ? "$ " : t}</span>
        {t.startsWith("$ ") && (
          <>
            <span className="text-primary font-medium">
              {t.slice(2).split(" ")[0]}
            </span>
            <span className="text-white/60">
              {" " + t.slice(2).split(" ").slice(1).join(" ")}
            </span>
          </>
        )}
      </>
    ),
  },
  {
    id: "installing",
    raw: "  Installing dependencies...",
    render: () => (
      <span className="text-white/40">  Installing dependencies...</span>
    ),
  },
  {
    id: "fetching",
    raw: "  Fetching packages from registry...",
    render: () => (
      <span className="text-white/30">  Fetching packages from registry...</span>
    ),
  },
  {
    id: "success",
    raw: "✓ Package installed successfully",
    render: () => (
      <span className="flex items-center gap-2 text-emerald-400 font-semibold">
        <span className="text-lg">✓</span>
        <span>Package installed successfully</span>
      </span>
    ),
  },
  {
    id: "cmd2",
    raw: "$ npm run dev",
    render: (t: string) => (
      <>
        <span className="text-white/40">{t.startsWith("$") ? "$ " : t}</span>
        {t.startsWith("$ ") && (
          <>
            <span className="text-primary font-medium">
              {t.slice(2).split(" ")[0]}
            </span>
            <span className="text-white/60">
              {" " + t.slice(2).split(" ").slice(1).join(" ")}
            </span>
          </>
        )}
      </>
    ),
  },
  {
    id: "compiling",
    raw: "  ▸ Compiling...",
    render: () => (
      <span className="text-yellow-400/80">  ▸ Compiling...</span>
    ),
  },
  {
    id: "ready",
    raw: "▶ Ready on http://localhost:3000",
    render: () => (
      <span className="text-emerald-400 font-bold tracking-wide">
        ▶ Ready on{" "}
        <span className="underline underline-offset-2 text-primary">
          http://localhost:3000
        </span>
      </span>
    ),
  },
];

export default function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [visibleLines, setVisibleLines] = useState<boolean[]>(
    new Array(LINES.length).fill(false)
  );

  useEffect(() => {
    let activeTimeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      },
    });
    activeTimeline = tl;

    // 0. Glow pulses in first
    tl.from(glowRef.current, {
      opacity: 0,
      scale: 0.4,
      duration: 1,
      ease: "power2.out",
    });

    // 1. Window drops in from above with strong bounce
    tl.from(
      windowRef.current,
      {
        opacity: 0,
        y: -140,
        scale: 0.8,
        rotation: -4,
        duration: 1.1,
        ease: "elastic.out(1, 0.6)",
      },
      "-=0.6"
    );

    // 2. Header slides down inside the window
    tl.from(
      headerRef.current,
      {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // 3. Traffic dots pop in with big back-out stagger
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll(".dot");
      tl.from(
        dots,
        {
          scale: 0,
          opacity: 0,
          duration: 0.35,
          ease: "back.out(3.5)",
          stagger: 0.14,
        },
        "-=0.2"
      );
    }

    // 4. Scan line sweeps across to "turn on" the terminal
    tl.fromTo(
      scanLineRef.current,
      { scaleX: 0, opacity: 1 },
      { scaleX: 1, opacity: 0, duration: 0.55, ease: "power1.inOut" },
      "+=0.1"
    );

    // 5. Lines appear one by one — reveal + x slide with heavy stagger
    LINES.forEach((_, i) => {
      tl.call(
        () => {
          setVisibleLines((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        [],
        `>+=${i === 0 ? 0.05 : 0.38}`
      );

      tl.from(
        () => linesRef.current[i],
        {
          opacity: 0,
          x: -50,
          skewX: 8,
          duration: 0.45,
          ease: "power3.out",
        },
        "<"
      );
    });

    // 6. Cursor blinks in at the end
    tl.from(cursorRef.current, { opacity: 0, duration: 0.01 }, ">=0.2");
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "steps(1)",
      repeat: -1,
      yoyo: true,
    });

    // 7. Subtle floating on the whole window
    tl.to(
      windowRef.current,
      {
        y: -8,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      "+=0.2"
    );
  }, sectionRef);

  const handleNav = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail && detail.sectionId === "terminal") {
      setVisibleLines(new Array(LINES.length).fill(false));
      activeTimeline?.restart();
    }
  };
  window.addEventListener("section-navigate", handleNav);

  return () => {
    window.removeEventListener("section-navigate", handleNav);
    ctx.revert();
  };
}, []);

return (
  <section
    id="terminal"
    ref={sectionRef}
    className="py-24 relative flex items-center justify-center min-h-[60vh] w-full overflow-hidden"
  >
    {/* Animated background glow */}
    <div
      ref={glowRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
    </div>

    <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
      <div
        ref={windowRef}
        className="rounded-[12px] border border-white/10 bg-[#0B0B0C] shadow-2xl overflow-hidden sm:min-h-[400px] relative will-change-transform"
        style={{ boxShadow: "0 0 80px 0 rgba(var(--color-primary-rgb, 255 200 100) / 0.08)" }}
      >
        {/* Scan line overlay */}
        <div
          ref={scanLineRef}
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent z-20 pointer-events-none origin-left"
        />

        {/* Terminal Header */}
        <div
          ref={headerRef}
          className="flex items-center px-6 py-4 border-b border-white/10"
        >
          <div ref={dotsRef} className="flex gap-2">
            <div className="dot w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_#FF5F57]" />
            <div className="dot w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_#FEBC2E]" />
            <div className="dot w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_#28C840]" />
          </div>
          <span className="mx-auto text-white/30 text-xs font-mono">
            portfolio — zsh
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 md:p-12 font-mono text-[12px] sm:text-[14px] md:text-[15px] leading-loose space-y-2">
          {LINES.map((line, i) => (
            <div
              key={line.id}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              style={{ visibility: visibleLines[i] ? "visible" : "hidden" }}
            >
              {line.render(line.raw)}
            </div>
          ))}

          {/* Blinking cursor line */}
          <div>
            <span className="text-white/40">$ </span>
            <span
              ref={cursorRef}
              className="inline-block w-[9px] h-[17px] bg-primary align-middle rounded-[2px]"
              style={{ boxShadow: "0 0 8px var(--color-primary, #f90)" }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
