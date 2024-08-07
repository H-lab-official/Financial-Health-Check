import { atom, selector } from "recoil";

export interface EducationPlanData {
  levelOfeducation: string; //ค่าเริ่มต้นที่กำหนดไว้
  levelOfeducation2: string; //ค่าที่มีการเปลี่ยน มาจากlevelOfeducation
  typeOfeducation: string;//ค่าเริ่มต้นที่กำหนดไว้
  typeOfeducation2: string//ค่าที่มีการเปลี่ยน มาจากtypeOfeducation
  yearsOfeducation: string;//ค่าเริ่มต้นที่กำหนดไว้
  yearsOfeducation2: string;//ค่าที่มีการเปลี่ยน มาจากyearsOfeducation
  inflationRate: string;
  requiredScholarships: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
  totalPreparationAssets: string;
  totalMissing: string;
  child: string;
  expensesDuringStudy: string;


}

export const educationPlanState = atom<EducationPlanData>({
  key: "educationPlanState",
  default: {
    levelOfeducation: "19",
    levelOfeducation2: "19",
    typeOfeducation: "30000",
    typeOfeducation2: "30000",
    inflationRate: "0.03",
    yearsOfeducation: "",
    yearsOfeducation2: "",
    requiredScholarships: "",
    deposit: "",
    insuranceFund: "",
    otherAssets: "",
    totalPreparationAssets: "",
    totalMissing: "",
    child: "",
    expensesDuringStudy: ""
  },
});

export const calculateYearsOfEducation = (levelOfeducation2: string, child: string, yearsOfeducation2: string) => {
  const levelOfeducationNumber = parseInt(levelOfeducation2, 10);
  const childNumber = parseInt(child, 10);
  const yearsOfeducationX = parseInt(yearsOfeducation2, 10);

  if (!isNaN(levelOfeducationNumber) && !isNaN(childNumber)) {
    if (!yearsOfeducationX) {
      const number = (childNumber - 4) < 0 ? 0 : childNumber - 4

      return (levelOfeducationNumber - number).toString();
    } else {
      return yearsOfeducationX.toString()
    }

  }
  return "";
};

export const calculateRequiredScholarships = (state: EducationPlanData) => {
  if (state.yearsOfeducation) {
    const requiredScholarships =
      (parseFloat(state.typeOfeducation2) + parseFloat(state.expensesDuringStudy)) *
      ((1 -
        Math.pow(
          1 + parseFloat(state.inflationRate),
          parseFloat(state.yearsOfeducation)
        )) /
        (1 - (1 + parseFloat(state.inflationRate))));

    return Math.floor(requiredScholarships).toString();
  }
  return "";
};


export const calculateTotalPreparationAssets = (state: EducationPlanData) => {
  const deposit = parseFloat(state.deposit) || 0;
  const insuranceFund = parseFloat(state.insuranceFund) || 0;
  const otherAssets = parseFloat(state.otherAssets) || 0;

  const totalPreparationAssets = deposit + insuranceFund + otherAssets;

  return Math.floor(totalPreparationAssets).toString();
};
export const yearsOfeducationSelector = selector({
  key: "yearsOfeducationSelector",
  get: ({ get }) => {
    const state = get(educationPlanState);
    return calculateYearsOfEducation(state.levelOfeducation2, state.child, state.yearsOfeducation2);
  },
});

export const requiredScholarshipsSelector = selector({
  key: "requiredScholarshipsSelector",
  get: ({ get }) => {
    const state = get(educationPlanState);
    const yearsOfeducation = get(yearsOfeducationSelector);
    return calculateRequiredScholarships({ ...state, yearsOfeducation });
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

      return Math.floor(requiredScholarshipsNumber - totalPreparationAssetsNumber).toString();


    }

    return "";
  },
});


