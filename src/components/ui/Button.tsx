import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

// we could export this function if we need to style other elements to look like a button
const buttonVariants = cva(
  "inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-purple-600 text-white rounded-[4px] hover:bg-purple-700 transition-colors",
        outline:
          "bg-transparent border border-purple-600 text-purple-600 rounded-[7px] hover:bg-purple-50 transition-colors",
      },
      size: {
        default: "text-[18px] font-semibold h-9.75 px-[24px]",
        lg: "text-[17px] font-bold h-12 px-[16px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
