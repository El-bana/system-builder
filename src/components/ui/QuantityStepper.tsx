import { NumberField } from "@base-ui/react/number-field";
import { cva, type VariantProps } from "class-variance-authority";
import { MinusIcon, PlusIcon } from "../icons";

const stepperBtn = cva(
  "w-5 h-5 rounded-[4px] border-0 flex items-center justify-center shrink-0 cursor-pointer data-[disabled]:cursor-not-allowed",
  {
    variants: {
      variant: {
        catalog: [
          "bg-gray-50 text-gray-600",
          "data-[disabled]:bg-transparent",
          "data-[disabled]:text-gray-300",
          "data-[disabled]:border-2 data-[disabled]:border-gray-200",
        ],
        review: [
          "bg-white text-gray-500",
          "data-[disabled]:bg-gray-100",
          "data-[disabled]:border-1 data-[disabled]:border-gray-300",
        ],
      },
    },
  },
);

const stepperValue = cva("text-gray-950", {
  variants: {
    variant: {
      catalog: "text-base font-medium px-2.5",
      review: "text-sm font-semibold px-3",
    },
  },
});

type StepperVariant = NonNullable<VariantProps<typeof stepperBtn>["variant"]>;

interface Props {
  value: number;
  onValueChange: (newValue: number) => void;
  variant: StepperVariant;
  min?: number;
}

export function QuantityStepper({
  value,
  onValueChange,
  variant,
  min = 0,
}: Props) {
  return (
    <NumberField.Root
      value={value}
      onValueChange={(val) => onValueChange(val ?? min)}
      min={min}
      step={1}
      aria-label="Quantity"
    >
      <NumberField.Group className="flex items-center">
        <NumberField.Decrement className={stepperBtn({ variant })}>
          <MinusIcon size={8} />
        </NumberField.Decrement>

        <NumberField.Input className="sr-only" />
        <span className={stepperValue({ variant })}>{value}</span>

        <NumberField.Increment className={stepperBtn({ variant })}>
          <PlusIcon size={8} />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
