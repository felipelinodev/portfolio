"use client";

import Link from "next/link";
import { Lightbulb, Languages, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import StarBorder from "./StarBorder";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "projects", "about", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px", // ativa quando ~40% do topo da viewport
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      // For home section we scroll to top of window
      const targetPos = id === "home" ? 0 : target;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetPos, autoKill: false },
        ease: "power3.inOut",
        onStart: () => {
          window.dispatchEvent(new CustomEvent("section-navigate", { detail: { sectionId: id } }));
        }
      });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const menuItems = [
    { id: "home", label: t.header.home },
    { id: "projects", label: t.header.portfolio },
    { id: "about", label: t.header.about },
    { id: "contact", label: t.header.contact },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 sm:py-8 lg:py-20 px-4 sm:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Botões do Tema e Idioma (Esquerda) */}
        <StarBorder
          as="div"
          color="#7CB5CE"
          speed="3s"
          className="pointer-events-auto shadow-lg ring-[4px] sm:ring-[6px] ring-card !rounded-[11px] sm:!rounded-[13px] group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500"
          innerClassName="!bg-background/60 backdrop-blur-md group-hover:!bg-background/80 !border !border-primary/20 group-hover:!border-[#7CB5CE]/50 transition-all duration-500 !flex !items-center !gap-2 sm:!gap-3 !rounded-[11px] sm:!rounded-[13px] !px-2.5 sm:!px-4 !py-2 sm:!py-[13px]"
        >
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="group flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-accent text-foreground transition-colors cursor-pointer" aria-label={t.header.toggleTheme}>
            {mounted && theme !== 'dark' ? (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/80 group-hover:rotate-[360deg] transition-transform duration-700" />
            ) : (
              <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/80 group-hover:rotate-[360deg] transition-transform duration-700" />
            )}
          </button>
          <div className="w-px h-3 sm:h-4 bg-border" />
          <button onClick={toggleLanguage} className="group flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full hover:bg-accent text-foreground transition-colors cursor-pointer" aria-label={t.header.toggleLang}>
            <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/80 group-hover:rotate-[360deg] transition-transform duration-700" />
          </button>
        </StarBorder>

        {/* Menu de Navegação */}
        <StarBorder
          as="nav"
          color="#7CB5CE"
          speed="3s"
          className="pointer-events-auto shadow-lg ring-[4px] sm:ring-[6px] ring-card !rounded-[11px] sm:!rounded-[13px] group [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500"
          innerClassName="!bg-background/60 backdrop-blur-md group-hover:!bg-background/80 !border !border-primary/20 group-hover:!border-[#7CB5CE]/50 transition-all duration-500 !flex !items-center !gap-3 sm:!gap-6 !rounded-[11px] sm:!rounded-[13px] !px-4 sm:!px-6 !py-2.5 sm:!py-4"
        >
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-1 sm:gap-2 text-[11px] sm:text-[13px] font-medium transition-colors ${isActive ? "text-primary" : "text-primary/70 hover:text-primary"
                  }`}
              >
                {isActive && <span className="text-[10px] sm:text-[12px]">•</span>}
                {item.label}
              </Link>
            );
          })}
        </StarBorder>
      </div>
    </header>
  );
}
