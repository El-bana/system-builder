import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { cn } from "../../../lib/utils";

export interface Variant {
  id: string;
  name: string;
  thumbnail: string;
}

export interface VariantSelectorProps {
  variants: Variant[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function VariantSelector({
  variants,
  value,
  onChange,
  className,
}: VariantSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {variants.map((variant) => (
        <VariantChip key={variant.id} {...variant} />
      ))}
    </RadioGroup>
  );
}

export type VariantChipProps = Variant;

export function VariantChip({ id, name, thumbnail }: VariantChipProps) {
  return (
    <Radio.Root
      value={id}
      className={cn(
        "group flex items-center gap-1.5 w-16.25 h-6.5 rounded-xs transition-all duration-200 outline-none cursor-pointer relative",
        "data-unchecked:bg-transparent data-unchecked:border-[0.5px] data-unchecked:border-neutral-300",
        "data-checked:bg-teal-400/4 data-checked:border data-checked:border-teal-600",
        // Focus state for accessibility
        "focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
      )}
    >
      <img
        src={thumbnail}
        alt={name}
        className="size-5.5 object-contain shrink-0"
      />
      <span className="text-[10px] font-medium text-gray-900 whitespace-nowrap">
        {name}
      </span>
    </Radio.Root>
  );
}
