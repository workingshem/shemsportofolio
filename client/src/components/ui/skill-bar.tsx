import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
  description?: string;
}

export function SkillBar({ name, percentage, color = "bg-primary", description }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
    <div className="skill-item" ref={barRef}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      )}
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)} 
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
}
