"use client";

import { forwardRef } from 'react';
import StarBorder from '@/components/StarBorder';

type SkillStackProps = {
    skill: string;
    porcent: string;
    className?: string;
    circleClassName?: string;
}

const SkillStack = forwardRef<HTMLDivElement, SkillStackProps>(
    ({ skill, porcent, className = "", circleClassName = "border-t-white/80" }, ref) => {
        return (
            <div
                ref={ref}
                className={`absolute z-10 will-change-transform group ${className}`}
            >
                <StarBorder
                    as="div"
                    color="#7CB5CE"
                    speed="3s"
                    className="!rounded-[12px] [&>div.absolute]:opacity-0 hover:[&>div.absolute]:opacity-100 [&>div.absolute]:transition-opacity [&>div.absolute]:duration-500 w-full cursor-default"
                    innerClassName="!bg-primary/10 !bg-none !border !border-foreground/10 group-hover:!border-[#7CB5CE]/50 transition-colors duration-500 !backdrop-blur-md !rounded-[12px] !px-4 !py-2.5 !flex !items-center !gap-3 !text-left !shadow-xl w-full"
                >
                    <span className="text-[15px] font-normal text-foreground/90 tracking-wide">
                        {skill}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-[2px] border-foreground/10 flex items-center justify-center text-[10px] font-medium text-foreground/90 ${circleClassName}`}>
                        {porcent}
                    </div>
                </StarBorder>
            </div>
        );
    }
);

SkillStack.displayName = 'SkillStack';

export default SkillStack;
