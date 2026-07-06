import { NumberField } from "@base-ui/react/number-field";
import { cva, type VariantProps } from "class-variance-authority";
import { MinusIcon, PlusIcon } from "../icons";

// I have two variants here because the one in the review section is different from the catalog one
// in colors and other things

const stepperBtn = cva(
  "w-5 h-5 rounded-[4px] p-1.5 border-0 flex items-center justify-center shrink-0 cursor-pointer data-[disabled]:cursor-not-allowed",
  {
    variants: {
      variant: {
        catalog: [
          "bg-gray-50 text-gray-600",
          "data-[disabled]:bg-transparent",
          "data-[disabled]:text-gray-300",
        ],
        review: ["bg-white text-gray-500", "data-[disabled]:bg-gray-100"],
      },
    },
  },
);

const stepperInput = cva(
  "border-0 bg-transparent text-center text-gray-950 p-0 outline-none",
  {
    variants: {
      variant: {
        catalog: "text-base font-medium",
        review: "text-sm font-semibold",
      },
    },
  },
);

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
      <NumberField.Group className="flex items-center gap-1.5">
        <NumberField.Decrement className={stepperBtn({ variant })}>
          <MinusIcon size={8} />
        </NumberField.Decrement>

        <NumberField.Input className={stepperInput({ variant })} />

        <NumberField.Increment className={stepperBtn({ variant })}>
          <PlusIcon size={8} />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
