import { atom } from "recoil";

export interface questionsData {
  educationPlan: string;
  healthPlan: string;
  protectionPlan: string;
  retirementPlan: string;
  educationPlanOrder: string;
  healthPlanOrder: string;
  protectionPlanOrder: string;
  retirementPlanOrder: string;
}

export const questionsState = atom<questionsData>({
  key: "questionsState",
  default: {
    educationPlan: "",
    healthPlan: "",
    protectionPlan: "",
    retirementPlan: "",
    educationPlanOrder: "",
    healthPlanOrder: "",
    protectionPlanOrder: "",
    retirementPlanOrder: "",
  },
});
