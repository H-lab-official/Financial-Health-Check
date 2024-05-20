import { atom, selector } from "recoil";

export interface EducationPlanData {
  levelOfeducation: string;
  typeOfeducation: string;
  yearsOfeducation: string;
  inflationRate: string;
  requiredScholarships: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
  totalPreparationAssets: string;
  totalMissing: string;
}

export const educationPlanState = atom<EducationPlanData>({
  key: "educationPlanState",
  default: {
    levelOfeducation: "ปริญญาตรี",
    typeOfeducation: "107000.00",
    inflationRate: "0.03",
    yearsOfeducation: "",
    requiredScholarships: "",
    deposit: "",
    insuranceFund: "",
    otherAssets: "",
    totalPreparationAssets: "",
    totalMissing: "",
  },
});

export const calculateRequiredScholarships = (state: EducationPlanData) => {
  if (state.yearsOfeducation) {
    const requiredScholarships =
      (parseFloat(state.typeOfeducation) +
        parseFloat(state.typeOfeducation) * 0.15) *
      ((1 -
        Math.pow(
          1 + parseFloat(state.inflationRate),
          parseFloat(state.yearsOfeducation)
        )) /
        (1 - (1 + parseFloat(state.inflationRate))));

    return requiredScholarships.toFixed(2);
  }
  return "";
};

export const calculateTotalPreparationAssets = (state: EducationPlanData) => {
  if (state.deposit && state.insuranceFund && state.otherAssets) {
    const totalPreparationAssets =
      parseFloat(state.deposit) +
      parseFloat(state.insuranceFund) +
      parseFloat(state.otherAssets);

    return totalPreparationAssets.toFixed(2);
  }
  return "";
};

export const requiredScholarshipsSelector = selector({
  key: "requiredScholarshipsSelector",

  get: ({ get }) => {
    const state = get(educationPlanState);
    return calculateRequiredScholarships(state);
  },
});

export const totalPreparationAssetsSelector = selector({
  key: "totalPreparationAssetsSelector",
  get: ({ get }) => {
    const state = get(educationPlanState);
    return calculateTotalPreparationAssets(state);
  },
});

export const totalMissingSelector = selector({
  key: "totalMissingSelector",
  get: ({ get }) => {
    const requiredScholarships = get(requiredScholarshipsSelector);
    const totalPreparationAssets = get(totalPreparationAssetsSelector);

    if (requiredScholarships && totalPreparationAssets) {
      const totalPreparationAssetsNumber = parseFloat(totalPreparationAssets);
      const requiredScholarshipsNumber = parseFloat(requiredScholarships);

      return (
        requiredScholarshipsNumber - totalPreparationAssetsNumber
      ).toFixed(2);
    }

    return "";
  },
});
