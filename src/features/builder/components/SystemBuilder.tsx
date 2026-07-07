import { useState } from "react";
import {
  BuilderAccordion,
  BuilderStep,
} from "../../../components/ui/BuilderAccordion";
import { Button } from "../../../components/ui/Button";
import { useBuilderData } from "../../../hooks/useBuilderData";
import {
  BUILDER_STEPS,
  BUILDER_STEP_ORDER,
  type StepConfig,
} from "../../../lib/constants";
import { useCategoryTotal } from "../../../stores/cartStore";
import type { Product } from "../../../types";
import { ProductCard } from "./ProductCard";

function CategoryStep({
  stepId,
  config,
  products,
  nextStepTitle,
  onNext,
  children,
}: {
  stepId: string;
  config: StepConfig;
  products: Product[];
  nextStepTitle?: string | null;
  onNext?: () => void;
  children: React.ReactNode;
}) {
  const selectedCount = useCategoryTotal(products.map((p) => p.id));

  return (
    <BuilderStep
      id={stepId}
      title={config.title}
      icon={config.icon}
      stepNumber={config.stepNumber}
      totalSteps={BUILDER_STEP_ORDER.length}
      selectedCount={selectedCount}
    >
      {children}
      {nextStepTitle && onNext && (
        <div className="mt-2.5 flex justify-center">
          <Button variant="outline" size="default" onClick={onNext}>
            Next: {nextStepTitle}
          </Button>
        </div>
      )}
    </BuilderStep>
  );
}

export function SystemBuilder() {
  const { data: builderData } = useBuilderData();
  // this is an array because base ui's accordion only accepts an array of string for the value
  const [openSteps, setOpenSteps] = useState<string[]>(["cameras"]);

  return (
    <div className="min-h-screen max-w-3xl">
      <BuilderAccordion value={openSteps} onValueChange={setOpenSteps}>
        {BUILDER_STEP_ORDER.map((stepId, index) => {
          const config = BUILDER_STEPS[stepId];
          const products = builderData[stepId] || [];

          const nextStepId = BUILDER_STEP_ORDER[index + 1];
          const nextStepTitle = nextStepId
            ? BUILDER_STEPS[nextStepId].title
            : null;

          return (
            <CategoryStep
              key={stepId}
              stepId={stepId}
              config={config}
              products={products as Product[]}
              nextStepTitle={nextStepTitle}
              onNext={nextStepId ? () => setOpenSteps([nextStepId]) : undefined}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </CategoryStep>
          );
        })}
      </BuilderAccordion>
    </div>
  );
}
