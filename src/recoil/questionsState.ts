import { atom } from "recoil";

export interface questionsData {
  // educationPlan: string;
  // healthPlan: string;
  // protectionPlan: string;
  // retirementPlan: string;
  educationPlanOrder: Number;
  healthPlanOrder: Number;
  protectionPlanOrder: Number;
  retirementPlanOrder: Number;
}

export const questionsState = atom<questionsData>({
  key: "questionsState",
  default: {
    // educationPlan: "",
    // healthPlan: "",
    // protectionPlan: "",
    // retirementPlan: "",
    educationPlanOrder: 0,
    healthPlanOrder: 0,
    protectionPlanOrder: 0,
    retirementPlanOrder: 0,
  },
});
