import { atom, selector } from "recoil";

export interface HealthPlanData {
  hospitals: string;
  hospitals2:string
  roomFee: string;
  roomFeeFromWelfare: string;
  dailyCompensationFromWelfare: string;
  treatingSeriousIllness: string;
  emergencyCosts: string;
  annualTreatment: string;
  roomFeeFromCompany: string;
  dailyCompensationFromCompany: string;
  treatingSeriousIllnessFromCompany: string;
  emergencyCostsFromCompany: string;
  annualTreatmentFromCompany: string;
  additionalRoomFee: string;
  additionalDailyCompensation: string;
  additionalTreatingSeriousIllness: string;
  additionalEmergencyCosts: string;
  additionalAnnualTreatment: string;
}

export const healthPlanState = atom<HealthPlanData>({
  key: "healthPlanState",
  default: {
    hospitals: "",
    hospitals2:"",
    roomFee: "1500.00",
    roomFeeFromWelfare: "1500.00",
    dailyCompensationFromWelfare: "",
    treatingSeriousIllness: "",
    emergencyCosts: "",
    annualTreatment: "",
    roomFeeFromCompany: "",
    dailyCompensationFromCompany: "",
    treatingSeriousIllnessFromCompany: "",
    emergencyCostsFromCompany: "",
    annualTreatmentFromCompany: "",
    additionalRoomFee: "",
    additionalDailyCompensation: "",
    additionalTreatingSeriousIllness: "",
    additionalEmergencyCosts: "",
    additionalAnnualTreatment: "",
  },
});

export const calculateAdditionalRoomFee = (state: HealthPlanData) => {
  if (state.hospitals2 && state.roomFeeFromCompany) {
    const additionalRoomFee =
      parseFloat(state.hospitals2) - parseFloat(state.roomFeeFromCompany);
    return additionalRoomFee.toFixed(2);
  } else {
    return "";
  }
};
export const calculateDailyCompensation = (state: HealthPlanData) => {
  if (
    state.dailyCompensationFromWelfare &&
    state.dailyCompensationFromCompany
  ) {
    const dailyCompensation =
      parseFloat(state.dailyCompensationFromWelfare) -
      parseFloat(state.dailyCompensationFromCompany);
    return dailyCompensation.toFixed(2);
  } else {
    return "";
  }
};
export const calculateEmergencyCosts = (state: HealthPlanData) => {
  if (state.emergencyCosts && state.emergencyCostsFromCompany) {
    const emergencyCosts =
      parseFloat(state.emergencyCosts) -
      parseFloat(state.emergencyCostsFromCompany);
    return emergencyCosts.toFixed(2);
  } else {
    return "";
  }
};
export const calculateAnnualTreatments = (state: HealthPlanData) => {
  if (state.annualTreatment && state.annualTreatmentFromCompany) {
    const annualTreatment =
      parseFloat(state.annualTreatment) -
      parseFloat(state.annualTreatmentFromCompany);
    return annualTreatment.toFixed(2);
  } else {
    return "";
  }
};
export const calculateTreatingSeriousIllness = (state: HealthPlanData) => {
  if (state.treatingSeriousIllness && state.treatingSeriousIllnessFromCompany) {
    const treatingSeriousIllness =
      parseFloat(state.treatingSeriousIllness) -
      parseFloat(state.treatingSeriousIllnessFromCompany);
    return treatingSeriousIllness.toFixed(2);
  } else {
    return "";
  }
};

export const additionalRoomFeeSelector = selector({
  key: "additionalRoomFeeSelector",
  get: ({ get }) => {
    const state = get(healthPlanState);
    return calculateAdditionalRoomFee(state);
  },
});
export const dailyCompensationSelector = selector({
  key: "dailyCompensationSelector",
  get: ({ get }) => {
    const state = get(healthPlanState);
    return calculateDailyCompensation(state);
  },
});
export const emergencyCostsSelector = selector({
  key: "emergencyCostsSelector",
  get: ({ get }) => {
    const state = get(healthPlanState);
    return calculateEmergencyCosts(state);
  },
});
export const annualTreatmentSelector = selector({
  key: "annualTreatmentSelector",
  get: ({ get }) => {
    const state = get(healthPlanState);
    return calculateAnnualTreatments(state);
  },
});
export const treatingSeriousIllnessSelector = selector({
  key: "treatingSeriousIllnessSelector",
  get: ({ get }) => {
    const state = get(healthPlanState);
    return calculateTreatingSeriousIllness(state);
  },
});
