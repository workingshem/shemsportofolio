import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col items-center mb-10", className)}>
      <h2 className="font-inter font-bold text-3xl mb-2 text-center">{title}</h2>
      <div className="w-16 h-1 bg-emerald-500"></div>
    </div>
  );
}
