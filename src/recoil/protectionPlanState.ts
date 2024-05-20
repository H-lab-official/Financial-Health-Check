import { atom, selector } from "recoil";

export interface ProtectionPlanData {
  initialMonthlyExpense: string;
  initialYearlyExpense: string;
  adjustedYearlyExpenses: string;
  numberOfYears: string;
  inflationRate: string;
  homePayments: string;
  carPayments: string;
  otherDebts: string;
  bankDeposit: string;
  lifeInsuranceFund: string;
  otherAssets: string;
  totalAmount: string;
  totalDebts: string;
  requiredAmount: string;
  totalAssets: string;
  coverage: string;
}

export const protectionPlanState = atom<ProtectionPlanData>({
  key: "protectionPlanState",
  default: {
    initialMonthlyExpense: "",
    initialYearlyExpense: "",
    adjustedYearlyExpenses: "",
    numberOfYears: "",
    inflationRate: "0.03",
    homePayments: "",
    carPayments: "",
    otherDebts: "",
    bankDeposit: "",
    lifeInsuranceFund: "",
    otherAssets: "",
    totalAmount: "",
    totalDebts: "",
    requiredAmount: "",
    totalAssets: "",
    coverage: "",
  },
});

export const calculateInitialYearlyExpense = (state: ProtectionPlanData) => {
  if (state.initialMonthlyExpense) {
    const initialYearlyExpense = parseFloat(state.initialMonthlyExpense) * 12;
    return initialYearlyExpense.toFixed(2);
  }
  return "";
};
export const calculateExpenses = (state: ProtectionPlanData) => {
  if (
    state.initialMonthlyExpense &&
    state.adjustedYearlyExpenses &&
    state.numberOfYears &&
    state.inflationRate
  ) {
    const initialYearlyExpense = calculateInitialYearlyExpense(state);
    const totalAmount =
      (parseFloat(initialYearlyExpense) +
        parseFloat(state.adjustedYearlyExpenses)) *
      ((1 -
        Math.pow(
          1 + parseFloat(state.inflationRate),
          parseFloat(state.numberOfYears)
        )) /
        (1 - (1 + parseFloat(state.inflationRate))));

    return totalAmount.toFixed(2);
  }
  return "";
};

export const calculateTotalAssets = (state: ProtectionPlanData) => {
  if (state.bankDeposit && state.lifeInsuranceFund && state.otherAssets) {
    const totalAssets =
      parseFloat(state.bankDeposit) +
      parseFloat(state.lifeInsuranceFund) +
      parseFloat(state.otherAssets);

    return totalAssets.toFixed(2);
  }
  return "";
};

export const calculateTotalDebts = (state: ProtectionPlanData) => {
  if (state.homePayments && state.carPayments && state.otherDebts) {
    const totalDebts =
      parseFloat(state.homePayments) +
      parseFloat(state.carPayments) +
      parseFloat(state.otherDebts);

    return totalDebts.toFixed(2);
  }
  return "";
};

export const calculateRequiredAmount = (state: ProtectionPlanData) => {
  const totalAmount = calculateExpenses(state);
  const totalDebts = calculateTotalDebts(state);
  if (totalDebts && totalAmount) {
    const totalRequiredAmount =
      parseFloat(totalDebts) + parseFloat(totalAmount);

    return totalRequiredAmount.toFixed(2);
  } else {
    return "";
  }
};

export const calculateCoverage = (state: ProtectionPlanData) => {
  const requiredAmount = calculateRequiredAmount(state);
  const totalAssets = calculateTotalAssets(state);
  if (totalAssets && requiredAmount) {
    const coverage = parseFloat(requiredAmount) - parseFloat(totalAssets);

    return coverage.toFixed(2);
  } else {
    return "";
  }
};

export const initialYearlyExpenseSelector = selector({
  key: "initialYearlyExpenseSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateInitialYearlyExpense(state);
  },
});
export const totalAmountSelector = selector({
  key: "totalAmountSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateExpenses(state);
  },
});

export const totalAssetsSelector = selector({
  key: "totalAssetsSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateTotalAssets(state);
  },
});

export const totalDebtsSelector = selector({
  key: "totalDebtsSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateTotalDebts(state);
  },
});
export const requiredAmountSelector = selector({
  key: "requiredAmountSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateRequiredAmount(state);
  },
});
export const coverageSelector = selector({
  key: "coverageSelector",
  get: ({ get }) => {
    const state = get(protectionPlanState);
    return calculateCoverage(state);
  },
});
