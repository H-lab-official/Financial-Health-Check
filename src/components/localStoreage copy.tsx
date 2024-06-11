import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nameState, nameData } from "@/recoil/nameState";
import { educationPlanState, EducationPlanData } from "@/recoil/educationPlanState";
import { HealthPlanData, healthPlanState } from "@/recoil/healthPlanState";
import { ProtectionPlanData, protectionPlanState } from "@/recoil/protectionPlanState";
import { questionsData, questionsState } from '@/recoil/questionsState';
import { RetirementPlanData, retirementPlanState } from "@/recoil/retirementPlanState";

export const useLocalStorage = () => {
  const [name, setName] = useRecoilState(nameState);
  const [educationPlan, setEducationPlan] = useRecoilState(educationPlanState);
  const [healthPlan, setHealthPlan] = useRecoilState(healthPlanState);
  const [protection, setProtection] = useRecoilState(protectionPlanState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [retirement, setRetirement] = useRecoilState(retirementPlanState);

  useEffect(() => {
    const storedData = localStorage.getItem(name.user_params);
    if (storedData) {
      const parsedData: {
        nickname: string;
        age: string;
        educationPlan: EducationPlanData;
        healthPlan: HealthPlanData;
        protection: ProtectionPlanData;
        questions: questionsData;
        retirement: RetirementPlanData;
      } = JSON.parse(storedData);
      setName((prevName) => ({
        ...prevName,
        nickname: parsedData.nickname,
        age: parsedData.age,
      }));
      setEducationPlan(parsedData.educationPlan);
      setHealthPlan(parsedData.healthPlan);
      setProtection(parsedData.protection);
      setQuestions(parsedData.questions);
      setRetirement(parsedData.retirement);
    }
  }, [name.user_params]);

  const saveData = () => {
    const userData = {
      nickname: name.nickname,
      age: name.age,
      educationPlan,
      healthPlan,
      protection,
      questions,
      retirement,
    };
    localStorage.setItem(name.user_params, JSON.stringify(userData));
  };

  return { saveData };
};