import { atom, selector } from "recoil";

export interface RetirementPlanData {
  livingCosts: string;
  houseCosts: string;
  internetCosts: string;
  clothingCosts: string;
  medicalCosts: string;
  otherCosts: string;
  totalCosts: string;
  age: string;
  retireAge: string;
  lifExpectancy: string;
  workingYears: string;
  preparationYears: string;
  inflationRate: string;
  totalPreparation: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
  totalPreparationAssets: string;
  totalMissing: string;
  mustBeSaved: string;
}

export const retirementPlanState = atom<RetirementPlanData>({
  key: "retirementPlanState",
  default: {
    livingCosts: "",
    houseCosts: "",
    internetCosts: "",
    clothingCosts: "",
    medicalCosts: "",
    otherCosts: "",
    totalCosts: "",
    age: "",
    retireAge: "",
    lifExpectancy: "",
    workingYears: "",
    preparationYears: "",
    inflationRate: "0.03",
    totalPreparation: "",
    deposit: "",
    insuranceFund: "",
    otherAssets: "",
    totalPreparationAssets: "",
    totalMissing: "",
    mustBeSaved: "",
  },
});

export const calculateTotalCosts = (state: RetirementPlanData) => {
  if (
    state.livingCosts &&
    state.houseCosts &&
    state.internetCosts &&
    state.clothingCosts &&
    state.medicalCosts &&
    state.otherCosts
  ) {
    const totalCosts =
      (parseFloat(state.livingCosts) +
        parseFloat(state.houseCosts) +
        parseFloat(state.internetCosts) +
        parseFloat(state.clothingCosts) +
        parseFloat(state.medicalCosts) +
        parseFloat(state.otherCosts)) *
      12;

    return Math.floor(totalCosts).toString();
  }
  return "";
};

export const calculateWorkingYears = (state: RetirementPlanData) => {
  if (state.age && state.retireAge) {
    const workingYears = parseInt(state.retireAge) - parseInt(state.age);
    return Math.floor(workingYears).toString();
  }
  return "";
};

export const calculatePreparationYears = (state: RetirementPlanData) => {
  if (state.retireAge && state.lifExpectancy) {
    const preparationYears =
      parseFloat(state.lifExpectancy) - parseFloat(state.retireAge);
    return Math.floor(preparationYears).toString();
  }
  return "";
};

export const calculateTotalRetirementPreparation = (
  state: RetirementPlanData
) => {
  const totalCosts = calculateTotalCosts(state);
  const workingYears = calculateWorkingYears(state);
  const preparationYears = calculatePreparationYears(state);
  if (totalCosts && workingYears && preparationYears) {
    const totalPreparation =
      parseFloat(totalCosts) *
      Math.pow(1 + parseFloat(state.inflationRate), parseFloat(workingYears)) *
      ((1 -
        Math.pow(
          1 + parseFloat(state.inflationRate),
          parseFloat(preparationYears)
        )) /
        (1 - parseFloat(state.inflationRate)));
    return Math.floor(totalPreparation).toString();
  }
  return "";
};

export const calculateTotalPreparation = (state: RetirementPlanData) => {
  const totalCosts = calculateTotalCosts(state);
  const workingYears = calculateWorkingYears(state);
  const preparationYears = calculatePreparationYears(state);
  if (totalCosts && workingYears && preparationYears) {
    const totalPreparation =
      parseFloat(totalCosts) *
      Math.pow(1 + parseFloat(state.inflationRate), parseInt(workingYears)) *
      ((1 -
        Math.pow(
          1 + parseFloat(state.inflationRate),
          parseInt(preparationYears)
        )) /
        (1 - (1 + parseFloat(state.inflationRate))));

    return Math.floor(totalPreparation).toString();
  }
  return "";
};

export const calculateisTotalPreparationAssets = (
  state: RetirementPlanData
) => {
  if (state.deposit && state.insuranceFund && state.otherAssets) {
    const totalPreparationAssets =
      parseFloat(state.deposit) +
      parseFloat(state.insuranceFund) +
      parseFloat(state.otherAssets);

    return Math.floor(totalPreparationAssets).toString();
  }
  return "";
};


export const totalCostsSelector = selector({
  key: "totalCostsSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    return calculateTotalCosts(state);
  },
});
export const workingYearsSelector = selector({
  key: "workingYearsSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    return calculateWorkingYears(state);
  },
});
export const preparationYearsSelector = selector({
  key: "preparationYearsSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    return calculatePreparationYears(state);
  },
});
export const totalPreparationSelector = selector({
  key: "totalPreparationSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    return calculateTotalPreparation(state);
  },
});
export const totalRetirementPreparationAssetsSelector = selector({
  key: "totalRetirementPreparationAssetsSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    return calculateisTotalPreparationAssets(state);
  },
});
export const totalRetirementMissingSelector = selector({
  key: "totalRetirementMissingSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    const totalPreparation = calculateTotalPreparation(state);
    const totalPreparationAssets = calculateisTotalPreparationAssets(state);
    if (totalPreparation && totalPreparationAssets) {
      const totalMissing =
        parseFloat(totalPreparation) - parseFloat(totalPreparationAssets);
      return totalMissing.toFixed(2);
    }

    return "";
  },
});
export const mustBeSavedSelector = selector({
  key: "mustBeSavedSelector",
  get: ({ get }) => {
    const state = get(retirementPlanState);
    const totalPreparation = calculateTotalPreparation(state);
    const totalPreparationAssets = calculateisTotalPreparationAssets(state);
    const workingYears = calculateWorkingYears(state);

    if (totalPreparation && totalPreparationAssets) {
      const mustBeSaved =
        (parseFloat(totalPreparation) - parseFloat(totalPreparationAssets)) /
        parseInt(workingYears);
      return mustBeSaved.toFixed(2);
    }

    return "";
  },
});
