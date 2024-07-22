import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nameState } from "@/recoil/nameState";
import { educationPlanState, EducationPlanData } from "@/recoil/educationPlanState";
import { HealthPlanData, healthPlanState } from "@/recoil/healthPlanState";
import { ProtectionPlanData, protectionPlanState } from "@/recoil/protectionPlanState";
import { questionsData, questionsState } from '@/recoil/questionsState';
import { RetirementPlanData, retirementPlanState } from "@/recoil/retirementPlanState";

interface HealthPlanStorageData {
  hospitals?: string;
  dailyCompensationFromWelfare?: string;
  treatingSeriousIllness?: string;
  emergencyCosts?: string;
  annualTreatment?: string;
  roomFeeFromCompany?: string;
  dailyCompensationFromCompany?: string;
  treatingSeriousIllnessFromCompany?: string;
  emergencyCostsFromCompany?: string;
  annualTreatmentFromCompany?: string;
}
interface EducationPlanStorageData {
  levelOfeducation: string;
  typeOfeducation: string;
  yearsOfeducation: string;
  inflationRate: string;
  deposit: string;
  insuranceFund: string;
  otherAssets: string;
}
interface ProtectionPlanStorageData {
  initialMonthlyExpense: string
  numberOfYears: string
  adjustedYearlyExpenses: string
  inflationRate: string
  homePayments: string
  carPayments: string
  otherDebts: string
  bankDeposit: string
  lifeInsuranceFund: string
  otherAssets: string
}
interface retirementPlanStorageData {
  livingCosts: string
  houseCosts: string
  internetCosts: string
  clothingCosts: string
  medicalCosts: string
  otherCosts: string
  age: string
  retireAge: string
  lifExpectancy: string
  inflationRate: string
  deposit: string
  insuranceFund: string
  otherAssets: string
}
export interface nameData {
  user_params: string;
  nickname?: string;
  age?: string;
}
export const useLocalStorage = () => {
  const [name, setName] = useRecoilState(nameState);
  const [educationPlan, setEducationPlan] = useRecoilState(educationPlanState);
  const [healthPlan, setHealthPlan] = useRecoilState(healthPlanState);
  const [protection, setProtection] = useRecoilState(protectionPlanState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [retirement, setRetirement] = useRecoilState(retirementPlanState);

  const loadData = () => {
    const storedData = localStorage.getItem(name.user_params);
    const saveQuestionsState = localStorage.getItem("saveQuestionsState")
    const savehealthPlan = localStorage.getItem("savehealthPlan")
    const saveRetirementPlan = localStorage.getItem("saveRetirementPlan")
    const saveProtectionPlan = localStorage.getItem("saveProtectionPlan")
    const saveEducationplan = localStorage.getItem("saveEducationplan")
    const addressPlans = localStorage.getItem("addressPlans")
    const historyAddress = localStorage.getItem('historyAddress')
    if (storedData) {
      const parsedData: {
        nickname: string;
        age: string;
        educationPlan?: EducationPlanStorageData;
        healthPlan?: HealthPlanStorageData;
        protection?: ProtectionPlanStorageData;
        questions?: questionsData;
        retirement?: retirementPlanStorageData;
      } = JSON.parse(storedData);

      if (
        parsedData.nickname === name.nickname &&
        parsedData.age === name.age
      ) {
        if (parsedData.educationPlan) {
          setEducationPlan((preveducationPlan) => ({
            ...preveducationPlan,
            ...parsedData.educationPlan,
          }));
        }
        if (parsedData.healthPlan) {
          setHealthPlan((prevHealthPlan) => ({
            ...prevHealthPlan,
            ...parsedData.healthPlan,
          }));
        }
        if (parsedData.protection) {
          setProtection((prevprotection) => ({
            ...prevprotection,
            ...parsedData.protection,
          }));
        }
        if (parsedData.questions) {
          setQuestions(parsedData.questions);
        }
        if (parsedData.retirement) {
          setRetirement((prevretirement) => ({
            ...prevretirement,
            ...parsedData.retirement,
          }));
        }
      } else {
        localStorage.removeItem(name.user_params);
        localStorage.removeItem("saveQuestionsState");
        localStorage.removeItem("savehealthPlan");
        localStorage.removeItem("saveRetirementPlan");
        localStorage.removeItem("saveProtectionPlan");
        localStorage.removeItem("saveEducationplan");
        localStorage.removeItem("addressPlans");
        localStorage.removeItem("historyAddress");
      }
    } else {
      const storageKeys = [
        saveQuestionsState,
        savehealthPlan,
        saveRetirementPlan,
        saveProtectionPlan,
        saveEducationplan,
        addressPlans,
        historyAddress
      ];
      const localStorageKeys = [
        "saveQuestionsState",
        "savehealthPlan",
        "saveRetirementPlan",
        "saveProtectionPlan",
        "saveEducationplan", "addressPlans", "historyAddress"
      ];

      for (let i = 0; i < storageKeys.length; i++) {
        const key = storageKeys[i];
        if (key) {
          const parsedData: {
            id: string;
            nickname: string;
            age: string;
          } = JSON.parse(key);

          if (parsedData.nickname !== name.nickname) {
            localStorage.removeItem(localStorageKeys[i]);
          }
        }
      }
    }
  };

  const saveData = (dataToSave: {
    nickname?: string;
    age?: string;
    educationPlan?: EducationPlanStorageData;
    healthPlan?: HealthPlanStorageData;
    protection?: ProtectionPlanStorageData;
    questions?: questionsData;
    retirement?: retirementPlanStorageData;
  }) => {
    const userData = {
      ...dataToSave,
    };
    localStorage.setItem(name.user_params, JSON.stringify(userData));
  };

  return { saveData, loadData };
};