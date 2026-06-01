"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiPostgresql,
  SiPython,
  SiGit,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const technologies = [
    { name: "Next.JS", icon: SiNextdotjs },
    { name: "NodeJS", icon: SiNodedotjs },
    { name: "ReactJS", icon: SiReact },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Python", icon: SiPython },
    { name: "Git/Github", icon: SiGit },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "mongoDB", icon: SiMongodb },
  ];

  useEffect(() => {
    let activeTimeline: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
        activeTimeline = tl;

        // Photo entrance
        tl.from(photoRef.current, {
          opacity: 0,
          x: -40,
          rotation: -5,
          duration: 0.8,
          ease: "power3.out",
        }, 0);

        // Title entrance
        tl.from(titleRef.current, {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: "power3.out",
        }, 0);

        // Paragraphs entrance
        if (textRef.current) {
          tl.from(textRef.current.children, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
          }, 0.2);
        }

        // Subtitle entrance
        tl.from(subtitleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.2");

        // Chips/technologies entrance
        if (chipsContainerRef.current) {
          const chips = chipsContainerRef.current.children;
          tl.from(chips, {
            opacity: 0,
            scale: 0.8,
            y: 15,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.out(1.5)",
          }, "-=0.2");
        }

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }, 150);

    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "about") {
        activeTimeline?.restart();
      }
    };
    window.addEventListener("section-navigate", handleNav);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("section-navigate", handleNav);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative w-full"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header: Photo and Title */}
        <div className="flex items-center justify-between w-full mb-12">
          {/* Photo */}
          <div
            ref={photoRef}
            className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-[20px] overflow-hidden border border-foreground/10 bg-foreground/5 shadow-lg"
          >
            {/* Standard img tag used here to guarantee maximum original resolution and prevent Next.js image blur */}
            <img
              src="/felipe_lino_sobre_mim.jpg"
              alt="Felipe Lino"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="text-[24px]  font-mono text-primary"
          >
            {t.about.title}
          </h2>
        </div>

        {/* Justified content text */}
        <div
          ref={textRef}
          className="space-y-6 text-foreground/80 text-[15px] sm:text-[16px] leading-relaxed text-left sm:text-justify mb-12"
        >
          <p>
            {t.about.p1}
          </p>
          <p>
            {t.about.p2}
          </p>
          <p>
            {t.about.p3}
          </p>
        </div>

        {/* Technologies Header */}
        <h3
          ref={subtitleRef}
          className="text-[16px] font-mono text-primary mb-6"
        >
          {t.about.technologies}
        </h3>

        {/* Chips Container */}
        <div
          ref={chipsContainerRef}
          className="flex flex-wrap gap-3"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="tech-chip flex items-center gap-2.5 px-4 py-1 rounded-full bg-primary/11 hover:bg-foreground/[0.06] hover:border-primary/30 transition-colors duration-300 text-foreground/80 text-sm cursor-default"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
