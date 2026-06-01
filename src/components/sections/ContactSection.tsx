"use client";

import { useEffect, useRef } from "react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";
import StarBorder from "@/components/StarBorder";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const socialCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let activeTimeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      activeTimeline = tl;

      // Title entrance
      tl.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out",
      }, 0);

      // Left card entrance (slides in from left)
      tl.from(leftCardRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      }, 0.2);

      // Right card entrance (slides in from right)
      tl.from(rightCardRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      }, 0.2);

      // Social card entrance (slides up from bottom)
      tl.from(socialCardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "back.out(1.5)",
      }, 0.4);

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "contact") {
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
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="py-20 w-full bg-[#0B0B0C]"
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Section title */}
          <h2
            ref={titleRef}
            className="text-[22px] font-mono text-primary mb-10"
          >
            {t.contact.title}
          </h2>

          {/* Two-column area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* LEFT: Contact info card */}
            <div
              ref={leftCardRef}
              className="rounded-[14px] border border-white/[0.08] bg-transparent overflow-hidden flex flex-col"
            >
              {/* Email row */}
              <div className="flex items-center gap-3 px-6 py-5 flex-1 text-white/70 font-mono text-sm overflow-hidden">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">felipelinodesigndoe@gmail.com</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06]" />

              {/* Phone row */}
              <div className="flex items-center gap-3 px-6 py-5 flex-1 text-white/70 font-mono text-sm overflow-hidden">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="whitespace-nowrap">38 9 9734-4783</span>
              </div>
            </div>

            {/* RIGHT: CTA card */}
            <div
              ref={rightCardRef}
              className="rounded-[14px] border border-white/[0.08] bg-transparent flex flex-col items-center justify-center gap-5 px-6 py-8"
            >
              <p className="font-mono text-sm text-white/70 text-center">
                {t.contact.getInTouch}
              </p>
              <StarBorder
                as="a"
                href="https://wa.me/5538997344783"
                target="_blank"
                rel="noopener noreferrer"
                color="#C7D1D5"
                speed="3s"
                className="group w-full [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 inline-block"
                innerClassName="!bg-primary relative overflow-hidden before:absolute before:inset-0 before:bg-muted before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !text-[#0B0B0C] !px-6 !rounded-xl !flex !items-center !justify-between font-mono text-sm font-semibold w-full"
              >
                <span className="relative z-10 flex-1 text-center group-hover:text-white transition-colors duration-500">{t.contact.sendMessage}</span>
                <span className="relative z-10 shrink-0 flex items-center justify-center group-hover:text-white transition-colors duration-500">
                  <SiWhatsapp className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
                </span>
              </StarBorder>
            </div>
          </div>

          {/* Social card — full width below */}
          <div
            ref={socialCardRef}
            className="rounded-[14px] border border-white/[0.08] bg-transparent flex items-center gap-5 px-6 py-5"
          >
            <span className="font-mono text-sm text-white/50">{t.contact.followMe}</span>
            <a
              href="https://github.com/felipelinodev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group text-white/50 hover:text-primary transition-colors"
            >
              <SiGithub className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/felipelino-dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group text-white/50 hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-primary/2 px-6 py-10">
        <div className="max-w-4xl mx-auto flex items-end justify-between">
          {/* Left: code-comment signature */}
          <div className="font-mono text-white/25 text-sm leading-snug">
            <span>{`{/* felipe`}</span>
            <br />
            <span>{`lino */}`}</span>
          </div>

          {/* Right: copyright */}
          <p className="font-mono text-white/25 text-xs text-right">
            {t.contact.copyright}
          </p>
        </div>
      </footer>
    </>
  );
}
