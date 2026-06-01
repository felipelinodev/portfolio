"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBorder from "@/components/StarBorder";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const desktopPrevRef = useRef<HTMLButtonElement>(null);
  const desktopNextRef = useRef<HTMLButtonElement>(null);
  const mobileArrowsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Font Easy",
      description: t.projects.p1_desc,
      tags: [
        "Typescript",
        "NodeJS",
        "TailwindCss",
        "Python",
        "Postigress",
        "NextJS",
        "GeminiAPI",
        "Flask",
      ],
      githubUrl: "#",
      deployUrl: "https://font-easy.vercel.app",
      imageUrl: "/fonteasy_projectCard.png",
    },
    {
      id: 4,
      title: "Apenas comece",
      description: t.projects.p4_desc,
      tags: ["HTML", "CSS", "React.js", "JavaScript"],
      githubUrl: "https://github.com/felipelinodev/apenas-comece",
      deployUrl: "https://apenas-comece.vercel.app/",
      imageUrl: "/apenascomce_projectCard.png",
    },
    {
      id: 5,
      title: "Handy",
      description: t.projects.p5_desc,
      tags: [
        "React Native",
        "TypeScript",
        "NodeJS",
        "NestJS",
        "PostgreSQL",
        "Redis",
        "PrismaORM",
        "Amazon AWS",
      ],
      githubUrl: "https://github.com/felipelinodev/handy",
      deployUrl: "https://github.com/felipelinodev/handy",
      imageUrl: "/handy_projectCard.jpg",
    },
    {
      id: 6,
      title: "Calculadora de IMC",
      description: t.projects.p6_desc,
      tags: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/felipelinodev/calculadora-imc",
      deployUrl: "https://felipelinodev.github.io/calculadora-imc/",
      imageUrl: "/calculadoraimc_projectCard.png",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    startIndex: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(1);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    let activeTimeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
      activeTimeline = tl;

      // Title entrance
      tl.from(titleRef.current, {
        opacity: 0,
        y: -35,
        duration: 0.8,
        ease: "power3.out",
      }, 0);

      // Carousel wrapper entrance (along with cards)
      tl.from(carouselContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0.2);

      const cards = gsap.utils.toArray(".project-card");
      if (cards.length > 0) {
        tl.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.85,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.5)",
        }, 0.3);
      }

      // Arrow buttons pop in
      const isMobile = window.innerWidth < 768;
      const arrowElements = isMobile
        ? []
        : [desktopPrevRef.current, desktopNextRef.current].filter(Boolean);
      
      if (arrowElements.length > 0) {
        tl.from(arrowElements, {
          opacity: 0,
          scale: 0.9,
          y: 10,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(2)",
        }, 0.55);
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "projects") {
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
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-6">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-mono text-primary text-center mb-16 px-6 sm:px-0"
        >
          {t.projects.title}
        </h2>

        <div
          ref={carouselContainerRef}
          className="flex items-center justify-center gap-4 sm:gap-8 w-full relative"
        >
          <StarBorder
            as="button"
            onClick={scrollPrev}
            ref={desktopPrevRef}
            color="white"
            speed="3s"
            className="nav-arrow !hidden md:!flex group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 shrink-0 z-20"
            innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !w-[54.7px] !text-[#0B0B0C] !rounded-xl !flex !items-center !justify-center"
          >
            <span className="relative z-10 flex items-center justify-center w-full h-full group-hover:text-white transition-colors duration-500">
              <ChevronLeft className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
            </span>
          </StarBorder>

          <div
            className="overflow-hidden w-full max-w-[1380px] cursor-grab active:cursor-grabbing"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y items-stretch h-full py-8">
              {projects.map((p, idx) => {
                const isCenter = idx === selectedIndex;
                return (
                  <div
                    key={p.id}
                    className="project-card flex-[0_0_100%] sm:flex-[0_0_460px] min-w-0 px-4 sm:px-5 flex flex-col"
                  >
                    <div
                      className={`rounded-[20px] border border-primary/20 bg-transparent overflow-hidden transition-all duration-500 ease-out mx-auto w-full sm:max-w-full flex-1 flex flex-col justify-between
                      ${isCenter
                          ? 'md:scale-105 opacity-100 z-10 shadow-2xl border-primary/50'
                          : 'md:scale-95 md:opacity-70 opacity-100'
                        }`}
                    >
                      {/* Mock Image Area */}
                      <div className={`w-full h-[180px] sm:h-[220px] flex flex-col items-center justify-center relative p-[8px] ${p.imageUrl ? "bg-transparent" : "bg-gradient-to-br from-orange-500/10 to-orange-900/10"
                        }`}>
                      {p.imageUrl ? (
                          <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="text-foreground/20 font-mono text-sm tracking-widest">
                              {p.title} {t.projects.preview}
                            </div>
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-card to-transparent" />
                          </>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {p.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-[11px] font-semibold "
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-[18px] sm:text-[20px] font-semibold text-foreground/90 mb-2">
                            {p.title}
                          </h3>
                          <p className="text-[13px] sm:text-[14px] text-foreground/50 mb-6 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <StarBorder
                            as="a"
                            href={p.githubUrl}
                            color="white"
                            speed="3s"
                            className="group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 inline-block shrink-0"
                            innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !w-[54.7px] !text-[#0B0B0C] !rounded-xl !flex !items-center !justify-center"
                          >
                            <span className="relative z-10 flex items-center justify-center w-full h-full group-hover:text-white transition-colors duration-500">
                              <SiGithub className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
                            </span>
                          </StarBorder>

                          <StarBorder
                            as="a"
                            href={p.deployUrl}
                            color="white"
                            speed="3s"
                            className="flex-1 group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 inline-block"
                            innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !text-[#0B0B0C] !px-8 !rounded-xl !flex !items-center !justify-center font-semibold text-sm"
                          >
                            <span className="relative z-10 flex items-center gap-2 font-mono text-[13px] font-semibold text-primary-foreground group-hover:text-white transition-colors duration-500">
                              {t.projects.deploy}
                            </span>
                          </StarBorder>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <StarBorder
            as="button"
            onClick={scrollNext}
            ref={desktopNextRef}
            color="white"
            speed="3s"
            className="nav-arrow !hidden md:!flex group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 !rounded-xl transition-transform hover:scale-105 shrink-0 z-20"
            innerClassName="!bg-[#7CB5CE] relative overflow-hidden before:absolute before:inset-0 before:bg-[#5a9ab5] before:-translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out !h-[54.7px] !w-[54.7px] !text-[#0B0B0C] !rounded-xl !flex !items-center !justify-center"
          >
            <span className="relative z-10 flex items-center justify-center w-full h-full group-hover:text-white transition-colors duration-500">
              <ChevronRight className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
            </span>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
