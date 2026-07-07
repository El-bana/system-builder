import * as React from "react";
import {
  CameraIcon,
  PlanIcon,
  ProtectionIcon,
  SensorsIcon,
} from "../components/icons";

export type StepId = "cameras" | "plans" | "sensors" | "protection";

export interface StepConfig {
  id: StepId;
  stepNumber: number;
  title: string;
  icon: React.ReactNode;
}

export const BUILDER_STEPS: Record<StepId, StepConfig> = {
  cameras: {
    id: "cameras",
    stepNumber: 1,
    title: "Choose your cameras",
    icon: <CameraIcon />,
  },
  plans: {
    id: "plans",
    stepNumber: 2,
    title: "Choose your plan",
    icon: <PlanIcon />,
  },
  sensors: {
    id: "sensors",
    stepNumber: 3,
    title: "Choose your sensors",
    icon: <SensorsIcon />,
  },
  protection: {
    id: "protection",
    stepNumber: 4,
    title: "Add extra protection",
    icon: <ProtectionIcon />,
  },
};

export const BUILDER_STEP_ORDER: StepId[] = [
  "cameras",
  "plans",
  "sensors",
  "protection",
];
