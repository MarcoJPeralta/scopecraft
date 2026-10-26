import { useId } from "react";

interface InfoTipProps {
  label: string; // what the tip explains, read by screen readers
  children: React.ReactNode;
}

// Small "?" button that shows an explanation on hover or keyboard focus
function InfoTip({ label, children }: InfoTipProps) {
  const id = useId();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={`What is ${label}?`}
        aria-describedby={id}
        className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-muted text-[10px] leading-none font-bold text-muted transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none"
      >
        ?
      </button>
      <span
        id={id}
        role="tooltip"
        className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-lg border border-border bg-background p-3 text-xs leading-relaxed font-normal text-foreground opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
      >
        {children}
      </span>
    </span>
  );
}

export default InfoTip;
