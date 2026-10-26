import { CheckIcon } from "@radix-ui/react-icons";

interface OptionCardProps {
  name: string;
  value: string;
  title: string;
  description?: string;
  meta?: string;
  selected: boolean;
  multiple?: boolean;
  onSelect: () => void;
}

// Selectable card backed by a real radio/checkbox so it works with the keyboard
function OptionCard({
  name,
  value,
  title,
  description,
  meta,
  selected,
  multiple = false,
  onSelect,
}: OptionCardProps) {
  return (
    <label
      className={`relative flex h-full cursor-pointer flex-col rounded-xl border p-5 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/60 ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-surface hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <input
        type={multiple ? "checkbox" : "radio"}
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`absolute top-4 right-4 flex h-5 w-5 items-center justify-center border transition-colors ${
          multiple ? "rounded-md" : "rounded-full"
        } ${selected ? "border-primary bg-primary text-white" : "border-border bg-background"}`}
      >
        {selected && <CheckIcon className="h-4 w-4" />}
      </span>
      <span className="pr-8 font-semibold">{title}</span>
      {description && (
        <span className="mt-1 text-sm leading-relaxed text-muted">{description}</span>
      )}
      {meta && (
        <span className="mt-auto pt-3 text-xs font-medium text-muted">{meta}</span>
      )}
    </label>
  );
}

export default OptionCard;
