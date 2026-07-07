import { Accordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "../icons";

interface BuilderAccordionProps {
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
}

export function BuilderAccordion({
  children,
  value,
  onValueChange,
  defaultValue,
}: BuilderAccordionProps) {
  return (
    <Accordion.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className="w-full flex flex-col gap-3.25"
    >
      {children}
    </Accordion.Root>
  );
}

interface BuilderStepProps {
  id: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  icon: React.ReactNode;
  selectedCount: number;
  children: React.ReactNode;
}

export function BuilderStep({
  id,
  stepNumber,
  totalSteps,
  title,
  icon,
  selectedCount,
  children,
}: BuilderStepProps) {
  return (
    <Accordion.Item
      value={id}
      className="group/item flex flex-col data-open:bg-blue-50 data-open:rounded-[10px] data-open:pt-3.75 data-open:pb-5 transition-[background-color,border-radius,padding] duration-300"
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-col w-full outline-none cursor-pointer">
          <span className="text-[12px] tracking-[1.6px] font-medium px-3.75 text-gray-700 uppercase mb-1.25 self-start">
            Step {stepNumber} of {totalSteps}
          </span>

          <div className="flex w-full items-center justify-between px-3.75 py-5 border-y-[0.5px] border-gray-900 transition-colors duration-300 group-data-open/item:border-b-transparent group-data-open/item:pb-3.75">
            <div className="flex items-center gap-2">
              <div className="text-slate-500 lg:size-6.5 size-5 flex items-center justify-center shrink-0">
                {icon}
              </div>
              <span className="text-lg lg:text-[22px] font-semibold text-gray-950 leading-none">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {selectedCount > 0 && (
                <span className="lg:hidden group-data-panel-open:block  text-[14px] font-medium text-purple-600">
                  {selectedCount} selected
                </span>
              )}
              <ChevronDownIcon
                size={12}
                className="shrink-0 text-purple-600 transition-all duration-300 group-data-panel-open:rotate-180 "
              />
            </div>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="px-3.75">{children}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
