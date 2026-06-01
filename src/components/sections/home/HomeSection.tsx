"use client";

import StarBorder from "@/components/StarBorder";
import SplitText from "@/components/SplitText";
import { useLanguage } from "@/contexts/LanguageContext";

import Image from "next/image";
import SkillStack from "./SkillStack";
import { ArrowUpRight, Download } from "lucide-react";
import {
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiPython,
} from "react-icons/si";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const frontendBadgeRef = useRef<HTMLDivElement>(null);
  const backendBadgeRef = useRef<HTMLDivElement>(null);
  const cloudBadgeRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // ── Entrance: photo column drops in with elastic bounce ──────
    tl.from(heroImageRef.current, {
      opacity: 0,
      y: -120,
      scale: 0.75,
      rotation: -8,
      duration: 1.2,
      ease: "elastic.out(1, 0.55)",
    }, 0);

    // ── Entrance: text children fly in from the right with stagger ──
    if (heroTextRef.current) {
      const children = Array.from(heroTextRef.current.children);
      tl.from(children, {
        opacity: 0,
        x: 120,
        skewX: -12,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.13,
      }, 0.3);
    }

    // ── Badges entrance: each pops in with overshoot ────────────
    const badges = [frontendBadgeRef, backendBadgeRef, cloudBadgeRef];
    badges.forEach((ref, i) => {
      if (!ref.current) return;
      tl.from(ref.current, {
        opacity: 0,
        scale: 0,
        rotation: i % 2 === 0 ? -25 : 25,
        duration: 0.7,
        ease: "back.out(2.5)",
      }, 0.8 + i * 0.18);
    });

    // ── Icons row: cascade up ────────────────────────────────────
    if (iconsRef.current) {
      const icons = iconsRef.current.children;
      tl.from(icons, {
        opacity: 0,
        y: 30,
        scale: 0.4,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.06,
      }, 0.9);
    }

    // ── Floating: multi-axis sinusoidal motion on each badge ──────
    const floatTweens: gsap.core.Tween[] = [];
    const floatBadge = (
      el: HTMLDivElement,
      yAmp: number,
      xAmp: number,
      rotAmp: number,
      dur: number,
      delay: number
    ) => {
      const tween = gsap.to(el, {
        y: yAmp,
        x: xAmp,
        rotation: rotAmp,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
      floatTweens.push(tween);
    };

    if (frontendBadgeRef.current)
      floatBadge(frontendBadgeRef.current, -18, 7, 3, 3.0, 1.4);
    if (backendBadgeRef.current)
      floatBadge(backendBadgeRef.current, 14, -9, -4, 3.5, 1.7);
    if (cloudBadgeRef.current)
      floatBadge(cloudBadgeRef.current, -12, 10, 5, 2.8, 1.6);

    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "home") {
        floatTweens.forEach(tween => tween.pause());
        tl.restart();
        gsap.delayedCall(1.8, () => {
          floatTweens.forEach(tween => tween.play());
        });
      }
    };
    window.addEventListener("section-navigate", handleNav);

    return () => {
      window.removeEventListener("section-navigate", handleNav);
      tl.kill();
      floatTweens.forEach(tween => tween.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-24 px-6 sm:px-12 w-full border-b border-foreground/10 pb-12 sm:pb-0"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        { /* MINHAS SKILL */}
        <div ref={heroImageRef} className="relative flex justify-center items-center h-full">
          <div className="relative w-[300px] md:w-[450px] aspect-[3/4]">
            <Image
              src="/felipe_lino.png"
              alt="Felipe Lino"
              fill
              className="object-cover object-top [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
              priority
            />


            <SkillStack
              ref={frontendBadgeRef}
              skill={t.hero.skills.frontend}
              porcent="50%"
              className="absolute top-[45%] -left-2 sm:-left-8 md:-left-4"
              circleClassName="border-t-foreground/80 border-r-foreground/80"
            />

            <SkillStack
              ref={backendBadgeRef}
              skill={t.hero.skills.backend}
              porcent="35%"
              className="absolute bottom-[10%] left-[15%] sm:left-[20%]"
            />

            <SkillStack
              ref={cloudBadgeRef}
              skill={t.hero.skills.cloud}
              porcent="15%"
              className="absolute bottom-[25%] -right-2 sm:-right-8 md:-right-4"
            />

          </div>
        </div>

        <div
          ref={heroTextRef}
          className="flex flex-col items-center lg:items-end text-center lg:text-right"
        >
          <SplitText
            text={t.hero.title}
            tag="h1"
            className="text-[25px] sm:text-4xl md:text-5xl lg:text-[56px] font-mono text-primary mb-6 leading-tight whitespace-normal lg:whitespace-nowrap"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0, repeat: -1, yoyo: true, repeatDelay: 2 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="inherit"
          />
          <p className="text-xl md:text-[24px] font-extralight text-primary max-w-xl mb-12 font-mono leading-relaxed">
            {t.hero.subtitlePart1}<span>{t.hero.subtitleName}</span>{t.hero.subtitlePart2}
          </p>

          <div className="flex items-center gap-2 mb-16">
            <StarBorder
              as="a"
              href="/Curriculum%20(DEV).pdf"
              download="Felipe_Lino_CV.pdf"
              color="#C7D1D5"
              speed="3s"
              className="group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 inline-block"
              innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !flex !items-center !h-[54.7px] !text-[#0B0B0C] !px-8 !py-3 !rounded-xl !font-medium"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                <span className="font-mono text-[14px] sm:text-[15px] font-semibold text-primary-foreground">
                  {t.hero.downloadCv}
                </span>
                <Download className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
              </span>
            </StarBorder>
            <StarBorder
              as="a"
              href="#contact"
              color="white"
              speed="3s"
              className="group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 inline-block"
              innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !w-[54.7px] !text-[#0B0B0C] !p-3 !rounded-xl !flex !items-center !justify-center"
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full group-hover:text-white transition-colors duration-500">
                <ArrowUpRight className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700" />
              </span>
            </StarBorder>
          </div>


          <div
            ref={iconsRef}
            className="flex flex-wrap justify-center lg:justify-end items-center gap-6 text-foreground/60"
          >
            <div><SiTypescript className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiNextdotjs className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiJavascript className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiReact className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiTailwindcss className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiGit className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiPostgresql className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiMongodb className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
            <div><SiPython className="w-8 h-8 hover:text-foreground hover:rotate-[360deg] transition-all duration-700 cursor-pointer" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
