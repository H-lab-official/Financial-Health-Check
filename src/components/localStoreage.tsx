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

    return { saveData ,loadData};
};